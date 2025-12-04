from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("Parquet").getOrCreate()

# Read Parquet
df = spark.read.parquet("s3://bucket/sales.parquet")

# Write Parquet with partitioning
df.write.mode("overwrite") \
    .partitionBy("year", "month") \
    .parquet("s3://bucket/sales_partitioned/")

# Query directly
spark.sql("SELECT * FROM parquet.`s3://bucket/sales.parquet`")