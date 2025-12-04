// Handle millions of points with progressive rendering
const option = {
  dataset: {
    source: largeDataArray,  // Can be millions of points
    dimensions: ['timestamp', 'value']
  },
  series: [{
    type: 'line',
    progressive: 400,           // Render 400 points per frame
    progressiveThreshold: 3000, // Enable when > 3000 points
    progressiveChunkMode: 'mod',
    sampling: 'lttb',           // Downsample for display
    large: true,
    largeThreshold: 2000
  }]
};