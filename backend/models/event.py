class Event:
    def __init__(
        self, id, title, subtitle, to_whom, brief_description, extended_description,
        start_datetime, end_datetime, topics, contacts, costs, image_url, link
    ):
        self.id = id
        self.title = title
        self.subtitle = subtitle
        self.to_whom = to_whom
        self.brief_description = brief_description
        self.extended_description = extended_description
        self.start_datetime = start_datetime
        self.end_datetime = end_datetime
        self.topics = topics
        self.contacts = contacts
        self.costs = costs
        self.image_url = image_url
        self.link = link

    @staticmethod
    def from_dict(data: dict) -> 'Event':
        return Event(
            id=data.get("id", ""),
            title=data.get("titolo", ""),
            subtitle=data.get("sottotitolo", ""),
            to_whom=data.get("rivolto_a", ""),
            brief_description=data.get("descrizione_breve", ""),
            extended_description=data.get("descrizione_estesa", ""),
            start_datetime=data.get("da", ""),
            end_datetime=data.get("a", ""),
            topics=data.get("argomenti", []),
            contacts=data.get("contatti", []),
            costs=data.get("costi", []),
            image_url=data.get("immagine", ""),
            link=data.get("link", "")
        )
    
    @staticmethod
    def get_event_from_id(eventi : list['Event'], event_id: int) -> 'Event':
        for event in eventi:
            if event.id == event_id:
                return event
        return None
