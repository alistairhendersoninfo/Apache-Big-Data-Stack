// src/main.js
import { RealTimeLineChart } from './charts/lineChart.js';
import { InteractiveBarChart } from './charts/barChart.js';
import { ActivityHeatmap } from './charts/heatmap.js';
import { DataStream } from './utils/dataStream.js';

class Dashboard {
  constructor() {
    this.charts = {};
    this.metrics = { eventsPerSec: 0, totalEvents: 0, uniqueUsers: new Set() };
    this.categoryData = new Map();
    this.heatmapData = [];

    // Initialize heatmap data structure
    for (let day = 0; day < 7; day++) {
      for (let hour = 0; hour < 24; hour++) {
        this.heatmapData.push({ day, hour, value: 0 });
      }
    }

    this.init();
  }

  init() {
    // Initialize charts
    this.charts.lineChart = new RealTimeLineChart('#line-chart', {
      maxPoints: 50,
      transitionDuration: 300
    });

    this.charts.barChart = new InteractiveBarChart('#bar-chart');
    this.charts.heatmap = new ActivityHeatmap('#heatmap');

    // Initialize data stream
    this.dataStream = new DataStream('wss://your-api.com/events');

    // Connection status updates
    this.dataStream.on('connected', () => {
      document.getElementById('connection-status').textContent = 'Connected';
      document.getElementById('connection-status').classList.add('connected');
    });

    this.dataStream.on('disconnected', () => {
      document.getElementById('connection-status').textContent = 'Disconnected';
      document.getElementById('connection-status').classList.remove('connected');
    });

    // Handle incoming data
    this.dataStream.on('data', (data) => this.handleData(data));

    // Category filter event
    document.addEventListener('categorySelected', (e) => {
      console.log('Filter by category:', e.detail.category);
      // Implement filtering logic
    });

    // Handle window resize
    window.addEventListener('resize', () => this.handleResize());

    // Connect to data stream
    this.dataStream.connect().catch(err => {
      console.error('Failed to connect:', err);
      // Fall back to simulated data
      this.startSimulation();
    });

    // Start metrics update interval
    setInterval(() => this.updateMetrics(), 1000);
  }

  handleData(event) {
    const timestamp = new Date(event.timestamp);

    // Update line chart
    this.charts.lineChart.update({
      timestamp: timestamp,
      value: event.value || 1
    });

    // Update category counts
    const category = event.category || 'unknown';
    const currentCount = this.categoryData.get(category) || 0;
    this.categoryData.set(category, currentCount + 1);

    // Update bar chart
    const barData = Array.from(this.categoryData.entries())
      .map(([category, value]) => ({ category, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);
    this.charts.barChart.update(barData);

    // Update heatmap
    const day = timestamp.getDay();
    const hour = timestamp.getHours();
    const index = day * 24 + hour;
    this.heatmapData[index].value++;
    this.charts.heatmap.update(this.heatmapData);

    // Update metrics
    this.metrics.totalEvents++;
    if (event.userId) {
      this.metrics.uniqueUsers.add(event.userId);
    }
  }

  updateMetrics() {
    document.querySelector('#events-per-sec .value').textContent =
      this.metrics.eventsPerSec.toLocaleString();
    document.querySelector('#total-events .value').textContent =
      this.metrics.totalEvents.toLocaleString();
    document.querySelector('#unique-users .value').textContent =
      this.metrics.uniqueUsers.size.toLocaleString();

    // Reset events per second counter
    this.metrics.eventsPerSec = 0;
  }

  startSimulation() {
    // Simulate real-time data for demo
    const categories = ['pageview', 'click', 'purchase', 'signup', 'logout'];

    setInterval(() => {
      const event = {
        timestamp: new Date().toISOString(),
        value: Math.floor(Math.random() * 100) + 10,
        category: categories[Math.floor(Math.random() * categories.length)],
        userId: `user_${Math.floor(Math.random() * 1000)}`
      };

      this.handleData(event);
      this.metrics.eventsPerSec++;
    }, 100);
  }

  handleResize() {
    Object.values(this.charts).forEach(chart => {
      if (chart.resize) chart.resize();
    });
  }
}

// Initialize dashboard when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new Dashboard();
});