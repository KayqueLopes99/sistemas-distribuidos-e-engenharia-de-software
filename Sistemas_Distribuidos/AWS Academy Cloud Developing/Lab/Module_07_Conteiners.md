# Trabalho com contêineres do Docker

## Visão Geral

Saber criar imagens do Docker e iniciar contêineres é uma habilidade muito útil para um desenvolvedor. Neste laboratório, você aprenderá a hospedar um site básico usando contêineres do Docker no AWS Cloud9.

Você usará o **AWS Cloud9** para criar uma instância de desenvolvimento do **Amazon EC2** que tenha o Docker instalado. Usando essa instância, você criará uma imagem do Docker e iniciará um contêiner. Em seguida, criará um repositório do **Amazon Elastic Container Registry (Amazon ECR)** para enviar a imagem criada.

## Objetivos

Depois de concluir este laboratório, você será capaz de:

* Criar um Dockerfile.
* Criar uma imagem do Docker usando um Dockerfile.
* Executar um contêiner a partir de uma imagem do Docker.
* Interagir com seus contêineres e administrá-los.
* Criar um repositório do Amazon ECR.
* Autenticar o cliente do Docker no Amazon ECR.
* Enviar uma imagem do Docker para o Amazon ECR.

**Duração:** Aprox. 60 minutos.

---

## Preparação: Acessar o Console

1. Clique em **Iniciar laboratório** (Start Lab).
2. Aguarde até ver a mensagem **"Lab status: ready"**.
3. Clique em **AWS** para abrir o Console de Gerenciamento.
4. *Dica:* Se necessário, permita pop-ups no navegador.

---

## Tarefa 1: Abrir o IDE do AWS Cloud9

1. No Console AWS, acesse o menu **Serviços** e escolha **Cloud9**.
2. Localize o ambiente fornecido e clique em **Abrir** (Open).

---

## Tarefa 2: Modificar um grupo de segurança

A implantação criou uma instância EC2. É necessário abrir a porta HTTP no firewall (Security Group).

1. No Cloud9, clique em **AWS Cloud9** > **Go To Your Dashboard**.
2. Vá em **Serviços** > **EC2**.
3. No menu esquerdo, clique em **Instâncias**.
4. Selecione a instância que começa com `aws-cloud9-Docker-...`.
* *Nota:* Se não achar, verifique se está na Região correta.


5. **IMPORTANTE:** Na parte inferior, anote o **Endereço IPv4 público**.
6. Ainda na parte inferior, clique na aba **Segurança** e depois no link do **Grupo de segurança** (começa com `aws-cloud9-Docker...`).
7. Vá na aba **Regras de entrada** (Inbound rules) e clique em **Editar regras de entrada**.
8. Clique em **Adicionar regra**:
* **Tipo:** HTTP
* **Origem:** Anywhere-IPv4 (0.0.0.0/0)


9. Clique em **Salvar regras**.

---

## Tarefa 3: Trabalhar com o Docker no AWS Cloud9

### 1. Verificar instalação e baixar recursos

No terminal do AWS Cloud9, execute:

```bash
# Verificar versão do Docker
docker -v

# Baixar o arquivo do laboratório
wget https://aws-tc-largeobjects.s3-us-west-2.amazonaws.com/DEV-ILT-TF-200-ACCDEV-1/lab-4-docker.zip

# Descompactar
unzip lab-4-docker.zip

# Limpar arquivos desnecessários
rm *.zip
rm README.md

```

### 2. Criar um Dockerfile

1. Vá em **Arquivo** > **Novo arquivo**.
2. Cole o seguinte conteúdo:

```dockerfile
FROM ubuntu:16.04
# Install apache and remove the list of packages downloaded from apt-get update
RUN apt-get update -y && \
apt-get install -y apache2 && \
rm -r /var/lib/apt/lists/*
# Copy the website into the apache web root directory
COPY resources /var/www/html
EXPOSE 80
CMD ["apachectl", "-D", "FOREGROUND"]

```

3. Salve o arquivo como `dockerfile` (tudo minúsculo) na pasta raiz.

### 3. Criar a imagem e rodar o contêiner

No terminal, execute:

```bash
# Criar a imagem (não esqueça do ponto no final)
docker build -t webapp-image .

# Verificar se a imagem foi criada
docker images

# Iniciar o contêiner (mapeando porta 80 do container para 80 da máquina)
docker run --name webapp -d -p 80:80 webapp-image

# Verificar se está rodando
docker ps -a

```

**Teste:** Abra uma nova aba no navegador e acesse `http://<SEU_IP_PUBLICO>`.

---

## Tarefa 4: Interagir com o contêiner do Docker

### 1. Entrar no contêiner (Modo Interativo)

```bash
# Entrar no terminal do contêiner
docker exec -i -t webapp /bin/bash

# Listar arquivos dentro do contêiner (deve ver os arquivos do site)
ls /var/www/html

# Sair do contêiner
exit

```

### 2. Gerenciar o ciclo de vida

```bash
# Ver ID do contêiner
docker ps -a

# Parar o contêiner (pelo nome ou ID)
docker stop webapp

# Iniciar novamente
docker start webapp

# Ver logs do servidor Apache
docker logs webapp

# Ver mapeamento de portas
docker port webapp
# Retorno esperado: 80/tcp -> 0.0.0.0:80

```

---

## Tarefa 5: Criar um repositório do ECR e enviar sua imagem

### 1. Criar o repositório

```bash
aws ecr create-repository --repository-name webapp

```

> **Atenção:** Na saída (JSON), copie o valor de `repositoryUri` (sem as aspas). Exemplo: `012345678901.dkr.ecr.us-east-1.amazonaws.com/webapp`.

### 2. Taggear a imagem

Substitua `<SEU_REPOSITORY_URI>` pelo endereço que você copiou acima.

```bash
docker tag webapp-image <SEU_REPOSITORY_URI>

```

### 3. Autenticar no ECR

Copie e cole este comando inteiro (ele gera um token e faz login automaticamente).
*Substitua o trecho final pelo seu domínio ECR (sem o /webapp no final).*

```bash
eval $(aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <SEU_ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com) 2> /dev/null

```

### 4. Enviar a imagem (Push)

```bash
docker push <SEU_REPOSITORY_URI>

```

### 5. Validar

```bash
aws ecr list-images --repository-name webapp

```

Se retornar um JSON com `imageDigest` e tag `latest`, o envio foi um sucesso!