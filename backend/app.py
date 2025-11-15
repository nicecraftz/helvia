from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os

SECRET_KEY = os.getenv("JWT_SECRET_KEY", "default_secret_key")
db = SQLAlchemy()

def create_app() -> Flask:
    app = Flask(__name__)

    DB_USER = os.getenv("DB_USER", "root")
    DB_PASSWORD = os.getenv("DB_PASSWORD", "your_root_password")
    DB_ADDRESS = os.getenv("DB_ADDRESS", "localhost")
    DB_PORT = os.getenv("DB_PORT", "3306")

    app.config["SQLALCHEMY_TRACK_MODIFICeATIONS"] = False
    app.config[
        "SQLALCHEMY_DATABASE_URI"
    ] = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_ADDRESS}:{DB_PORT}/Helvia"

    db.init_app(app)
    
    from routes.auth_routes import user_bp
    app.register_blueprint(user_bp)

    from routes.event_routes import event_bp
    app.register_blueprint(event_bp)

    return app

app = create_app()
