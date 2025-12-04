from pyspark.sql import SparkSession
from pyspark.sql.functions import *
from pyspark.sql.window import Window

# Create Spark session
spark = SparkSession.builder \
    .appName("Sales Analytics") \
    .config("spark.driver.memory", "4g") \
    .config("spark.executor.memory", "4g") \
    .getOrCreate()

# Read Parquet file
df = spark.read.parquet("sales_data.parquet")

print("=== Dataset Info ===")
df.printSchema()
print(f"Total records: {df.count()}")

# 1. Total sales by category
print("\n=== Total Sales by Category ===")
sales_by_category = df.groupBy("category") \
    .agg(
        count("order_id").alias("total_orders"),
        sum("amount").alias("total_revenue"),
        avg("amount").alias("avg_order_value")
    ) \
    .orderBy(desc("total_revenue"))

sales_by_category.show()

# 2. Top 10 customers by spending
print("\n=== Top 10 Customers ===")
top_customers = df.groupBy("customer_id") \
    .agg(
        count("order_id").alias("num_orders"),
        sum("amount").alias("total_spent")
    ) \
    .orderBy(desc("total_spent")) \
    .limit(10)

top_customers.show()

# 3. Monthly revenue trend
print("\n=== Monthly Revenue Trend ===")
monthly_revenue = df.withColumn("month", date_format("timestamp", "yyyy-MM")) \
    .groupBy("month") \
    .agg(sum("amount").alias("revenue")) \
    .orderBy("month")

monthly_revenue.show()

# 4. Revenue by country
print("\n=== Revenue by Country ===")
country_revenue = df.groupBy("country") \
    .agg(
        count("*").alias("orders"),
        sum("amount").alias("revenue")
    ) \
    .orderBy(desc("revenue"))

country_revenue.show()

# 5. Product performance with window functions
print("\n=== Top 5 Products per Category ===")
window_spec = Window.partitionBy("category").orderBy(desc("product_revenue"))

product_performance = df.groupBy("category", "product_id") \
    .agg(
        count("order_id").alias("sales_count"),
        sum("amount").alias("product_revenue")
    ) \
    .withColumn("rank", row_number().over(window_spec)) \
    .filter(col("rank") <= 5) \
    .orderBy("category", "rank")

product_performance.show(25)

# 6. Cache for repeated analysis
df.cache()

# 7. Save results
sales_by_category.write \
    .mode("overwrite") \
    .parquet("output/sales_by_category")

print("\n=== Analysis Complete ===")

# Stop Spark
spark.stop()