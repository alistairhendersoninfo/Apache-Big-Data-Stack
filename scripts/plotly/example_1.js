import Plotly from 'plotly.js-dist-min';

// Time series with range slider
const timeSeriesData = [{
  x: timestamps,
  y: values,
  type: 'scatter',
  mode: 'lines',
  name: 'Revenue',
  line: { color: '#4CAF50', width: 2 }
}];

const timeSeriesLayout = {
  title: 'Revenue Over Time',
  xaxis: {
    rangeslider: { visible: true },
    type: 'date'
  },
  yaxis: { title: 'Revenue ($)' },
  template: 'plotly_dark'
};

Plotly.newPlot('timeseries', timeSeriesData, timeSeriesLayout);

// 3D scatter plot with WebGL
const scatter3dData = [{
  x: xData,
  y: yData,
  z: zData,
  mode: 'markers',
  type: 'scatter3d',
  marker: {
    size: 5,
    color: colorValues,
    colorscale: 'Viridis',
    opacity: 0.8
  }
}];

Plotly.newPlot('scatter3d', scatter3dData, {
  scene: {
    xaxis: { title: 'X Axis' },
    yaxis: { title: 'Y Axis' },
    zaxis: { title: 'Z Axis' }
  }
});

// Real-time streaming update
function updateChart(newPoint) {
  Plotly.extendTraces('timeseries', {
    x: [[newPoint.timestamp]],
    y: [[newPoint.value]]
  }, [0]);
}