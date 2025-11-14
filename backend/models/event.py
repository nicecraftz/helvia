class Event:
    def __init__(
        self, title, subtitle, to_whom, brief_description, extended_description,
        start_datetime, end_datetime, topics, contacts, costs, image_url, link
    ):
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
