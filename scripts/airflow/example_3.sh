# Start webserver (terminal 1)
airflow webserver --port 8080

# Start scheduler (terminal 2 - new terminal)
source ~/airflow-venv/bin/activate
export AIRFLOW_HOME=~/airflow
airflow scheduler

# Access Web UI
# http://localhost:8080
# Login: admin / admin123