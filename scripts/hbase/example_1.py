import happybase

# Connect to HBase
connection = happybase.Connection('localhost')

# Open table
table = connection.table('user_activity')

# Put data
table.put(b'user004', {
    b'profile:name': b'Diana Prince',
    b'profile:email': b'diana@example.com',
    b'events:login_2024-01-17': b'08:00:00'
})

# Get data
row = table.row(b'user004')
print(f"Name: {row[b'profile:name'].decode()}")

# Scan table
for key, data in table.scan():
    print(f"Row: {key.decode()}")
    for col, val in data.items():
        print(f"  {col.decode()} => {val.decode()}")

# Delete
table.delete(b'user004')

connection.close()