Laboratório 2: Desenvolvimento com o Amazon S3 usando o kit de desenvolvimento de software da AWS (SDK da AWS)
Visão geral

Neste laboratório, você aprenderá a desenvolver com o Amazon Simple Storage Service (Amazon S3) usando um dos kits de desenvolvimento de software (SDKs) da AWS: o AWS SDK for JavaScript em Node.js, o AWS SDK for Ruby ou o AWS SDK for Python (Boto). Você pode selecionar a linguagem de desenvolvimento de sua preferência (Node.js, Ruby ou Python). No cenário apresentado, você criará uma página da web básica e usará o SDK da AWS para a linguagem escolhida para hospedá-la no Amazon S3. Este laboratório oferece experiência prática com o Amazon S3 e o AWS Cloud9.

Objetivos

Depois de concluir este laboratório, você será capaz de:

Usar um SDK da AWS para criar um bucket do Amazon S3

Usar um SDK da AWS para fazer upload de itens no bucket do S3

Usar um SDK da AWS para aplicar uma política de bucket do S3

Usar um SDK da AWS para habilitar a hospedagem de sites

Duração

 A duração do laboratório é de aproximadamente 180 minutos.

Cenário
Um gato perdido está no seu quintal há semanas. Você decide ficar com ele até encontrar seu dono, pois não quer que ele vá para um abrigo (é muito carinhoso e pequeno). Você divulga fotos dele na vizinhança.

gato

Depois de uma semana sem receber chamadas, você decide criar um site estático básico para que as pessoas conheçam o Puddles (você deu até um nome inglês ao gato... depois de encontrá-lo bebendo água em uma poça, ou puddle).

Você abre o editor de texto e escreve algumas linhas de HTML básico, que farão parte do site.

Este é o HTML que escreveu:

<!DOCTYPE html>
<html>
<head>
    <title>Cat Lost and Found</title>
</head>
<body>
    <h1>Lost Cat</h1>
    <h2>Call me if this is your cat</h2>
    <p>My number is 000 000 0000</p>
    <img alt="this is a picture of a lost cat" src="cat.jpg" />
</body>
</html>
Você pensa como hospedará seu site na nuvem. Você soube que é simples trabalhar com o Amazon S3 e que pode usá-lo para hospedar um site estático, como o site que deseja criar para encontrar o dono do Puddles.

Você sabe que pode usar o console do Amazon S3 para criar um bucket do S3, fazer upload do arquivo HTML do site e das fotos do gato nesse bucket e usar o bucket do S3 para hospedar o site. No entanto, por ser um aprendiz de desenvolvedor que está estudando para ser aprovado no exame AWS Certified Developer - Associate, você pensa que essa seria uma boa oportunidade de ganhar experiência prática trabalhando com um dos SDKs da AWS.

Esta é a lista de tarefas que terão que ser executadas com o SDK da AWS:

Criar um bucket do Amazon S3.

Fazer upload de itens no bucket do S3.

Aplicar uma política de bucket do S3.

Habilitar a hospedagem de sites.

Você opta por usar o AWS Cloud9 porque quer aprender a executar todas as tarefas de desenvolvimento na nuvem.

Tarefa 1: Preparar o laboratório
Antes de iniciar este laboratório, você precisa importar alguns arquivos e instalar alguns pacotes no ambiente do AWS Cloud9 que foi preparado para você.

No Console de Gerenciamento da AWS, acesse o menu Serviços e escolha Cloud9.

Para abrir o ambiente do AWS Cloud9 fornecido, escolha Abrir.

Para propagar o sistema de arquivos do AWS Cloud9, acesse o terminal bash do AWS Cloud9 (na parte inferior da página) e execute o seguinte comando wget:

wget https://aws-tc-largeobjects.s3-us-west-2.amazonaws.com/DEV-ILT-TF-200-ACCDEV-1/lab-2-s3.zip -P /home/ec2-user/environment
  Um arquivo lab-2-s3.zip foi adicionado na pasta raiz do sistema de arquivos do AWS Cloud9 (na parte superior esquerda).

Para descompactar o arquivo lab-2-s3.zip, execute o seguinte comando:

unzip lab-2-s3.zip
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

Tarefa 2: Usar o AWS SDK para criar um bucket do Amazon S3
Na tabela a seguir, abra o link para o método de criação de buckets do S3 na documentação do AWS SDK referente à linguagem que você deseja usar para codificar. 

Verifique o nome do método e estabeleça quais parâmetros deve passar.

Linguagem	Link da documentação aprofundada do SDK da AWS
Node.js (8.10.0)	https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#createBucket-property
Ruby (2.6.0)	https://docs.aws.amazon.com/sdk-for-ruby/v3/api/Aws/S3/Client.html#create_bucket-instance_method
Python (3.6.8)	https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html#S3.Client.create_bucket
Escolha um nome para o bucket. Um formato que pode ser usado para o nome do bucket é <date>-<your-initials>-catlostandfoundwebsite. Aqui está um exemplo:

2019-04-11-er-catlostandfoundwebsite 
Observação: os nomes de bucket do S3 devem ser exclusivos em todas as regiões. Adicionar a data e suas iniciais antes do nome do bucket catlostandfoundwebsite ajudará a evitar conflitos de nome. Além disso, os nomes de bucket devem estar em caracteres minúsculos e não incluir sublinhados nem símbolos incomuns.

Desenvolva um código para criar um bucket do S3
No ambiente do AWS Cloud9, faça o seguinte:

Na pasta de código na qual você está trabalhando, clique duas vezes no arquivo create_bucket para abri-lo.

Usando a documentação do AWS SDK para referência, substitua as seções <Fill Me In> ou <FMI> do código nesse arquivo para que o código crie o bucket catlostandfoundwebsite (com suas iniciais e data) na Região us-east-1.

Salve o arquivo.

No terminal do AWS Cloud9, execute esse arquivo usando run command para a linguagem escolhida, que está na tabela a seguir.

Use o terminal correto e o caminho da pasta para a linguagem escolhida.

Linguagem	Run Command
Node.js (8.10.0)	node create_bucket.js
Ruby (2.6.0)	ruby create_bucket.rb
Python (3.6.8)	python3 create_bucket.py
Confirmar se o código funciona
Em uma guia separada do navegador, acesse o console do Amazon S3. 

Para acessar o console do Amazon S3 no IDE AWS Cloud9:
a. Na barra de menus, escolha AWS Cloud9 e, depois, Go To Your Dashboard (Acessar o painel). 
b. Selecione Services (Serviços) e, depois, S3. 

Se o código funcionar, você verá o bucket catlostandfoundwebsite na região Leste dos EUA (Virgínia do Norte), como neste exemplo:



Anote o nome do bucket, pois ele será necessário posteriormente no código.

Se você não conseguir executar essas etapas ou se o código não funcionar, consulte o código da solução.

Para definir o bucket como público, selecione-o e: Escolha Permissões. Selecione Editar em Bloquear acesso público (configurações de bucket). Desmarque a opção Bloquear todo o acesso público. Salve e confirme as alterações. 

Preparar os arquivos
Agora que você criou o primeiro bucket do S3 usando o SDK da AWS, prepare o arquivo HTML para o site e uma foto de Puddles para serem adicionados ao bucket.

No ambiente do AWS Cloud9, faça o seguinte:

Crie um novo arquivo na pasta raiz s3-lab. Para fazer isso, selecione a pasta raiz s3-lab. No menu Arquivo, escolha Novo arquivo.

Nesse arquivo, cole as seguintes linhas de HTML:

<!DOCTYPE html>
<html>
<head>
    <title>Cat Lost and Found</title>
</head>
<body>
    <h1>Lost Cat</h1>
    <h2>Call me if this is your cat</h2>
    <p>My number is 000 000 0000</p>
    <img alt="this is a picture of a lost cat" src="cat.jpg" /> 
</body>
</html>
Salve o arquivo. Para fazer isso, no menu Arquivo, escolha Salvar como.... Verifique se a pasta raiz s3-lab está selecionada e salve o arquivo como index.html.

O arquivo do site está pronto no ambiente do AWS Cloud9. Agora você deve fazer upload de uma foto do Puddles. 

Crie e salve um arquivo .jpg como cat.jpg em sua área de trabalho. (Observação: é possível usar qualquer arquivo .jpg, mas ele deve se chamar cat.jpg.)

No ambiente do AWS Cloud9, selecione a pasta raiz s3-lab.

No menu Arquivo, escolha Upload Local Files... (Fazer upload de arquivos locais...).

Faça upload do arquivo cat.jpg.



Confirme se os arquivos cat.jpg e index.html estão diretamente abaixo da pasta raiz s3-lab.

Parabéns! Você concluiu esta tarefa. Você criou um bucket do S3 usando o SDK da AWS, que está pronto para receber o upload dos dois arquivos criados.

A história continua...
Você tem uma foto de Puddles e o HTML no ambiente do AWS Cloud9. Você está pronto para fazer upload desses arquivos no novo bucket do S3.

Você pode fazer upload desses arquivos no bucket do S3 por meio do console do Amazon S3. No entanto, convém usar o SDK e testar suas habilidades de codificação. 

Tarefa 3: Usar o SDK da AWS para fazer upload de itens no bucket do S3
Na tabela a seguir, abra o link para o método de upload de itens na documentação do AWS SDK referente à linguagem que você deseja usar para codificar. 

Verifique o nome do método e estabeleça quais parâmetros deve passar.

Linguagem	Link da documentação aprofundada do SDK da AWS
Node.js (8.10.0)	https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
Ruby (2.6.0)	https://docs.aws.amazon.com/sdk-for-ruby/v3/api/Aws/S3/Client.html#put_object-instance_method
Python (3.6.8)	https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html#S3.Client.upload_file
Desenvolver um código para o upload dos arquivos no bucket do S3
No ambiente do AWS Cloud9, faça o seguinte:

Na pasta de código na qual você está trabalhando, clique duas vezes no arquivo upload_items para abri-lo.

Usando a documentação do AWS SDK para referência, substitua as seções <Fill Me In> ou <FMI> do código nesse arquivo para que o código faça upload dos dois arquivos, cat.jpg e index.html, no bucket.

Verifique se o cabeçalho CacheControl está definido como max-age=0, pois você não precisa otimizar com armazenamento em cache enquanto desenvolve, e precisa que todas as alterações efetuadas no arquivo sejam exibidas instantaneamente. Além disso, verifique se os respectivos tipos de conteúdo estão corretos: eles devem ser image/jpg e text/html, para que o navegador os processe corretamente.

Salve o arquivo.

No terminal do AWS Cloud9, execute esse arquivo usando run command para a linguagem escolhida, que está na tabela a seguir.

Use o terminal correto e o caminho da pasta para a linguagem escolhida.

Linguagem	Run Command
Node.js (8.10.0)	node upload_items.js
Ruby (2.6.0)	ruby upload_items.rb
Python (3.6.8)	python3 upload_items.py
Confirmar se o código funciona
Abra o console do Amazon S3 em uma guia separada do navegador. Você deve ver os dois itens dentro do bucket do S3. Embora possa ver os nomes de arquivos no bucket do S3 ou as E-tags dos arquivos, seu código pode não ter funcionado corretamente. Por exemplo, os arquivos podem estar vazios. 

Para confirmar se o código funcionou, faça download dos dois itens. 

No console do Amazon S3, verifique os metadados de cada um dos itens do bucket. Verifique se Cache-Control está definido como max-age=0.

Se você não conseguir executar essas etapas ou se o código não funcionar, consulte o código da solução.

Parabéns! Você concluiu esta tarefa. Seus itens ficarão armazenados de forma correta e durável no Amazon S3.

A história continua...
Agora você tem os arquivos index.html e cat.jpg do seu site no Amazon S3. 

Ocorre um problema.

No console do Amazon S3, é possível visualizar esses ativos ao baixá-los. No entanto, ao acessar o URL do objeto para visualizar a página index.html ou cat.jpg, você recebe um erro de permissão 403:



Parece que você não tem permissão para visualizar esses arquivos.

Você (e todo o mundo) tem que poder acessar os ativos cat.jpg e index.html.

Você sabe que pode usar o console do Amazon S3 para tornar ambos os itens públicos. No entanto, há uma abordagem melhor e mais fácil, principalmente se você começar a adicionar mais ativos da web, como arquivos CSS.

Você decide adicionar uma política de bucket para todo o bucket, o que permitirá a qualquer pessoa ler nesse bucket. Você decide realizar essa tarefa por meio do SDK da AWS.

Tarefa 4: Usar o AWS SDK para aplicar uma política de bucket do S3
Antes de começar, acesse o console do Amazon S3 e anote o nome do bucket. Você precisará dele para concluir esta tarefa. Ele será semelhante a este exemplo:

1554996088742

Crie uma política de bucket para que qualquer pessoa possa ter acesso ao bucket do S3 
No ambiente do AWS Cloud9, faça o seguinte:

Para criar uma política de bucket que conceda permissão para qualquer pessoa ler o bucket, crie um novo arquivo na pasta raiz s3-lab e chame-o de public_policy.json.

No arquivo, cole este código: No código, substitua cuidadosamente o nome do bucket de exemplo pelo nome do seu bucket:

{
  "Version":"2012-10-17",
  "Statement":[{
    "Sid":"PublicReadGetObject",
        "Effect":"Allow",
      "Principal": "*",
      "Action":["s3:GetObject"],
      "Resource":["arn:aws:s3:::2019-04-11-er-catlostandfoundwebsite/*"
      ]
    }
  ]
}
Salve esse arquivo.

Desenvolva um código para aplicar a política de bucket ao bucket do S3
Na tabela a seguir, abra o link do método para adicionar uma política de bucket na documentação do AWS SDK referente à linguagem que você deseja usar para codificar. 

Verifique o nome do método e estabeleça quais parâmetros deve passar.

Linguagem	Link da documentação aprofundada do SDK da AWS
Node.js (8.10.0)	https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putBucketPolicy-property
Ruby (2.6.0)	https://docs.aws.amazon.com/sdk-for-ruby/v3/api/Aws/S3/Client.html#put_bucket_policy-instance_method
Python (3.6.8)	https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html#S3.Client.put_bucket_policy
No ambiente do AWS Cloud9, faça o seguinte:

Na pasta de código na qual você está trabalhando, clique duas vezes no arquivo permissions para abri-lo.

Usando a documentação do AWS SDK para referência, substitua as seções <Fill Me In> ou <FMI> do código nesse arquivo para que o código adicione a nova política de bucket ao seu bucket.

Salve o arquivo.

No terminal do AWS Cloud9, execute esse arquivo usando run command para a linguagem escolhida, que está na tabela a seguir. 

Use o terminal correto e o caminho da pasta para a linguagem escolhida.

Linguagem	Run Command
Node.js (8.10.0)	node permissions.js
Ruby (2.6.0)	ruby permissions.rb
Python (3.6.8)	python3 permissions.py
Confirmar se o código funciona
Abra o console do Amazon S3 em uma guia separada do navegador. Se o código tiver funcionado, você deverá conseguir baixar o arquivo cat.jpg usando o URL do objeto, que é semelhante a este:

https://s3.amazonaws.com/2019-04-11-er-catlostandfoundwebsite/cat.jpg
Na guia Permissões em Política de bucket, confirme se a nova política de bucket está visível. Observe o rótulo laranja Public.

1554996585460

Se você não conseguir executar essas etapas ou se o código não funcionar, consulte o código da solução.

Parabéns! Você concluiu esta tarefa. Você criou e aplicou uma política de bucket ao bucket do S3 para que ele fique acessível publicamente.

A história continua...
Você percebe que há algo que ainda pode melhorar.

Para visualizar o site, os usuários acessam o caminho completo do URL, que é semelhante a este exemplo:

https://s3.amazonaws.com/2019-04-11-er-catlostandfoundwebsite/index.html
Essa situação não é a ideal, porque você deseja usar um URL de site como neste exemplo (que não inclui o arquivo index.html):

https://SOMENEWWEBSITEURL/2019-04-11-er-catlostandfoundwebsite
Você pode alterar o URL com o Amazon S3. A única tarefa que você deve concluir é habilitar a hospedagem de sites em seu bucket e obter um URL de site totalmente novo para compartilhar com as pessoas.

É possível executar essa tarefa no console do Amazon S3, selecionando Hospedagem de site estático; porém, você prefere não fazer isso.

Você se comprometeu em realizar essa tarefa com o SDK, e decide desenvolver um código para que seu bucket hospede um site.

Você retira Puddles de cima do teclado e começa a desenvolver um código.

Tarefa 5: Usar o AWS SDK para habilitar a hospedagem de sites no bucket do S3
Antes de começar, acesse o console do Amazon S3 e anote o nome do bucket. Você precisará dele para concluir esta tarefa. Ele será semelhante a este exemplo:



Desenvolver um código para que o bucket do S3 hospede um site
Na tabela a seguir, abra o link do método para habilitar a hospedagem de sites em um bucket do S3 na documentação do AWS SDK referente à linguagem que deseja usar para codificar.

Verifique o nome do método e estabeleça quais parâmetros deve passar.

Linguagem	Link da documentação aprofundada do SDK da AWS
Node.js (8.10.0)	https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putBucketWebsite-property
Ruby (2.6.0)	https://docs.aws.amazon.com/sdkforruby/api/Aws/S3/Client.html#put_bucket_website-instance_method
Python (3.6.8)	https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html#S3.Client.put_bucket_website
No ambiente do AWS Cloud9, faça o seguinte:

Na pasta de código na qual você está trabalhando, clique duas vezes no arquivo websitehost para abri-lo.

Usando a documentação do AWS SDK para referência, substitua as seções <Fill Me In> ou <FMI> do código nesse arquivo para que o código habilite a hospedagem de sites no bucket.

Salve o arquivo.

No terminal do AWS Cloud9, execute esse arquivo usando run command para a linguagem escolhida, que está na tabela a seguir.

Use o terminal correto e o caminho da pasta para a linguagem escolhida.

Linguagem	Run Command
Node.js (8.10.0)	node websitehost.js
Ruby (2.6.0)	ruby websitehost.rb
Python (3.6.8)	python3 websitehost.py
Confirmar se o código funciona
Abra o console do Amazon S3 em uma guia separada do navegador.

No console do Amazon S3, escolha seu bucket.

Em Propriedades, escolha Hospedagem de site estático.

Escolha o hiperlink do endpoint. Você deverá ver o site