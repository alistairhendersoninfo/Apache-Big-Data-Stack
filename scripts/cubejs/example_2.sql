-- Connect via psql to Cube SQL API (port 15432)
-- psql -h localhost -p 15432 -U cube

-- Query using familiar SQL syntax
SELECT
  DATE_TRUNC('month', "Orders.createdAt") AS month,
  "Customers.segment" AS segment,
  SUM("Orders.totalRevenue") AS revenue,
  COUNT("Orders.count") AS orders
FROM Orders
CROSS JOIN Customers
WHERE "Orders.createdAt" >= '2024-01-01'
GROUP BY 1, 2
ORDER BY 1, 2;

-- Use pre-aggregations automatically
SELECT
  "Products.category",
  SUM("OrderItems.lineTotal") AS total_sales,
  SUM("OrderItems.quantity") AS units_sold
FROM OrderItems
CROSS JOIN Products
GROUP BY 1
ORDER BY 2 DESC
LIMIT 10;