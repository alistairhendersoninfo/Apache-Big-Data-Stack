from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("SQL Example").getOrCreate()

# Read data
df = spark.read.parquet("sales_data.parquet")

# Register as temp view
df.createOrReplaceTempView("sales")

# SQL queries
result = spark.sql("""
    SELECT
        category,
        country,
        COUNT(*) as order_count,
        SUM(amount) as total_revenue,
        AVG(amount) as avg_order_value
    FROM sales
    WHERE amount > 100
    GROUP BY category, country
    HAVING total_revenue > 10000
    ORDER BY total_revenue DESC
""")

result.show(20)

# Complex query with CTEs
result2 = spark.sql("""
    WITH customer_stats AS (
        SELECT
            customer_id,
            COUNT(*) as num_orders,
            SUM(amount) as lifetime_value
        FROM sales
        GROUP BY customer_id
    )
    SELECT
        CASE
            WHEN lifetime_value > 10000 THEN 'VIP'
            WHEN lifetime_value > 5000 THEN 'Premium'
            WHEN lifetime_value > 1000 THEN 'Regular'
            ELSE 'New'
        END as customer_tier,
        COUNT(*) as customer_count,
        AVG(lifetime_value) as avg_ltv
    FROM customer_stats
    GROUP BY customer_tier
    ORDER BY avg_ltv DESC
""")

result2.show()