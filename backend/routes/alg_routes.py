from app import SECRET_KEY

from flask import Blueprint, request
from models.user import User
from services.alg_service import calculate_macro_interest

import jwt

alg_bp = Blueprint('alg', __name__, url_prefix='/api/alg')

@alg_bp.get('/getuserinterestpercentage/<int:user_id>')
def get_user_interest_percentage(user_id: int):
    auth_header = request.headers.get("Authorization")
    if not auth_header:
        return {"error": "No authorization provided"}, 403

    try:
        bearer = auth_header.split(" ")[1]
    except IndexError:
        return {"error": "Invalid authorization header"}, 403

    try:
        decoded_jwt = jwt.decode(bearer, SECRET_KEY, algorithms=["HS256"])
        user_id = decoded_jwt.get("user_id")
    except Exception as e:
        return {"error": str(e)}, 403

    user = User.get_user_from_id(user_id)
    if not user:
        return {"error": "User not found"}, 404
    
    percentage = calculate_macro_interest(user)
    return percentage