from airflow.providers.apache.spark.operators.spark_submit import SparkSubmitOperator
from airflow.providers.amazon.aws.sensors.s3 import S3KeySensor

# Wait for S3 file
wait_for_file = S3KeySensor(
    task_id='wait_for_data',
    bucket_name='my-bucket',
    bucket_key='data/input/*.parquet',
    aws_conn_id='aws_default',
    timeout=3600,
    poke_interval=60,
    dag=dag,
)

# Run Spark job
spark_job = SparkSubmitOperator(
    task_id='process_with_spark',
    application='/path/to/spark_job.py',
    conn_id='spark_default',
    conf={
        'spark.executor.memory': '4g',
        'spark.executor.cores': '2'
    },
    dag=dag,
)

wait_for_file >> spark_job