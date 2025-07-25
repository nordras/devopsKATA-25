# Jenkins + Vite (React) + Vitest CI/CD Local

## Passos para rodar o ambiente localmente

### 1. Instale as dependências do frontend
```sh
cd vite-app
npm install
```

### 2. Execute os testes unitários
```sh
npm run test
```

### 3. Build do projeto
```sh
npm run build
```

### 4. Suba o Jenkins localmente
```sh
cd vite-app/docker
# Se necessário, ajuste permissões da pasta jenkins_home
# Exemplo (Linux/Mac): sudo chown -R 1000:1000 jenkins_home
# No Windows, normalmente não é necessário

docker compose up -d
```
Acesse: http://localhost:8080

### 5. Instale os plugins no Jenkins
- NodeJS
- Git
- Pipeline
- Docker Pipeline

### 6. Configure o pipeline
- Crie um novo pipeline apontando para este repositório
- Use o arquivo `Jenkinsfile` já presente na raiz do projeto

### 7. Configure o Webhook no GitHub
- Vá em Settings > Webhooks do seu repositório
- Adicione a URL: `http://SEU_IP_LOCAL:8080/github-webhook/`
- Selecione eventos de push e merge na branch main

### 8. Estrutura do projeto
```
vite-app/
├── src/
│   └── main.jsx
├── tests/
│   └── App.test.js
├── package.json
├── vite.config.js
├── Jenkinsfile
└── docker/
    └── docker-compose.yml
```

### 9. Observações
- Todo o processo roda localmente, sem servidores externos
- Jenkins pode ser acessado em http://localhost:8080
- O pipeline será disparado automaticamente após merge na main (via webhook)

---

Dúvidas? Consulte a documentação ou peça ajuda no grupo!
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
