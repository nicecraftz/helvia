from models.event import Event
from models.customer import Customer
from Alchemy import db

def create(payload: dict, customer: Customer):
    new_event = Event.from_dict(payload)
    new_event.author_id = customer.id
    db.session.add(new_event)
    db.session.commit()
    
    return {"message": "Event created successfully", "event_id": new_event.id}

