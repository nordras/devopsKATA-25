pipeline {
  agent any
  environment {
    DOCKER_IMAGE = "nordras/flask-app:latest"
  }
  stages {
    stage('Build & Test') {
      steps {
        dir('flask-app') {
          sh '''
            python3 -m venv venv
            . venv/bin/activate
            pip install --upgrade pip
            pip install -r requirements.txt
            . venv/bin/activate
            pytest
          '''
        }
      }
    }
    stage('Docker Build & Push') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKERHUB_USER', passwordVariable: 'DOCKERHUB_PASS')]) {
          dir('flask-app') {
            sh '''
              docker build -t $DOCKER_IMAGE .
              echo "$DOCKERHUB_PASS" | docker login -u "$DOCKERHUB_USER" --password-stdin
              docker push $DOCKER_IMAGE
            '''
          }
        }
      }
    }
    stage('Deploy to Minikube via Helm') {
      steps {
        dir('flask-app-chart') {
          sh '''
            helm upgrade --install flask-app . --set image.repository=nordras/flask-app --set image.tag=latest
          '''
        }
      }
    }
  }
}