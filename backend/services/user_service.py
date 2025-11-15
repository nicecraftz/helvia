from models.payload import RegisterUserPayload, LoginUserPayload
from models.user import User

import datetime

import bcrypt
import jwt

from app import db, SECRET_KEY

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
    user : User = User.query.filter_by(email=payload.email).first()
    if not user :
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