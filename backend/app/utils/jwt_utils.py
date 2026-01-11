"""
TradeSense AI Platform - JWT Utilities
Handles JWT token generation, validation, and refresh
"""

from datetime import datetime, timedelta
from typing import Dict, Optional, Tuple
from functools import wraps

from flask import current_app, request, jsonify
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    create_refresh_token,
    get_jwt_identity,
    get_jwt,
    verify_jwt_in_request,
)

from app.core.exceptions import AuthenticationError, AuthorizationError
from app.models.user import User

# Initialize JWT Manager (will be initialized in app factory)
jwt_manager = JWTManager()


def init_jwt(app):
    """Initialize JWT manager with Flask app"""
    jwt_manager.init_app(app)

    # Register JWT callbacks
    register_jwt_callbacks(app)


def register_jwt_callbacks(app):
    """Register JWT event handlers"""

    @jwt_manager.user_identity_loader
    def user_identity_lookup(user):
        """Convert user object to identity for JWT"""
        if isinstance(user, dict):
            return user.get('id')
        return user.id if hasattr(user, 'id') else user

    @jwt_manager.user_lookup_loader
    def user_lookup_callback(_jwt_header, jwt_data):
        """Load user from JWT identity"""
        identity = jwt_data["sub"]
        return User.find_by_id(identity)

    @jwt_manager.expired_token_loader
    def expired_token_callback(jwt_header, jwt_payload):
        """Handle expired token"""
        return jsonify({
            'success': False,
            'error': 'TokenExpired',
            'message': 'The token has expired',
            'status_code': 401
        }), 401

    @jwt_manager.invalid_token_loader
    def invalid_token_callback(error):
        """Handle invalid token"""
        return jsonify({
            'success': False,
            'error': 'InvalidToken',
            'message': 'Invalid token',
            'status_code': 401
        }), 401

    @jwt_manager.unauthorized_loader
    def unauthorized_callback(error):
        """Handle missing token"""
        return jsonify({
            'success': False,
            'error': 'Unauthorized',
            'message': 'Missing authorization token',
            'status_code': 401
        }), 401

    @jwt_manager.revoked_token_loader
    def revoked_token_callback(jwt_header, jwt_payload):
        """Handle revoked token"""
        return jsonify({
            'success': False,
            'error': 'TokenRevoked',
            'message': 'The token has been revoked',
            'status_code': 401
        }), 401


def generate_tokens(user: User) -> Tuple[str, str]:
    """
    Generate access and refresh tokens for user

    Args:
        user: User model instance

    Returns:
        Tuple of (access_token, refresh_token)
    """
    # Additional claims for the JWT
    additional_claims = {
        "email": user.email,
        "username": user.username,
        "role": user.role,
        "is_verified": user.is_verified,
    }

    # Create tokens
    access_token = create_access_token(
        identity=user.id,
        additional_claims=additional_claims
    )

    refresh_token = create_refresh_token(
        identity=user.id
    )

    return access_token, refresh_token


def get_current_user() -> User:
    """
    Get current authenticated user from JWT

    Returns:
        User model instance

    Raises:
        AuthenticationError: If user not found or not authenticated
    """
    try:
        verify_jwt_in_request()
        user_id = get_jwt_identity()

        if not user_id:
            raise AuthenticationError("Invalid token: no user identity")

        user = User.find_by_id(user_id)

        if not user:
            raise AuthenticationError("User not found")

        if not user.is_active:
            raise AuthenticationError("User account is deactivated")

        return user

    except Exception as e:
        raise AuthenticationError(str(e))


def require_auth(f):
    """
    Decorator to require authentication for endpoint

    Usage:
        @require_auth
        def protected_endpoint():
            user = get_current_user()
            return {'user_id': user.id}
    """
    @wraps(f)
    def decorated_function(*args, **kwargs):
        try:
            verify_jwt_in_request()
            return f(*args, **kwargs)
        except Exception as e:
            return jsonify({
                'success': False,
                'error': 'Unauthorized',
                'message': str(e),
                'status_code': 401
            }), 401

    return decorated_function


def require_role(*roles):
    """
    Decorator to require specific role(s) for endpoint

    Usage:
        @require_role('admin', 'super_admin')
        def admin_only_endpoint():
            return {'message': 'Admin access'}
    """
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            try:
                verify_jwt_in_request()
                user = get_current_user()

                if user.role not in roles:
                    raise AuthorizationError(
                        f"This endpoint requires one of these roles: {', '.join(roles)}"
                    )

                return f(*args, **kwargs)

            except AuthorizationError as e:
                return jsonify({
                    'success': False,
                    'error': 'Forbidden',
                    'message': str(e),
                    'status_code': 403
                }), 403
            except Exception as e:
                return jsonify({
                    'success': False,
                    'error': 'Unauthorized',
                    'message': str(e),
                    'status_code': 401
                }), 401

        return decorated_function
    return decorator


def require_verified(f):
    """
    Decorator to require verified email for endpoint

    Usage:
        @require_verified
        def verified_only_endpoint():
            return {'message': 'Email verified'}
    """
    @wraps(f)
    def decorated_function(*args, **kwargs):
        try:
            verify_jwt_in_request()
            user = get_current_user()

            if not user.is_verified:
                raise AuthorizationError("Email verification required")

            return f(*args, **kwargs)

        except AuthorizationError as e:
            return jsonify({
                'success': False,
                'error': 'EmailNotVerified',
                'message': str(e),
                'status_code': 403
            }), 403
        except Exception as e:
            return jsonify({
                'success': False,
                'error': 'Unauthorized',
                'message': str(e),
                'status_code': 401
            }), 401

    return decorated_function


__all__ = [
    'jwt_manager',
    'init_jwt',
    'generate_tokens',
    'get_current_user',
    'require_auth',
    'require_role',
    'require_verified',
]
