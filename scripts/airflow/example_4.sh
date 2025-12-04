# Manually trigger DAG
airflow dags trigger sales_etl_pipeline

# List all DAGs
airflow dags list

# Test specific task
airflow tasks test sales_etl_pipeline extract_sales 2024-01-15