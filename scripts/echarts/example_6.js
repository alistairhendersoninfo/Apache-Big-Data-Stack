// src/main.ts
import * as echarts from 'echarts';
import { TimeSeriesChart } from './charts/timeSeriesChart';
import { DistributionChart } from './charts/distributionChart';
import { GaugeCluster } from './charts/gaugeCluster';

// Register dark theme
echarts.registerTheme('dark', {
  backgroundColor: 'transparent',
  textStyle: { color: '#ccc' },
  title: { textStyle: { color: '#eee' } }
});

class Dashboard {
  private timeSeriesChart: TimeSeriesChart;
  private distributionChart: DistributionChart;
  private gaugeCluster: GaugeCluster;
  private eventSource: EventSource | null = null;

  constructor() {
    // Initialize charts
    this.timeSeriesChart = new TimeSeriesChart(
      document.getElementById('timeseries-chart')!
    );

    this.distributionChart = new DistributionChart(
      document.getElementById('distribution-chart')!
    );

    this.gaugeCluster = new GaugeCluster(
      document.getElementById('gauge-cluster')!
    );

    // Add series to time series chart
    this.timeSeriesChart.addSeries('requests', '#5470c6');
    this.timeSeriesChart.addSeries('errors', '#ee6666');
    this.timeSeriesChart.addSeries('latency', '#91cc75');

    // Initialize gauges
    this.gaugeCluster.updateGauges([
      {
        name: 'CPU',
        value: 45,
        min: 0,
        max: 100,
        thresholds: [
          { value: 60, color: '#91cc75' },
          { value: 80, color: '#fac858' },
          { value: 100, color: '#ee6666' }
        ]
      },
      {
        name: 'Memory',
        value: 62,
        min: 0,
        max: 100,
        thresholds: [
          { value: 70, color: '#91cc75' },
          { value: 85, color: '#fac858' },
          { value: 100, color: '#ee6666' }
        ]
      },
      {
        name: 'Disk I/O',
        value: 230,
        min: 0,
        max: 500,
        thresholds: [
          { value: 300, color: '#91cc75' },
          { value: 400, color: '#fac858' },
          { value: 500, color: '#ee6666' }
        ]
      },
      {
        name: 'Network',
        value: 856,
        min: 0,
        max: 1000,
        thresholds: [
          { value: 600, color: '#91cc75' },
          { value: 800, color: '#fac858' },
          { value: 1000, color: '#ee6666' }
        ]
      }
    ]);

    this.connectToDataSource();
  }

  private connectToDataSource(): void {
    // Connect to Server-Sent Events endpoint
    try {
      this.eventSource = new EventSource('/api/metrics/stream');

      this.eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        this.handleMetricsUpdate(data);
      };

      this.eventSource.onerror = () => {
        console.log('SSE connection lost, starting simulation');
        this.startSimulation();
      };
    } catch (e) {
      this.startSimulation();
    }
  }

  private handleMetricsUpdate(data: any): void {
    const timestamp = new Date(data.timestamp);

    // Update time series
    this.timeSeriesChart.updateData('requests', {
      timestamp,
      value: data.requestsPerSecond
    });
    this.timeSeriesChart.updateData('errors', {
      timestamp,
      value: data.errorsPerSecond
    });
    this.timeSeriesChart.updateData('latency', {
      timestamp,
      value: data.avgLatencyMs
    });

    // Update distribution
    if (data.categoryBreakdown) {
      this.distributionChart.updateData(
        Object.entries(data.categoryBreakdown).map(([name, value]) => ({
          name,
          value: value as number
        }))
      );
    }

    // Update gauges
    if (data.systemMetrics) {
      this.gaugeCluster.animateValue('CPU', data.systemMetrics.cpu);
      this.gaugeCluster.animateValue('Memory', data.systemMetrics.memory);
      this.gaugeCluster.animateValue('Disk I/O', data.systemMetrics.diskIO);
      this.gaugeCluster.animateValue('Network', data.systemMetrics.network);
    }
  }

  private startSimulation(): void {
    const categories = ['API', 'Web', 'Mobile', 'IoT', 'Batch'];
    const categoryValues = new Map(categories.map(c => [c, Math.random() * 1000]));

    setInterval(() => {
      const now = new Date();

      // Simulate metrics
      this.timeSeriesChart.updateData('requests', {
        timestamp: now,
        value: 800 + Math.random() * 400
      });
      this.timeSeriesChart.updateData('errors', {
        timestamp: now,
        value: Math.random() * 20
      });
      this.timeSeriesChart.updateData('latency', {
        timestamp: now,
        value: 50 + Math.random() * 100
      });

      // Update category values
      categories.forEach(cat => {
        const current = categoryValues.get(cat)!;
        categoryValues.set(cat, Math.max(0, current + (Math.random() - 0.5) * 100));
      });

      this.distributionChart.updateData(
        Array.from(categoryValues.entries()).map(([name, value]) => ({ name, value }))
      );

      // Update gauges with some variation
      this.gaugeCluster.animateValue('CPU', 30 + Math.random() * 40);
      this.gaugeCluster.animateValue('Memory', 50 + Math.random() * 30);
      this.gaugeCluster.animateValue('Disk I/O', 150 + Math.random() * 200);
      this.gaugeCluster.animateValue('Network', 600 + Math.random() * 300);
    }, 1000);
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  new Dashboard();
});