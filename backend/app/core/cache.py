"""
TradeSense AI Platform - Cache Module
Handles Redis caching, session storage, and distributed locking
"""

import json
import pickle
from functools import wraps
from typing import Any, Callable, Optional, Union

import redis
from flask import Flask, current_app


class Cache:
    """Redis cache wrapper with convenience methods"""

    def __init__(self, app: Optional[Flask] = None):
        self.redis_client: Optional[redis.Redis] = None
        if app:
            self.init_app(app)

    def init_app(self, app: Flask) -> None:
        """
        Initialize cache with Flask application

        Args:
            app: Flask application instance
        """
        redis_url = app.config.get("REDIS_URL", "redis://localhost:6379/0")

        try:
            self.redis_client = redis.from_url(
                redis_url,
                decode_responses=False,  # We'll handle encoding ourselves
                socket_connect_timeout=5,
                socket_timeout=5,
                retry_on_timeout=True,
            )
            # Test connection
            self.redis_client.ping()
            app.logger.info(f"Redis cache connected: {redis_url}")
        except redis.ConnectionError as e:
            app.logger.warning(f"Redis connection failed: {e}. Caching disabled.")
            self.redis_client = None
        except Exception as e:
            app.logger.error(f"Redis initialization error: {e}")
            self.redis_client = None

        # Store cache instance in app extensions
        if not hasattr(app, "extensions"):
            app.extensions = {}
        app.extensions["cache"] = self

    def _is_available(self) -> bool:
        """Check if Redis is available"""
        return self.redis_client is not None

    def get(self, key: str, default: Any = None) -> Any:
        """
        Get value from cache

        Args:
            key: Cache key
            default: Default value if key not found

        Returns:
            Cached value or default
        """
        if not self._is_available():
            return default

        try:
            value = self.redis_client.get(key)
            if value is None:
                return default

            # Try to unpickle, fallback to string
            try:
                return pickle.loads(value)
            except (pickle.UnpicklingError, TypeError):
                return value.decode("utf-8") if isinstance(value, bytes) else value
        except Exception as e:
            current_app.logger.error(f"Cache get error for key {key}: {e}")
            return default

    def set(self, key: str, value: Any, timeout: Optional[int] = None) -> bool:
        """
        Set value in cache

        Args:
            key: Cache key
            value: Value to cache
            timeout: Expiration time in seconds (None = no expiration)

        Returns:
            True if successful, False otherwise
        """
        if not self._is_available():
            return False

        try:
            # Pickle the value for complex objects
            serialized_value = pickle.dumps(value)

            if timeout:
                return self.redis_client.setex(key, timeout, serialized_value)
            else:
                return self.redis_client.set(key, serialized_value)
        except Exception as e:
            current_app.logger.error(f"Cache set error for key {key}: {e}")
            return False

    def delete(self, key: str) -> bool:
        """
        Delete key from cache

        Args:
            key: Cache key

        Returns:
            True if key was deleted, False otherwise
        """
        if not self._is_available():
            return False

        try:
            return bool(self.redis_client.delete(key))
        except Exception as e:
            current_app.logger.error(f"Cache delete error for key {key}: {e}")
            return False

    def exists(self, key: str) -> bool:
        """
        Check if key exists in cache

        Args:
            key: Cache key

        Returns:
            True if key exists, False otherwise
        """
        if not self._is_available():
            return False

        try:
            return bool(self.redis_client.exists(key))
        except Exception as e:
            current_app.logger.error(f"Cache exists check error for key {key}: {e}")
            return False

    def increment(self, key: str, amount: int = 1) -> Optional[int]:
        """
        Increment numeric value in cache

        Args:
            key: Cache key
            amount: Amount to increment by

        Returns:
            New value after increment, or None on error
        """
        if not self._is_available():
            return None

        try:
            return self.redis_client.incrby(key, amount)
        except Exception as e:
            current_app.logger.error(f"Cache increment error for key {key}: {e}")
            return None

    def decrement(self, key: str, amount: int = 1) -> Optional[int]:
        """
        Decrement numeric value in cache

        Args:
            key: Cache key
            amount: Amount to decrement by

        Returns:
            New value after decrement, or None on error
        """
        if not self._is_available():
            return None

        try:
            return self.redis_client.decrby(key, amount)
        except Exception as e:
            current_app.logger.error(f"Cache decrement error for key {key}: {e}")
            return None

    def expire(self, key: str, timeout: int) -> bool:
        """
        Set expiration time for key

        Args:
            key: Cache key
            timeout: Expiration time in seconds

        Returns:
            True if successful, False otherwise
        """
        if not self._is_available():
            return False

        try:
            return bool(self.redis_client.expire(key, timeout))
        except Exception as e:
            current_app.logger.error(f"Cache expire error for key {key}: {e}")
            return False

    def clear(self) -> bool:
        """
        Clear all keys from cache (use with caution!)

        Returns:
            True if successful, False otherwise
        """
        if not self._is_available():
            return False

        try:
            self.redis_client.flushdb()
            return True
        except Exception as e:
            current_app.logger.error(f"Cache clear error: {e}")
            return False

    def get_many(self, *keys: str) -> list:
        """
        Get multiple values from cache

        Args:
            *keys: Cache keys

        Returns:
            List of values
        """
        if not self._is_available():
            return [None] * len(keys)

        try:
            values = self.redis_client.mget(keys)
            result = []
            for value in values:
                if value is None:
                    result.append(None)
                else:
                    try:
                        result.append(pickle.loads(value))
                    except (pickle.UnpicklingError, TypeError):
                        result.append(
                            value.decode("utf-8") if isinstance(value, bytes) else value
                        )
            return result
        except Exception as e:
            current_app.logger.error(f"Cache get_many error: {e}")
            return [None] * len(keys)

    def set_many(self, mapping: dict, timeout: Optional[int] = None) -> bool:
        """
        Set multiple key-value pairs in cache

        Args:
            mapping: Dictionary of key-value pairs
            timeout: Expiration time in seconds

        Returns:
            True if successful, False otherwise
        """
        if not self._is_available():
            return False

        try:
            pipeline = self.redis_client.pipeline()
            for key, value in mapping.items():
                serialized_value = pickle.dumps(value)
                if timeout:
                    pipeline.setex(key, timeout, serialized_value)
                else:
                    pipeline.set(key, serialized_value)
            pipeline.execute()
            return True
        except Exception as e:
            current_app.logger.error(f"Cache set_many error: {e}")
            return False

    def get_health(self) -> dict:
        """
        Get cache health status

        Returns:
            Dictionary with health information
        """
        if not self._is_available():
            return {"status": "unavailable", "connected": False}

        try:
            info = self.redis_client.info()
            return {
                "status": "healthy",
                "connected": True,
                "version": info.get("redis_version"),
                "used_memory": info.get("used_memory_human"),
                "connected_clients": info.get("connected_clients"),
                "total_commands_processed": info.get("total_commands_processed"),
            }
        except Exception as e:
            return {"status": "error", "connected": False, "error": str(e)}


# Global cache instance
cache = Cache()


def cached(
    timeout: int = 300, key_prefix: str = "view", unless: Optional[Callable] = None
):
    """
    Decorator to cache function results

    Args:
        timeout: Cache timeout in seconds
        key_prefix: Prefix for cache key
        unless: Function that returns True to skip caching

    Usage:
        @cached(timeout=600, key_prefix='user')
        def get_user(user_id):
            return User.query.get(user_id)
    """

    def decorator(f: Callable) -> Callable:
        @wraps(f)
        def decorated_function(*args, **kwargs):
            # Check if we should skip caching
            if unless and unless():
                return f(*args, **kwargs)

            # Generate cache key
            cache_key = f"{key_prefix}:{f.__name__}:{str(args)}:{str(kwargs)}"

            # Try to get from cache
            result = cache.get(cache_key)
            if result is not None:
                return result

            # Call function and cache result
            result = f(*args, **kwargs)
            cache.set(cache_key, result, timeout)
            return result

        return decorated_function

    return decorator


def invalidate_cache(key_pattern: str) -> int:
    """
    Invalidate all cache keys matching pattern

    Args:
        key_pattern: Pattern to match (e.g., "user:*")

    Returns:
        Number of keys deleted
    """
    if not cache._is_available():
        return 0

    try:
        keys = cache.redis_client.keys(key_pattern)
        if keys:
            return cache.redis_client.delete(*keys)
        return 0
    except Exception as e:
        current_app.logger.error(
            f"Cache invalidation error for pattern {key_pattern}: {e}"
        )
        return 0


__all__ = ["cache", "Cache", "cached", "invalidate_cache"]
