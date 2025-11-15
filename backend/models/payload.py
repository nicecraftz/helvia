from dataclasses import dataclass

@dataclass
class RegisterUserPayload:
    name: str
    surname: str
    username: str
    email: str
    password: str

@dataclass
class LoginUserPayload:
    email: str
    password: str

@dataclass
class PostCreatePayload:
    title: str
    content: str
    tags: list[str]

@dataclass
class CustomerCreatePayload:
    first_name: str
    last_name: str
    email: str
    company_name: str
    vat_code: str
    username: str
    password: str