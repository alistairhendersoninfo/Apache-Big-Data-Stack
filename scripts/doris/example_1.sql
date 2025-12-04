-- Create database
CREATE DATABASE ecommerce;
USE ecommerce;

-- Create orders table (Duplicate Key model for analytics)
CREATE TABLE orders (
    order_id BIGINT,
    user_id INT,
    product_id INT,
    amount DECIMAL(10,2),
    order_date DATE,
    country VARCHAR(50)
)
DUPLICATE KEY(order_id)
PARTITION BY RANGE(order_date) (
    PARTITION p202401 VALUES LESS THAN ("2024-02-01"),
    PARTITION p202402 VALUES LESS THAN ("2024-03-01"),
    PARTITION p202403 VALUES LESS THAN ("2024-04-01")
)
DISTRIBUTED BY HASH(order_id) BUCKETS 10
PROPERTIES (
    "replication_num" = "1",
    "storage_format" = "V2"
);

-- Show table structure
DESC orders;