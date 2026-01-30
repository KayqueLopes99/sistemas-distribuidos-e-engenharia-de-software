Laboratório 2: Crie sua VPC e inicie um servidor web
Visão geral e objetivos do laboratório
Neste laboratório, você usará o Amazon Virtual Private Cloud (VPC) para criar sua própria VPC e adicionar componentes para produzir uma rede personalizada. Você também criará um grupo de segurança. Em seguida, configurará e personalizará uma instância EC2 para executar um servidor web e iniciará essa instância em uma sub-rede da VPC.

A Amazon Virtual Private Cloud (Amazon VPC) permite que você execute recursos da Amazon Web Services (AWS) em uma rede virtual definida por você. Essa rede virtual se assemelha bastante a uma rede tradicional que você operaria em seu próprio data center, com os benefícios de usar a infraestrutura escalável da AWS. Você pode criar uma VPC que abranja várias Zonas de Disponibilidade.

Após concluir este laboratório, você deverá ser capaz de fazer o seguinte:

Criar uma VPC.

Criar sub-redes.

Configure um grupo de segurança.

Inicie uma instância EC2 em uma VPC.

 

Duração
Este experimento leva aproximadamente 30 minutos para ser concluído.

 

restrições de serviço da AWS
Neste ambiente de laboratório, o acesso aos serviços e ações da AWS pode estar restrito àqueles necessários para concluir as instruções do laboratório. Você poderá encontrar erros se tentar acessar outros serviços ou executar ações além das descritas neste laboratório.

 

Cenário
Neste laboratório, você construirá a seguinte infraestrutura:

Arquitetura

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

 

Tarefa 1: Crie sua VPC
Nesta tarefa, você usará a opção "VPC e mais" no console da VPC para criar vários recursos, incluindo uma VPC , um Gateway da Internet , uma sub-rede pública e uma sub-rede privada em uma única Zona de Disponibilidade, duas tabelas de roteamento e um Gateway NAT .

 

Na caixa de pesquisa à direita de Em Serviços , pesquise e selecione VPC para abrir o console da VPC.

   

Comece a criar uma VPC.

No canto superior direito da tela, verifique se N. Virginia (us-east-1) é a região.

Selecione o link do painel de controle da VPC , que está localizado no canto superior esquerdo do console.

Em seguida, selecione Criar VPC .

Observação : Se você não vir um botão com esse nome, selecione o botão Iniciar Assistente de VPC.

  

Configure os detalhes da VPC no painel de configurações da VPC à esquerda:

Escolha VPC e muito mais .

Em Geração automática de etiquetas de nome , mantenha a opção Gerar automaticamente selecionada, mas altere o valor de projeto para lab.

Mantenha o bloco CIDR IPv4 configurado para 10.0.0.0/16

Em Número de Zonas de Disponibilidade , selecione 1 .

Para o número de sub-redes públicas , mantenha a configuração 1 .

Para o número de sub-redes privadas , mantenha a configuração 1 .

Expanda a seção Personalizar blocos CIDR de sub-redes

Alterar o bloco CIDR da sub-rede pública em us-east-1a para10.0.0.0/24

Alterar o bloco CIDR da sub-rede privada em us-east-1a para10.0.1.0/24

Configure os gateways NAT para a Zona de Disponibilidade 1 .

Defina os endpoints da VPC como Nenhum .

Mantenha os nomes de host DNS e a resolução de DNS ativados . 

 

No painel de pré-visualização à direita, confirme as configurações que você definiu.

VPC: lab-vpc

Sub-redes :

leste-americano-1a

Nome da sub-rede pública : lab-subnet-public1-us-east-1a

Nome da sub-rede privada : lab-subnet-private1-us-east-1a

Tabelas de rotas

lab-rtb-public

lab-rtb-private1-us-east-1a

Conexões de rede

lab-igw

lab-nat-public1-us-east-1a 

 

Na parte inferior da tela, selecione Criar VPC.

Os recursos da VPC foram criados. O Gateway NAT levará alguns minutos para ser ativado.

Aguarde até que todos os recursos sejam criados antes de prosseguir para a próxima etapa.

 

Após a conclusão, selecione Exibir VPC.

O assistente provisionou uma VPC com uma sub-rede pública e uma sub-rede privada em uma Zona de Disponibilidade, com tabelas de roteamento para cada sub-rede. Ele também criou um Gateway da Internet e um Gateway NAT.

Para visualizar as configurações desses recursos, navegue pelos links do console da VPC que exibem os detalhes do recurso. Por exemplo, escolha Sub-redes para visualizar os detalhes da sub-rede e escolha Tabelas de rotas para visualizar os detalhes da tabela de rotas. O diagrama abaixo resume os recursos da VPC que você acabou de criar e como eles estão configurados.

Tarefa 1

 

Um gateway da Internet é um recurso da VPC que permite a comunicação entre instâncias EC2 na sua VPC e a Internet.

A lab-subnet-public1-us-east-1asub-rede pública tem um CIDR de 10.0.0.0/24 , o que significa que ela contém todos os endereços IP que começam com 10.0.0.x. O fato da tabela de roteamento associada a essa sub-rede pública rotear o tráfego de rede 0.0.0.0/0 para o gateway da internet é o que a caracteriza como uma sub-rede pública.

Um Gateway NAT é um recurso da VPC usado para fornecer conectividade com a internet a quaisquer instâncias EC2 em execução em sub-redes privadas na VPC, sem que essas instâncias EC2 precisem ter uma conexão direta com o gateway da internet.

A   lab-subnet-private1-us-east-1asub-rede privada tem um CIDR de 10.0.1.0/24 , o que significa que ela contém todos os endereços IP que começam com 10.0.1.x.

 

Tarefa 2: Criar sub-redes adicionais
Nesta tarefa, você criará duas sub-redes adicionais para a VPC em uma segunda Zona de Disponibilidade. Ter sub-redes em várias Zonas de Disponibilidade dentro de uma VPC é útil para implantar soluções que oferecem alta disponibilidade .

Após criar uma VPC como você já fez, ainda é possível configurá-la ainda mais, por exemplo, adicionando mais sub-redes . Cada sub-rede criada reside inteiramente dentro de uma Zona de Disponibilidade.

 

No painel de navegação à esquerda, selecione Sub-redes .

Primeiro, você criará uma segunda sub-rede pública .

 

Selecione Criar sub-rede e, em seguida, configure:

ID da VPC: lab-vpc (selecione no menu).  

Nome da sub-rede: lab-subnet-public2

Zona de disponibilidade: Selecione a segunda Zona de disponibilidade (por exemplo, us-east-1b)

Bloco CIDR IPv4: 10.0.2.0/24

A sub-rede terá todos os endereços IP começando com 10.0.2.x.

 

Selecione Criar sub-rede

A segunda sub-rede pública foi criada. Agora você criará uma segunda sub-rede privada .

 

Selecione Criar sub-rede e, em seguida, configure:

ID da VPC: lab-vpc

Nome da sub-rede: lab-subnet-private2

Zona de disponibilidade: Selecione a segunda Zona de disponibilidade (por exemplo, us-east-1b)

Bloco CIDR IPv4: 10.0.3.0/24

A sub-rede terá todos os endereços IP começando com 10.0.3.x.

 

Selecione Criar sub-rede

A segunda sub-rede privada foi criada.

Agora você configurará essa nova sub-rede privada para rotear o tráfego destinado à internet para o Gateway NAT, de forma que os recursos na segunda sub-rede privada possam se conectar à internet, mantendo-os privados. Isso é feito configurando uma tabela de rotas .

Uma tabela de roteamento contém um conjunto de regras, chamadas rotas , que são usadas para determinar para onde o tráfego de rede é direcionado. Cada sub-rede em uma VPC deve estar associada a uma tabela de roteamento; a tabela de roteamento controla o roteamento para a sub-rede.

 

No painel de navegação à esquerda, selecione Tabelas de rotas .

 

Selecionea tabela de rotas lab-rtb-private1-us-east-1a .

Nota: Se as rotas recém-criadas não estiverem visíveis, selecione atualizar.Botão na parte superior para atualizar a lista de rotas.

No painel inferior, selecione a guia Rotas .

Observe que o destino 0.0.0.0/0 está configurado como Target nat-xxxxxxxx . Isso significa que o tráfego destinado à internet (0.0.0.0/0) será enviado ao Gateway NAT. O Gateway NAT, por sua vez, encaminhará o tráfego para a internet.

Essa tabela de roteamento está sendo usada, portanto, para rotear o tráfego de sub-redes privadas.

 

Selecione a guia Associações de sub-rede .

Você criou esta tabela de rotas na tarefa 1, quando optou por criar uma VPC e vários recursos na VPC. Essa ação também criou a sub-rede lab-subnet-private-1 e a associou a esta tabela de rotas.

Agora que você criou outra sub-rede privada, lab-subnet-private-2, você também associará esta tabela de rotas a essa sub-rede.

 

No painel Associações de sub-rede explícitas, selecione Editar associações de sub-rede.

 

Deixe a sub-rede lab-subnet-private1-us-east-1a selecionada, mas também selecione lab-subnet-private2 .

 

Selecione Salvar associações

Agora você irá configurar a tabela de rotas que será usada pelas sub-redes públicas.

 

Selecione o tabela de roteamento lab-rtb-public (e desmarque quaisquer outras sub-redes).

 

No painel inferior, selecione a guia Rotas .

Observe que o destino 0.0.0.0/0 está configurado para o alvo igw-xxxxxxxx , que é um gateway de internet. Isso significa que o tráfego destinado à internet será enviado diretamente para a internet por meio desse gateway.

Agora você associará essa tabela de rotas à segunda sub-rede pública que você criou.

 

Selecione a guia Associações de sub-rede .

 

Na área Associações de sub-rede explícitas, selecione Editar associações de sub-rede.

 

Deixe a sub-rede lab-subnet-public1-us-east-1a selecionada, mas também selecione lab-subnet-public2 .

 

Selecione Salvar associações

Sua VPC agora possui sub-redes públicas e privadas configuradas em duas Zonas de Disponibilidade. As tabelas de roteamento que você criou na tarefa 1 também foram atualizadas para rotear o tráfego de rede para as duas novas sub-redes.

Tarefa 2

 

Tarefa 3: Criar um Grupo de Segurança VPC
Nesta tarefa, você criará um grupo de segurança VPC, que funciona como um firewall virtual. Ao iniciar uma instância, você associa um ou mais grupos de segurança a ela. Você pode adicionar regras a cada grupo de segurança para permitir o tráfego de entrada e saída das instâncias associadas.

 

No painel de navegação à esquerda, selecione Grupos de segurança .

 

Selecione Criar grupo de segurança e, em seguida, configure:

Nome do grupo de segurança: Web Security Group

Descrição: Enable HTTP access

VPC: selecione o X para remover a VPC selecionada no momento e, em seguida, na lista suspensa, escolha lab-vpc.

 

No painel Regras de entrada , selecione Adicionar regra.

 

Configure as seguintes definições:

Tipo: HTTP 

Fonte: Anywhere-IPv4 

Descrição: Permit web requests

 

Role a página até o final e selecione Criar grupo de segurança.

Você usará esse grupo de segurança na próxima tarefa ao iniciar uma instância do Amazon EC2.

 

Tarefa 4: Iniciar uma instância de servidor web
Nesta tarefa, você iniciará uma instância do Amazon EC2 na nova VPC. Você configurará a instância para funcionar como um servidor web.

 

Na caixa de pesquisa à direita de Em Serviços , pesquise e selecione EC2 para abrir o console do EC2.

 

No menu Iniciar instância, escolha Iniciar instância .

 

Dê um nome à instância:

Dê-lhe o nome.Web Server 1

Ao nomear sua instância, a AWS cria uma tag e a associa à instância. Uma tag é um par chave-valor. A chave desse par é * Nome * , e o valor é o nome que você insere para sua instância EC2.

 

Escolha uma AMI a partir da qual criar a instância:

Na lista de AMIs de Início Rápido disponíveis , mantenha a opção padrão Amazon Linux selecionada.

Mantenha também a AMI padrão do Amazon Linux 2023 selecionada.

O tipo de Imagem de Máquina da Amazon (AMI) que você escolher determina o sistema operacional que será executado na instância EC2 que você iniciar.

 

Selecione um tipo de instância:

No painel Tipo de instância , mantenha a opção padrão t2.micro selecionada.

O Tipo de Instância define os recursos de hardware atribuídos à instância.

 

Selecione o par de chaves a ser associado à instância:

No menu Nome do par de teclas , selecione vockey .

O par de chaves vockey que você selecionou permitirá que você se conecte a esta instância via SSH após a sua inicialização. Embora você não precise fazer isso neste laboratório, ainda é necessário identificar um par de chaves existente, criar um novo ou optar por prosseguir sem um par de chaves ao iniciar uma instância.

 

Configure as definições de rede:

Ao lado de Configurações de rede, selecione Editar e, em seguida, Configurar:

Rede: lab-vpc  

Sub-rede: lab-subnet-public2 ( não privada!) 

Atribuição automática de IP público: Ativar 

Em seguida, você configurará a instância para usar o Grupo de Segurança Web que você criou anteriormente.

Em Firewall (grupos de segurança), escolha Selecione um grupo de segurança existente .

Para grupos de segurança comuns , selecione Grupo de Segurança Web .

Este grupo de segurança permitirá o acesso HTTP à instância.

 

Na seção Configurar armazenamento , mantenha as configurações padrão.

Observação : As configurações padrão especificam que o volume raiz da instância, que hospedará o sistema operacional convidado Amazon Linux especificado anteriormente, será executado em um disco rígido SSD de uso geral ( gp3 ) de 8 GiB. Você pode adicionar mais volumes de armazenamento, mas isso não é necessário neste laboratório.

 

Configure um script para ser executado na instância quando ela for iniciada:

Expanda o painel Detalhes avançados .

Role a página até o final e copie e cole o código abaixo na caixa de dados do usuário :

#!/bin/bash
# Instale o servidor web Apache e o PHP
dnf install -y httpd wget php mariadb105-server
# Baixar arquivos de laboratório
wget https://aws-tc-largeobjects.s3.us-west-2.amazonaws.com/CUR-TF-100-ACCLFO-2/2-lab2-vpc/s3/lab-app.zip
descompacte lab-app.zip -d /var/www/html/
# Ligue o servidor web
chkconfig httpd ligado
iniciar serviço httpd
Este script será executado com permissões de usuário root no sistema operacional convidado da instância. Ele será executado automaticamente quando a instância for iniciada pela primeira vez. O script instala um servidor web, um banco de dados e bibliotecas PHP e, em seguida, baixa e instala um aplicativo web PHP no servidor web.

 

Na parte inferior do painel Resumo , no lado direito da tela, selecione Iniciar instância.

Você verá uma mensagem de Sucesso.

 

Selecione " Ver todas as instâncias".

 

Aguarde até que o Servidor Web 1 mostre "2/2 verificações aprovadas" na coluna de verificação de status .

Isso pode levar alguns minutos. Selecione a opção de atualização.Um ícone na parte superior da página é exibido a cada 30 segundos, aproximadamente, para que você possa tomar conhecimento mais rapidamente do status mais recente da instância.

Você agora se conectará ao servidor web em execução na instância EC2.

 

Selecione Servidor Web 1 .

 

Copie o valor do DNS IPv4 público exibido na guia Detalhes , na parte inferior da página.

 

Abra uma nova aba do navegador, cole o valor do DNS público e pressione Enter.

Você deverá ver uma página da web exibindo o logotipo da AWS e os valores dos metadados da instância.

A arquitetura completa que você implementou é:

Arquitetura

 

Submissão do seu trabalho
Para registrar seu progresso, selecione Enviar na parte superior destas instruções.

 

Quando solicitado, escolha Sim .

Após alguns minutos, o painel de notas aparecerá, mostrando quantos pontos você ganhou em cada tarefa. Se os resultados não forem exibidos após alguns minutos, selecione "Notas" na parte superior destas instruções.

 Dica: Você pode enviar seu trabalho várias vezes. Depois de fazer alterações, selecione "Enviar" novamente. Seu último envio será registrado para este laboratório.

 

Para obter feedback detalhado sobre seu trabalho, selecione Relatório de Envio .

 Dica: Para as verificações em que você não obteve a pontuação máxima, o relatório de envio geralmente fornece detalhes úteis.

 

Laboratório concluído
Parabéns! Você concluiu o experimento.

 

Escolher Clique em "Finalizar Laboratório" na parte superior desta página e selecione "Sim" para confirmar que deseja encerrar o laboratório.

Um painel indica que você pode fechar esta caixa de mensagem agora...

 

Selecione o X no canto superior direito para fechar o painel.

 

© 2023, Amazon Web Services, Inc. e suas afiliadas. Todos os direitos reservados. Este trabalho não pode ser reproduzido ou redistribuído, no todo ou em parte, sem a prévia autorização por escrito da Amazon Web Services, Inc. É proibida a cópia, o empréstimo ou a venda para fins comerciais.