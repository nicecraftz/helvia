from app import SECRET_KEY
from flask import Blueprint, request
from models.user import User
from services.llm_service import get_event_recommendation
from utils.auth import require_auth

import jwt 

llm_bp = Blueprint('llm', __name__, url_prefix='/api/llm')

@llm_bp.get("/event/recommendation")
@require_auth
def event_recommendation():
    token = request.headers.get("Authorization").split(" ")[1]
    decoded_jwt = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
    user_id = decoded_jwt.get("user_id")
    user = User.get_user_from_id(user_id)
    if not user:
        return {"error": "User not found"}, 404
       
    recommendation = get_event_recommendation(user)
    return recommendation



