#!/bin/bash

# 🚀 Script de inicialização rápida do Jenkins + React Demo

echo "🚀 Iniciando Jenkins CI/CD Demo..."
echo "=================================="

# Verificar se Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker não encontrado. Por favor, instale o Docker primeiro."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose não encontrado. Por favor, instale o Docker Compose primeiro."
    exit 1
fi

echo "✅ Docker encontrado"

# Parar containers existentes se houver
echo "🛑 Parando containers existentes..."
docker-compose down

# Buildar e subir os containers
echo "🏗️ Buildando e iniciando containers..."
docker-compose up --build -d

echo "⏳ Aguardando Jenkins inicializar..."
sleep 30

# Verificar se Jenkins está rodando
if docker ps | grep -q jenkins-server; then
    echo "✅ Jenkins está rodando!"
    
    # Tentar obter a senha inicial
    echo "🔐 Obtendo senha inicial do Jenkins..."
    JENKINS_PASSWORD=$(docker exec jenkins-server cat /var/jenkins_home/secrets/initialAdminPassword 2>/dev/null)
    
    if [ -n "$JENKINS_PASSWORD" ]; then
        echo "🎉 Setup completo!"
        echo ""
        echo "🌐 URLs disponíveis:"
        echo "   Jenkins:     http://localhost:8080"
        echo "   Aplicação:   http://localhost:80"
        echo "   Frontend:    http://localhost:3000"
        echo "   Backend:     http://localhost:8081"
        echo ""
        echo "🔐 Senha inicial do Jenkins:"
        echo "   $JENKINS_PASSWORD"
        echo ""
        echo "📋 Próximos passos:"
        echo "1. Acesse http://localhost:8080"
        echo "2. Use a senha acima para configurar o Jenkins"
        echo "3. Instale os plugins sugeridos"
        echo "4. Crie um novo Pipeline job apontando para este repositório"
        echo ""
    else
        echo "⚠️ Jenkins está iniciando, aguarde mais alguns minutos..."
        echo "Execute: docker exec jenkins-server cat /var/jenkins_home/secrets/initialAdminPassword"
    fi
else
    echo "❌ Erro ao iniciar Jenkins"
    echo "Verificar logs: docker-compose logs jenkins-server"
fi

echo "📊 Status dos containers:"
docker-compose ps
