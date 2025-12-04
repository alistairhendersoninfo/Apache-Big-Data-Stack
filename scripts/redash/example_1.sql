-- Sales report with date and category filters
SELECT
  DATE_TRUNC('day', order_date) AS date,
  category,
  SUM(revenue) AS total_revenue,
  COUNT(*) AS order_count
FROM orders o
JOIN products p ON o.product_id = p.id
WHERE order_date BETWEEN '{{start_date}}' AND '{{end_date}}'
  AND category = '{{category}}'
GROUP BY 1, 2
ORDER BY 1