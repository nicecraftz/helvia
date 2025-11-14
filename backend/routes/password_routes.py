from flask import Blueprint

password_bp = Blueprint('password', __name__, url_prefix='/api/password')
#MAIL_KEY
@password_bp.post('/change')
def reset_password():
    # Todo: IMPLEMENT PASSWORD RESET LOGIC
    return {"message": "Password reset link sent"}, 200

@password_bp.post('/forgot')
def reset_password():
    # Todo: IMPLEMENT PASSWORD FORGOT LOGIC
    return {"message": "Password change successful"}, 200