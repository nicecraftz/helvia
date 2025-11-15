from datapizza.clients.openai import OpenAIClient
from datapizza.type import TextBlock
from models.event import Event
from routes.event_routes import cache
from models.user import User

import os
import json

OPEN_AI_API_KEY = os.getenv("OPEN_AI_API_KEY", "your_default_key")
client = OpenAIClient(api_key=OPEN_AI_API_KEY)

def get_event_recommendation(user: User) -> str:
    events = Event.query.all()
    
    def serialize_event(e: Event):
        return {
            "id": e.id,
            "title": e.title,
            "description": e.description,
            "start_datetime": e.start_datetime.isoformat(),
            "end_datetime": e.end_datetime.isoformat(),
            "cost": e.cost,
            "image_url": e.image_url,
            "link": e.link,
            "sponsored": bool(e.sponsored),
            "topics": [t.name for t in e.topics]
        }

    def serialize_user(u: User):
        return {
            "id": u.id,
            "name": u.name,
            "surname": u.surname,
            "username": u.username,
            "email": u.email,
            "is_private": bool(u.is_private),
            "interests": [i.interest_name for i in u.interests]
        }

    events_json = json.dumps([serialize_event(e) for e in events], ensure_ascii=False)
    user_json = json.dumps(serialize_user(user), ensure_ascii=False)

    request = TextBlock(
        "Dati tutti questi eventi, determina quale potrebbe interessare di più "
        "a questo utente in base ai suoi interessi. "
        "Ritornane solo 1 in formato JSON. "
        "Dopo tutti i dati riguardanti l'evento aggiungi al JSON anche un campo "
        "explanation che spiega perché l'evento è stato scelto, ad esempio: "
        "'explanation': 'L'IA ha scelto questo evento per il tuo interesse in {elemento_tag}'."
    )

    event_data = TextBlock(events_json)
    user_data = TextBlock(user_json)

    response = client.invoke(input=[request, event_data, user_data])

    text = ""
    for block in response.content:
        if isinstance(block, TextBlock):
            text += block.text + "\n"

    return text.strip()

