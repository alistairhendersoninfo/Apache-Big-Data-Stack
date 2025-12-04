-- Total revenue
SELECT SUM(amount) as total_revenue FROM orders;

-- Revenue by country
SELECT
    country,
    COUNT(*) as order_count,
    SUM(amount) as revenue,
    AVG(amount) as avg_order_value
FROM orders
GROUP BY country
ORDER BY revenue DESC;

-- Daily revenue trend
SELECT
    order_date,
    COUNT(*) as orders,
    SUM(amount) as revenue
FROM orders
GROUP BY order_date
ORDER BY order_date;

-- Top users by spending
SELECT
    user_id,
    COUNT(*) as orders,
    SUM(amount) as total_spent
FROM orders
GROUP BY user_id
ORDER BY total_spent DESC
LIMIT 10;