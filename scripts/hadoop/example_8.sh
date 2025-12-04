# Check HDFS health
hdfs dfsadmin -report

# Safe mode operations (prevents writes)
hdfs dfsadmin -safemode get
hdfs dfsadmin -safemode enter
hdfs dfsadmin -safemode leave

# Check filesystem
hdfs fsck /