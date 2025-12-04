-- Grant privileges
GRANT SELECT ON TABLE sales_optimized TO USER alice;
GRANT ALL ON DATABASE sales_db TO ROLE analyst;

-- Revoke privileges
REVOKE SELECT ON TABLE sales_optimized FROM USER bob;