# In Jupyter notebook
import perspective
import pandas as pd
import numpy as np

# Create sample data
df = pd.DataFrame({
    "symbol": np.random.choice(["AAPL", "GOOGL", "MSFT"], 10000),
    "price": np.random.uniform(100, 500, 10000),
    "volume": np.random.randint(100, 10000, 10000),
    "timestamp": pd.date_range("2024-01-01", periods=10000, freq="s")
})

# Create Perspective widget
widget = perspective.PerspectiveWidget(
    df,
    plugin="Y Line",
    group_by=["timestamp"],
    split_by=["symbol"],
    columns=["price"],
    aggregates={"price": "avg"}
)

# Display interactive widget
widget