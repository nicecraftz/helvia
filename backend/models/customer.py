from Alchemy import db
from sqlalchemy.orm import Mapped, mapped_column, relationship
from models.event import Event
import bcrypt

class Customer(db.Model):
    __tablename__ = "customers"
    
    id: Mapped[int] = mapped_column(primary_key=True)

    first_name: Mapped[str] = mapped_column(db.String(100), nullable=False)
    last_name: Mapped[str] = mapped_column(db.String(100), nullable=False)
    email: Mapped[str] = mapped_column(db.String(100), unique=True, nullable=False)
    company_name: Mapped[str] = mapped_column(db.String(150), nullable=True)
    vat_code : Mapped[str] = mapped_column(db.String(20), unique=True, nullable=True)
    username: Mapped[str] = mapped_column(db.String(50), unique=True, nullable=False)
    bcrypt_password: Mapped[str] = mapped_column(db.String(255), nullable=False)

    events: Mapped[list['Event']] = relationship(
        "Event",
        backref="author",
        lazy="selectin",
    )

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "company_name": self.company_name,
            "vat_code": self.vat_code,
            "username": self.username,
        }

    @staticmethod
    def from_dict(data: dict) -> "Customer":
        return Customer(
            first_name=data.get("first_name"),
            last_name=data.get("last_name"),
            email=data.get("email"),
            company_name=data.get("company_name"),
            vat_code=data.get("vat_code"),
            username=data.get("username"),
            bcrypt_password=bcrypt.hashpw(data.get("password").encode('utf-8'), bcrypt.gensalt()).decode('utf-8'),
        )