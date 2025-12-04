# Download latest release
wget https://downloads.metabase.com/latest/metabase.jar

# Run with Java
java -jar metabase.jar

# With external PostgreSQL database
export MB_DB_TYPE=postgres
export MB_DB_HOST=localhost
export MB_DB_DBNAME=metabase
export MB_DB_USER=metabase
export MB_DB_PASS=password
java -jar metabase.jar