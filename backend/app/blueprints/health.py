
from flask import Blueprint, jsonify

health = Blueprint("health", __name__)


@health.get("/health")
def server_health():
    return jsonify({
        "status": "ok",
        "api_version": 1.0
    })
 