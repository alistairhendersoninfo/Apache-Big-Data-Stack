-- Create feed from file
CREATE FEED tweet_feed USING file_feed
(("type"="localfs"),
 ("path"="localhost:///data/tweets.json"),
 ("format"="json"));

-- Connect feed to dataset
CONNECT FEED tweet_feed TO DATASET tweets;

-- Start feed
START FEED tweet_feed;

-- Stop feed
STOP FEED tweet_feed;