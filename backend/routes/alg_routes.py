from app import SECRET_KEY

from flask import Blueprint, request
from models.user import User
from services.alg_service import calculate_macro_interest
from utils.auth import require_auth

import jwt

alg_bp = Blueprint('alg', __name__, url_prefix='/api/alg')

@alg_bp.get('/getuserinterestpercentage/<int:user_id>')
@require_auth
def get_user_interest_percentage(user_id: int):
    token = request.headers.get("Authorization").split(" ")[1]
    decoded_jwt = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
    
    user_id = decoded_jwt.get("user_id")
    user = User.get_user_from_id(user_id)

    if not user:
        return {"error": "User not found"}, 404
    
    percentage = calculate_macro_interest(user)
    return percentage