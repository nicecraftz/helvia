from functools import wraps
from flask import request, jsonify

def require_auth(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        auth_header = request.headers.get("Authorization", "")
        parts = auth_header.split()

        if len(parts) != 2 or parts[0].lower() != "bearer":
            print("Invalid authorization header format")
            return {"error": "No or invalid authorization header"}, 403

        token = parts[1]
        if not token:
            print("No token found in authorization header")
            return {"error": "No authorization provided"}, 403

        return f(*args, **kwargs)

    return wrapper