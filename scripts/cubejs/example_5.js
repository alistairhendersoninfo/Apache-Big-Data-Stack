// App.js
import React from 'react';
import cubejs from '@cubejs-client/core';
import { CubeProvider, QueryRenderer } from '@cubejs-client/react';
import { Line, Bar, Pie } from 'react-chartjs-2';

// Initialize Cube API client
const cubeApi = cubejs(process.env.REACT_APP_CUBEJS_TOKEN, {
  apiUrl: process.env.REACT_APP_CUBEJS_API_URL
});

// Revenue over time chart
function RevenueChart() {
  return (
    <QueryRenderer
      cubeApi={cubeApi}
      query={{
        measures: ['Orders.totalRevenue', 'Orders.count'],
        timeDimensions: [{
          dimension: 'Orders.createdAt',
          granularity: 'month',
          dateRange: 'last 12 months'
        }]
      }}
      render={({ resultSet, isLoading, error }) => {
        if (isLoading) return <div>Loading...</div>;
        if (error) return <div>Error: {error.message}</div>;

        const data = {
          labels: resultSet.chartPivot().map(row => row.x),
          datasets: [{
            label: 'Revenue',
            data: resultSet.chartPivot().map(row => row['Orders.totalRevenue']),
            borderColor: '#4CAF50',
            fill: false
          }]
        };

        return <Line data={data} />;
      }}
    />
  );
}

// Customer segmentation chart
function SegmentChart() {
  return (
    <QueryRenderer
      cubeApi={cubeApi}
      query={{
        measures: ['Customers.count', 'Customers.lifetimeValue'],
        dimensions: ['Customers.segment']
      }}
      render={({ resultSet }) => {
        if (!resultSet) return null;

        const data = {
          labels: resultSet.tablePivot().map(row => row['Customers.segment']),
          datasets: [{
            data: resultSet.tablePivot().map(row => row['Customers.lifetimeValue']),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
          }]
        };

        return <Pie data={data} />;
      }}
    />
  );
}

function App() {
  return (
    <CubeProvider cubeApi={cubeApi}>
      <div className="dashboard">
        <h1>E-Commerce Analytics</h1>
        <div className="chart-grid">
          <RevenueChart />
          <SegmentChart />
        </div>
      </div>
    </CubeProvider>
  );
}

export default App;