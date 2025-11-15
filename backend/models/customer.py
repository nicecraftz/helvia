from app import db
from sqlalchemy.orm import Mapped, mapped_column, relationship

from payload import CustomerCreatePayload

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

    @staticmethod
    def from_payload(payload: CustomerCreatePayload, bcrypt_password: str) -> "Customer":
        return Customer(
            first_name=payload.first_name,
            last_name=payload.last_name,
            email=payload.email,
            company_name=payload.company_name,
            vat_code=payload.vat_code,
            username=payload.username,
            bcrypt_password=bcrypt_password
        )



