from datapizza.clients.openai import OpenAIClient
from datapizza.type import TextBlock
from models.event import Event
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
        "Sei un sistema di raccomandazione. "
        "Dati tutti questi eventi e i dati utente, determina quale evento "
        "potrebbe interessare maggiormente all'utente in base ai suoi interessi. "
        "Ritornane SOLO UNO in formato JSON valido. "
        "Il JSON deve contenere TUTTI i dati dell'evento selezionato più "
        "un campo obbligatorio chiamato 'explanation'. "
        "Il campo 'explanation' deve essere una frase nel formato: "
        "'L'IA ha scelto questo evento per il tuo interesse in {elemento_tag}'. "
        "Sostituisci {elemento_tag} con il nome dell’interesse utente che ha motivato la scelta. "
        "Non generare nulla al di fuori del JSON."
    )

    event_data = TextBlock(events_json)
    user_data = TextBlock(user_json)

    response = client.invoke(input=[request, event_data, user_data])

    text = ""
    for block in response.content:
        if isinstance(block, TextBlock):
            text += block.content + "\n"

    return text.strip()

