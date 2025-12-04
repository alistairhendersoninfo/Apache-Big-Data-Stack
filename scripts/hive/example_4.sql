-- Show partitions
SHOW PARTITIONS sales_optimized;

-- Add partition manually
ALTER TABLE sales_optimized
ADD PARTITION (year=2024, month=4);

-- Drop partition
ALTER TABLE sales_optimized
DROP PARTITION (year=2023, month=1);

-- Dynamic partitioning (automatically creates partitions)
SET hive.exec.dynamic.partition=true;
SET hive.exec.dynamic.partition.mode=nonstrict;