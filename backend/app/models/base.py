"""
TradeSense AI Platform - Base Model
Provides base model class with common fields and methods for all models
"""

from datetime import datetime
from typing import Any, Dict, List, Optional

from sqlalchemy import Column, DateTime, Integer
from sqlalchemy.ext.declarative import declared_attr

from app.core.database import db


class BaseModel(db.Model):
    """
    Base model class with common fields and methods
    All models should inherit from this class
    """

    __abstract__ = True

    id = Column(Integer, primary_key=True, autoincrement=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False
    )

    @declared_attr
    def __tablename__(cls):
        """Generate table name from class name"""
        # Convert CamelCase to snake_case
        name = cls.__name__
        return "".join(["_" + c.lower() if c.isupper() else c for c in name]).lstrip(
            "_"
        )

    def save(self) -> "BaseModel":
        """
        Save model instance to database

        Returns:
            Self for method chaining
        """
        db.session.add(self)
        db.session.commit()
        return self

    def delete(self) -> bool:
        """
        Delete model instance from database

        Returns:
            True if successful
        """
        db.session.delete(self)
        db.session.commit()
        return True

    def update(self, **kwargs) -> "BaseModel":
        """
        Update model instance with provided kwargs

        Args:
            **kwargs: Fields to update

        Returns:
            Self for method chaining
        """
        for key, value in kwargs.items():
            if hasattr(self, key):
                setattr(self, key, value)
        self.updated_at = datetime.utcnow()
        db.session.commit()
        return self

    def to_dict(self, exclude: Optional[List[str]] = None) -> Dict[str, Any]:
        """
        Convert model instance to dictionary

        Args:
            exclude: List of fields to exclude from dictionary

        Returns:
            Dictionary representation of model
        """
        exclude = exclude or []
        result = {}

        for column in self.__table__.columns:
            column_name = column.name
            if column_name not in exclude:
                value = getattr(self, column_name)

                # Handle datetime serialization
                if isinstance(value, datetime):
                    value = value.isoformat()

                result[column_name] = value

        return result

    def to_json(self, exclude: Optional[List[str]] = None) -> Dict[str, Any]:
        """
        Alias for to_dict for JSON serialization

        Args:
            exclude: List of fields to exclude

        Returns:
            Dictionary representation of model
        """
        return self.to_dict(exclude=exclude)

    @classmethod
    def create(cls, **kwargs) -> "BaseModel":
        """
        Create and save a new instance

        Args:
            **kwargs: Fields for the new instance

        Returns:
            New model instance
        """
        instance = cls(**kwargs)
        return instance.save()

    @classmethod
    def get_by_id(cls, id: int) -> Optional["BaseModel"]:
        """
        Get instance by ID

        Args:
            id: Primary key ID

        Returns:
            Model instance or None
        """
        return cls.query.get(id)

    @classmethod
    def find_by_id(cls, id: int) -> Optional["BaseModel"]:
        """
        Find instance by ID (alias for get_by_id)

        Args:
            id: Primary key ID

        Returns:
            Model instance or None
        """
        return cls.get_by_id(id)

    @classmethod
    def get_all(
        cls,
        page: Optional[int] = None,
        per_page: Optional[int] = None,
        order_by: Optional[str] = None,
    ) -> List["BaseModel"]:
        """
        Get all instances with optional pagination

        Args:
            page: Page number (1-indexed)
            per_page: Items per page
            order_by: Field to order by (e.g., 'created_at' or '-created_at' for desc)

        Returns:
            List of model instances
        """
        query = cls.query

        # Apply ordering
        if order_by:
            if order_by.startswith("-"):
                # Descending order
                field = order_by[1:]
                if hasattr(cls, field):
                    query = query.order_by(getattr(cls, field).desc())
            else:
                # Ascending order
                if hasattr(cls, order_by):
                    query = query.order_by(getattr(cls, order_by))

        # Apply pagination
        if page and per_page:
            query = query.paginate(page=page, per_page=per_page, error_out=False)
            return query.items

        return query.all()

    @classmethod
    def filter_by(cls, **kwargs) -> List["BaseModel"]:
        """
        Filter instances by field values

        Args:
            **kwargs: Field filters

        Returns:
            List of matching instances
        """
        return cls.query.filter_by(**kwargs).all()

    @classmethod
    def find_one(cls, **kwargs) -> Optional["BaseModel"]:
        """
        Find single instance by field values

        Args:
            **kwargs: Field filters

        Returns:
            Model instance or None
        """
        return cls.query.filter_by(**kwargs).first()

    @classmethod
    def count(cls, **kwargs) -> int:
        """
        Count instances matching criteria

        Args:
            **kwargs: Field filters (optional)

        Returns:
            Count of matching instances
        """
        if kwargs:
            return cls.query.filter_by(**kwargs).count()
        return cls.query.count()

    @classmethod
    def exists(cls, **kwargs) -> bool:
        """
        Check if instance exists matching criteria

        Args:
            **kwargs: Field filters

        Returns:
            True if instance exists, False otherwise
        """
        return cls.query.filter_by(**kwargs).first() is not None

    def __repr__(self) -> str:
        """String representation of model instance"""
        return f"<{self.__class__.__name__}(id={self.id})>"

    def __str__(self) -> str:
        """Human-readable string representation"""
        return self.__repr__()
