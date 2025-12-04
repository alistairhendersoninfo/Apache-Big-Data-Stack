# Create input directory in HDFS
hdfs dfs -mkdir -p /user/$USER/input

# Create sample text file
cat > sample.txt << 'EOF'
Apache Hadoop is a framework for distributed storage and processing
Hadoop enables big data processing across clusters of computers
MapReduce is the original Hadoop processing paradigm
HDFS provides distributed fault-tolerant storage for Hadoop
EOF

# Upload to HDFS
hdfs dfs -put sample.txt /user/$USER/input/

# List files in HDFS
hdfs dfs -ls /user/$USER/input/

# View file contents from HDFS
hdfs dfs -cat /user/$USER/input/sample.txt

# Check HDFS storage usage
hdfs dfs -du -h /user/$USER/