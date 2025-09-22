## Guia: Aplicação React (Vite) em AWS EC2 com Apache
### Etapa 1: Preparação do Servidor Web (Apache)
Primeiro, atualizamos o sistema e instalamos o Apache, que será o responsável por "servir" nossa aplicação na internet.
```bash
sudo apt update
```
  * **Descrição:** Este comando atualiza a lista de pacotes disponíveis no repositório do sistema operacional (Ubuntu/Debian). 
  - Adminitrativa atualiza.

```bash
sudo apt install apache2 -y
```
  * **Descrição:** Instala o software do servidor web Apache2. A flag `-y` responde 'sim' automaticamente para a pergunta de confirmação da instalação, agilizando o processo.


### 2.0 Manipulação do `index.html` [TESTE]

1.  `cd /var/www/html/` [Entra na pasta raiz do servidor Apache.]
2.  `ls` [lista o conteúdo da pasta]
3.  `rm index.html` [Tenta apagar o arquivo padrão `index.html`, mas provavelmente deu erro de permissão.]
4.  `sudo rm index.html` [Apaga o arquivo padrão `index.html` que o Apache cria na instalação.]
5.  `sudo nano index.html` [Cria um novo arquivo `index.html` em branco usando o editor de texto `nano` com permissão de escrita.]
6.  `Cola o codigo` [Coloca-se um código HTML simples dentro do editor `nano`.]
7.  `Ctrl + O, enter, Ctrl + X` [Usa os atalhos para salvar (`Ctrl+O`, Enter) e sair (`Ctrl+X`) do editor `nano`.]
8. `y` [ Confirmação.]

- `mkdir nome_do_diretorio` ---> Isso criará uma nova pasta chamada projetos no local onde você está atualmente.


## 2.0 Npm, node.js e Instalação do Ambiente Node.js com NVM (A Forma Correta)
- ``sudo apt install npm -y`` [Instala o Node Package Manager (npm), que é usado para gerenciar pacotes JavaScript. A flag `-y` responde 'sim' automaticamente para a pergunta de confirmação da instalação.]
-  `cd ~ ` [Volta para o diretório 'home' do usuário atual (`/home/ubuntu`, por exemplo).]
- `pwd` [Mostra o caminho completo do diretório atual.]
- `npm create vite@latest` [Inicia o assistente de criação de projeto do Vite.]
- ``cd nome_do_projeto`` [Navega para dentro do diretório do projeto que você acabou de criar. Lembre-se de substituir `nome_do_projeto` pelo nome que você escolheu.]
- `npm install` [Lê o arquivo `package.json` do projeto e baixa todas as dependências necessárias (como o React, ReactDOM, etc.) para a pasta `node_modules`.]

### Editando o arquivo App.jsx
- `nano src/App.jsx` [Abre o arquivo `App.jsx` dentro da pasta `src/` usando o editor de texto `nano`.]
-  `Ctrl + O, enter, Ctrl + X` [Usa os atalhos para salvar (`Ctrl+O`, Enter) e sair (`Ctrl+X`) do editor `nano`.]
- `y` [ Confirmação.]

- `nvm install ubuntu [Via dois comandos do github]`
- `nvm install 22` [Usa o NVM para instalar a versão 22 do Node.js. Esta versão já vem com uma versão compatível do `npm`. Você pode alterar para `20` ou outra versão que seu projeto necessite.]
- `ls dist/` [Lista o conteúdo da pasta `dist/`, que é onde o Vite coloca os arquivos otimizados após o build.]
- `npm run build` [Executa o script de "build" definido pelo Vite. Este comando transpila e otimiza todo o seu código React, CSS e outros assets, gerando uma pasta `dist/` com os arquivos estáticos prontos para serem servidos na web.]
- `sudo cp -r dist/* /var/www/html/` [Copia de forma recursiva todo o conteúdo da pasta `dist/` para a pasta raiz do Apache (`/var/www/html/`). O `sudo` é necessário pois esta é uma pasta protegida do sistema.]


## OBS: Para ver a aplicação no navegador
- Use o IP público da sua instância EC2 (ex: `http://seu-ip-publico`) para acessar a aplicação React que você acabou de implantar.