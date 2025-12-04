-- Get all tweets
SELECT * FROM tweets;

-- Find popular tweets
SELECT t.text, t.likes, t.retweets
FROM tweets t
WHERE t.likes > 50
ORDER BY t.likes DESC;

-- Analyze hashtags
SELECT h AS hashtag, COUNT(*) AS tweet_count
FROM tweets t, t.hashtags h
GROUP BY h
ORDER BY tweet_count DESC;

-- Time-based aggregation
SELECT
    get-day(t.created_at) AS day,
    COUNT(*) AS tweets,
    SUM(t.likes) AS total_likes
FROM tweets t
GROUP BY get-day(t.created_at);