# Add Spark run configuration in Hop GUI
# Metadata → Pipeline Run Configuration → New
# Name: Spark-Cluster
# Engine: Spark
# Master: spark://master:7077

# Pipeline runs on Spark cluster
/opt/hop/hop-run.sh \
  --file=sales_etl_pipeline.hpl \
  --runconfig=Spark-Cluster