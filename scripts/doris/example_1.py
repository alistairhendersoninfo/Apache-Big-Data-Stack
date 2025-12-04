import pymysql

# Connect to Doris
conn = pymysql.connect(
    host='127.0.0.1',
    port=9030,
    user='root',
    password='',
    database='ecommerce'
)

cursor = conn.cursor()

# Query data
cursor.execute("""
    SELECT country, SUM(amount) as revenue
    FROM orders
    GROUP BY country
    ORDER BY revenue DESC
""")

results = cursor.fetchall()
for row in results:
    print(f"Country: {row[0]}, Revenue: ${row[1]}")

cursor.close()
conn.close()