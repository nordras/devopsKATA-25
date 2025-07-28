pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        dir('flask-app') {
          sh '''
            python3 -m venv venv
            . venv/bin/activate
            pip install --upgrade pip
            pip install -r requirements.txt
          '''
        }
      }
    }
    stage('Test') {
      steps {
        dir('flask-app') {
          sh '''
            . venv/bin/activate
            pytest
          '''
        }
      }
    }
    stage('Deploy') {
      steps {
        dir('flask-app') {
          sh 'pkill -f "flask run" || true'
          sh '''
            . venv/bin/activate
            nohup flask run --host=0.0.0.0 --port=5000 &
          '''
        }
      }
    }
  }
}