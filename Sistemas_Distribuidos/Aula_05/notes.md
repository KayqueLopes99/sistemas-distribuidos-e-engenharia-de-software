- Instalar o Docker.
- Selecionar uma app para se "conteinizar".
- Buildar a imagem e testar.
- Enviar para o serviço AWS ECR.
- Executar a imagem no serviço AWS ECS.



- Instância EC2: 
Launch instances.
Name and tags.
Ubuntu.
vockey.
Allow HTTP traffic from the internet.
+ Connect.


### Instalar o Docker.
1.
> https://docs.docker.com/engine/install/ubuntu/
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update

2.
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

### Selecionar uma app para se "conteinizar".
git clone https://github.com/KayqueLopes99/RepositorioTeste.git

https://hub.docker.com/

httpd

nano Dockerfile

FROM httpd:2.4
COPY ./MUDANÇA/ /usr/local/apache2/htdocs/

MUDANÇA = 

FROM httpd:2.4
COPY ./Aula_02/Project/tarefa2/build/ /usr/local/apache2/htdocs/

-> caminho: Aula_02/Project/tarefa2/build
cat Dockerfile

$ sudo docker build -t my-apache2 .
$ sudo docker run -dit --name my-running-app -p 80:80 my-apache2

sudo docker images

sudo docker run -dit --name jogo-running-app -p 80:80 my-app

sudo docker ps




https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html

https://hub.docker.com/_/httpd

https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html

