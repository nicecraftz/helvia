from models.payload import RegisterUserPayload, LoginUserPayload
from models.user import User
from flask_sqlalchemy import SQLAlchemy

import datetime

import bcrypt
import jwt
import os



SECRET_KEY = os.getenv("JWT_SECRET_KEY", "default_secret_key")
db = SQLAlchemy()

def register_user(payload: RegisterUserPayload) -> tuple:
    bcrypt_password = bcrypt.hashpw(payload.password.encode('utf-8'), bcrypt.gensalt())
    new_user = User.from_register_payload(payload, bcrypt_password.decode('utf-8'))

    # Aggiunta dell'utente al database
    db.session.add(new_user)
    db.session.commit()

    # TODO: Risolvere implementando un sistema di access e refresh token
    claims = {
        "user_id": new_user.id,
        "email": new_user.email,
        "exp": int((datetime.datetime.now() + datetime.timedelta(days=7)).timestamp())
    }

    token = jwt.encode(claims, SECRET_KEY, algorithm="HS256")
    return token

def login_user(payload: LoginUserPayload):
    user = User.query.filter_by(email=payload.email).first()
    if not user:
        return {
            "error": "User not found"
        }
    if not bcrypt.checkpw(payload.password.encode('utf-8'), user.password_bcrypt.encode('utf-8')):
        return {
            "error": "Incorrect password"
        }
    
    claims = {
        "user_id": user.id,
        "email": user.email,
        "exp": int((datetime.datetime.now() + datetime.timedelta(days=7)).timestamp())
    }

    token = jwt.encode(claims, SECRET_KEY, algorithm="HS256")
    return token

def activate_user(jwt_token: str):
    try:
        claims = jwt.decode(jwt_token, SECRET_KEY, algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        return {
            "error": "Token has expired"
        }, 403
    except jwt.InvalidTokenError:
        return {
            "error": "Invalid token"
        }, 403
    
    user = User.query.filter_by(id=claims["user_id"]).first()
    if not user:
        return {
            "error": "User not found"
        }, 404
    
    today = datetime.date.today()

    if user.access_data.last_login != today:
        delta_days = (today - user.access_data.last_login).days
        if delta_days == 1:
            user.statistics.streak += 1
        else:
            user.statistics.streak = 1

        user.access_data.last_login = today
        db.session.commit()