# Run pipeline from command line
/opt/hop/hop-run.sh \
  --file=/path/to/sales_etl_pipeline.hpl \
  --runconfig=Local \
  --level=Basic \
  --parameters=INPUT_FILE=/tmp/sales_raw.csv

# Run with environment override
/opt/hop/hop-run.sh \
  --file=/path/to/sales_etl_pipeline.hpl \
  --environment=Production \
  --runconfig=Spark