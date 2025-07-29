FROM jenkins/jenkins:lts

USER root

RUN apt-get update && \
    apt-get install -y docker.io python3-venv curl bash && \
    curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash && \
    apt-get clean
