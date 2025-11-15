from flask import Blueprint, request
from models.customer import Customer
from utils.auth import require_auth
from app import SECRET_KEY
import jwt

customer_bp = Blueprint('customer', __name__, url_prefix='/api/customer')

@customer_bp.get('/me')
@require_auth
def get_current_user():
    token = request.headers.get("Authorization").split(" ")[1]
    decoded_jwt = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
    customer : Customer = Customer.query.filter_by(id=decoded_jwt.get("customer_id")).first()

    if not customer:
        return {
            "error": "Customer not found"
        }, 404

    return customer.to_dict(), 200