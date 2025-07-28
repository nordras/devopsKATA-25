pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        dir('flask-app') {
          sh 'pip install -r requirements.txt'
        }
      }
    }
    stage('Test') {
      steps {
        dir('flask-app') {
          sh 'pytest'
        }
      }
    }
  }
}
