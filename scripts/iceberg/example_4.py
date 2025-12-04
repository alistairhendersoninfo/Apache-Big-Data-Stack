# Add new column without rewriting data
spark.sql("""
    ALTER TABLE local.sales_db.orders
    ADD COLUMN shipping_address STRING
""")

# Rename column
spark.sql("""
    ALTER TABLE local.sales_db.orders
    RENAME COLUMN product TO product_name
""")

# Drop column
spark.sql("""
    ALTER TABLE local.sales_db.orders
    DROP COLUMN shipping_address
""")

# Show updated schema
spark.table("local.sales_db.orders").printSchema()