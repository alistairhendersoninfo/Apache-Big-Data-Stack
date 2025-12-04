-- Create dataverse (like database)
CREATE DATAVERSE social_media;
USE social_media;

-- Define type for tweets
CREATE TYPE TweetType AS {
    id: int64,
    user_id: int64,
    text: string,
    hashtags: [string],
    created_at: datetime,
    likes: int32,
    retweets: int32
};

-- Create dataset
CREATE DATASET tweets(TweetType)
PRIMARY KEY id;