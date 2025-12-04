import pyarrow.compute as pc

# Filter
filtered = table.filter(pc.field("age") > 30)

# Aggregations
mean_salary = pc.mean(table["salary"])
max_age = pc.max(table["age"])

# String operations
upper_names = pc.utf8_upper(table["name"])

# Sorting
sorted_table = table.sort_by([("salary", "descending")])

# Group by aggregation
from pyarrow import acero
# Use acero for complex aggregations