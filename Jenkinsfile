pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        dir('flask-app') {
          sh 'python --version || apt-get update && apt-get install -y python3 python3-pip'
          sh 'pip3 install -r requirements.txt'
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