"""
TradeSense AI Platform - WSGI Entry Point
Production-ready WSGI entry point for the Flask application
"""

import os

from app import create_app

# Get configuration from environment
config_name = os.getenv("FLASK_ENV", "production")

# Create Flask application instance
app = create_app(config_name)

if __name__ == "__main__":
    # Development server (not for production!)
    port = int(os.getenv("PORT", 5000))
    debug = config_name == "development"

    app.run(host="0.0.0.0", port=port, debug=debug, use_reloader=debug)
