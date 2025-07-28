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
    stage('Deploy') {
      steps {
        dir('flask-app') {
          // Mata qualquer Flask rodando antes
          sh 'pkill -f "flask run" || true'
          // Sobe o Flask em background na porta 5000
          sh 'nohup flask run --host=0.0.0.0 --port=5000 &'
        }
      }
    }
  }
}