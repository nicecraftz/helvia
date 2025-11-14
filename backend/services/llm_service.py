from datapizza.agents import Agent
from datapizza.clients.openai import OpenAIClient
import os

from models.event import Event
from models.user import UserInterest

import json

OPEN_AI_API_KEY = os.getenv("OPEN_AI_API_KEY", "your_default_key")

client = OpenAIClient(api_key=OPEN_AI_API_KEY)

profile_agent = Agent(client=client, name="UserProfileAgent", description="An agent to analyze user profiles and provide insights.", system_prompt="You are an agent that analyzes user profiles based on provided data and gives insights about their interests and preferences.")

event_agent = Agent(client=client, name="EventRecommendationAgent", description="An agent to analyze events and help recommend them to users.", system_prompt="You are an agent that analyzes event data and helps recommend events to users based on their profiles.")

def get_user_profile_analysis(interests: list[UserInterest]) -> str:
    response = profile_agent.run(json.dumps([interest.__dict__ for interest in interests]))
    return response

def get_event_recommendations(event: Event) -> str:
    response = event_agent.run(json.dumps(event.__dict__))
    return response