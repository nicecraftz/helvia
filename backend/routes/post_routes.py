from flask import Blueprint, request
import requests
from models.event import Event

post_bp = Blueprint('post', __name__, url_prefix='/api/post')

@post_bp.get('/all')
def get_all_posts():
    url = "https://www.comune.macerata.it/wp-json/rest_api_ws/v1/getEventi"
    response = requests.get(url)
    value = response.json()
    events = [Event.from_dict(item) for item in value]
    return {"events": [event.__dict__ for event in events]}

@post_bp.post('/create')
def create_post():
    data = request.get_json()
    title = data.get('title')
    content = data.get('content')
    tags = data.get('tags', [])
        
    return {
        "message": "Post created successfully",
        "post": {
            "title": title,
            "content": content,
            "tags": tags
        }
    }, 201