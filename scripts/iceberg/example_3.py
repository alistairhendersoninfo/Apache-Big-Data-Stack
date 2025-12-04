# Read from Iceberg table
orders = spark.table("local.sales_db.orders")

print("=== Total Orders ===")
print(f"Total: {orders.count()}")

print("\n=== Orders by Country ===")
orders.groupBy("country") \
    .agg(
        count("order_id").alias("num_orders"),
        sum("amount").alias("total_revenue")
    ) \
    .orderBy(desc("total_revenue")) \
    .show()

# Query with predicate pushdown (partition pruning)
recent_orders = spark.sql("""
    SELECT *
    FROM local.sales_db.orders
    WHERE order_date >= DATE_SUB(CURRENT_DATE, 30)
""")

print(f"\nOrders in last 30 days: {recent_orders.count()}")