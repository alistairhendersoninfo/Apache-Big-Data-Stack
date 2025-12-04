-- Create rollup for country aggregations
ALTER TABLE orders
ADD ROLLUP rollup_country (country, order_date, amount);

-- Check rollup status
SHOW ALTER TABLE ROLLUP FROM ecommerce;

-- Query will automatically use rollup
SELECT country, SUM(amount)
FROM orders
GROUP BY country;