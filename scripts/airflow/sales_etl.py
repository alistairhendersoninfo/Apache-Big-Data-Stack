from datetime import datetime, timedelta
from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.operators.bash import BashOperator
from airflow.providers.postgres.operators.postgres import PostgresOperator
import pandas as pd

# Default arguments for all tasks
default_args = {
    'owner': 'data-team',
    'depends_on_past': False,
    'start_date': datetime(2024, 1, 1),
    'email_on_failure': True,
    'email': ['data@example.com'],
    'retries': 2,
    'retry_delay': timedelta(minutes=5),
}

# Define DAG
dag = DAG(
    'sales_etl_pipeline',
    default_args=default_args,
    description='Daily sales data ETL',
    schedule='0 2 * * *',  # Run daily at 2 AM
    catchup=False,
    tags=['sales', 'etl'],
)

# Task 1: Extract data from API
def extract_sales_data(**context):
    # Simulate API call
    data = {
        'sale_id': [1, 2, 3],
        'amount': [100, 200, 150],
        'date': ['2024-01-15'] * 3
    }
    df = pd.DataFrame(data)
    df.to_csv('/tmp/sales_raw.csv', index=False)
    print(f"Extracted {len(df)} sales records")

extract_task = PythonOperator(
    task_id='extract_sales',
    python_callable=extract_sales_data,
    dag=dag,
)

# Task 2: Transform data
def transform_sales_data(**context):
    df = pd.read_csv('/tmp/sales_raw.csv')
    # Add 10% tax
    df['amount_with_tax'] = df['amount'] * 1.1
    df.to_csv('/tmp/sales_transformed.csv', index=False)
    print(f"Transformed {len(df)} records")

transform_task = PythonOperator(
    task_id='transform_sales',
    python_callable=transform_sales_data,
    dag=dag,
)

# Task 3: Load to warehouse (simulated)
load_task = BashOperator(
    task_id='load_to_warehouse',
    bash_command='echo "Loading data to warehouse..." && sleep 2',
    dag=dag,
)

# Task 4: Send notification
notify_task = BashOperator(
    task_id='send_notification',
    bash_command='echo "ETL pipeline completed successfully"',
    dag=dag,
)

# Define task dependencies
extract_task >> transform_task >> load_task >> notify_task