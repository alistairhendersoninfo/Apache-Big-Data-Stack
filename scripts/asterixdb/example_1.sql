-- Insert sample tweets
INSERT INTO tweets ([
    {
        "id": 1,
        "user_id": 101,
        "text": "Loving Apache AsterixDB for big data!",
        "hashtags": ["BigData", "AsterixDB"],
        "created_at": datetime("2024-01-15T10:30:00"),
        "likes": 45,
        "retweets": 12
    },
    {
        "id": 2,
        "user_id": 102,
        "text": "Real-time analytics made easy",
        "hashtags": ["Analytics", "RealTime"],
        "created_at": datetime("2024-01-15T11:00:00"),
        "likes": 89,
        "retweets": 23
    }
]);