// Fetch aggregated data from Druid for ECharts
async function fetchDruidTimeSeries(
  metric: string,
  granularity: string,
  hours: number
): Promise<any[]> {
  const query = {
    queryType: 'timeseries',
    dataSource: 'events',
    granularity,
    intervals: [`PT${hours}H/now`],
    aggregations: [
      { type: 'count', name: 'count' },
      { type: 'doubleSum', fieldName: metric, name: 'value' }
    ]
  };

  const response = await fetch('http://druid:8082/druid/v2', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(query)
  });

  const data = await response.json();

  // Transform for ECharts
  return data.map((item: any) => [
    new Date(item.timestamp).getTime(),
    item.result.value
  ]);
}

// Update chart with Druid data
const druidData = await fetchDruidTimeSeries('revenue', 'minute', 24);
chart.setOption({
  series: [{ data: druidData }]
});