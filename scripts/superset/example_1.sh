# Create virtual environment
python3 -m venv superset-venv
source superset-venv/bin/activate

# Install Superset
pip install apache-superset

# Set secret key (required)
export SUPERSET_SECRET_KEY=$(openssl rand -base64 42)

# Initialize database
superset db upgrade

# Create admin user
superset fab create-admin \
  --username admin \
  --firstname Admin \
  --lastname User \
  --email admin@example.com \
  --password admin

# Load examples (optional)
superset load_examples

# Initialize Superset
superset init

# Start development server
superset run -p 8088 --with-threads --reload