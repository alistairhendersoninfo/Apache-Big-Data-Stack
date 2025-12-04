from pyspark.sql import SparkSession

# Create Spark session with Hive support
spark = SparkSession.builder \
    .appName("Hive Integration") \
    .enableHiveSupport() \
    .getOrCreate()

# Query Hive tables using SparkSQL
df = spark.sql("SELECT * FROM sales_db.sales_optimized WHERE year = 2024")
df.show()

# Write DataFrame to Hive table
df.write.mode("overwrite") \
    .partitionBy("year", "month") \
    .saveAsTable("sales_db.spark_sales")

# Read using Hive table format
spark.table("sales_db.sales_optimized").count()