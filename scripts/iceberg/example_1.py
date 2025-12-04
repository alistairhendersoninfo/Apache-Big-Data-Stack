from pyspark.sql import SparkSession
from pyspark.sql.functions import *

# Create Spark session with Iceberg
spark = SparkSession.builder \
    .appName("Iceberg Example") \
    .config("spark.jars.packages", "org.apache.iceberg:iceberg-spark-runtime-3.5_2.12:1.5.0") \
    .config("spark.sql.extensions", "org.apache.iceberg.spark.extensions.IcebergSparkSessionExtensions") \
    .config("spark.sql.catalog.local", "org.apache.iceberg.spark.SparkCatalog") \
    .config("spark.sql.catalog.local.type", "hadoop") \
    .config("spark.sql.catalog.local.warehouse", "/tmp/iceberg-warehouse") \
    .getOrCreate()

# Create database
spark.sql("CREATE DATABASE IF NOT EXISTS local.sales_db")

# Create Iceberg table
spark.sql("""
    CREATE TABLE IF NOT EXISTS local.sales_db.orders (
        order_id STRING,
        customer_id INT,
        product STRING,
        amount DOUBLE,
        order_date DATE,
        country STRING
    )
    USING iceberg
    PARTITIONED BY (order_date)
""")

print("Iceberg table created!")