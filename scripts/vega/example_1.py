import altair as alt
import pandas as pd

df = pd.read_parquet('sales.parquet')

# Interactive linked charts
brush = alt.selection_interval()

points = alt.Chart(df).mark_point().encode(
    x='revenue:Q',
    y='profit:Q',
    color=alt.condition(brush, 'category:N', alt.value('lightgray'))
).add_selection(brush).properties(width=400, height=300)

bars = alt.Chart(df).mark_bar().encode(
    x='count()',
    y='category:N',
    color='category:N'
).transform_filter(brush).properties(width=400, height=300)

chart = points | bars
chart.save('dashboard.html')