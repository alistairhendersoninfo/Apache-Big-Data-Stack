// Druid SQL query via REST API
async function queryDruid(sql) {
  const response = await fetch('http://druid-broker:8082/druid/v2/sql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: sql,
      resultFormat: 'object'
    })
  });

  return response.json();
}

// Time series data for line chart
const timeseriesData = await queryDruid(`
  SELECT
    TIME_FLOOR(__time, 'PT1M') AS minute,
    COUNT(*) AS events
  FROM events
  WHERE __time >= CURRENT_TIMESTAMP - INTERVAL '1' HOUR
  GROUP BY 1
  ORDER BY 1
`);