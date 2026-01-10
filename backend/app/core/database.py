"""
TradeSense AI Platform - Database Module
Handles SQLAlchemy initialization, session management, and database utilities
"""

from contextlib import contextmanager
from typing import Generator

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import event, pool
from sqlalchemy.engine import Engine
from sqlalchemy.orm import Session

# Initialize SQLAlchemy instance
db = SQLAlchemy()


def init_db(app: Flask) -> None:
    """
    Initialize database with Flask application

    Args:
        app: Flask application instance
    """
    db.init_app(app)

    # Register event listeners
    _register_event_listeners()

    # Create all tables in development (for testing)
    with app.app_context():
        if app.config.get("ENV") == "development":
            db.create_all()
            app.logger.info("Database tables created")


def _register_event_listeners() -> None:
    """Register SQLAlchemy event listeners for performance and debugging"""

    @event.listens_for(Engine, "connect")
    def set_sqlite_pragma(dbapi_conn, connection_record):
        """Enable foreign keys for SQLite"""
        if "sqlite" in str(dbapi_conn):
            cursor = dbapi_conn.cursor()
            cursor.execute("PRAGMA foreign_keys=ON")
            cursor.close()

    @event.listens_for(Engine, "before_cursor_execute")
    def receive_before_cursor_execute(
        conn, cursor, statement, params, context, executemany
    ):
        """Log SQL statements in debug mode"""
        # This is handled by SQLALCHEMY_ECHO in config
        pass


@contextmanager
def session_scope() -> Generator[Session, None, None]:
    """
    Provide a transactional scope for database operations

    Usage:
        with session_scope() as session:
            user = User(email='test@example.com')
            session.add(user)
            # Automatically commits on success, rolls back on exception

    Yields:
        SQLAlchemy session
    """
    session = db.session
    try:
        yield session
        session.commit()
    except Exception as e:
        session.rollback()
        raise e
    finally:
        session.close()


def reset_database(app: Flask) -> None:
    """
    Drop all tables and recreate them

    WARNING: This will delete all data! Only use in development/testing

    Args:
        app: Flask application instance
    """
    if app.config.get("ENV") == "production":
        raise RuntimeError("Cannot reset database in production!")

    with app.app_context():
        db.drop_all()
        db.create_all()
        app.logger.warning("Database has been reset - all data deleted")


def get_or_create(model, **kwargs):
    """
    Get an existing record or create a new one

    Args:
        model: SQLAlchemy model class
        **kwargs: Fields to filter/create by

    Returns:
        Tuple of (instance, created) where created is a boolean
    """
    instance = db.session.query(model).filter_by(**kwargs).first()
    if instance:
        return instance, False
    else:
        instance = model(**kwargs)
        db.session.add(instance)
        db.session.commit()
        return instance, True


def bulk_insert(model, data_list: list) -> int:
    """
    Bulk insert records for better performance

    Args:
        model: SQLAlchemy model class
        data_list: List of dictionaries with field data

    Returns:
        Number of records inserted
    """
    try:
        db.session.bulk_insert_mappings(model, data_list)
        db.session.commit()
        return len(data_list)
    except Exception as e:
        db.session.rollback()
        raise e


def bulk_update(model, data_list: list) -> int:
    """
    Bulk update records for better performance

    Args:
        model: SQLAlchemy model class
        data_list: List of dictionaries with field data (must include primary key)

    Returns:
        Number of records updated
    """
    try:
        db.session.bulk_update_mappings(model, data_list)
        db.session.commit()
        return len(data_list)
    except Exception as e:
        db.session.rollback()
        raise e


class DatabaseHealthCheck:
    """Database health check utility"""

    @staticmethod
    def check_connection() -> bool:
        """
        Check if database connection is healthy

        Returns:
            True if connection is healthy, False otherwise
        """
        try:
            # Execute a simple query
            db.session.execute(db.text("SELECT 1"))
            return True
        except Exception:
            return False

    @staticmethod
    def get_connection_info() -> dict:
        """
        Get database connection information

        Returns:
            Dictionary with connection details
        """
        try:
            engine = db.engine
            return {
                "url": str(engine.url),
                "driver": engine.driver,
                "pool_size": engine.pool.size()
                if hasattr(engine.pool, "size")
                else None,
                "checked_in": engine.pool.checkedin()
                if hasattr(engine.pool, "checkedin")
                else None,
                "checked_out": engine.pool.checkedout()
                if hasattr(engine.pool, "checkedout")
                else None,
                "overflow": engine.pool.overflow()
                if hasattr(engine.pool, "overflow")
                else None,
            }
        except Exception as e:
            return {"error": str(e)}


# Export commonly used items
__all__ = [
    "db",
    "init_db",
    "session_scope",
    "reset_database",
    "get_or_create",
    "bulk_insert",
    "bulk_update",
    "DatabaseHealthCheck",
]
