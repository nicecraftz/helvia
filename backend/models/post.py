from sqlalchemy.orm import Mapped, mapped_column, relationship
from app import db

class Post(db.Model):
    __tablename__ = "posts"
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(db.String(200), nullable=False)
    content: Mapped[str] = mapped_column(db.Text, nullable=False)
    tags: Mapped[list["Tag"]] = relationship(
        "Tag",
        secondary="post_tags",
        backref="posts",
    )

class Tag(db.Model):
    __tablename__ = "tags"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(db.String(50), unique=True, nullable=False)

class PostTag(db.Model):
    __tablename__ = "post_tags"
    post_id: Mapped[int] = mapped_column(
        db.Integer,
        db.ForeignKey("posts.id"),
        primary_key=True,
    )

    tag_id: Mapped[int] = mapped_column(
        db.Integer,
        db.ForeignKey("tags.id"),
        primary_key=True,
    )
