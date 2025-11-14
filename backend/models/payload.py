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
