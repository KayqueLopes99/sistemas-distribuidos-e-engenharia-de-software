Laboratório 5: Crie seu servidor de banco de dados e interaja com ele usando um aplicativo.
Visão geral e objetivos do laboratório
Este laboratório foi projetado para reforçar o conceito de utilização de uma instância de banco de dados gerenciada pela AWS para atender às necessidades de bancos de dados relacionais.

O Amazon Relational Database Service (Amazon RDS) facilita a configuração, a operação e o dimensionamento de um banco de dados relacional na nuvem. Ele oferece capacidade dimensionável e com custo-benefício, gerenciando tarefas de administração de banco de dados que consomem muito tempo, permitindo que você se concentre em seus aplicativos e negócios. O Amazon RDS oferece seis mecanismos de banco de dados conhecidos para você escolher: Amazon Aurora, Oracle, Microsoft SQL Server, PostgreSQL, MySQL e MariaDB.

 

Ao final deste laboratório, você será capaz de:

Inicie uma instância de banco de dados Amazon RDS com alta disponibilidade.

Configure a instância do banco de dados para permitir conexões do seu servidor web.

Abra um aplicativo web e interaja com seu banco de dados.

 

Duração
Este laboratório leva aproximadamente 30 minutos .

 

restrições de serviço da AWS
Neste ambiente de laboratório, o acesso aos serviços e ações da AWS pode estar restrito àqueles necessários para concluir as instruções do laboratório. Você poderá encontrar erros se tentar acessar outros serviços ou executar ações além das descritas neste laboratório.

 

Cenário
Ao iniciar o laboratório, a seguinte infraestrutura é fornecida:



 

Ao final do laboratório, você terá a seguinte infraestrutura:



 

Acessando o Console de Gerenciamento da AWS
Na parte superior destas instruções, escolha Iniciar Laboratório .

A sessão de laboratório começa.

Um cronômetro é exibido na parte superior da página, mostrando o tempo restante da sessão.

 Dica: Para atualizar a duração da sessão a qualquer momento, escolha Reinicie o laboratório antes que o cronômetro chegue a 0:00.

Antes de prosseguir, aguarde até que o ícone circular à direita do AWS apareça.O link no canto superior esquerdo fica verde.

 

Para se conectar ao Console de Gerenciamento da AWS, selecione o link da AWS no canto superior esquerdo.

Uma nova aba do navegador será aberta e você será conectado ao console.

 Dica: Se uma nova aba do navegador não abrir, geralmente aparece um banner ou ícone na parte superior do navegador informando que ele está bloqueando a abertura de janelas pop-up. Selecione o banner ou ícone e, em seguida, escolha " Permitir pop-ups" .

 

Configure a guia do Console de Gerenciamento da AWS para que ela seja exibida ao lado destas instruções. O ideal é que você consiga visualizar ambas as guias do navegador simultaneamente, para facilitar o acompanhamento das etapas do laboratório.

 

Como obter reconhecimento pelo seu trabalho
Ao final deste laboratório, você receberá instruções para enviá-lo e receber uma nota com base no seu progresso.

 Dica: O script que verifica seu código só atribuirá pontos se você nomear os recursos e definir as configurações conforme especificado. Em particular, os valores nestas instruções que aparecem em ` This Format<nome_do_arquivo>` devem ser inseridos exatamente como documentados (diferenciando maiúsculas de minúsculas).

 

Tarefa 1: Criar um grupo de segurança para a instância do banco de dados RDS
Nesta tarefa, você criará um grupo de segurança para permitir que seu servidor web acesse sua instância de banco de dados RDS. O grupo de segurança será usado quando você iniciar a instância do banco de dados.

No Console de Gerenciamento da AWS, na caixa de pesquisa ao lado deServiços , pesquise e selecione VPC .

 

No painel de navegação à esquerda, selecione Grupos de segurança .

 

Selecione Criar grupo de segurança e, em seguida, configure:

Nome do grupo de segurança: DB Security Group

Descrição: Permit access from Web Security Group

VPC: Laboratório VPC 

Dica : Selecione o X ao lado da VPC que já está selecionada e, em seguida, escolha Lab VPC no menu.

 

No painel Regras de entrada , selecione Adicionar regra.

O grupo de segurança não possui regras no momento. Você deverá adicionar uma regra para permitir o acesso do Grupo de Segurança Web .

 

Configure as seguintes definições:

Tipo: MySQL/Aurora (3306) 

Fonte: Posicione o cursor no campo à direita de Personalizado, digite sge selecione Grupo de Segurança Web .

Esta configuração define o grupo de segurança do banco de dados para permitir tráfego de entrada na porta 3306 de qualquer instância EC2 associada ao Grupo de Segurança Web .

 

Selecione Criar grupo de segurança

Você usará esse grupo de segurança ao iniciar um banco de dados Amazon RDS neste laboratório.

 

Tarefa 2: Criar um grupo de sub-redes de banco de dados
Nesta tarefa, você criará um grupo de sub-redes de banco de dados que será usado para informar ao RDS quais sub-redes podem ser usadas para o banco de dados. Cada grupo de sub-redes de banco de dados requer sub-redes em pelo menos duas Zonas de Disponibilidade.

No Console de Gerenciamento da AWS, na caixa de pesquisa ao lado deServiços , pesquise e selecione RDS .

 

No painel de navegação à esquerda, selecione Grupos de sub-redes .

Se o painel de navegação não estiver visível, escolha oÍcone de menu no canto superior esquerdo.

 

Selecione Criar Grupo de Sub-redes de Banco de Dados e, em seguida, configure:

Nome: DB-Subnet-Group

Descrição: DB Subnet Group

VPC: Laboratório VPC 

 

Desça a página até a seção Adicionar sub-redes .

 

Expanda a lista de valores em Zonas de disponibilidade e selecione as duas primeiras zonas: us-east-1a e us-east-1b .

 

Expanda a lista de valores em Sub-redes e selecione as sub-redes associadas aos intervalos CIDR 10.0.1.0/24 e 10.0.3.0/24 .

Essas sub-redes agora devem ser exibidas na tabela Sub-redes selecionadas .

 

Selecione Criar

Você usará esse grupo de sub-redes do banco de dados ao criar o banco de dados na próxima tarefa.

 

Tarefa 3: Criar uma instância de banco de dados Amazon RDS
Nesta tarefa, você configurará e iniciará uma implantação Multi-AZ do Amazon RDS de uma instância de banco de dados MySQL.

As implantações do Amazon RDS Multi-AZ oferecem maior disponibilidade e durabilidade para instâncias de banco de dados (DB), tornando-as ideais para cargas de trabalho de banco de dados em produção. Ao provisionar uma instância de DB Multi-AZ, o Amazon RDS cria automaticamente uma instância de DB primária e replica os dados de forma síncrona para uma instância em espera em uma Zona de Disponibilidade (AZ) diferente.

No painel de navegação à esquerda, selecione Bancos de dados .

 

Selecione Criar banco de dados

Se você vir a opção "Alternar para o novo fluxo de criação de banco de dados" na parte superior da tela, selecione-a.

 

Selecione MySQL em Opções do mecanismo .

 

Em Modelos, escolha Desenvolvimento/Teste .

 

Em Disponibilidade e durabilidade, selecione Instância de banco de dados Multi-AZ .

 

Em Configurações , configure:

Identificador da instância do banco de dados: lab-db

Nome de usuário principal: main

Senha mestra: lab-password

Confirme sua senha: lab-password

 

Na classe de instância do banco de dados , configure:

Selecione Classes com capacidade de explosão (incluindo classes t) .

Selecione db.t3.micro

 

Em Armazenamento , configure:

Tipo de armazenamento: Uso geral (SSD) 

Armazenamento alocado: 20 

 

Em Conectividade , configure:

Nuvem Privada Virtual (VPC): Laboratório VPC 

 

Em Grupos de segurança VPC existentes , na lista suspensa:

Selecione o Grupo de Segurança do Banco de Dados .

Desmarque a opção padrão .

Em Monitoramento, expanda Configuração adicional .

Desmarque a opção Ativar monitoramento aprimorado .

Em Configuração adicional , configure:

Nome inicial do banco de dados: lab

Desmarque a opção Ativar backups automáticos .

Desmarque a opção Ativar criptografia

Isso desativará os backups, o que normalmente não é recomendado, mas fará com que o banco de dados seja implantado mais rapidamente para este laboratório.

Selecione Criar banco de dados

Seu banco de dados será iniciado agora.

 Se você receber um erro que menciona "não autorizado a executar: iam:CreateRole", certifique-se de ter desmarcado a opção Ativar monitoramento aprimorado na etapa anterior.

 

Escolha lab-db (selecione o próprio link).

Agora você precisará aguardar aproximadamente 4 minutos para que o banco de dados esteja disponível. O processo de implantação está implantando um banco de dados em duas zonas de disponibilidade diferentes.

 Enquanto aguarda, você pode consultar as perguntas frequentes do Amazon RDS ou tomar uma xícara de café.

 

Aguarde até que a informação mude para "Modificando" ou "Disponível" .

 

Desça até a seção Conectividade e segurança e copie o campo Ponto de extremidade .

Terá uma aparência semelhante a: lab-db.xxxx.us-east-1.rds.amazonaws.com .

 

Cole o valor do Endpoint em um editor de texto. Você o usará mais tarde no laboratório.

 

Tarefa 4: Interaja com seu banco de dados
Nesta tarefa, você abrirá um aplicativo web em execução em um servidor web que foi criado para você. Você o configurará para usar o banco de dados que acabou de criar.

Para descobrir o endereço IP do servidor web , selecione a opção correspondente.Menu suspenso "Detalhes da AWS" acima destas instruções. Copie o valor do endereço IP.

 

Abra uma nova aba do navegador, cole o endereço IP do servidor web e pressione Enter.

A aplicação web será exibida, mostrando informações sobre a instância EC2.

 

Selecione o link RDS na parte superior da página.

Agora você irá configurar o aplicativo para se conectar ao seu banco de dados.

 

Configure as seguintes definições:

Endpoint: Cole o Endpoint que você copiou anteriormente em um editor de texto.

Banco de dados: lab

Nome de usuário: main

Senha: lab-password

Selecione Enviar

Uma mensagem será exibida explicando que o aplicativo está executando um comando para copiar informações para o banco de dados. Após alguns segundos, o aplicativo exibirá uma Agenda de Endereços .

O aplicativo Agenda de Endereços utiliza o banco de dados RDS para armazenar informações.

 

Teste a aplicação web adicionando, editando e removendo contatos.

Os dados estão sendo persistidos no banco de dados e replicados automaticamente para a segunda Zona de Disponibilidade.

 

Submissão do seu trabalho
Para registrar seu progresso, selecione Enviar na parte superior destas instruções.

 

Quando solicitado, escolha Sim .

Após alguns minutos, o painel de notas aparecerá, mostrando quantos pontos você ganhou em cada tarefa. Se os resultados não forem exibidos após alguns minutos, selecione "Notas" na parte superior destas instruções.

 Dica: Você pode enviar seu trabalho várias vezes. Depois de fazer alterações, selecione "Enviar" novamente. Seu último envio será registrado para este laboratório.

 

Para obter feedback detalhado sobre seu trabalho, selecione Relatório de Envio .

 Dica: Para as verificações em que você não obteve a pontuação máxima, o relatório de envio geralmente fornece detalhes úteis.