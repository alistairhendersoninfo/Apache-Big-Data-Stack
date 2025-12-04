import pyarrow as pa
import pyarrow.compute as pc

# Create arrays
names = pa.array(["Alice", "Bob", "Charlie", "Diana"])
ages = pa.array([25, 30, 35, 28])
salaries = pa.array([50000.0, 75000.0, 90000.0, 65000.0])

# Create table
table = pa.table({
    "name": names,
    "age": ages,
    "salary": salaries
})

print(table)
print(f"Schema: {table.schema}")
print(f"Num rows: {table.num_rows}")