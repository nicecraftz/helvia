from services.customer_service import register_customer, login_customer
from services.user_service import register_user, login_user
from flask import Blueprint, request

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

@auth_bp.post('/user/register')
def register():
    payload = request.get_json()
    return register_user(payload)

@auth_bp.post('/user/login')
def login():
    payload = request.get_json()
    return login_user(payload)

@auth_bp.post('/customer/register')
def customer_register():
    payload = request.get_json()
    return register_customer(payload)

@auth_bp.post('/customer/login')
def customer_login():
    payload = request.get_json()
    return login_customer(payload)