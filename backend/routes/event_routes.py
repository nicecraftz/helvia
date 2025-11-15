from services.event_service import create
from models.customer import Customer
from flask import Blueprint, request
from utils.auth import require_auth
from models.event import Event
from app import db,SECRET_KEY
from models.user import User

import jwt

event_bp = Blueprint('event', __name__, url_prefix='/api/event')

@event_bp.get('/')
def get_events():
    events : list[Event] = Event.query.all()
    all_events = {event.id: event for event in events}
    return [event.to_dict() for event in all_events.values()], 200

@event_bp.post('/')
@require_auth
def create_event():
    payload = request.get_json()
    token = request.headers.get("Authorization").split(" ")[1]
    decoded_jwt = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
    customer = Customer.query.filter_by(id=decoded_jwt.get("customer_id")).first()
    
    if not customer:
        return {
            "error": "Customer not found"
        }, 404
    
    return create(payload, customer)

@event_bp.put('/<int:event_id>/participate')
@require_auth
def participate_event(event_id: int):
    token = request.headers.get("Authorization").split(" ")[1]
    decoded_jwt = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
    user = User.query.filter_by(id=decoded_jwt.get("user_id")).first()

    if not user:
        return {
            "error": "Customer not found"
        }, 404
    
    event = Event.query.filter_by(id=event_id).first()
    if not event:
        return {
            "error": "Event not found"
        }, 404
    
    if user in event.participants:
        return {
            "message": "Customer already participating in the event"
        }, 200
    
    # TODO: Fix relationship in event to store participants list and not the count.
    event.participants.append(user)
    event.participation_count += 1
    user.statistics.total_participated_events += 1
    
    db.session.commit()
    
    return {
        "message": "Customer successfully added to the event"
    }, 200

@event_bp.get('/<int:event_id>')
def get_event(event_id: int):
    event : Event = Event.query.filter_by(id=event_id).first()
    if event:
        return event.to_dict(), 200
    else:
        return {"error": "Event not found"}, 404
