from flask import Blueprint, request
from services.llm_service import get_user_profile_analysis, get_event_recommendations
from models.event import Event
from models.user import User

from app import SECRET_KEY
import jwt 

llm_bp = Blueprint('llm', __name__, url_prefix='/api/llm')

@llm_bp.get("/profile-analysis")
def profile_analysis():
    bearer = request.headers.get("Authorization").split(" ")[1]
    if not bearer or bearer == "":
        return {
            "error": "No authorization provided"
        }, 403
    
    decoded_jwt = jwt.decode(bearer, SECRET_KEY, algorithms=["HS256"])
    


@llm_bp.post("/event-recommendations")
def event_recommendations():
    request_data = request.get_json()
    event_id = request_data.get("id")
    return get_event_recommendations(Event.get_event_from_id(event_id))

