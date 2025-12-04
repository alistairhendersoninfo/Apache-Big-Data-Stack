# Submit Spark job to Kubernetes
spark-submit \
  --master k8s://https://kubernetes-api:6443 \
  --deploy-mode cluster \
  --name sales-analytics \
  --conf spark.executor.instances=5 \
  --conf spark.kubernetes.container.image=apache/spark:3.5.0 \
  --conf spark.kubernetes.namespace=spark \
  --conf spark.kubernetes.authenticate.driver.serviceAccountName=spark \
  sales_analytics.py

# Using Spark Operator
kubectl apply -f - <<EOF
apiVersion: sparkoperator.k8s.io/v1beta2
kind: SparkApplication
metadata:
  name: sales-analytics
  namespace: spark
spec:
  type: Python
  pythonVersion: "3"
  mode: cluster
  image: "apache/spark-py:3.5.0"
  mainApplicationFile: "local:///opt/spark/work-dir/sales_analytics.py"
  sparkVersion: "3.5.0"
  driver:
    cores: 1
    memory: "2g"
  executor:
    cores: 2
    instances: 3
    memory: "4g"
EOF