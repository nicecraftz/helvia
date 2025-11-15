from flask import Flask
from Alchemy import db        
import os
from flask_cors import CORS

SECRET_KEY = os.getenv("JWT_SECRET_KEY", "default_secret_key")

def create_app() -> Flask:
    app = Flask(__name__)

    CORS(app, resources={r"/api/*": {"origins": "*"}})

    DB_USER = os.getenv("DB_USER", "root")
    DB_PASSWORD = os.getenv("DB_PASSWORD", "your_root_password")
    DB_ADDRESS = os.getenv("DB_ADDRESS", "localhost")
    DB_PORT = os.getenv("DB_PORT", "3306")

    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config[
        "SQLALCHEMY_DATABASE_URI"
    ] = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_ADDRESS}:{DB_PORT}/Helvia"

    db.init_app(app)
    
    from routes.auth_routes import auth_bp
    app.register_blueprint(auth_bp)

    from routes.event_routes import event_bp
    app.register_blueprint(event_bp)

    from routes.llm_routes import llm_bp
    app.register_blueprint(llm_bp)

    from routes.alg_routes import alg_bp
    app.register_blueprint(alg_bp)

    from routes.user_routes import user_bp
    app.register_blueprint(user_bp)
    
    from routes.customer_routes import customer_bp
    app.register_blueprint(customer_bp)

    return app

app = create_app()
