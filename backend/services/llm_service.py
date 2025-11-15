from datapizza.agents import Agent
from datapizza.clients.openai import OpenAIClient
from datapizza.type import Media, MediaBlock, TextBlock
import os

from models.event import Event
from models.user import User

import json

OPEN_AI_API_KEY = os.getenv("OPEN_AI_API_KEY", "your_default_key")
client = OpenAIClient(api_key=OPEN_AI_API_KEY)

def get_event_reccomendation(event: Event, user: User) -> str:
    request = TextBlock("Dati i dettagli di un evento, fornisci una raccomandazione personalizzata su misura per l'utente basata sui suoi interessi")
    event_data = TextBlock(json.dumps(event.__dict__, ensure_ascii=False))
    user_data = TextBlock(json.dumps(user.__dict__, ensure_ascii=False))
    response = client.invoke(input=[request, event_data, user_data])

    text = ""
    for block in response.content:
        if isinstance(block, TextBlock):
            text += block.text + "\n"
    
    return text.strip()
