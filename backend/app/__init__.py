"""
TradeSense AI Platform - Flask Application Factory
Creates and configures the Flask application with all extensions and blueprints
"""

import logging
import os
from typing import Optional

from flask import Flask, jsonify
from flask_cors import CORS
from flask_migrate import Migrate

from app.core.config import config_by_name, get_config
from app.core.database import db, init_db


def create_app(config_name: Optional[str] = None) -> Flask:
    """
    Application factory pattern for creating Flask app instance

    Args:
        config_name: Configuration name (development, testing, production)

    Returns:
        Configured Flask application
    """
    # Create Flask app
    app = Flask(__name__)

    # Load configuration
    config = get_config(config_name)
    app.config.from_object(config)

    # Initialize configuration
    config.init_app(app)

    # Initialize extensions
    init_extensions(app)

    # Register blueprints
    register_blueprints(app)

    # Register error handlers
    register_error_handlers(app)

    # Setup logging
    setup_logging(app)

    # Register CLI commands
    register_cli_commands(app)

    app.logger.info(
        f"TradeSense AI Platform started in {config_name or 'default'} mode"
    )

    return app


def init_extensions(app: Flask) -> None:
    """
    Initialize Flask extensions

    Args:
        app: Flask application instance
    """
    # Database
    init_db(app)

    # Migrations
    migrate = Migrate()
    migrate.init_app(app, db)

    # CORS
    CORS(
        app,
        origins=app.config.get("CORS_ORIGINS", ["http://localhost:3000", "http://localhost:3001"]),
        supports_credentials=app.config.get("CORS_SUPPORTS_CREDENTIALS", True),
        allow_headers=["Content-Type", "Authorization"],
        methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    )

    # JWT Authentication
    from app.utils.jwt_utils import init_jwt
    init_jwt(app)

    # Cache (Redis)
    try:
        from app.core.cache import cache

        cache.init_app(app)
    except Exception as e:
        app.logger.warning(f"Cache initialization failed: {e}")

    # SocketIO (will be added in real-time milestone)
    # from flask_socketio import SocketIO
    # socketio = SocketIO(app)

    app.logger.info("Extensions initialized")


def register_blueprints(app: Flask) -> None:
    """
    Register Flask blueprints

    Args:
        app: Flask application instance
    """

    # Health check endpoint
    @app.route("/health", methods=["GET"])
    def health_check():
        """Health check endpoint"""
        from app.core.database import DatabaseHealthCheck

        db_healthy = DatabaseHealthCheck.check_connection()

        status = {
            "status": "healthy" if db_healthy else "unhealthy",
            "service": "tradesense-api",
            "version": app.config.get("VERSION", "1.0.0"),
            "database": "connected" if db_healthy else "disconnected",
        }

        # Check cache
        try:
            from app.core.cache import cache

            cache_health = cache.get_health()
            status["cache"] = cache_health.get("status", "unknown")
        except Exception:
            status["cache"] = "unavailable"

        return jsonify(status), 200 if db_healthy else 503

    # API v1 Blueprint
    from app.api.v1 import api_v1_bp

    app.register_blueprint(api_v1_bp, url_prefix="/api/v1")

    app.logger.info("Blueprints registered")


def register_error_handlers(app: Flask) -> None:
    """
    Register error handlers for common HTTP errors and custom exceptions

    Args:
        app: Flask application instance
    """

    @app.errorhandler(400)
    def bad_request(error):
        """Handle 400 Bad Request"""
        return jsonify(
            {
                "success": False,
                "error": "BadRequest",
                "message": "Bad request",
                "status_code": 400,
            }
        ), 400

    @app.errorhandler(401)
    def unauthorized(error):
        """Handle 401 Unauthorized"""
        return jsonify(
            {
                "success": False,
                "error": "Unauthorized",
                "message": "Authentication required",
                "status_code": 401,
            }
        ), 401

    @app.errorhandler(403)
    def forbidden(error):
        """Handle 403 Forbidden"""
        return jsonify(
            {
                "success": False,
                "error": "Forbidden",
                "message": "You don't have permission to access this resource",
                "status_code": 403,
            }
        ), 403

    @app.errorhandler(404)
    def not_found(error):
        """Handle 404 Not Found"""
        return jsonify(
            {
                "success": False,
                "error": "NotFound",
                "message": "Resource not found",
                "status_code": 404,
            }
        ), 404

    @app.errorhandler(405)
    def method_not_allowed(error):
        """Handle 405 Method Not Allowed"""
        return jsonify(
            {
                "success": False,
                "error": "MethodNotAllowed",
                "message": "Method not allowed",
                "status_code": 405,
            }
        ), 405

    @app.errorhandler(429)
    def rate_limit_exceeded(error):
        """Handle 429 Too Many Requests"""
        return jsonify(
            {
                "success": False,
                "error": "RateLimitExceeded",
                "message": "Rate limit exceeded. Please try again later.",
                "status_code": 429,
            }
        ), 429

    @app.errorhandler(500)
    def internal_server_error(error):
        """Handle 500 Internal Server Error"""
        app.logger.error(f"Internal server error: {error}")
        return jsonify(
            {
                "success": False,
                "error": "InternalServerError",
                "message": "An internal server error occurred",
                "status_code": 500,
            }
        ), 500

    @app.errorhandler(503)
    def service_unavailable(error):
        """Handle 503 Service Unavailable"""
        return jsonify(
            {
                "success": False,
                "error": "ServiceUnavailable",
                "message": "Service temporarily unavailable",
                "status_code": 503,
            }
        ), 503

    # Handle custom exceptions
    from app.core.exceptions import TradeSenseException

    @app.errorhandler(TradeSenseException)
    def handle_custom_exception(error):
        """Handle custom TradeSense exceptions"""
        response = error.to_dict()
        return jsonify(response), error.status_code

    app.logger.info("Error handlers registered")


def setup_logging(app: Flask) -> None:
    """
    Setup application logging

    Args:
        app: Flask application instance
    """
    log_level = app.config.get("LOG_LEVEL", "INFO")
    log_format = app.config.get(
        "LOG_FORMAT", "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    )

    # Configure root logger
    logging.basicConfig(level=getattr(logging, log_level), format=log_format)

    # Configure app logger
    app.logger.setLevel(getattr(logging, log_level))

    # Create logs directory if it doesn't exist
    log_file = app.config.get("LOG_FILE")
    if log_file:
        log_dir = os.path.dirname(log_file)
        if log_dir and not os.path.exists(log_dir):
            os.makedirs(log_dir, exist_ok=True)


def register_cli_commands(app: Flask) -> None:
    """
    Register custom CLI commands

    Args:
        app: Flask application instance
    """

    @app.cli.command("init-db")
    def init_db_command():
        """Initialize the database"""
        from app.core.database import db

        # Import all models so they are registered with SQLAlchemy
        from app.models import User

        db.create_all()
        app.logger.info("Database initialized")
        print("✅ Database initialized successfully")

    @app.cli.command("seed-db")
    def seed_db_command():
        """Seed the database with sample data"""
        from app.models import User, UserRole

        # Create admin user
        if not User.email_exists("admin@tradesense.ai"):
            admin = User(
                email="admin@tradesense.ai",
                username="admin",
                first_name="Admin",
                last_name="User",
                role=UserRole.SUPER_ADMIN,
                is_active=True,
                is_verified=True,
                email_verified=True,
            )
            admin.set_password("admin123")
            admin.save()
            print("✅ Admin user created: admin@tradesense.ai / admin123")

        # Create test user
        if not User.email_exists("user@tradesense.ai"):
            user = User(
                email="user@tradesense.ai",
                username="testuser",
                first_name="Test",
                last_name="User",
                role=UserRole.USER,
                is_active=True,
                is_verified=True,
                email_verified=True,
            )
            user.set_password("user123")
            user.save()
            print("✅ Test user created: user@tradesense.ai / user123")

        print("✅ Database seeded successfully")

    @app.cli.command("reset-db")
    def reset_db_command():
        """Reset the database (WARNING: deletes all data)"""
        from app.core.database import reset_database

        if app.config.get("ENV") == "production":
            print("❌ Cannot reset database in production!")
            return

        confirm = input("⚠️  This will delete all data. Continue? (yes/no): ")
        if confirm.lower() == "yes":
            reset_database(app)
            print("✅ Database reset successfully")
        else:
            print("❌ Database reset cancelled")


__all__ = ["create_app"]
