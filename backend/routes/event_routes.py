from flask import Blueprint, jsonify
import requests
from models.event import Event
from datetime import datetime

TTL = 300

event_bp = Blueprint('event', __name__, url_prefix='/api/event')
cache: list[Event] = []
last_fetch: datetime | None = None

@event_bp.get('/')
def get_events():
    global cache, last_fetch
    if last_fetch is None or (datetime.now() - last_fetch).total_seconds() > TTL:
        url = "https://www.comune.macerata.it/wp-json/rest_api_ws/v1/getEventi"
        response = requests.get(url, timeout=10, headers={
            "Accept": "application/json",
            "User-Agent": "helvia-backend/1.0"
        })

        data = response.json()
        cache = [Event.from_dict(item) for item in data]
        last_fetch = datetime.now()

    return jsonify([e.__dict__ for e in cache]), 200

@event_bp.get('/<int:event_id>')
def get_event(event_id: int):
    for event in cache:
        if event.id == event_id:
            return jsonify(event.__dict__), 200
    return {"error": "Event not found"}, 404
