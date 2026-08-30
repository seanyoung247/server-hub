
from flask import Flask
from flask_cors import CORS

from .blueprints.health import health


def create_app():
    app = Flask(__name__)

    CORS(app, resources={
        r"/api/*": {
            "origins": "*"
        }
    })
    
    app.register_blueprint(health, url_prefix="/api")

    return app
