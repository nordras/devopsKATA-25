pipeline {
  agent {
    docker {
      image 'python:3.11'
      args '-u root'
    }
  }
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
    stage('Deploy') {
      steps {
        dir('flask-app') {
          sh 'pkill -f "flask run" || true'
          sh 'nohup flask run --host=0.0.0.0 --port=5000 &'
        }
      }
    }
  }
}
