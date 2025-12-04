# Add Helm repository
helm repo add apache-airflow https://airflow.apache.org
helm repo update

# Install Airflow on Kubernetes
helm install airflow apache-airflow/airflow \
  --namespace airflow \
  --create-namespace \
  --set executor=KubernetesExecutor \
  --set webserver.replicas=2 \
  --set scheduler.replicas=2 \
  --set postgresql.enabled=true

# Access Web UI
kubectl port-forward svc/airflow-webserver 8080:8080 -n airflow