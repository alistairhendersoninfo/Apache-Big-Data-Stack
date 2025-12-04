# Download Iceberg JAR for Spark 3.5
wget https://repo1.maven.org/maven2/org/apache/iceberg/iceberg-spark-runtime-3.5_2.12/1.5.0/iceberg-spark-runtime-3.5_2.12-1.5.0.jar

# Copy to Spark jars directory
cp iceberg-spark-runtime-3.5_2.12-1.5.0.jar $SPARK_HOME/jars/