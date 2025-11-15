from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime

db = SQLAlchemy()

class Event(db.Model):
    __tablename__ = "events"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(db.String(255), nullable=False)
    description: Mapped[str] = mapped_column(db.Text, nullable=False)
    start_datetime: Mapped[datetime] = mapped_column(db.DateTime, nullable=False)
    end_datetime: Mapped[datetime] = mapped_column(db.DateTime, nullable=False)
    cost: Mapped[int] = mapped_column(db.Integer, nullable=False)
    image_url: Mapped[str | None] = mapped_column(db.String(255), nullable=True)
    link: Mapped[str | None] = mapped_column(db.String(255), nullable=True)
    sponsored: Mapped[bool] = mapped_column(db.Boolean, nullable=False, default=False)
    participants: Mapped[int] = mapped_column(db.Integer, nullable=False, default=0)
    author_id: Mapped[int | None] = mapped_column(
        db.Integer,
        db.ForeignKey("customers.id", ondelete="SET NULL"),
        nullable=True,
    )

    topics: Mapped[list['EventTopic']] = relationship(
        "EventTopic",
        backref="event",
        lazy="selectin",
    )

    @staticmethod
    def from_dict(data: dict) -> "Event":
        return Event(
            title=data.get("title"),
            description=data.get("description"),
            start_datetime=datetime.fromisoformat(data.get("start_datetime")),
            end_datetime=datetime.fromisoformat(data.get("end_datetime")),
            cost=data.get("cost", 0),
            image_url=data.get("image_url"),
            link=data.get("link"),
            sponsored=data.get("sponsored", False),
            participants=data.get("participants", 0),
            author_id=data.get("author_id", None),
        )

class EventTopic(db.Model):
    __tablename__ = "event_topics"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(db.String(100), nullable=False)

    event_id: Mapped[int] = mapped_column(
        db.Integer,
        db.ForeignKey("events.id", ondelete="CASCADE"),
        nullable=False,
    )

    def __repr__(self) -> str:
        return f"<EventTopic {self.name}>"
