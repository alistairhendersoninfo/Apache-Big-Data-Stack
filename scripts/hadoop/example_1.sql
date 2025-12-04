-- Hive stores data in HDFS
CREATE TABLE sales (
    id INT,
    product STRING,
    amount DECIMAL(10,2)
)
STORED AS PARQUET
LOCATION '/user/hive/warehouse/sales';