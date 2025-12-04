# Create sample CSV data
cat > sales_data.csv << 'EOF'
1,Laptop,Electronics,1299.99,2024-01-15,North
2,Chair,Furniture,299.99,2024-01-16,South
3,Keyboard,Electronics,79.99,2024-02-10,East
4,Desk,Furniture,599.99,2024-02-12,West
5,Monitor,Electronics,349.99,2024-03-05,North
6,Laptop,Electronics,1299.99,2024-03-08,South
EOF

# Upload to HDFS
hdfs dfs -mkdir -p /user/data/sales_raw
hdfs dfs -put sales_data.csv /user/data/sales_raw/