from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime
from Alchemy import db
from models.user import User

class EventParticipant(db.Model):
    __tablename__ = "event_participants"
    event_id: Mapped[int] = mapped_column(db.Integer, db.ForeignKey("events.id", ondelete="CASCADE"), primary_key=True)
    user_id: Mapped[int] = mapped_column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)

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

    participants = relationship(
        "User",
        secondary="event_participants",
        backref="events_participated",
        lazy="selectin",
    )
    
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
    
    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "start_datetime": self.start_datetime.isoformat(),
            "end_datetime": self.end_datetime.isoformat(),
            "cost": self.cost,
            "image_url": self.image_url,
            "link": self.link,
            "sponsored": self.sponsored,
            "participation_count": len(self.participants),
            "author_id": self.author_id,
            "topics": [topic.name for topic in self.topics],
        }

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
