pipeline {
    agent any
    stages {
        stage('Run Hop Pipeline') {
            steps {
                sh '''
                    /opt/hop/hop-run.sh \
                      --file=${WORKSPACE}/pipelines/sales_etl.hpl \
                      --environment=Production \
                      --runconfig=Spark
                '''
            }
        }
    }
}