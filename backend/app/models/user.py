"""
TradeSense AI Platform - User Model
Defines the User model for authentication and user management
"""

from datetime import datetime
from typing import Optional

from sqlalchemy import Boolean, Column, Enum, String
from werkzeug.security import check_password_hash, generate_password_hash

from app.models.base import BaseModel


class UserRole:
    """User role constants"""

    USER = "user"
    ADMIN = "admin"
    SUPER_ADMIN = "super_admin"

    @classmethod
    def all(cls):
        return [cls.USER, cls.ADMIN, cls.SUPER_ADMIN]


class User(BaseModel):
    """
    User model for authentication and authorization
    """

    __tablename__ = "users"

    # Basic Information
    email = Column(String(255), unique=True, nullable=False, index=True)
    username = Column(String(80), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)

    # Profile Information
    first_name = Column(String(100))
    last_name = Column(String(100))
    phone_number = Column(String(20))

    # Role and Permissions
    role = Column(
        Enum(*UserRole.all(), name="user_role"),
        default=UserRole.USER,
        nullable=False,
    )

    # Account Status
    is_active = Column(Boolean, default=True, nullable=False)
    is_verified = Column(Boolean, default=False, nullable=False)
    email_verified = Column(Boolean, default=False, nullable=False)

    # Timestamps
    last_login = Column(String)
    verified_at = Column(String)

    # Security
    failed_login_attempts = Column(String, default="0")
    locked_until = Column(String)

    def set_password(self, password: str) -> None:
        """
        Hash and set user password

        Args:
            password: Plain text password
        """
        self.password_hash = generate_password_hash(password)

    def check_password(self, password: str) -> bool:
        """
        Verify password against stored hash

        Args:
            password: Plain text password to check

        Returns:
            True if password matches, False otherwise
        """
        return check_password_hash(self.password_hash, password)

    def is_admin(self) -> bool:
        """Check if user has admin role"""
        return self.role in [UserRole.ADMIN, UserRole.SUPER_ADMIN]

    def is_super_admin(self) -> bool:
        """Check if user has super admin role"""
        return self.role == UserRole.SUPER_ADMIN

    def has_permission(self, permission: str) -> bool:
        """
        Check if user has specific permission

        Args:
            permission: Permission to check

        Returns:
            True if user has permission
        """
        # Super admin has all permissions
        if self.is_super_admin():
            return True

        # Add more granular permission logic here
        return False

    def update_last_login(self) -> None:
        """Update last login timestamp"""
        self.last_login = datetime.utcnow().isoformat()
        self.save()

    def increment_failed_login(self) -> None:
        """Increment failed login attempts counter"""
        try:
            attempts = int(self.failed_login_attempts or "0")
            self.failed_login_attempts = str(attempts + 1)

            # Lock account after 5 failed attempts for 15 minutes
            if attempts + 1 >= 5:
                from datetime import timedelta

                lock_time = datetime.utcnow() + timedelta(minutes=15)
                self.locked_until = lock_time.isoformat()

            self.save()
        except ValueError:
            self.failed_login_attempts = "1"
            self.save()

    def reset_failed_login(self) -> None:
        """Reset failed login attempts counter"""
        self.failed_login_attempts = "0"
        self.locked_until = None
        self.save()

    def is_locked(self) -> bool:
        """Check if account is locked"""
        if not self.locked_until:
            return False

        try:
            lock_time = datetime.fromisoformat(self.locked_until)
            if datetime.utcnow() > lock_time:
                # Lock expired, reset
                self.reset_failed_login()
                return False
            return True
        except (ValueError, TypeError):
            return False

    def verify_email(self) -> None:
        """Mark email as verified"""
        self.email_verified = True
        self.is_verified = True
        self.verified_at = datetime.utcnow().isoformat()
        self.save()

    def deactivate(self) -> None:
        """Deactivate user account"""
        self.is_active = False
        self.save()

    def activate(self) -> None:
        """Activate user account"""
        self.is_active = True
        self.save()

    def to_dict(self, exclude: Optional[list] = None) -> dict:
        """
        Convert user to dictionary, excluding sensitive fields

        Args:
            exclude: Additional fields to exclude

        Returns:
            Dictionary representation of user
        """
        default_exclude = ["password_hash"]
        if exclude:
            default_exclude.extend(exclude)

        return super().to_dict(exclude=default_exclude)

    def to_public_dict(self) -> dict:
        """
        Get public user information (safe for API responses)

        Returns:
            Dictionary with public user data
        """
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "role": self.role,
            "is_active": self.is_active,
            "is_verified": self.is_verified,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "last_login": self.last_login,
        }

    @classmethod
    def find_by_email(cls, email: str) -> Optional["User"]:
        """
        Find user by email address

        Args:
            email: User's email

        Returns:
            User instance or None
        """
        return cls.query.filter_by(email=email).first()

    @classmethod
    def find_by_username(cls, username: str) -> Optional["User"]:
        """
        Find user by username

        Args:
            username: User's username

        Returns:
            User instance or None
        """
        return cls.query.filter_by(username=username).first()

    @classmethod
    def email_exists(cls, email: str) -> bool:
        """Check if email already exists"""
        return cls.query.filter_by(email=email).first() is not None

    @classmethod
    def username_exists(cls, username: str) -> bool:
        """Check if username already exists"""
        return cls.query.filter_by(username=username).first() is not None

    def __repr__(self) -> str:
        return f"<User(id={self.id}, username='{self.username}', email='{self.email}')>"
