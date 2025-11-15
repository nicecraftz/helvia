from datetime import date
from sqlalchemy.orm import Mapped, mapped_column, relationship
from bcrypt import hashpw, gensalt
from Alchemy import db

class User(db.Model):
    __tablename__ = "users"
    
    id: Mapped[int] = mapped_column(primary_key=True)

    first_name: Mapped[str] = mapped_column(db.String(100), nullable=False)
    last_name: Mapped[str] = mapped_column(db.String(100), nullable=False)
    username: Mapped[str] = mapped_column(db.String(50), unique=True, nullable=False)
    email: Mapped[str] = mapped_column(db.String(100), unique=True, nullable=False)
    password_bcrypt: Mapped[str] = mapped_column(db.String(255), nullable=False)
    is_private: Mapped[bool] = mapped_column(db.Boolean, default=False)
    
    statistics: Mapped["UserStatistics"] = relationship(
        "UserStatistics",
        backref="user",
        uselist=False,
        cascade="all, delete"
    )

    interests: Mapped[list["UserInterest"]] = relationship(
        "UserInterest",
        backref="user",
        cascade="all, delete",
    )

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "username": self.username,
            "email": self.email,
            "is_private": self.is_private,
            "statistics": self.statistics.to_dict() if self.statistics else None,
            "interests": [interest.interest_name for interest in self.interests],
        }

    @staticmethod
    def from_dict(data: dict) -> "User":
        raw_interests = data.get("interests", [])
        interests = [UserInterest(interest_name=interest) for interest in raw_interests]

        return User(
            first_name=data.get("first_name"),
            last_name=data.get("last_name"),
            username=data.get("username"),
            email=data.get("email"),
            password_bcrypt=hashpw(data.get("password").encode('utf-8'), gensalt()).decode('utf-8'),
            statistics=UserStatistics(),
            is_private=False,
            interests=interests
        )
    
    @staticmethod
    def get_user_from_id(user_id: int) -> "User | None":
        return User.query.filter_by(id=user_id).first()

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

    def to_dict(self) -> dict:
        return {
            "total_participated_events": self.total_partecipated_events,
            "level": self.level,
        }
    
class UserInterest(db.Model):
    __tablename__ = "user_interests"

    id: Mapped[int] = mapped_column(primary_key=True)
    interest_name: Mapped[str] = mapped_column(db.String(100), nullable=False)

    user_id: Mapped[int] = mapped_column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False,
    )