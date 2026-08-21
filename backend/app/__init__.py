
from flask import Flask

from .blueprints.health import health


def create_app():
    app = Flask(__name__)

    app.register_blueprint(health, url_prefix="/api")

    return app
