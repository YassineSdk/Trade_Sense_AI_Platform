"""
TradeSense AI Platform - Core Configuration
Handles environment-specific configuration for development, staging, and production
"""

import os
from datetime import timedelta
from typing import Optional

from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


class Config:
    """Base configuration class with common settings"""

    # Application
    APP_NAME = "TradeSense AI Platform"
    VERSION = "1.0.0"
    API_VERSION = "v1"

    # Flask
    SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret-key-change-in-production")
    DEBUG = False
    TESTING = False

    # Database
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = False
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "sqlite:///tradesense.db")

    # Redis
    REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")

    # Celery
    CELERY_BROKER_URL = os.getenv("CELERY_BROKER_URL", "redis://localhost:6379/1")
    CELERY_RESULT_BACKEND = os.getenv(
        "CELERY_RESULT_BACKEND", "redis://localhost:6379/2"
    )

    # JWT Configuration
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", SECRET_KEY)
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=30)
    JWT_TOKEN_LOCATION = ["headers", "cookies"]
    JWT_COOKIE_SECURE = False  # Set to True in production with HTTPS
    JWT_COOKIE_CSRF_PROTECT = True
    JWT_COOKIE_SAMESITE = "Lax"

    # CORS
    CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")
    CORS_SUPPORTS_CREDENTIALS = True

    # Rate Limiting
    RATELIMIT_ENABLED = True
    RATELIMIT_STORAGE_URL = os.getenv("REDIS_URL", "redis://localhost:6379/3")
    RATELIMIT_DEFAULT = "100 per hour"
    RATELIMIT_HEADERS_ENABLED = True

    # Logging
    LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")
    LOG_FORMAT = "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    LOG_FILE = os.getenv("LOG_FILE", "logs/tradesense.log")

    # Pagination
    DEFAULT_PAGE_SIZE = 20
    MAX_PAGE_SIZE = 100

    # File Upload
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max file size
    UPLOAD_FOLDER = os.getenv("UPLOAD_FOLDER", "uploads/")
    ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "pdf"}

    # WebSocket
    SOCKETIO_MESSAGE_QUEUE = os.getenv("REDIS_URL", "redis://localhost:6379/4")
    SOCKETIO_CORS_ALLOWED_ORIGINS = CORS_ORIGINS

    # Trading Configuration
    SUPPORTED_BROKERS = ["alpaca", "interactive_brokers", "paper_trading"]
    DEFAULT_BROKER = "paper_trading"
    MARKET_DATA_REFRESH_INTERVAL = 5  # seconds

    # Challenge Configuration
    CHALLENGE_TYPES = ["50k", "100k", "200k"]
    CHALLENGE_PHASES = ["phase1", "phase2", "funded"]

    # Email Configuration (for future use)
    MAIL_SERVER = os.getenv("MAIL_SERVER", "smtp.gmail.com")
    MAIL_PORT = int(os.getenv("MAIL_PORT", 587))
    MAIL_USE_TLS = os.getenv("MAIL_USE_TLS", "True").lower() == "true"
    MAIL_USERNAME = os.getenv("MAIL_USERNAME")
    MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")
    MAIL_DEFAULT_SENDER = os.getenv("MAIL_DEFAULT_SENDER", "noreply@tradesense.ai")

    # Admin
    ADMIN_EMAIL = os.getenv("ADMIN_EMAIL", "admin@tradesense.ai")

    # Security
    BCRYPT_LOG_ROUNDS = 12
    PASSWORD_MIN_LENGTH = 8

    # Session
    SESSION_TYPE = "redis"
    SESSION_REDIS = None  # Will be set after Redis initialization
    PERMANENT_SESSION_LIFETIME = timedelta(days=7)

    @staticmethod
    def init_app(app):
        """Initialize application-specific configuration"""
        pass


class DevelopmentConfig(Config):
    """Development environment configuration"""

    DEBUG = True
    SQLALCHEMY_ECHO = True
    LOG_LEVEL = "DEBUG"

    # Use SQLite for development
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "sqlite:///tradesense_dev.db")

    # Disable CSRF for easier development
    JWT_COOKIE_CSRF_PROTECT = False

    # More verbose logging
    SQLALCHEMY_RECORD_QUERIES = True
    SQLALCHEMY_QUERY_LOG_LEVEL = "DEBUG"

    @staticmethod
    def init_app(app):
        Config.init_app(app)

        # Development-specific initialization
        import logging

        logging.basicConfig(level=logging.DEBUG, format=Config.LOG_FORMAT)


class TestingConfig(Config):
    """Testing environment configuration"""

    TESTING = True
    DEBUG = True

    # Use in-memory SQLite for testing
    SQLALCHEMY_DATABASE_URI = "sqlite:///:memory:"

    # Disable CSRF for testing
    JWT_COOKIE_CSRF_PROTECT = False
    WTF_CSRF_ENABLED = False

    # Disable rate limiting for tests
    RATELIMIT_ENABLED = False

    # Faster password hashing for tests
    BCRYPT_LOG_ROUNDS = 4

    # Use simple cache for tests
    CACHE_TYPE = "simple"

    @staticmethod
    def init_app(app):
        Config.init_app(app)


class StagingConfig(Config):
    """Staging environment configuration"""

    DEBUG = False
    TESTING = False

    # Require production-grade secret keys
    SECRET_KEY = os.getenv("SECRET_KEY")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")

    # Enable secure cookies
    JWT_COOKIE_SECURE = True
    SESSION_COOKIE_SECURE = True
    SESSION_COOKIE_HTTPONLY = True

    # PostgreSQL for staging
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL",
        "postgresql://tradesense:password@localhost:5432/tradesense_staging",
    )

    @staticmethod
    def init_app(app):
        Config.init_app(app)

        # Set up file logging for staging
        import logging
        from logging.handlers import RotatingFileHandler

        os.makedirs("logs", exist_ok=True)
        file_handler = RotatingFileHandler(
            Config.LOG_FILE,
            maxBytes=10 * 1024 * 1024,  # 10MB
            backupCount=10,
        )
        file_handler.setLevel(logging.INFO)
        file_handler.setFormatter(logging.Formatter(Config.LOG_FORMAT))
        app.logger.addHandler(file_handler)


class ProductionConfig(Config):
    """Production environment configuration"""

    DEBUG = False
    TESTING = False

    # Require production-grade secret keys
    SECRET_KEY = os.getenv("SECRET_KEY")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")

    if not SECRET_KEY:
        raise ValueError("SECRET_KEY environment variable must be set in production")

    # Enable secure cookies
    JWT_COOKIE_SECURE = True
    SESSION_COOKIE_SECURE = True
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = "Strict"

    # PostgreSQL for production
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")
    if not SQLALCHEMY_DATABASE_URI:
        raise ValueError("DATABASE_URL must be set in production")

    # Stricter rate limiting
    RATELIMIT_DEFAULT = "50 per hour"

    @staticmethod
    def init_app(app):
        Config.init_app(app)

        # Set up production logging
        import logging
        from logging.handlers import RotatingFileHandler, SysLogHandler

        # File handler
        os.makedirs("logs", exist_ok=True)
        file_handler = RotatingFileHandler(
            Config.LOG_FILE,
            maxBytes=10 * 1024 * 1024,  # 10MB
            backupCount=20,
        )
        file_handler.setLevel(logging.INFO)
        file_handler.setFormatter(logging.Formatter(Config.LOG_FORMAT))

        # Error file handler
        error_handler = RotatingFileHandler(
            "logs/tradesense_errors.log", maxBytes=10 * 1024 * 1024, backupCount=10
        )
        error_handler.setLevel(logging.ERROR)
        error_handler.setFormatter(logging.Formatter(Config.LOG_FORMAT))

        app.logger.addHandler(file_handler)
        app.logger.addHandler(error_handler)
        app.logger.setLevel(logging.INFO)


# Configuration dictionary
config_by_name = {
    "development": DevelopmentConfig,
    "testing": TestingConfig,
    "staging": StagingConfig,
    "production": ProductionConfig,
    "default": DevelopmentConfig,
}


def get_config(config_name: Optional[str] = None) -> Config:
    """
    Get configuration object based on environment name

    Args:
        config_name: Name of the configuration (development, testing, staging, production)
                    If None, uses FLASK_ENV environment variable

    Returns:
        Configuration object
    """
    if config_name is None:
        config_name = os.getenv("FLASK_ENV", "development")

    return config_by_name.get(config_name, DevelopmentConfig)
