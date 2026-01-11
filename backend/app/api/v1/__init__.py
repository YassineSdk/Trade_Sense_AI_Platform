"""
TradeSense AI Platform - API v1 Blueprint
Main API blueprint for version 1 of the REST API
"""

from datetime import datetime

from flask import Blueprint, jsonify, request

# Create API v1 Blueprint
api_v1_bp = Blueprint("api_v1", __name__)


@api_v1_bp.route("/", methods=["GET"])
def api_root():
    """
    API v1 root endpoint - provides API information
    """
    return jsonify(
        {
            "success": True,
            "message": "Welcome to TradeSense AI Platform API v1",
            "version": "1.0.0",
            "timestamp": datetime.utcnow().isoformat(),
            "endpoints": {
                "health": "/health",
                "auth": "/api/v1/auth",
                "users": "/api/v1/users",
                "challenges": "/api/v1/challenges",
                "trades": "/api/v1/trades",
                "market-data": "/api/v1/market-data",
                "leaderboard": "/api/v1/leaderboard",
            },
            "documentation": "https://docs.tradesense.ai",
        }
    ), 200


@api_v1_bp.route("/ping", methods=["GET"])
def ping():
    """
    Simple ping endpoint to test API availability
    """
    return jsonify(
        {
            "success": True,
            "message": "pong",
            "timestamp": datetime.utcnow().isoformat(),
        }
    ), 200


@api_v1_bp.route("/info", methods=["GET"])
def api_info():
    """
    Get detailed API information
    """
    return jsonify(
        {
            "success": True,
            "api": {
                "name": "TradeSense AI Platform API",
                "version": "1.0.0",
                "description": "RESTful API for prop trading platform with AI-powered insights",
                "features": [
                    "User Authentication & Authorization",
                    "Trading Challenge Management",
                    "Real-time Market Data",
                    "Trade Execution & Management",
                    "AI Trading Signals",
                    "Performance Analytics",
                    "Global Leaderboard",
                    "Payment Processing",
                ],
            },
            "status": "operational",
            "environment": request.environ.get("FLASK_ENV", "production"),
        }
    ), 200


# Import and register auth blueprint
from app.api.v1.endpoints.auth import auth_bp

api_v1_bp.register_blueprint(auth_bp, url_prefix="/auth")

# Future blueprints will be registered here:
# from app.api.v1.endpoints.users import users_bp
# from app.api.v1.endpoints.challenges import challenges_bp
# from app.api.v1.endpoints.trades import trades_bp

# api_v1_bp.register_blueprint(users_bp, url_prefix="/users")
# api_v1_bp.register_blueprint(challenges_bp, url_prefix="/challenges")
# api_v1_bp.register_blueprint(trades_bp, url_prefix="/trades")


__all__ = ["api_v1_bp"]
