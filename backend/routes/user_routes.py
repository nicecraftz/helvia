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