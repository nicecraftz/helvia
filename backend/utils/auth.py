from functools import wraps
from flask import request, g
from models.user import User
from models.customer import Customer
import jwt

from app import SECRET_KEY

def require_auth(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        auth_header = request.headers.get("Authorization", "")
        parts = auth_header.split()
        
        if len(parts) != 2 or parts[0].lower() != "bearer":
            return {"error": "No or invalid authorization header"}, 403

        token = parts[1]
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        except jwt.InvalidTokenError:
            return {"error": "Invalid token"}, 403

        g.auth_payload = payload
        return f(*args, **kwargs)
    return wrapper

def require_user(f):
    @wraps(f)
    @require_auth
    def wrapper(*args, **kwargs):
        user_id = g.auth_payload.get("user_id")
        user = User.get_user_from_id(user_id)
        
        if not user:
            return {"error": "User not found"}, 404
        
        return f(user, *args, **kwargs)
    return wrapper

def require_customer(f):
    @wraps(f)
    @require_auth
    def wrapper(*args, **kwargs):
        customer_id = g.auth_payload.get("customer_id")
        customer = Customer.query.filter_by(id=customer_id).first()    

        if not customer:
            return {"error": "Customer not found"}, 404
        
        return f(customer, *args, **kwargs)
    return wrapper

