// Frontend SSE client
const eventSource = new EventSource('/stream');

eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);
  dashboard.handleData(data);
};