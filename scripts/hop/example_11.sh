# Unit test pipeline with hop-run
/opt/hop/hop-run.sh \
  --file=tests/test_sales_pipeline.hpl \
  --runconfig=Test \
  --parameters=MODE=test

# Check exit code
if [ $? -eq 0 ]; then
    echo "Pipeline test passed"
else
    echo "Pipeline test failed"
    exit 1
fi