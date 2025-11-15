from services.llm_service import get_event_recommendation
from flask import Blueprint
from utils.auth import require_user
from models.user import User

llm_bp = Blueprint('llm', __name__, url_prefix='/api/llm')

@llm_bp.get("/event/recommendation")
@require_user
def event_recommendation(user : User):       
    recommendation = get_event_recommendation(user)
    return recommendation



