-- View raw data
SELECT * FROM sales_raw LIMIT 10;

-- Insert into optimized partitioned table
INSERT INTO TABLE sales_optimized PARTITION (year, month)
SELECT
    sale_id,
    product_name,
    category,
    amount,
    sale_date,
    region,
    YEAR(sale_date) as year,
    MONTH(sale_date) as month
FROM sales_raw;

-- Aggregation query
SELECT
    category,
    region,
    COUNT(*) as total_sales,
    SUM(amount) as revenue,
    AVG(amount) as avg_sale
FROM sales_optimized
WHERE year = 2024 AND month = 2
GROUP BY category, region
ORDER BY revenue DESC;

-- Window function example
SELECT
    product_name,
    amount,
    sale_date,
    AVG(amount) OVER (PARTITION BY category) as category_avg,
    RANK() OVER (PARTITION BY category ORDER BY amount DESC) as rank_in_category
FROM sales_optimized
WHERE year = 2024;