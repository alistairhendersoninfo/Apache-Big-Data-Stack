// Sanitize data before plotting
function sanitizePlotData(data) {
  return data.map(trace => ({
    ...trace,
    x: trace.x.filter(v => isFinite(v)),
    y: trace.y.filter(v => isFinite(v)),
    text: trace.text?.map(t => DOMPurify.sanitize(String(t)))
  }));
}

// Disable editable mode for untrusted users
const config = {
  editable: false,
  displayModeBar: true,
  modeBarButtonsToRemove: ['sendDataToCloud']
};

Plotly.newPlot('chart', data, layout, config);