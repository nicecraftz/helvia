from datetime import date
from typing import List

from sqlalchemy.orm import Mapped, mapped_column, relationship
from app import db

class User(db.Model):
    __tablename__ = "users"
    
    id: Mapped[int] = mapped_column(primary_key=True)

    name: Mapped[str] = mapped_column(db.String(100), nullable=False)
    surname: Mapped[str] = mapped_column(db.String(100), nullable=False)
    username: Mapped[str] = mapped_column(db.String(50), unique=True, nullable=False)
    email: Mapped[str] = mapped_column(db.String(100), unique=True, nullable=False)
    password_bcrypt: Mapped[str] = mapped_column(db.String(255), nullable=False)
    is_private: Mapped[bool] = mapped_column(db.Boolean, default=False)

    access_data: Mapped["UserAccessData"] = relationship(
        "UserAccessData",
        backref="user",
        uselist=False,
        cascade="all, delete",
    )
    
    statistics: Mapped["UserStatistics"] = relationship(
        "UserStatistics",
        backref="user",
        uselist=False,
        cascade="all, delete",
    )

    achievements: Mapped[List["Achievement"]] = relationship(
        "Achievement",
        secondary="user_achievements",
        backref="users",
    )

    interests: Mapped[List["UserInterest"]] = relationship(
        "UserInterest",
        backref="user",
        cascade="all, delete",
    )

    @staticmethod
    def from_register_payload(payload, password_hash: str) -> "User":
        return User(
            name=payload.name,
            surname=payload.surname,
            username=payload.username,
            email=payload.email,
            password_bcrypt=password_hash,
        )


class UserAccessData(db.Model):
    __tablename__ = "user_access_data"

    id: Mapped[int] = mapped_column(primary_key=True)
    last_login: Mapped[date] = mapped_column(db.Date, default=date.today)

    user_id: Mapped[int] = mapped_column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False,
    )

class UserStatistics(db.Model):
    __tablename__ = "user_statistics"

    id: Mapped[int] = mapped_column(primary_key=True)
    total_partecipated_events: Mapped[int] = mapped_column(db.Integer, default=0)
    points: Mapped[int] = mapped_column(db.Integer, default=0)
    level: Mapped[int] = mapped_column(db.Integer, default=1)
    streak: Mapped[int] = mapped_column(db.Integer, default=0)

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

class Achievement(db.Model):
    __tablename__ = "achievements"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(db.String(100), nullable=False)
    description: Mapped[str] = mapped_column(db.Text, nullable=False)

    def __repr__(self) -> str:
        return f"<Achievement {self.name}>"

class UserAchievement(db.Model):
    __tablename__ = "user_achievements"

    user_id: Mapped[int] = mapped_column(
        db.Integer,
        db.ForeignKey("users.id"),
        primary_key=True,
    )
    achievement_id: Mapped[int] = mapped_column(
        db.Integer,
        db.ForeignKey("achievements.id"),
        primary_key=True,
    )
