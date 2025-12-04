# Change partitioning without rewriting data
spark.sql("""
    ALTER TABLE local.sales_db.orders
    ADD PARTITION FIELD country
""")

# Remove partition field
spark.sql("""
    ALTER TABLE local.sales_db.orders
    DROP PARTITION FIELD order_date
""")

# View partition spec evolution
spec_history = spark.sql("SELECT * FROM local.sales_db.orders.refs")
spec_history.show()