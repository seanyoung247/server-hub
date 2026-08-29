
from flask import Blueprint, jsonify

from .zfs import get_zfs_space

health = Blueprint("health", __name__)


@health.get("/health")
def server_health():
    return jsonify({
        "status": "ok",
        "storage": get_zfs_space(),
        "api_version": 1.0,
    })
