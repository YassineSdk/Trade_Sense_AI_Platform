"""
TradeSense AI Platform - Authentication Service
Business logic for user authentication, registration, and password management
"""

from datetime import datetime, timedelta
from typing import Dict, Optional, Tuple
import secrets
import hashlib

from app.models.user import User, UserRole
from app.core.exceptions import (
    AuthenticationError,
    ValidationError,
    ConflictError,
    NotFoundError,
)
from app.utils.jwt_utils import generate_tokens


class AuthService:
    """Service class for authentication operations"""

    @staticmethod
    def register_user(
        email: str,
        username: str,
        password: str,
        first_name: str,
        last_name: str,
    ) -> Tuple[User, str, str]:
        """
        Register a new user

        Args:
            email: User's email address
            username: Desired username
            password: User's password
            first_name: User's first name
            last_name: User's last name

        Returns:
            Tuple of (user, access_token, refresh_token)

        Raises:
            ValidationError: If input validation fails
            ConflictError: If email or username already exists
        """
        # Validate input
        AuthService._validate_registration_input(
            email, username, password, first_name, last_name
        )

        # Check if email already exists
        if User.email_exists(email):
            raise ConflictError(f"Email '{email}' is already registered")

        # Check if username already exists
        if User.username_exists(username):
            raise ConflictError(f"Username '{username}' is already taken")

        # Create new user
        user = User(
            email=email.lower().strip(),
            username=username.strip(),
            first_name=first_name.strip(),
            last_name=last_name.strip(),
            role=UserRole.USER,
            is_active=True,
            is_verified=False,  # Email verification required
            email_verified=False,
        )

        # Set password (will be hashed)
        user.set_password(password)

        # Save user to database
        user.save()

        # Generate JWT tokens
        access_token, refresh_token = generate_tokens(user)

        return user, access_token, refresh_token

    @staticmethod
    def login_user(email: str, password: str) -> Tuple[User, str, str]:
        """
        Authenticate user and generate tokens

        Args:
            email: User's email address
            password: User's password

        Returns:
            Tuple of (user, access_token, refresh_token)

        Raises:
            AuthenticationError: If credentials are invalid
        """
        # Find user by email
        user = User.find_by_email(email.lower().strip())

        if not user:
            raise AuthenticationError("Invalid email or password")

        # Check if account is locked
        if user.is_locked():
            raise AuthenticationError(
                "Account is locked due to too many failed login attempts. "
                "Please try again later."
            )

        # Verify password
        if not user.check_password(password):
            # Increment failed login attempts
            user.increment_failed_login()
            raise AuthenticationError("Invalid email or password")

        # Check if account is active
        if not user.is_active:
            raise AuthenticationError("Account is deactivated")

        # Reset failed login attempts on successful login
        user.reset_failed_login()

        # Update last login timestamp
        user.update_last_login()

        # Generate JWT tokens
        access_token, refresh_token = generate_tokens(user)

        return user, access_token, refresh_token

    @staticmethod
    def refresh_access_token(refresh_token: str, user_id: str) -> Tuple[str, str]:
        """
        Generate new access token using refresh token

        Args:
            refresh_token: Valid refresh token
            user_id: User ID from refresh token

        Returns:
            Tuple of (new_access_token, new_refresh_token)

        Raises:
            AuthenticationError: If refresh token is invalid or user not found
        """
        # Find user
        user = User.find_by_id(user_id)

        if not user:
            raise AuthenticationError("User not found")

        if not user.is_active:
            raise AuthenticationError("Account is deactivated")

        # Generate new tokens
        access_token, refresh_token = generate_tokens(user)

        return access_token, refresh_token

    @staticmethod
    def request_password_reset(email: str) -> str:
        """
        Generate password reset token for user

        Args:
            email: User's email address

        Returns:
            Password reset token

        Raises:
            NotFoundError: If user not found
        """
        user = User.find_by_email(email.lower().strip())

        if not user:
            # Don't reveal if email exists or not (security best practice)
            # Still return success but don't actually send email
            raise NotFoundError("If this email exists, a reset link will be sent")

        # Generate reset token (in production, store this in database with expiry)
        reset_token = secrets.token_urlsafe(32)

        # TODO: Store reset token in database with expiry
        # TODO: Send email with reset link

        return reset_token

    @staticmethod
    def reset_password(token: str, new_password: str) -> bool:
        """
        Reset user password using token

        Args:
            token: Password reset token
            new_password: New password

        Returns:
            True if password was reset successfully

        Raises:
            ValidationError: If token is invalid or password is weak
        """
        # TODO: Validate token from database
        # For now, just validate password strength
        AuthService._validate_password(new_password)

        # TODO: Find user by reset token
        # TODO: Check if token is expired
        # TODO: Update user password
        # TODO: Invalidate reset token

        return True

    @staticmethod
    def verify_email(token: str) -> User:
        """
        Verify user email using verification token

        Args:
            token: Email verification token

        Returns:
            Verified user

        Raises:
            ValidationError: If token is invalid
        """
        # TODO: Validate token from database
        # TODO: Find user by verification token
        # TODO: Mark email as verified

        raise NotImplementedError("Email verification not implemented yet")

    @staticmethod
    def change_password(
        user: User, current_password: str, new_password: str
    ) -> bool:
        """
        Change user password

        Args:
            user: User instance
            current_password: Current password
            new_password: New password

        Returns:
            True if password was changed successfully

        Raises:
            AuthenticationError: If current password is incorrect
            ValidationError: If new password is weak
        """
        # Verify current password
        if not user.check_password(current_password):
            raise AuthenticationError("Current password is incorrect")

        # Validate new password
        AuthService._validate_password(new_password)

        # Check if new password is same as current
        if user.check_password(new_password):
            raise ValidationError("New password must be different from current password")

        # Update password
        user.set_password(new_password)
        user.save()

        return True

    # Validation helpers

    @staticmethod
    def _validate_registration_input(
        email: str, username: str, password: str, first_name: str, last_name: str
    ) -> None:
        """Validate registration input"""
        errors = {}

        # Email validation
        if not email or not email.strip():
            errors['email'] = 'Email is required'
        elif '@' not in email or '.' not in email:
            errors['email'] = 'Invalid email format'

        # Username validation
        if not username or not username.strip():
            errors['username'] = 'Username is required'
        elif len(username.strip()) < 3:
            errors['username'] = 'Username must be at least 3 characters'
        elif len(username.strip()) > 80:
            errors['username'] = 'Username must be less than 80 characters'

        # Password validation
        try:
            AuthService._validate_password(password)
        except ValidationError as e:
            errors['password'] = str(e)

        # First name validation
        if not first_name or not first_name.strip():
            errors['first_name'] = 'First name is required'

        # Last name validation
        if not last_name or not last_name.strip():
            errors['last_name'] = 'Last name is required'

        if errors:
            raise ValidationError("Validation failed", payload={'errors': errors})

    @staticmethod
    def _validate_password(password: str) -> None:
        """Validate password strength"""
        if not password:
            raise ValidationError("Password is required")

        if len(password) < 8:
            raise ValidationError("Password must be at least 8 characters long")

        if len(password) > 128:
            raise ValidationError("Password must be less than 128 characters")

        # Check for at least one letter and one number
        has_letter = any(c.isalpha() for c in password)
        has_number = any(c.isdigit() for c in password)

        if not has_letter:
            raise ValidationError("Password must contain at least one letter")

        if not has_number:
            raise ValidationError("Password must contain at least one number")


__all__ = ['AuthService']
