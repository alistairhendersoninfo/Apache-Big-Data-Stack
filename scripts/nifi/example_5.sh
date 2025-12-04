helm repo add cetic https://cetic.github.io/helm-charts
helm install nifi cetic/nifi --set replicaCount=3