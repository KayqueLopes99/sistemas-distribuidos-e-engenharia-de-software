Laboratório 3: Desenvolvimento com o Amazon DynamoDB usando o kit de desenvolvimento de software da AWS (SDK da AWS)
Visão geral

Neste laboratório, você aprenderá a desenvolver com o Amazon DynamoDB usando um dos kits de desenvolvimento de software (SDKs) da AWS: o AWS SDK for JavaScript em Node.js, o AWS SDK for Ruby ou o AWS SDK for Python (Boto). Você pode selecionar a linguagem de desenvolvimento de sua preferência (Node.js, Ruby ou Python). Seguindo o cenário fornecido, você criará uma tabela do DynamoDB e usará o SDK da AWS referente à linguagem escolhida para adicionar e editar dados na tabela e consultá-la. Este laboratório oferece experiência prática com o Amazon DynamoDB e o AWS Cloud9.

Objetivos

Depois de concluir este laboratório, você será capaz de:

Usar um SDK da AWS para criar uma tabela do DynamoDB.

Usar um SDK da AWS para adicionar dados à tabela.

Usar um SDK da AWS para editar uma entrada na tabela.

Usar um SDK da AWS para consultar a tabela.

Usar um SDK da AWS para criar um índice em uma tabela existente.

Duração

A duração do laboratório é de aproximadamente 180 minutos.

A história continua...
Você tem um site de gatos perdidos hospedado no Amazon S3, onde publicou uma foto de Puddles. No entanto, ainda não ligaram para você para buscá-lo. As semanas passam e você encontra mais gatos no seu quintal. (Isso deve ser porque você os alimenta!)

Você tenta manter notas sobre cada gato em um bloco de anotações ou em pedaços de papel, mas isso está se tornando impraticável. Por esse motivo, você decide começar a manter seus registros em um banco de dados on-line, onde pode pesquisar por um gato específico e obter as informações necessárias.

Você só precisa de uma estrutura de banco de dados simples, e por isso opta por usar o Amazon DynamoDB.

Aqui está a lista de tarefas que você precisará executar com o SDK da AWS:

Criar uma tabela do DynamoDB.

Fazer upload de informações dos gatos na tabela do DynamoDB.

Editar uma entrada na tabela.

Digitalizar a tabela (para descobrir quantos gatos você realmente tem).

Consultar a tabela (para encontrar informações específicas sobre um gato).

Adicionar um índice para melhorar a funcionalidade de pesquisa (por exemplo, pesquisar raças de gatos)

Tarefa 1: Preparar o laboratório
Antes de iniciar este laboratório, você precisa importar alguns arquivos e instalar alguns pacotes no ambiente do AWS Cloud9 que foi preparado para você.

No Console de Gerenciamento da AWS, acesse o menu Serviços e escolha Cloud9.

Para abrir o ambiente do AWS Cloud9 fornecido, escolha Open IDE (Abrir IDE).

Para propagar o sistema de arquivos do AWS Cloud9, acesse o terminal bash do AWS Cloud9 (na parte inferior da página) e execute o seguinte comando wget:

wget https://aws-tc-largeobjects.s3-us-west-2.amazonaws.com/DEV-ILT-TF-200-ACCDEV-1/lab-3-ddb.zip -P /home/ec2-user/environment
  Um arquivo lab-2-s3.zip foi adicionado na pasta raiz do sistema de arquivos do AWS Cloud9 (na parte superior esquerda).

Para descompactar o arquivo lab-2-s3.zip, execute o seguinte comando:

unzip lab-3-ddb.zip
  Esse processo pode levar alguns minutos. No sistema de arquivos do AWS Cloud9, você deve ver diferentes pastas de linguagem na pasta raiz lab.

Para limpar seu ambiente, execute os seguintes comandos para remover os arquivos.zip e README:

rm *.zip
rm README.md
Decida a linguagem na qual você trabalhará. (As opções no momento são Node.js, Ruby e Python.)

Selecione a seta preta ao lado da pasta da linguagem de preferência para expandi-la. Observe que há uma pasta de solução. Durante todo o laboratório, não olhe a solução, a menos que você não consiga descobrir como concluir a tarefa por conta própria. Sempre tente codificar primeiro.

Para definir o caminho do terminal até a pasta correta da linguagem escolhida, execute o seguinte comando:

cd <your choice of language folder>
# e.g cd python_3.6.8
Você trabalhará com todos os códigos dentro da pasta <your choice of language>.

Confirme se você está na pasta correta no terminal do AWS Cloud9.

Localize o comando One-Time Initialization and Import (Inicialização e importação única) da linguagem da sua escolha na tabela a seguir e execute-o no terminal do AWS Cloud9.

Observação: linguagens diferentes exigem etapas diferentes para inicializar o ambiente de código.

Linguagem	One-Time Initialization and Import
Node.js (8.10.0)	npm install aws-sdk
Ruby (2.6.0)	gem install aws-sdk #this may take around 3 minutes
Python (3.6.8)	wget https://aws-tc-largeobjects.s3-us-west-2.amazonaws.com/ILT-TF-200-ACCDEV-1/update_python.sh
. ./update_python.sh
Você verá que alguns pacotes e módulos foram instalados.

Ignore todos os avisos no terminal. No entanto, se ocorrer um erro, fale com o instrutor antes de prosseguir.

Agora você está pronto para executar as tarefas de laboratório com o SDK.

Tarefa 2: Usar o AWS SDK para criar uma tabela do DynamoDB
Na tabela a seguir, abra o link para o método de criação de tabelas do DynamoDB na documentação do AWS SDK referente à linguagem que você deseja usar para codificar. 

Confirme o nome do método e estabeleça quais parâmetros você deve passar.

Linguagem	Link da documentação aprofundada do SDK da AWS
Node.js (8.10.0)	https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#createTable-property
Ruby (2.6.0)	https://docs.aws.amazon.com/sdk-for-ruby/v3/api/Aws/DynamoDB/Resource.html#create_table-instance_method
Python (3.6.8)	https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.Python.01.html
Desenvolver um código para criar uma nova tabela do DynamoDB
Antes de começar, confirme se você está no caminho e na pasta corretos do terminal do AWS Cloud9 para a linguagem que usará.

No ambiente do AWS Cloud9, faça o seguinte:

Na pasta de código na qual você está trabalhando, clique duas vezes no arquivo create_table para abri-lo.

Usando a documentação do SDK para referência, substitua as seções <Fill Me In> ou <FMI> do código nesse arquivo para que o código crie uma tabela chamada lostcats na Região us-east-1.  

   Dica: você só precisa procurar o gato pelo nome, e então decide que a melhor opção para a chave primária é petname sem chave de classificação. Você não usará essa tabela com frequência, portanto, acredita que, por enquanto, é melhor definir a unidade de capacidade de leitura (RCU) como 1 e a unidade de capacidade de gravação (WCU) como 1.

Salve o arquivo.

No terminal do AWS Cloud9, execute esse arquivo usando run command para a linguagem escolhida, que está na tabela a seguir.

Linguagem	Run Command
Node.js (8.10.0)	node create_table.js
Ruby (2.6.0)	ruby create_table.rb
Python (3.6.8)	python create_table.py
Confirmar se o código funciona
Em uma guia separada do navegador, acesse o console do Amazon DynamoDB.

Para acessar o console do Amazon DynamoDB no IDE AWS Cloud9:
a. Na barra de menus, escolha AWS Cloud9 e, depois, Go To Your Dashboard (Acessar o painel). 
b. Selecione Services (Serviços) e, depois, DynamoDB. 
c. No menu à esquerda, selecione Tables (Tabelas).

Se o código funcionou, você verá que a tabela foi criada (ou está sendo criada) na Região Leste dos EUA (Virgínia do Norte).

Observação: aguarde até que o status da tabela mude para Active (Ativo) antes de prosseguir com o laboratório.

Selecione o nome de sua tabela. Na guia Overview (Visão geral), você deve ver algo assim:

1554396737454

Se você não conseguir executar essas etapas ou se o código não funcionar, consulte o código da solução.

Parabéns! Você concluiu esta tarefa. Agora você tem uma nova tabela do DynamoDB na região do Norte da Virgínia criada com um SDK da AWS.

A história continua...
Agora que você criou a tabela lostcats do DynamoDB, pode adicionar os dados referentes a gatos.

No momento, você só precisa acompanhar os nomes e as raças dos gatos.

Decida sobre a seguinte estrutura de banco de dados (ou esquema):

Primary Key (petname)	Raça
Puddles	Russian Blue
Hosepipe	Scottish Fold
Você deseja usar o SDK da AWS para adicionar os dois itens à tabela. Você acredita que o nome do método provavelmente é add item (adicionar item), mas consulte a documentação do AWS SDK.

Tarefa 3: Usar o SDK da AWS para adicionar itens a uma tabela do DynamoDB
Na tabela a seguir, abra o link para o método de criação de novos itens na documentação do AWS SDK referente à linguagem que você deseja usar para codificar. 

Confirme o nome do método e estabeleça quais parâmetros você deve passar.

Linguagem	Link da documentação aprofundada do SDK da AWS
Node.js (8.10.0)	https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#putItem-property
Ruby (2.6.0)	https://docs.aws.amazon.com/sdk-for-ruby/v3/api/Aws/DynamoDB/Client.html#put_item-instance_method
Python (3.6.8)	https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/dynamodb.html#DynamoDB.Client.put_item
Desenvolver um código para adicionar alguns itens à tabela do DynamoDB
Antes de começar, confirme se você está no caminho e na pasta corretos do terminal do AWS Cloud9 para a linguagem que usará.

No ambiente do AWS Cloud9, faça o seguinte:

Na pasta de código na qual você está trabalhando, clique duas vezes no arquivo upload_items para abri-lo.

Usando a documentação do AWS SDK para referência, substitua as seções <Fill Me In> ou <FMI> do código nesse arquivo para que o código faça upload de ambos os itens sobre gatos para a tabela chamada lostcats na Região us-east-1.  

   Dica: Puddles é um gato Azul Russo e Hosepipe é um Scottish Fold. Essas são todas as informações que você precisa carregar.

Salve o arquivo.

No terminal do AWS Cloud9, execute esse arquivo usando run command para a linguagem escolhida, que está na tabela a seguir.

Linguagem	Run Command
Node.js (8.10.0)	node upload_items.js
Ruby (2.6.0)	ruby upload_items.rb
Python (3.6.8)	python upload_items.py
Confirmar se o código funciona
Em uma guia separada do navegador, acesse o console do Amazon DynamoDB.

Selecione o nome da tabela e clique na guia Itens. (Selecione scan na lista suspensa, caso ainda não esteja selecionado.) Você verá os dois itens sobre gatos em sua tabela.

Se você não conseguir executar essas etapas ou se o código não funcionar, consulte o código da solução.

Parabéns! Você concluiu esta tarefa. Agora os dados sobre gatos estão na tabela do DynamoDB que você adicionou usando um SDK da AWS.

A história continua...
Você adicionou dados ao seu banco de dados, mas descobre que o Hosepipe não é um Scottish Fold. Ele é um British Shorthair.

Você pode acessar o console do Amazon DynamoDB e editar essa entrada, mas, em vez disso, decide desenvolver um código para atualizar o item.

Primary Key (petname)	Raça
Puddles	Russian Blue
Hosepipe	Scottish Fold British Shorthair
Você acredita que o nome do método provavelmente é edit_item, mas consulte a documentação do AWS SDK.

Tarefa 4: Usar o AWS SDK para editar um item de tabela do DynamoDB
Na tabela a seguir, abra o link para o método de atualização de itens na documentação do AWS SDK referente à linguagem que você deseja usar para codificar. 

Confirme o nome do método e estabeleça quais parâmetros você deve passar.

Linguagem	Link da documentação aprofundada do SDK da AWS
Node.js (8.10.0)	https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#updateItem-property
Ruby (2.6.0)	https://docs.aws.amazon.com/sdk-for-ruby/v3/api/Aws/DynamoDB/Client.html#update_item-instance_method
Python (3.6.8)	https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/dynamodb.html#DynamoDB.Client.update_item
Desenvolver um código para editar um item na tabela do DynamoDB
Antes de começar, confirme se você está no caminho e na pasta corretos do terminal do AWS Cloud9 para a linguagem que usará.

No ambiente do AWS Cloud9, faça o seguinte:

Na pasta de código na qual você está trabalhando, clique duas vezes no arquivo edit_item para abri-lo.

Usando a documentação do AWS SDK para referência, substitua as seções <Fill Me In> ou <FMI> do código nesse arquivo para que o código atualize a raça de Hosepipe para British Shorthair.

Salve o arquivo.

No terminal do AWS Cloud9, execute esse arquivo usando run command para a linguagem escolhida, que está na tabela a seguir.

Linguagem	Run Command
Node.js (8.10.0)	node edit_item.js
Ruby (2.6.0)	ruby edit_item.rb
Python (3.6.8)	python edit_item.py
Confirmar se o código funciona
Em uma guia separada do navegador, acesse o console do Amazon DynamoDB. 

Selecione o nome da tabela e a guia Itens. (Selecione scan (verificar) na lista suspensa, caso ainda não esteja selecionado.) Você deverá ver ambos os itens sobre gatos e se a raça do Hosepipe foi atualizada para British Shorthair.

Se você não conseguir executar essas etapas ou se o código não funcionar, consulte o código da solução.

Parabéns! Você concluiu esta tarefa. Agora você pode editar dados sobre gatos na tabela do DynamoDB usando o SDK da AWS.

A história continua...
Várias semanas se passam, e você adicionou diversas entradas ao seu banco de dados lostcats. Você também adicionou novos atributos, como gênero e características marcantes:

Primary Key (petname)	breed	notable_features	date_found	gender
Puddles	Russian Blue	Cut on right ear	July 12, 2020	Male
Hosepipe	British Shorthair	Stubby paw	July 22, 2020	Male
... muito mais gatos	 	 	 	 
Certo dia, alguém liga para você pedindo informações sobre Puddles.

A pessoa diz que Puddles se parece com seu gato, Gordie (que também está sumido há várias semanas). No entanto, Gordie tem um pequeno corte na orelha. Ela quer saber se Puddles é Gordie.

Você se lembra de adicionar dados sobre um gato que tem um corte na orelha, mas não consegue se lembrar se o gato era Puddles ou um outro. Você procura por Puddles em toda a casa e não o encontra. Daí, resolve consultar o banco de dados.

Você abre o console do Dynamo DB e confere rapidamente as características marcantes para verificar qual gato tem um corte na orelha. Porém você para.

Você quer ser aprovado no exame de desenvolvedor e ainda não tentou executar uma consulta com código. Sendo assim, decide desenvolver uma consulta usando o SDK.

Você percebe que não deseja consultar todos os dados sobre gatos porque não precisa de informações como sexo ou data em que o encontrou. Você só está interessado em consultar notable_features (características marcantes). Você decide criar uma projeção porque nunca fez isso antes. Uma projeção representa os atributos que são copiados (ou projetados) da tabela em um índice.

Antes de consultar seu banco de dados, você precisa terminar de adicionar entradas sobre todos os gatos que ainda encontra.

Tarefa 5: Preencher o banco de dados
Antes de passar para a próxima tarefa de consulta do banco de dados lostcats, você deve propagar o banco de dados com mais dados de gatos.

Você recebe um script que pode executar para propagar o banco de dados. Siga estas etapas cuidadosamente para propagar o banco de dados e concluir o restante do laboratório.

No sistema de arquivos do AWS Cloud9, identifique a pasta chamada resources. Essa pasta contém dois arquivos: cat_data.json e seed.js.

No terminal do AWS Cloud9, navegue até a pasta resources da pasta de código executando o seguinte comando:

    cd ~/environment/resources
Confirme se você está na pasta correta.

Execute o seguinte comando:

   npm install aws-sdk
Observação: npm é o gerenciador de pacotes Node.js. Você precisa executar esse comando independentemente do SDK usado. Pode ser que você já tenha o npm instalado se optou pela linguagem Node.js. Instalar o npm duas vezes não causará problemas, portanto, você poderá ignorar todos os avisos.

Execute o seguinte comando:

   node seed.js
Você deve ver a mensagem OK. Agora volte para a pasta de código na qual você estava trabalhando anteriormente.

Para voltar à pasta raiz, execute o seguinte comando no terminal do AWS Cloud9:

    cd ..
Em seguida, vá até a pasta de código executando:

   cd <your langauge folder>
   # example cd python_3.6.8
Confirme se você está na pasta correta no caminho do terminal.

Parabéns! Você concluiu esta tarefa. Você preencheu o banco de dados lostcats e agora está pronto para desenvolver o código para executar uma consulta nele.

Tarefa 6: Usar o AWS SDK para consultar um item em uma tabela do DynamoDB
Na tabela a seguir, abra o link para o método de consulta a uma tabela do DynamoDB na documentação do AWS SDK referente à linguagem que você deseja usar para codificar. 

Confirme o nome do método e estabeleça quais parâmetros você deve passar.

Linguagem	Link da documentação aprofundada do SDK da AWS
Node.js (8.10.0)	https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#query-property
Ruby (2.6.0)	https://docs.aws.amazon.com/sdk-for-ruby/v3/api/Aws/DynamoDB/Client.html#query-instance_method
Python (3.6.8)	https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/dynamodb.html#DynamoDB.Client.query (role para bem para baixo, onde está o exemplo)
Desenvolver um código para consultar a tabela do DynamoDB
Antes de começar, confirme se você está no caminho e na pasta corretos do terminal do AWS Cloud9 para a linguagem que usará.

No ambiente do AWS Cloud9, faça o seguinte:

Na pasta de código na qual você está trabalhando, clique duas vezes no arquivo query_table para abri-lo.

Usando a documentação do AWS SDK para referência, substitua as seções <Fill Me In> ou <FMI> do código nesse arquivo para que o código procure Puddles e retorne apenas suas características marcantes (a projeção).

Salve o arquivo.

No terminal do AWS Cloud9, execute esse arquivo usando run command para a linguagem escolhida, que está na tabela a seguir.

Linguagem	Run Command
Node.js (8.10.0)	node query_table.js
Ruby (2.6.0)	ruby query_table.rb
Python (3.6.8)	python query_table.py
Confirmar se o código funciona
Depois de executar o arquivo, os resultados no terminal do AWS Cloud9 devem exibir a característica marcante de Puddles, que é Corte na orelha direita.

Se você não conseguir executar essas etapas ou se o código não funcionar, consulte o código da solução.

Parabéns! Você concluiu esta tarefa. Você confirmou que Puddles é Gordie. Seus donos ficam felizes quando você liga para dizer que está com o gato deles.  

A história continua...
Hoje é o dia em que os donos de Gordie o levam para casa. Eles ficam gratos por você ter cuidado dele e publicado seu site. Caso contrário, eles nunca o teriam encontrado!

Agora que está satisfeito, limpe seu banco de dados. Você usa o console do Amazon DynamoDB para agilizar.

Tarefa 7: Atualizar a tabela do DynamoDB
No console do Amazon DynamoDB, faça o seguinte:

Na lista de serviços, escolha DynamoDB.

Escolha Tabelas e, depois, lostcats.

Clique na guia Explorar itens da tabela.

Selecione Puddles.

1556128819076

Selecione Ações e, depois, Excluir itens.

Para confirmar a remoção, escolha Excluir.

A história continua...
Agora, seu banco de dados está atualizado e você acha que é um bom momento para atualizar o site com os novos dados sobre gatos adicionados.   

Você pensa que seria muito trabalhoso atualizar manualmente uma página da web HTML estática e, portanto, decide tornar seu site dinâmico.

Sua ideia é criar um site que mostre todos os seus gatos e permita que os usuários do site filtrem por raças específicas.

Você tem os dados em seu banco de dados e um atributo breed (raça). No entanto, atualmente você não pode pesquisar no atributo breed (raça), somente na chave de partição atual, que é petname (nome do animal).

Lembre-se de que, com um índice do DynamoDB, você está essencialmente criando um clone da tabela onde pode escolher uma chave de partição diferente para pesquisar.

Você pode ler mais da documentação da AWS sobre DynamoDB e criar um esquema mais avançado que utilize chaves de classificação. No entanto, para simplificar (e agilizar), você decide que um índice secundário global (GSI) simples com breed (raça) como chave primária é a melhor maneira de obter uma lista de gatos por raça. Você também decide que uma varredura da tabela é a melhor maneira de obter uma lista não filtrada de todos os gatos.

Antes de começar a trabalhar no site e criar a interface de programação de aplicativos (API) de back-end, você decide primeiramente criar o índice na tabela.

Tarefa 8: Usar o SDK da AWS para criar um GSI em uma tabela do DynamoDB
Na tabela a seguir, abra o link do método para adicionar um índice secundário global na documentação do AWS SDK referente à linguagem que você deseja usar para codificar. 

Confirme o nome do método e estabeleça quais parâmetros você deve passar.

Linguagem	Link da documentação aprofundada do SDK da AWS
Node.js (8.10.0)	https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#updateTable-property
Ruby (2.6.0)	https://docs.aws.amazon.com/sdk-for-ruby/v3/api/Aws/DynamoDB/Client.html#update_table-instance_method
Python (3.6.8)	https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/dynamodb.html#DynamoDB.Client.update_table
Desenvolver um código para adicionar um índice à tabela do DynamoDB
Antes de começar, confirme se você está no caminho e na pasta corretos do terminal do AWS Cloud9 para a linguagem que usará.

No ambiente do AWS Cloud9, faça o seguinte:

Na pasta de código na qual você está trabalhando, clique duas vezes no arquivo add_index para abri-lo.

Usando a documentação do AWS SDK para referência, substitua as seções <Fill Me In> ou <FMI> do código nesse arquivo para que o código crie um GSI que tenha uma RCU igual a 1 e uma WCU igual a 1 e que também projete todos os atributos nele.

Salve o arquivo.

No terminal do AWS Cloud9, execute esse arquivo usando run command para a linguagem escolhida, que está na tabela a seguir.

Linguagem	Run Command
Node.js (8.10.0)	node add_index.js
Ruby (2.6.0)	ruby add_index.rb
Python (3.6.8)	python add_index.py
Confirmar se o código funciona
Em uma guia separada do navegador, acesse o console do Amazon DynamoDB. 

Selecione o nome da tabela e a guia Índices. Aguarde até que o status se torne Ativo.

Observação: o processo de criação de um GSI pode levar alguns minutos.

1556129417565

Selecione a guia Itens.

Ao lado do item Verificar escolha [Index] breed_index: breed.

1556129581357

Selecione Adicionar filtro.

Em Inserir atributo, insira breed. Para Inserir valor, digite Bengal.

Selecione Iniciar a pesquisa.

A consulta deve retornar Simba.

1556129740413

Se você não conseguir executar essas etapas ou se o código não funcionar, consulte o código da solução.

Parabéns! Você concluiu o laboratório do DyanmoDB.

Agora você sabe como fazer o seguinte com o SDK da AWS:

Criar uma tabela do DynamoDB.

Adicionar dados à tabela.

Editar uma entrada na tabela.

Consultar a tabela.

Crie um índice em uma tabela existente.