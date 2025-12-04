-- Create B-tree index on user_id
CREATE INDEX user_idx ON tweets(user_id);

-- Create keyword index for full-text search
CREATE INDEX text_idx ON tweets(text) TYPE KEYWORD;

-- Query using index
SELECT * FROM tweets
WHERE contains(text, "analytics");