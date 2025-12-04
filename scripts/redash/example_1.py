import requests

REDASH_URL = 'https://redash.example.com'
API_KEY = 'your-api-key'

# Execute query
response = requests.post(
    f'{REDASH_URL}/api/queries/42/results',
    headers={'Authorization': f'Key {API_KEY}'},
    json={'parameters': {'start_date': '2024-01-01', 'category': 'Electronics'}}
)

data = response.json()['query_result']['data']['rows']