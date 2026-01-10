"""
TradeSense AI Platform - Custom Exceptions
Defines custom exception classes for better error handling and API responses
"""

from typing import Any, Dict, Optional


class TradeSenseException(Exception):
    """Base exception class for TradeSense AI Platform"""

    def __init__(
        self,
        message: str,
        status_code: int = 500,
        payload: Optional[Dict[str, Any]] = None,
    ):
        super().__init__(message)
        self.message = message
        self.status_code = status_code
        self.payload = payload or {}

    def to_dict(self) -> Dict[str, Any]:
        """Convert exception to dictionary for JSON response"""
        rv = dict(self.payload)
        rv["message"] = self.message
        rv["error"] = self.__class__.__name__
        rv["status_code"] = self.status_code
        return rv


class ValidationError(TradeSenseException):
    """Raised when request data validation fails"""

    def __init__(
        self, message: str = "Validation error", payload: Optional[Dict] = None
    ):
        super().__init__(message, status_code=400, payload=payload)


class AuthenticationError(TradeSenseException):
    """Raised when authentication fails"""

    def __init__(
        self, message: str = "Authentication failed", payload: Optional[Dict] = None
    ):
        super().__init__(message, status_code=401, payload=payload)


class AuthorizationError(TradeSenseException):
    """Raised when user doesn't have permission"""

    def __init__(
        self,
        message: str = "You don't have permission to access this resource",
        payload: Optional[Dict] = None,
    ):
        super().__init__(message, status_code=403, payload=payload)


class NotFoundError(TradeSenseException):
    """Raised when a resource is not found"""

    def __init__(
        self, message: str = "Resource not found", payload: Optional[Dict] = None
    ):
        super().__init__(message, status_code=404, payload=payload)


class ConflictError(TradeSenseException):
    """Raised when there's a conflict (e.g., duplicate resource)"""

    def __init__(
        self, message: str = "Resource conflict", payload: Optional[Dict] = None
    ):
        super().__init__(message, status_code=409, payload=payload)


class RateLimitError(TradeSenseException):
    """Raised when rate limit is exceeded"""

    def __init__(
        self, message: str = "Rate limit exceeded", payload: Optional[Dict] = None
    ):
        super().__init__(message, status_code=429, payload=payload)


class DatabaseError(TradeSenseException):
    """Raised when database operation fails"""

    def __init__(
        self, message: str = "Database operation failed", payload: Optional[Dict] = None
    ):
        super().__init__(message, status_code=500, payload=payload)


class ExternalServiceError(TradeSenseException):
    """Raised when external service call fails"""

    def __init__(
        self,
        message: str = "External service unavailable",
        payload: Optional[Dict] = None,
    ):
        super().__init__(message, status_code=503, payload=payload)


class TradingError(TradeSenseException):
    """Raised when trading operation fails"""

    def __init__(
        self, message: str = "Trading operation failed", payload: Optional[Dict] = None
    ):
        super().__init__(message, status_code=400, payload=payload)


class ChallengeError(TradeSenseException):
    """Raised when challenge-related operation fails"""

    def __init__(
        self,
        message: str = "Challenge operation failed",
        payload: Optional[Dict] = None,
    ):
        super().__init__(message, status_code=400, payload=payload)


class PaymentError(TradeSenseException):
    """Raised when payment operation fails"""

    def __init__(
        self, message: str = "Payment operation failed", payload: Optional[Dict] = None
    ):
        super().__init__(message, status_code=402, payload=payload)


class InsufficientFundsError(TradeSenseException):
    """Raised when account has insufficient funds"""

    def __init__(
        self, message: str = "Insufficient funds", payload: Optional[Dict] = None
    ):
        super().__init__(message, status_code=400, payload=payload)


class InvalidConfigurationError(TradeSenseException):
    """Raised when configuration is invalid"""

    def __init__(
        self, message: str = "Invalid configuration", payload: Optional[Dict] = None
    ):
        super().__init__(message, status_code=500, payload=payload)


# Utility function to create error responses
def create_error_response(
    message: str,
    status_code: int = 500,
    error_type: str = "Error",
    details: Optional[Dict[str, Any]] = None,
) -> Dict[str, Any]:
    """
    Create a standardized error response dictionary

    Args:
        message: Error message
        status_code: HTTP status code
        error_type: Type of error
        details: Additional error details

    Returns:
        Dictionary with error information
    """
    response = {
        "success": False,
        "error": error_type,
        "message": message,
        "status_code": status_code,
    }

    if details:
        response["details"] = details

    return response
