@echo off
REM 🚀 Script de inicialização rápida do Jenkins + React Demo (Windows)

echo 🚀 Iniciando Jenkins CI/CD Demo...
echo ==================================

REM Verificar se Docker está instalado
docker --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker não encontrado. Por favor, instale o Docker Desktop primeiro.
    pause
    exit /b 1
)

docker-compose --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker Compose não encontrado. Por favor, instale o Docker Compose primeiro.
    pause
    exit /b 1
)

echo ✅ Docker encontrado

REM Parar containers existentes se houver
echo 🛑 Parando containers existentes...
docker-compose down

REM Buildar e subir os containers
echo 🏗️ Buildando e iniciando containers...
docker-compose up --build -d

echo ⏳ Aguardando Jenkins inicializar...
timeout /t 30 /nobreak >nul

REM Verificar se Jenkins está rodando
docker ps | findstr jenkins-server >nul
if not errorlevel 1 (
    echo ✅ Jenkins está rodando!
    
    REM Tentar obter a senha inicial
    echo 🔐 Obtendo senha inicial do Jenkins...
    for /f "delims=" %%i in ('docker exec jenkins-server cat /var/jenkins_home/secrets/initialAdminPassword 2^>nul') do set JENKINS_PASSWORD=%%i
    
    if defined JENKINS_PASSWORD (
        echo 🎉 Setup completo!
        echo.
        echo 🌐 URLs disponíveis:
        echo    Jenkins:     http://localhost:8080
        echo    Aplicação:   http://localhost:80
        echo    Frontend:    http://localhost:3000
        echo    Backend:     http://localhost:8081
        echo.
        echo 🔐 Senha inicial do Jenkins:
        echo    %JENKINS_PASSWORD%
        echo.
        echo 📋 Próximos passos:
        echo 1. Acesse http://localhost:8080
        echo 2. Use a senha acima para configurar o Jenkins
        echo 3. Instale os plugins sugeridos
        echo 4. Crie um novo Pipeline job apontando para este repositório
        echo.
    ) else (
        echo ⚠️ Jenkins está iniciando, aguarde mais alguns minutos...
        echo Execute: docker exec jenkins-server cat /var/jenkins_home/secrets/initialAdminPassword
    )
) else (
    echo ❌ Erro ao iniciar Jenkins
    echo Verificar logs: docker-compose logs jenkins-server
)

echo 📊 Status dos containers:
docker-compose ps

pause
