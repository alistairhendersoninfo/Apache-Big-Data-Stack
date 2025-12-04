# Install cert-manager (prerequisite)
kubectl create -f https://github.com/jetstack/cert-manager/releases/download/v1.8.2/cert-manager.yaml

# Install Flink Kubernetes Operator
kubectl create -f https://github.com/apache/flink-kubernetes-operator/releases/download/release-1.7.0/flink-kubernetes-operator-1.7.0.yaml

# Deploy Flink Application
kubectl apply -f - <<EOF
apiVersion: flink.apache.org/v1beta1
kind: FlinkDeployment
metadata:
  name: fraud-detection
spec:
  image: flink:1.19.0
  flinkVersion: v1_19
  flinkConfiguration:
    taskmanager.numberOfTaskSlots: "4"
  serviceAccount: flink
  jobManager:
    resource:
      memory: "2048m"
      cpu: 1
  taskManager:
    resource:
      memory: "4096m"
      cpu: 2
  job:
    jarURI: local:///opt/flink/fraud-detection.jar
    parallelism: 4
    upgradeMode: savepoint
EOF