-- Create database
CREATE DATABASE sales_db;
USE sales_db;

-- Create external table (data stored outside Hive)
CREATE EXTERNAL TABLE sales_raw (
    sale_id INT,
    product_name STRING,
    category STRING,
    amount DECIMAL(10,2),
    sale_date DATE,
    region STRING
)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY ','
STORED AS TEXTFILE
LOCATION '/user/data/sales_raw';

-- Create managed ORC table (optimized storage)
CREATE TABLE sales_optimized (
    sale_id INT,
    product_name STRING,
    category STRING,
    amount DECIMAL(10,2),
    sale_date DATE,
    region STRING
)
PARTITIONED BY (year INT, month INT)
CLUSTERED BY (sale_id) INTO 4 BUCKETS
STORED AS ORC
TBLPROPERTIES ('transactional'='true');