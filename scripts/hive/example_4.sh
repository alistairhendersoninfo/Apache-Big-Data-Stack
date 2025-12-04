# Create Hive directories in HDFS
hdfs dfs -mkdir -p /user/hive/warehouse
hdfs dfs -mkdir -p /tmp/hive
hdfs dfs -chmod 777 /tmp/hive
hdfs dfs -chmod 777 /user/hive/warehouse

# Initialize the metastore schema
schematool -dbType mysql -initSchema

# Start HiveServer2
hiveserver2 &

# Or start Hive CLI
hive