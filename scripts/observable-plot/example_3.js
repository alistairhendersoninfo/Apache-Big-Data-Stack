// Sanitize data before plotting
function safePlot(data, options) {
  const sanitizedData = data.map(d => {
    const clean = {};
    for (const [key, value] of Object.entries(d)) {
      if (typeof value === 'string') {
        clean[key] = value.slice(0, 1000);  // Limit string length
      } else if (typeof value === 'number' && isFinite(value)) {
        clean[key] = value;
      } else if (value instanceof Date) {
        clean[key] = value;
      }
    }
    return clean;
  });

  return Plot.plot({ ...options, data: sanitizedData });
}