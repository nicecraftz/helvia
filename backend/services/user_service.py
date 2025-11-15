from app import SECRET_KEY
from Alchemy import db
from models.user import User

import datetime
import bcrypt
import jwt

def register_user(payload: dict) -> tuple:
    new_user = User.from_dict(payload)
    db.session.add(new_user)
    db.session.commit()

    claims = {
        "user_id": new_user.id,
        "email": new_user.email,
        "exp": int((datetime.datetime.now() + datetime.timedelta(days=7)).timestamp())
    }

    token = jwt.encode(claims, SECRET_KEY, algorithm="HS256")
    return {
        "token": token
    }

def login_user(payload: dict):
    user : User = User.query.filter_by(username=payload["username"]).first()
    
    if not user:
        return {
            "error": "User not found"
        }
    
    if not bcrypt.checkpw(payload["password"].encode('utf-8'), user.password_bcrypt.encode('utf-8')):
        return {
            "error": "Incorrect password"
        }
    
    claims = {
        "user_id": user.id,
        "email": user.email,
        "exp": int((datetime.datetime.now() + datetime.timedelta(days=7)).timestamp())
    }

    token = jwt.encode(claims, SECRET_KEY, algorithm="HS256")
    return {
        "token": token
    }