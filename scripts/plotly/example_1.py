import plotly.express as px
import pandas as pd

# Load data
df = pd.read_parquet('sales_data.parquet')

# Interactive scatter with trendline
fig = px.scatter(
    df,
    x='revenue',
    y='profit',
    color='category',
    size='volume',
    hover_data=['product_name'],
    trendline='ols',
    title='Revenue vs Profit by Category'
)

fig.update_layout(template='plotly_dark')
fig.show()

# Animated time series
fig = px.line(
    df,
    x='date',
    y='value',
    color='region',
    animation_frame='year',
    range_y=[0, df['value'].max() * 1.1]
)
fig.show()