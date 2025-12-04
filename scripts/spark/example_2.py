from pyspark.sql import SparkSession
from pyspark.sql.functions import *
from pyspark.sql.types import *

spark = SparkSession.builder \
    .appName("Real-time Sales") \
    .getOrCreate()

# Define schema
schema = StructType([
    StructField("order_id", StringType()),
    StructField("customer_id", IntegerType()),
    StructField("amount", DoubleType()),
    StructField("category", StringType()),
    StructField("timestamp", TimestampType())
])

# Read from Kafka
sales_stream = spark.readStream \
    .format("kafka") \
    .option("kafka.bootstrap.servers", "localhost:9092") \
    .option("subscribe", "orders") \
    .load()

# Parse JSON
parsed_stream = sales_stream \
    .select(from_json(col("value").cast("string"), schema).alias("data")) \
    .select("data.*")

# Aggregate: revenue per category per 5-minute window
windowed_revenue = parsed_stream \
    .withWatermark("timestamp", "10 minutes") \
    .groupBy(
        window("timestamp", "5 minutes", "1 minute"),
        "category"
    ) \
    .agg(
        count("order_id").alias("num_orders"),
        sum("amount").alias("revenue")
    )

# Write to console
query = windowed_revenue.writeStream \
    .outputMode("update") \
    .format("console") \
    .option("truncate", False) \
    .start()

query.awaitTermination()