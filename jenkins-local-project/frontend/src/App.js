import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

function App() {
  const [backendStatus, setBackendStatus] = useState('checking');
  const [backendMessage, setBackendMessage] = useState('');
  const [jenkinsInfo, setJenkinsInfo] = useState({
    buildNumber: process.env.BUILD_NUMBER || 'LOCAL',
    buildId: process.env.BUILD_ID || 'dev-build',
    jobName: process.env.JOB_NAME || 'jenkins-react-demo'
  });

  const checkBackendConnection = async () => {
    try {
      setBackendStatus('checking');
      // Simula chamada para o backend Java
      const response = await axios.get('/api/hello', {
        timeout: 5000
      });
      setBackendMessage(response.data.message || 'Backend conectado!');
      setBackendStatus('connected');
    } catch (error) {
      console.error('Erro ao conectar com backend:', error);
      setBackendMessage('Backend não disponível (executando em modo standalone)');
      setBackendStatus('disconnected');
    }
  };

  useEffect(() => {
    checkBackendConnection();
  }, []);

  const getStatusColor = () => {
    switch (backendStatus) {
      case 'connected': return 'status-success';
      case 'disconnected': return 'status-warning';
      default: return 'status-warning';
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">
          🚀 Jenkins + React Demo
        </h1>
        
        <div className="jenkins-info">
          <h3>📋 Informações da Build:</h3>
          <p><strong>Job:</strong> {jenkinsInfo.jobName}</p>
          <p><strong>Build Number:</strong> {jenkinsInfo.buildNumber}</p>
          <p><strong>Build ID:</strong> {jenkinsInfo.buildId}</p>
          <p><strong>Data/Hora:</strong> {new Date().toLocaleString('pt-BR')}</p>
        </div>

        <div className="backend-connection">
          <h3>🔗 Conexão com Backend Java:</h3>
          <p>
            <span className={`status-indicator ${getStatusColor()}`}></span>
            Status: {backendStatus === 'checking' ? 'Verificando...' : 
                    backendStatus === 'connected' ? 'Conectado' : 'Desconectado'}
          </p>
          <p><strong>Mensagem:</strong> {backendMessage}</p>
          
          <button 
            className="connection-button"
            onClick={checkBackendConnection}
            disabled={backendStatus === 'checking'}
          >
            {backendStatus === 'checking' ? '⏳ Verificando...' : '🔄 Testar Conexão'}
          </button>
        </div>

        <div className="jenkins-info">
          <h3>✅ Funcionalidades do Demo:</h3>
          <ul style={{textAlign: 'left', margin: '0 auto', display: 'inline-block'}}>
            <li>Pipeline automatizado Jenkins</li>
            <li>Build e deploy de aplicação React</li>
            <li>Testes automatizados (frontend + backend)</li>
            <li>Integração Java + React</li>
            <li>Monitoramento de build status</li>
          </ul>
        </div>

        <p style={{marginTop: '30px', opacity: 0.8}}>
          🎯 Este é um projeto de demonstração para aprender Jenkins CI/CD
        </p>
      </header>
    </div>
  );
}

export default App;
