# 🚀 Jenkins CI/CD Demo - Java + React

Este projeto demonstra um pipeline completo de CI/CD usando Jenkins com uma aplicação fullstack:
- **Backend**: Java com Maven
- **Frontend**: React com testes automatizados
- **Infrastructure**: Docker e Docker Compose
- **CI/CD**: Jenkins Pipeline as Code

## 📁 Estrutura do Projeto

```
jenkins-local-project/
├── backend/                      # Backend Java
│   ├── src/
│   │   ├── main/java/com/example/
│   │   │   └── App.java
│   │   └── test/java/com/example/
│   │       └── AppTest.java
│   ├── pom.xml
│   └── target/
├── frontend/                     # Frontend React
│   ├── src/
│   │   ├── App.js
│   │   ├── index.js
│   │   ├── index.css
│   │   └── __tests__/
│   ├── public/
│   ├── package.json
│   ├── Dockerfile
│   └── nginx.conf
├── Jenkinsfile                   # Pipeline as Code
├── docker-compose.yml            # Orquestração de containers
├── Dockerfile.backend            # Container do backend
├── nginx.conf                    # Proxy reverso
├── pom.xml                       # Configuração Maven
└── README.md

## 🛠️ Pré-requisitos

- **Docker & Docker Compose**
- **Java 11+** (para desenvolvimento local)
- **Node.js 18+** (para desenvolvimento local)
- **Maven 3.6+** (para desenvolvimento local)

## 🚀 Como Executar

### Opção 1: Docker Compose (Recomendado)

```bash
# 1. Clone o repositório
git clone <repository-url>
cd jenkins-local-project

# 2. Subir toda a infraestrutura
docker-compose up -d

# 3. Acessar as aplicações
# Jenkins: http://localhost:8080
# Aplicação: http://localhost:80
# Backend API: http://localhost:8081
# Frontend: http://localhost:3000
```

### Opção 2: Desenvolvimento Local

```bash
# Backend (Terminal 1)
mvn clean compile
mvn test
mvn spring-boot:run  # Se usando Spring Boot

# Frontend (Terminal 2)
cd frontend
npm install
npm test
npm start
```

## 🔧 Configuração do Jenkins

### 1. Primeira Configuração

```bash
# Obter senha inicial do Jenkins
docker exec jenkins-server cat /var/jenkins_home/secrets/initialAdminPassword
```

### 2. Plugins Necessários

- **NodeJS Plugin**: Para builds do React
- **Maven Integration Plugin**: Para builds Java
- **Pipeline Plugin**: Para Jenkinsfile
- **HTML Publisher**: Para relatórios de cobertura
- **JUnit Plugin**: Para resultados de testes

### 3. Configurar Ferramentas (Manage Jenkins → Global Tool Configuration)

**Maven:**
- Name: `Maven`
- Install automatically: ✅
- Version: `3.8.6`

**NodeJS:**
- Name: `NodeJS`
- Install automatically: ✅
- Version: `18.x`

## 📋 Pipeline Jenkins

O pipeline inclui os seguintes stages:

1. **📥 Checkout**: Baixa o código do repositório
2. **☕ Backend Build & Test**: Compila e testa o Java
3. **⚛️ Frontend Setup & Build**: Instala deps e builda React
4. **📦 Package**: Gera artefatos finais
5. **🔍 Quality Gate**: Verificações de qualidade
6. **🚀 Deploy**: Deploy da aplicação

### Executar Pipeline

1. **New Item** → **Pipeline**
2. **Pipeline script from SCM**
3. **Repository URL**: Seu repositório Git
4. **Script Path**: `Jenkinsfile`
5. **Build Now**

## 🧪 Testes

### Backend (Java)
```bash
mvn test                    # Executar testes
mvn test -Dtest=AppTest     # Teste específico
```

### Frontend (React)
```bash
cd frontend
npm test                    # Testes interativos
npm test -- --coverage     # Com cobertura
npm test -- --watchAll=false  # CI mode
```

## 📊 Relatórios

O Jenkins gera automaticamente:
- **🧪 Test Results**: Resultados dos testes Java e React
- **📈 Coverage Reports**: Cobertura de código
- **📦 Build Artifacts**: JARs e build do React

Acesse em: `http://localhost:8080/job/<job-name>/`

## 🐳 Docker

### Builds Individuais

```bash
# Backend
docker build -f Dockerfile.backend -t java-backend .

# Frontend
cd frontend
docker build -t react-frontend .
```

### Logs dos Containers

```bash
docker-compose logs jenkins-server
docker-compose logs java-backend
docker-compose logs react-frontend
```

## 🔍 Troubleshooting

### Jenkins não inicia
```bash
docker-compose logs jenkins-server
# Verificar logs para erros de permissão ou porta
```

### Frontend não conecta com backend
```bash
# Verificar se os containers estão na mesma network
docker network ls
docker network inspect jenkins-local-project_jenkins-network
```

### Builds falhando
```bash
# Limpar workspace do Jenkins
# Build → Clean Workspace

# Rebuild dos containers
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

## 🌐 URLs Importantes

| Serviço | URL | Descrição |
|---------|-----|-----------|
| 🏗️ Jenkins | http://localhost:8080 | Servidor CI/CD |
| 🌍 Aplicação | http://localhost:80 | App completa (Nginx) |
| ⚛️ React Dev | http://localhost:3000 | Frontend desenvolvimento |
| ☕ Backend API | http://localhost:8081 | API Java direta |

## 🎯 Funcionalidades Demonstradas

- ✅ **Pipeline as Code** com Jenkinsfile
- ✅ **Multi-stage builds** (Backend + Frontend)
- ✅ **Testes automatizados** para ambas as tecnologias
- ✅ **Relatórios de cobertura** integrados
- ✅ **Docker containerization**
- ✅ **Proxy reverso** com Nginx
- ✅ **Artifact archiving**
- ✅ **Environment variables** no pipeline

## 📚 Próximos Passos

Para expandir este projeto:

1. **🔐 Segurança**: Adicionar autenticação e HTTPS
2. **📊 Monitoring**: Integrar Prometheus/Grafana
3. **🚀 Deploy**: Configurar deploy para Kubernetes
4. **🔔 Notificações**: Slack, email, etc.
5. **🌍 Multi-environment**: Dev, Staging, Production

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Add nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

---

🎉 **Happy Building with Jenkins!** 🎉
├── docker-compose.yml
├── Dockerfile
├── pom.xml
└── README.md
```

## Prerequisites

- Java Development Kit (JDK) 11 or higher
- Maven
- Docker
- Docker Compose
- Jenkins

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd jenkins-local-project
   ```

2. **Build the application:**
   ```bash
   mvn clean package
   ```

3. **Run the application using Docker:**
   ```bash
   docker-compose up
   ```

4. **Access the application:**
   Open your web browser and navigate to `http://localhost:8080`.

## Running Tests

To run the tests, use the following Maven command:

```bash
mvn test
```

## Jenkins Pipeline

The `Jenkinsfile` defines the CI/CD pipeline for this project. It includes stages for building, testing, and deploying the application. Make sure to configure your Jenkins instance to point to this repository.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.