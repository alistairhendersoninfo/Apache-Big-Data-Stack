-- Query Parquet directly (auto-discovers schema)
SELECT * FROM dfs.`/data/sales.parquet` LIMIT 100;

-- Join Parquet and JSON
SELECT p.product_name, j.category
FROM dfs.`/data/products.parquet` p
JOIN dfs.`/data/categories.json` j
ON p.category_id = j.id;