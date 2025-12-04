// src/charts/lineChart.js
import * as d3 from 'd3';

export class RealTimeLineChart {
  constructor(selector, options = {}) {
    this.selector = selector;
    this.margin = options.margin || { top: 20, right: 30, bottom: 30, left: 50 };
    this.maxPoints = options.maxPoints || 100;
    this.transitionDuration = options.transitionDuration || 500;
    this.data = [];

    this.init();
  }

  init() {
    const container = d3.select(this.selector);
    const bbox = container.node().getBoundingClientRect();

    this.width = bbox.width - this.margin.left - this.margin.right;
    this.height = bbox.height - this.margin.top - this.margin.bottom;

    // Clear existing content
    container.selectAll('*').remove();

    // Create SVG
    this.svg = container
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

    // Define scales
    this.xScale = d3.scaleTime()
      .range([0, this.width]);

    this.yScale = d3.scaleLinear()
      .range([this.height, 0]);

    // Define line generator
    this.line = d3.line()
      .x(d => this.xScale(d.timestamp))
      .y(d => this.yScale(d.value))
      .curve(d3.curveMonotoneX);

    // Define area generator for gradient fill
    this.area = d3.area()
      .x(d => this.xScale(d.timestamp))
      .y0(this.height)
      .y1(d => this.yScale(d.value))
      .curve(d3.curveMonotoneX);

    // Create gradient
    const gradient = this.svg.append('defs')
      .append('linearGradient')
      .attr('id', 'area-gradient')
      .attr('x1', '0%').attr('y1', '0%')
      .attr('x2', '0%').attr('y2', '100%');

    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#4CAF50')
      .attr('stop-opacity', 0.3);

    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#4CAF50')
      .attr('stop-opacity', 0);

    // Add clip path for smooth transitions
    this.svg.append('defs')
      .append('clipPath')
      .attr('id', 'clip')
      .append('rect')
      .attr('width', this.width)
      .attr('height', this.height);

    // Add axes
    this.xAxis = this.svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${this.height})`);

    this.yAxis = this.svg.append('g')
      .attr('class', 'y-axis');

    // Add chart elements with clip path
    const chartGroup = this.svg.append('g')
      .attr('clip-path', 'url(#clip)');

    this.areaPath = chartGroup.append('path')
      .attr('class', 'area')
      .attr('fill', 'url(#area-gradient)');

    this.linePath = chartGroup.append('path')
      .attr('class', 'line')
      .attr('fill', 'none')
      .attr('stroke', '#4CAF50')
      .attr('stroke-width', 2);

    // Add tooltip
    this.tooltip = d3.select('body').append('div')
      .attr('class', 'd3-tooltip')
      .style('opacity', 0);

    // Add overlay for mouse tracking
    this.svg.append('rect')
      .attr('class', 'overlay')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .on('mousemove', (event) => this.handleMouseMove(event))
      .on('mouseout', () => this.handleMouseOut());

    // Focus elements for tooltip
    this.focus = this.svg.append('g')
      .attr('class', 'focus')
      .style('display', 'none');

    this.focus.append('circle')
      .attr('r', 5)
      .attr('fill', '#4CAF50');

    this.focus.append('line')
      .attr('class', 'x-hover-line')
      .attr('stroke', '#999')
      .attr('stroke-dasharray', '3,3')
      .attr('y1', 0)
      .attr('y2', this.height);
  }

  update(newData) {
    // Add new data point
    this.data.push({
      timestamp: new Date(newData.timestamp),
      value: newData.value
    });

    // Remove old points if exceeding max
    while (this.data.length > this.maxPoints) {
      this.data.shift();
    }

    if (this.data.length < 2) return;

    // Update scales
    this.xScale.domain(d3.extent(this.data, d => d.timestamp));
    this.yScale.domain([0, d3.max(this.data, d => d.value) * 1.1]);

    // Update axes with transition
    this.xAxis.transition()
      .duration(this.transitionDuration)
      .call(d3.axisBottom(this.xScale).ticks(5));

    this.yAxis.transition()
      .duration(this.transitionDuration)
      .call(d3.axisLeft(this.yScale).ticks(5));

    // Update line and area
    this.linePath
      .datum(this.data)
      .transition()
      .duration(this.transitionDuration)
      .attr('d', this.line);

    this.areaPath
      .datum(this.data)
      .transition()
      .duration(this.transitionDuration)
      .attr('d', this.area);
  }

  handleMouseMove(event) {
    if (this.data.length === 0) return;

    this.focus.style('display', null);

    const [mouseX] = d3.pointer(event);
    const x0 = this.xScale.invert(mouseX);
    const bisect = d3.bisector(d => d.timestamp).left;
    const i = bisect(this.data, x0, 1);
    const d0 = this.data[i - 1];
    const d1 = this.data[i];

    if (!d0 || !d1) return;

    const d = x0 - d0.timestamp > d1.timestamp - x0 ? d1 : d0;

    this.focus.attr('transform',
      `translate(${this.xScale(d.timestamp)},${this.yScale(d.value)})`);

    this.focus.select('.x-hover-line')
      .attr('y2', this.height - this.yScale(d.value));

    this.tooltip
      .style('opacity', 1)
      .html(`
        <strong>${d3.timeFormat('%H:%M:%S')(d.timestamp)}</strong><br/>
        Value: ${d.value.toLocaleString()}
      `)
      .style('left', (event.pageX + 15) + 'px')
      .style('top', (event.pageY - 28) + 'px');
  }

  handleMouseOut() {
    this.focus.style('display', 'none');
    this.tooltip.style('opacity', 0);
  }

  resize() {
    this.init();
    // Redraw with existing data
    this.data.forEach((d, i) => {
      if (i === this.data.length - 1) {
        this.update(d);
      }
    });
  }
}