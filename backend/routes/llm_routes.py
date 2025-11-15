from flask import Blueprint, request
from services.llm_service import get_event_reccomendation
from models.event import Event
from models.user import User

from app import SECRET_KEY
import jwt 

llm_bp = Blueprint('llm', __name__, url_prefix='/api/llm')

@llm_bp.get("/event/<int:event_id>/recommendation")
def event_recommendation(event_id: int):
    bearer = request.headers.get("Authorization").split(" ")[1]
    if not bearer or bearer == "":
        return {
            "error": "No authorization provided"
        }, 403
    
    decoded_jwt = jwt.decode(bearer, SECRET_KEY, algorithms=["HS256"])
    user = User.get_user_from_id(decoded_jwt.get("user_id"))
    
    if not user:
        return {
            "error": "User not found"
        }, 404
    
    event = Event.get_event_from_id(event_id)
    if not event:
        return {
            "error": "Event not found"
        }, 404
    
    return get_event_reccomendation(event, user)


