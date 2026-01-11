"""
TradeSense AI Platform - Authentication Schemas
Request/response validation schemas for authentication endpoints
"""

from marshmallow import Schema, fields, validate, validates, ValidationError


class RegisterSchema(Schema):
    """Schema for user registration request"""

    email = fields.Email(required=True, error_messages={
        'required': 'Email is required',
        'invalid': 'Invalid email format'
    })

    username = fields.Str(
        required=True,
        validate=validate.Length(min=3, max=80),
        error_messages={'required': 'Username is required'}
    )

    password = fields.Str(
        required=True,
        validate=validate.Length(min=8, max=128),
        error_messages={'required': 'Password is required'}
    )

    first_name = fields.Str(
        required=True,
        validate=validate.Length(min=1, max=100),
        error_messages={'required': 'First name is required'}
    )

    last_name = fields.Str(
        required=True,
        validate=validate.Length(min=1, max=100),
        error_messages={'required': 'Last name is required'}
    )


class LoginSchema(Schema):
    """Schema for user login request"""

    email = fields.Email(required=True, error_messages={
        'required': 'Email is required',
        'invalid': 'Invalid email format'
    })

    password = fields.Str(required=True, error_messages={
        'required': 'Password is required'
    })


class RefreshTokenSchema(Schema):
    """Schema for token refresh request"""

    refresh_token = fields.Str(required=True, error_messages={
        'required': 'Refresh token is required'
    })


class ForgotPasswordSchema(Schema):
    """Schema for forgot password request"""

    email = fields.Email(required=True, error_messages={
        'required': 'Email is required',
        'invalid': 'Invalid email format'
    })


class ResetPasswordSchema(Schema):
    """Schema for reset password request"""

    token = fields.Str(required=True, error_messages={
        'required': 'Reset token is required'
    })

    password = fields.Str(
        required=True,
        validate=validate.Length(min=8, max=128),
        error_messages={'required': 'Password is required'}
    )


class ChangePasswordSchema(Schema):
    """Schema for change password request"""

    current_password = fields.Str(required=True, error_messages={
        'required': 'Current password is required'
    })

    new_password = fields.Str(
        required=True,
        validate=validate.Length(min=8, max=128),
        error_messages={'required': 'New password is required'}
    )


class VerifyEmailSchema(Schema):
    """Schema for email verification request"""

    token = fields.Str(required=True, error_messages={
        'required': 'Verification token is required'
    })


class ResendVerificationSchema(Schema):
    """Schema for resend verification email request"""

    email = fields.Email(required=True, error_messages={
        'required': 'Email is required',
        'invalid': 'Invalid email format'
    })


# Response schemas

class UserResponseSchema(Schema):
    """Schema for user response"""

    id = fields.Str()
    email = fields.Email()
    username = fields.Str()
    first_name = fields.Str()
    last_name = fields.Str()
    role = fields.Str()
    is_active = fields.Bool()
    is_verified = fields.Bool()
    created_at = fields.DateTime()
    last_login = fields.Str(allow_none=True)


class AuthResponseSchema(Schema):
    """Schema for authentication response"""

    user = fields.Nested(UserResponseSchema)
    access_token = fields.Str()
    refresh_token = fields.Str()
    token_type = fields.Str(dump_default='Bearer')


__all__ = [
    'RegisterSchema',
    'LoginSchema',
    'RefreshTokenSchema',
    'ForgotPasswordSchema',
    'ResetPasswordSchema',
    'ChangePasswordSchema',
    'VerifyEmailSchema',
    'ResendVerificationSchema',
    'UserResponseSchema',
    'AuthResponseSchema',
]
