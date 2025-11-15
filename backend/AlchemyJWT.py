import os
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()
SECRET_KEY = os.getenv("JWT_SECRET_KEY", "default_secret_key")