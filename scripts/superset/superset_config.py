import os

# Security
SECRET_KEY = os.environ.get('SUPERSET_SECRET_KEY')
CSRF_ENABLED = True

# Database
SQLALCHEMY_DATABASE_URI = 'postgresql://user:pass@localhost/superset'

# Cache (Redis recommended)
CACHE_CONFIG = {
    'CACHE_TYPE': 'redis',
    'CACHE_REDIS_URL': 'redis://localhost:6379/0'
}

# Feature flags
FEATURE_FLAGS = {
    'ENABLE_TEMPLATE_PROCESSING': True,
    'DASHBOARD_NATIVE_FILTERS': True,
}

# Row limit
ROW_LIMIT = 50000
SQL_MAX_ROW = 100000