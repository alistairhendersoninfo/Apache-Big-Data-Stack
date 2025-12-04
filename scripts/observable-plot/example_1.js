import * as Plot from '@observablehq/plot';

// Fetch data from big data backend
const salesData = await fetch('/api/sales').then(r => r.json());

// Simple scatter plot
const scatterPlot = Plot.plot({
  marks: [
    Plot.dot(salesData, {
      x: 'revenue',
      y: 'profit',
      fill: 'category',
      r: 'volume',
      tip: true
    })
  ],
  color: { legend: true },
  grid: true
});

document.getElementById('scatter').appendChild(scatterPlot);

// Time series with confidence interval
const timeSeriesPlot = Plot.plot({
  y: { grid: true, label: 'Revenue ($)' },
  marks: [
    Plot.areaY(salesData, {
      x: 'date',
      y1: 'revenue_low',
      y2: 'revenue_high',
      fill: '#4CAF50',
      fillOpacity: 0.2
    }),
    Plot.lineY(salesData, {
      x: 'date',
      y: 'revenue',
      stroke: '#4CAF50',
      strokeWidth: 2
    }),
    Plot.ruleY([0])
  ]
});

// Faceted bar chart
const facetedBars = Plot.plot({
  facet: {
    data: salesData,
    x: 'region'
  },
  marks: [
    Plot.barY(salesData, Plot.groupX(
      { y: 'sum' },
      { x: 'category', y: 'revenue', fill: 'category' }
    ))
  ],
  color: { legend: true }
});

// Hexbin for large datasets
const hexbinPlot = Plot.plot({
  marks: [
    Plot.hexbin(
      largeDataset,
      Plot.hexagon({
        x: 'x',
        y: 'y',
        fill: 'count'
      })
    )
  ],
  color: { scheme: 'YlOrRd' }
});