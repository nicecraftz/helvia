from flask import Blueprint, request
from utils.auth import require_auth
from models.user import User
from app import SECRET_KEY
import jwt

user_bp = Blueprint('user', __name__, url_prefix='/api/user')

@user_bp.get('/me')
@require_auth
def get_current_user():
    token = request.headers.get("Authorization").split(" ")[1]
    decoded_jwt = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
    user : User = User.query.filter_by(id=decoded_jwt.get("user_id")).first()

    if not user:
        return {
            "error": "User not found"
        }, 404

    return user.to_dict(), 200