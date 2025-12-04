# Update records
spark.sql("""
    UPDATE local.sales_db.orders
    SET amount = amount * 1.1
    WHERE country = 'US'
""")

# Delete records
spark.sql("""
    DELETE FROM local.sales_db.orders
    WHERE order_date < DATE_SUB(CURRENT_DATE, 365)
""")

# Merge (UPSERT)
updates_df = spark.createDataFrame([
    ('ORD-00001', 150, 9999.99),
    ('ORD-99999', 200, 5000.00)
], ['order_id', 'customer_id', 'amount'])

updates_df.createOrReplaceTempView("updates")

spark.sql("""
    MERGE INTO local.sales_db.orders t
    USING updates s
    ON t.order_id = s.order_id
    WHEN MATCHED THEN
        UPDATE SET t.amount = s.amount
    WHEN NOT MATCHED THEN
        INSERT (order_id, customer_id, amount)
        VALUES (s.order_id, s.customer_id, s.amount)
""")