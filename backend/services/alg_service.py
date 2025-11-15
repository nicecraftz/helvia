from models.user import User

def calculate_macro_interest(user: User):
    macro_map = {
        "Musica": ["musica"],
        "Cultura": ["arte", "cinema", "teatro"],
        "Sociale": ["workshop", "sociale"]
    }

    user_interests = [i.interest_name.lower() for i in user.interests]
    macro_counts = {macro: 0 for macro in macro_map}
    total_matches = 0
    for interest in user_interests:
        for macro, tags in macro_map.items():
            if interest in tags:
                macro_counts[macro] += 1
                total_matches += 1
                break

    if total_matches == 0:
        return {macro: 0.0 for macro in macro_map}

    macro_percentages = {
        macro: round((count / total_matches) * 100, 2)
        for macro, count in macro_counts.items()
    }

    return macro_percentages
