{
  "title": "Kafka Cluster Monitoring",
  "uid": "kafka-cluster",
  "panels": [
    {
      "title": "Messages Per Second",
      "type": "timeseries",
      "datasource": "Prometheus",
      "targets": [{
        "expr": "sum(rate(kafka_server_brokertopicmetrics_messagesinpersec[5m])) by (topic)",
        "legendFormat": "{{topic}}"
      }],
      "fieldConfig": {
        "defaults": {
          "unit": "msg/s",
          "color": { "mode": "palette-classic" }
        }
      }
    },
    {
      "title": "Consumer Lag",
      "type": "gauge",
      "datasource": "Prometheus",
      "targets": [{
        "expr": "sum(kafka_consumergroup_lag) by (consumergroup)"
      }],
      "fieldConfig": {
        "defaults": {
          "thresholds": {
            "steps": [
              { "color": "green", "value": 0 },
              { "color": "yellow", "value": 1000 },
              { "color": "red", "value": 10000 }
            ]
          }
        }
      }
    }
  ],
  "templating": {
    "list": [{
      "name": "topic",
      "type": "query",
      "datasource": "Prometheus",
      "query": "label_values(kafka_server_brokertopicmetrics_messagesinpersec, topic)"
    }]
  }
}