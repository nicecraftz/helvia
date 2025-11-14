from flask import Blueprint, request
from services.user_service import register_user, login_user, activate_user
from models.payload import RegisterUserPayload, LoginUserPayload
from models.user import User

import jwt

user_bp = Blueprint('user', __name__, url_prefix='/api/user')

@user_bp.post('/register')
def register():
    payload = RegisterUserPayload(**request.get_json())
    return register_user(payload)

@user_bp.post('/login')
def login():
    payload = LoginUserPayload(**request.get_json())
    return login_user(payload)

@user_bp.put('/activate')
def activate():
    bearer = request.headers.get("Authorization").split(" ")[1]
    if not bearer or bearer == "":
        return {
            "error": "No authorization provided"
        }, 403
    
    from services.user_service import SECRET_KEY
    claims = jwt.decode(bearer, SECRET_KEY, algorithms=["HS256"])    
    user : User = User.query.filter_by(id=claims["user_id"]).first()

    if not user:
        return {
            "error": "User not found"
        }, 404
    
    return activate_user(user)