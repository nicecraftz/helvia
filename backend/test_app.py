from flask import Flask
import requests
from models.event import Event

app = Flask("helvia-backend")

@app.get("/")
def get_all_posts():
    url = "https://www.comune.macerata.it/wp-json/rest_api_ws/v1/getEventi"
    response = requests.get(url, timeout=10, headers={
        "Accept": "application/json",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36"
    })
    value = response.json()
    events = [Event.from_dict(item) for item in value]
    return {"events": [event.__dict__ for event in events]}
