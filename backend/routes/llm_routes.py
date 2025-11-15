from app import SECRET_KEY
from flask import Blueprint, request
from models.user import User
from services.llm_service import get_event_recommendation

import jwt 


llm_bp = Blueprint('llm', __name__, url_prefix='/api/llm')

@llm_bp.get("/event/recommendation")
def event_recommendation():
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
    user = User.get_user_from_id(user_id)
    recommendation = get_event_recommendation(user)

    return recommendation



