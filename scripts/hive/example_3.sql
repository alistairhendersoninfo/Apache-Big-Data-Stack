-- Update records
UPDATE sales_optimized
SET amount = amount * 1.1
WHERE category = 'Electronics' AND year = 2024;

-- Delete records
DELETE FROM sales_optimized
WHERE amount < 100 AND year = 2024 AND month = 1;

-- Merge (UPSERT) operation
MERGE INTO sales_optimized AS target
USING sales_updates AS source
ON target.sale_id = source.sale_id
WHEN MATCHED THEN UPDATE SET amount = source.amount
WHEN NOT MATCHED THEN INSERT VALUES (
    source.sale_id,
    source.product_name,
    source.category,
    source.amount,
    source.sale_date,
    source.region,
    YEAR(source.sale_date),
    MONTH(source.sale_date)
);