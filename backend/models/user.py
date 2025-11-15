from datetime import date
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app import db

from bcrypt import hashpw, gensalt

class User(db.Model):
    __tablename__ = "users"
    
    id: Mapped[int] = mapped_column(primary_key=True)

    name: Mapped[str] = mapped_column(db.String(100), nullable=False)
    last_name: Mapped[str] = mapped_column(db.String(100), nullable=False)
    username: Mapped[str] = mapped_column(db.String(50), unique=True, nullable=False)
    email: Mapped[str] = mapped_column(db.String(100), unique=True, nullable=False)
    password_bcrypt: Mapped[str] = mapped_column(db.String(255), nullable=False)
    is_private: Mapped[bool] = mapped_column(db.Boolean, default=False)
    
    statistics: Mapped["UserStatistics"] = relationship(
        "UserStatistics",
        backref="user",
        uselist=False,
        cascade="all, delete",
    )

    interests: Mapped[list["UserInterest"]] = relationship(
        "UserInterest",
        backref="user",
        cascade="all, delete",
    )

    @staticmethod
    def from_dict(data: dict) -> "User":
        return User(
            name=data.get("name"),
            last_name=data.get("last_name"),
            username=data.get("username"),
            email=data.get("email"),
            password_bcrypt=hashpw(data.get("password").encode('utf-8'), gensalt()).decode('utf-8'),
            is_private=False
        )

class UserStatistics(db.Model):
    __tablename__ = "user_statistics"

    id: Mapped[int] = mapped_column(primary_key=True)
    total_partecipated_events: Mapped[int] = mapped_column(db.Integer, default=0)
    level: Mapped[int] = mapped_column(db.Integer, default=1)

    user_id: Mapped[int] = mapped_column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False,
    )
    
class UserInterest(db.Model):
    __tablename__ = "user_interests"

    id: Mapped[int] = mapped_column(primary_key=True)
    interest_name: Mapped[str] = mapped_column(db.String(100), nullable=False)

    user_id: Mapped[int] = mapped_column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False,
    )