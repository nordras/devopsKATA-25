# Como rodar o projeto devopsKATA-25 localmente

## Pré-requisitos
- Docker e Docker Compose instalados
- Python 3.11+
- Minikube instalado e rodando
- Helm instalado
- ngrok instalado (https://ngrok.com/download)
- GitHub repo configurado com webhook

---

## 1. Suba o Jenkins localmente

```sh
cd docker
# Constrói a imagem customizada do Jenkins
docker compose up --build -d
```
Acesse o Jenkins em: http://localhost:8080

---

## 2. Exponha o Jenkins para o GitHub usando ngrok

Em outro terminal, rode:
```sh
ngrok http 8080
```
Copie a URL gerada (ex: https://abcd1234.ngrok.io)

No GitHub, vá em **Settings > Webhooks** do seu repositório e adicione:
- URL: `https://abcd1234.ngrok.io/github-webhook/`
- Content type: `application/json`
- Eventos: push e pull request

---

## 3. Inicie o Minikube

```sh
minikube start
```

---

## 4. Build e deploy do Flask App

O pipeline Jenkins irá:
- Fazer build e testes do Flask App
- Buildar a imagem Docker do Flask App
- Deployar no Minikube via Helm Chart

---

## 5. Acesse a aplicação Flask no Minikube

Após o deploy, rode:
```sh
minikube service flask-app
```
O comando abrirá o navegador com o endereço do app Flask rodando no cluster.

---

## 6. Observações
- A URL do ngrok muda, então tem que atualizar o webhook
- O pipeline é disparado automaticamente após push/merge na branch main.
- O Jenkinsfile controla todas as etapas (build, test, deploy).
- O ngrok deve estar rodando sempre que quiser receber webhooks do GitHub.

---

Dúvidas? Consulte o README ou peça ajuda ao time!
