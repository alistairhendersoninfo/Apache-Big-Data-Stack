import requests
import json

# AsterixDB Query API
ASTERIX_URL = "http://localhost:19002/query/service"

def run_query(query):
    response = requests.post(
        ASTERIX_URL,
        data={"statement": query},
        headers={"Content-Type": "application/x-www-form-urlencoded"}
    )
    return response.json()

# Execute query
query = """
USE social_media;
SELECT t.text, t.likes
FROM tweets t
WHERE t.likes > 50
ORDER BY t.likes DESC;
"""

results = run_query(query)
print(json.dumps(results, indent=2))