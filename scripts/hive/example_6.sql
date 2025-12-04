-- Add JAR containing custom UDF
ADD JAR /path/to/custom-udf.jar;

-- Create temporary function
CREATE TEMPORARY FUNCTION my_upper AS 'com.example.MyUpperUDF';

-- Use in query
SELECT my_upper(product_name) FROM sales_raw;