"""
TradeSense AI Platform - Authentication Endpoints
API endpoints for user authentication, registration, and password management
"""

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from marshmallow import ValidationError

from app.services.auth_service import AuthService
from app.api.v1.schemas.auth_schemas import (
    RegisterSchema,
    LoginSchema,
    RefreshTokenSchema,
    ForgotPasswordSchema,
    ResetPasswordSchema,
    ChangePasswordSchema,
    UserResponseSchema,
    AuthResponseSchema,
)
from app.utils.jwt_utils import get_current_user
from app.core.exceptions import (
    AuthenticationError,
    ConflictError,
    NotFoundError,
    ValidationError as AppValidationError,
)

# Create auth blueprint
auth_bp = Blueprint('auth', __name__)

# Initialize schemas
register_schema = RegisterSchema()
login_schema = LoginSchema()
refresh_schema = RefreshTokenSchema()
forgot_password_schema = ForgotPasswordSchema()
reset_password_schema = ResetPasswordSchema()
change_password_schema = ChangePasswordSchema()
user_response_schema = UserResponseSchema()
auth_response_schema = AuthResponseSchema()


@auth_bp.route('/register', methods=['POST'])
def register():
    """
    Register a new user

    Request Body:
        {
            "email": "user@example.com",
            "username": "username",
            "password": "password123",
            "first_name": "John",
            "last_name": "Doe"
        }

    Response:
        {
            "success": true,
            "message": "Registration successful",
            "data": {
                "user": {...},
                "access_token": "...",
                "refresh_token": "...",
                "token_type": "Bearer"
            }
        }
    """
    try:
        # Validate request data
        data = register_schema.load(request.get_json())

        # Register user
        user, access_token, refresh_token = AuthService.register_user(
            email=data['email'],
            username=data['username'],
            password=data['password'],
            first_name=data['first_name'],
            last_name=data['last_name'],
        )

        # Prepare response
        response_data = {
            'user': user.to_public_dict(),
            'access_token': access_token,
            'refresh_token': refresh_token,
            'token_type': 'Bearer'
        }

        return jsonify({
            'success': True,
            'message': 'Registration successful. Welcome to TradeSense!',
            'data': response_data
        }), 201

    except ValidationError as e:
        return jsonify({
            'success': False,
            'error': 'ValidationError',
            'message': 'Validation failed',
            'errors': e.messages
        }), 400

    except ConflictError as e:
        return jsonify({
            'success': False,
            'error': 'ConflictError',
            'message': str(e)
        }), 409

    except AppValidationError as e:
        return jsonify({
            'success': False,
            'error': 'ValidationError',
            'message': str(e),
            'errors': e.payload.get('errors', {})
        }), 400

    except Exception as e:
        return jsonify({
            'success': False,
            'error': 'ServerError',
            'message': 'An error occurred during registration'
        }), 500


@auth_bp.route('/login', methods=['POST'])
def login():
    """
    Login user and return JWT tokens

    Request Body:
        {
            "email": "user@example.com",
            "password": "password123"
        }

    Response:
        {
            "success": true,
            "message": "Login successful",
            "data": {
                "user": {...},
                "access_token": "...",
                "refresh_token": "...",
                "token_type": "Bearer"
            }
        }
    """
    try:
        # Validate request data
        data = login_schema.load(request.get_json())

        # Authenticate user
        user, access_token, refresh_token = AuthService.login_user(
            email=data['email'],
            password=data['password']
        )

        # Prepare response
        response_data = {
            'user': user.to_public_dict(),
            'access_token': access_token,
            'refresh_token': refresh_token,
            'token_type': 'Bearer'
        }

        return jsonify({
            'success': True,
            'message': 'Login successful',
            'data': response_data
        }), 200

    except ValidationError as e:
        return jsonify({
            'success': False,
            'error': 'ValidationError',
            'message': 'Validation failed',
            'errors': e.messages
        }), 400

    except AuthenticationError as e:
        return jsonify({
            'success': False,
            'error': 'AuthenticationError',
            'message': str(e)
        }), 401

    except Exception as e:
        return jsonify({
            'success': False,
            'error': 'ServerError',
            'message': 'An error occurred during login'
        }), 500


@auth_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    """
    Logout user (client should discard tokens)

    Response:
        {
            "success": true,
            "message": "Logout successful"
        }
    """
    # In a more advanced implementation, you would:
    # 1. Add token to blacklist/revocation list
    # 2. Store in Redis with TTL matching token expiry

    return jsonify({
        'success': True,
        'message': 'Logout successful'
    }), 200


@auth_bp.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    """
    Refresh access token using refresh token

    Headers:
        Authorization: Bearer <refresh_token>

    Response:
        {
            "success": true,
            "message": "Token refreshed successfully",
            "data": {
                "access_token": "...",
                "refresh_token": "...",
                "token_type": "Bearer"
            }
        }
    """
    try:
        # Get user ID from refresh token
        user_id = get_jwt_identity()

        # Generate new tokens
        access_token, refresh_token = AuthService.refresh_access_token(
            refresh_token=None,  # We already validated it
            user_id=user_id
        )

        return jsonify({
            'success': True,
            'message': 'Token refreshed successfully',
            'data': {
                'access_token': access_token,
                'refresh_token': refresh_token,
                'token_type': 'Bearer'
            }
        }), 200

    except AuthenticationError as e:
        return jsonify({
            'success': False,
            'error': 'AuthenticationError',
            'message': str(e)
        }), 401

    except Exception as e:
        return jsonify({
            'success': False,
            'error': 'ServerError',
            'message': 'An error occurred during token refresh'
        }), 500


@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_current_user_info():
    """
    Get current authenticated user information

    Headers:
        Authorization: Bearer <access_token>

    Response:
        {
            "success": true,
            "data": {
                "user": {...}
            }
        }
    """
    try:
        user = get_current_user()

        return jsonify({
            'success': True,
            'data': {
                'user': user.to_public_dict()
            }
        }), 200

    except AuthenticationError as e:
        return jsonify({
            'success': False,
            'error': 'AuthenticationError',
            'message': str(e)
        }), 401


@auth_bp.route('/forgot-password', methods=['POST'])
def forgot_password():
    """
    Request password reset email

    Request Body:
        {
            "email": "user@example.com"
        }

    Response:
        {
            "success": true,
            "message": "If this email exists, a password reset link will be sent"
        }
    """
    try:
        data = forgot_password_schema.load(request.get_json())

        # Request password reset
        AuthService.request_password_reset(data['email'])

        # Always return success to prevent email enumeration
        return jsonify({
            'success': True,
            'message': 'If this email exists, a password reset link will be sent'
        }), 200

    except ValidationError as e:
        return jsonify({
            'success': False,
            'error': 'ValidationError',
            'message': 'Validation failed',
            'errors': e.messages
        }), 400


@auth_bp.route('/reset-password', methods=['POST'])
def reset_password():
    """
    Reset password using token

    Request Body:
        {
            "token": "reset_token",
            "password": "new_password"
        }

    Response:
        {
            "success": true,
            "message": "Password reset successful"
        }
    """
    try:
        data = reset_password_schema.load(request.get_json())

        # Reset password
        AuthService.reset_password(
            token=data['token'],
            new_password=data['password']
        )

        return jsonify({
            'success': True,
            'message': 'Password reset successful. You can now login with your new password.'
        }), 200

    except ValidationError as e:
        return jsonify({
            'success': False,
            'error': 'ValidationError',
            'message': 'Validation failed',
            'errors': e.messages
        }), 400

    except AppValidationError as e:
        return jsonify({
            'success': False,
            'error': 'ValidationError',
            'message': str(e)
        }), 400


@auth_bp.route('/change-password', methods=['POST'])
@jwt_required()
def change_password():
    """
    Change user password (requires authentication)

    Headers:
        Authorization: Bearer <access_token>

    Request Body:
        {
            "current_password": "old_password",
            "new_password": "new_password"
        }

    Response:
        {
            "success": true,
            "message": "Password changed successfully"
        }
    """
    try:
        user = get_current_user()
        data = change_password_schema.load(request.get_json())

        # Change password
        AuthService.change_password(
            user=user,
            current_password=data['current_password'],
            new_password=data['new_password']
        )

        return jsonify({
            'success': True,
            'message': 'Password changed successfully'
        }), 200

    except ValidationError as e:
        return jsonify({
            'success': False,
            'error': 'ValidationError',
            'message': 'Validation failed',
            'errors': e.messages
        }), 400

    except AuthenticationError as e:
        return jsonify({
            'success': False,
            'error': 'AuthenticationError',
            'message': str(e)
        }), 401

    except AppValidationError as e:
        return jsonify({
            'success': False,
            'error': 'ValidationError',
            'message': str(e)
        }), 400


__all__ = ['auth_bp']
