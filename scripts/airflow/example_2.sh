# Create virtual environment
python3 -m venv ~/airflow-venv
source ~/airflow-venv/bin/activate

# Set Airflow home
export AIRFLOW_HOME=~/airflow
mkdir -p $AIRFLOW_HOME

# Install Airflow 2.8
AIRFLOW_VERSION=2.8.0
PYTHON_VERSION="$(python3 --version | cut -d " " -f 2 | cut -d "." -f 1-2)"
CONSTRAINT_URL="https://raw.githubusercontent.com/apache/airflow/constraints-${AIRFLOW_VERSION}/constraints-${PYTHON_VERSION}.txt"

pip install "apache-airflow==${AIRFLOW_VERSION}" --constraint "${CONSTRAINT_URL}"

# Initialize database
airflow db init

# Create admin user
airflow users create \
  --username admin \
  --firstname Admin \
  --lastname User \
  --role Admin \
  --email admin@example.com \
  --password admin123