from datetime import datetime, timedelta
from models.customer import Customer
from bcrypt import checkpw
from app import SECRET_KEY
from Alchemy import db
import jwt              

def register_customer(payload: dict) -> str:
    new_customer = Customer.from_dict(payload)
    db.session.add(new_customer)
    db.session.commit()

    claims = {
        "customer_id": new_customer.id,
        "email": new_customer.email,
        "exp": int((datetime.now() + timedelta(days=7)).timestamp())
    }

    token = jwt.encode(claims, SECRET_KEY, algorithm="HS256")
    return {"token": token}

def login_customer(payload: dict) -> str:
    customer : Customer = Customer.query.filter_by(email=payload["email"]).first()
    
    if not customer:
        return {
            "error": "Customer not found"
        }
    
    if not checkpw(payload.get("password").encode('utf-8'), customer.bcrypt_password.encode('utf-8')):
        return {
            "error": "Incorrect password"
        }
    
    claims = {
        "customer_id": customer.id,
        "exp": int((datetime.now() + timedelta(days=7)).timestamp())
    }

    token = jwt.encode(claims, SECRET_KEY, algorithm="HS256")
    return {
        "token": token
    }