-- Create view
CREATE VIEW high_value_sales AS
SELECT * FROM sales_optimized
WHERE amount > 500;

-- Create materialized view (cached results)
CREATE MATERIALIZED VIEW monthly_revenue AS
SELECT
    year,
    month,
    category,
    SUM(amount) as total_revenue
FROM sales_optimized
GROUP BY year, month, category;

-- Refresh materialized view
ALTER MATERIALIZED VIEW monthly_revenue REBUILD;