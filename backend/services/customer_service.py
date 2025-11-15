from models.customer import Customer
from app import db, SECRET_KEY

from bcrypt import checkpw
import jwt

def register_customer(payload: dict) -> str:
    new_customer = Customer.from_dict(payload)
    db.session.add(new_customer)
    db.session.commit()

    token = jwt.encode({"customer_id": new_customer.id}, SECRET_KEY, algorithm="HS256")
    return token

def login_customer(payload: dict) -> str:
    customer : Customer = Customer.query.filter_by(email=payload.get("email")).first()
    
    if not customer:
        return {
            "error": "Customer not found"
        }
    
    if not checkpw(payload.get("password").encode('utf-8'), customer.bcrypt_password.encode('utf-8')):
        return {
            "error": "Incorrect password"
        }
    
    token = jwt.encode({"customer_id": customer.id}, SECRET_KEY, algorithm="HS256")
    return token