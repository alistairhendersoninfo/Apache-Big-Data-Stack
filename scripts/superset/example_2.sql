-- SQL Lab supports advanced features

-- CTEs (Common Table Expressions)
WITH monthly_sales AS (
    SELECT DATE_TRUNC('month', sale_date) as month,
           SUM(amount) as revenue
    FROM sales
    GROUP BY 1
)
SELECT * FROM monthly_sales ORDER BY month;

-- Save queries for reuse
-- Create datasets from queries
-- Schedule queries (with Celery)
-- Export results to CSV