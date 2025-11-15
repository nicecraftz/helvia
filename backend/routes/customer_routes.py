from flask import Blueprint
from models.customer import Customer
from utils.auth import require_customer
import jwt

customer_bp = Blueprint('customer', __name__, url_prefix='/api/customer')

@customer_bp.get('/me')
@require_customer
def get_current_user(customer: Customer):
    return customer.to_dict(), 200