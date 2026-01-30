Laboratório 3: Introdução ao Amazon EC2
Visão geral e objetivos do laboratório
diagrama arquitetônico

 

Este laboratório fornece uma visão geral básica de como iniciar, redimensionar, gerenciar e monitorar uma instância do Amazon EC2.

O Amazon Elastic Compute Cloud (Amazon EC2) é um serviço web que fornece capacidade computacional redimensionável na nuvem. Ele foi projetado para facilitar o desenvolvimento de computação em nuvem em escala web.

A interface de serviço web simplificada do Amazon EC2 permite obter e configurar capacidade com o mínimo de esforço. Ela oferece controle total sobre seus recursos de computação e permite que você execute suas aplicações no ambiente de computação comprovado da Amazon. O Amazon EC2 reduz o tempo necessário para obter e inicializar novas instâncias de servidor para minutos, permitindo que você dimensione rapidamente a capacidade, tanto para cima quanto para baixo, conforme suas necessidades de computação mudem.

O Amazon EC2 muda a economia da computação, permitindo que você pague apenas pela capacidade que realmente utiliza. O Amazon EC2 fornece aos desenvolvedores as ferramentas para criar aplicativos resilientes a falhas e se isolar de cenários comuns de falha.

 

Após concluir este laboratório, você deverá ser capaz de fazer o seguinte:

Inicie um servidor web com proteção contra encerramento ativada.

Monitore sua instância EC2

Modifique o grupo de segurança que seu servidor web está usando para permitir acesso HTTP.

Redimensione sua instância do Amazon EC2 para aumentar a escala e habilitar a proteção contra interrupções.

Explore os limites do EC2

Proteção de parada de teste

Pare sua instância EC2

 

Duração
Este experimento leva aproximadamente 35 minutos para ser concluído.

 

restrições de serviço da AWS
Neste ambiente de laboratório, o acesso aos serviços e ações da AWS pode estar restrito àqueles necessários para concluir as instruções do laboratório. Você poderá encontrar erros se tentar acessar outros serviços ou executar ações além das descritas neste laboratório.

 

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

 

Tarefa 1: Inicie sua instância do Amazon EC2
Nesta tarefa, você iniciará uma instância do Amazon EC2 com proteção contra término e proteção contra parada . A proteção contra término impede que você encerre a instância do EC2 acidentalmente, e a proteção contra parada impede que você a interrompa acidentalmente. Você também especificará um script de dados do usuário ao iniciar a instância, que implantará um servidor web simples.

 

No Console de Gerenciamento da AWS, escolha Em Serviços , escolha Computação e depois EC2 .

Observação : Verifique se o seu console EC2 está gerenciando recursos na região da Virgínia do Norte (us-east-1). Você pode verificar isso consultando o menu suspenso na parte superior da tela, à esquerda do seu nome de usuário. Se a região da Virgínia do Norte ainda não estiver selecionada, escolha-a no menu de regiões antes de prosseguir para a próxima etapa.

 

Escolha o menu Iniciar instância  e selecione Iniciar instância .

 

Passo 1: Nome e etiquetas
Dê um nome à instância Web Server.

O nome que você der a esta instância será armazenado como uma tag. As tags permitem categorizar seus recursos da AWS de diferentes maneiras, por exemplo, por finalidade, proprietário ou ambiente. Isso é útil quando você tem muitos recursos do mesmo tipo — você pode identificar rapidamente um recurso específico com base nas tags que atribuiu a ele. Cada tag consiste em uma chave e um valor, ambos definidos por você. Você pode definir várias tags para associar à instância, se desejar.

Neste caso, a tag que será criada consistirá em uma chave chamada Namecom um valor deWeb Server

 

Etapa 2: Imagens de Aplicativos e Sistemas Operacionais (Imagem de Máquina da Amazon)
Na lista de AMIs de Início Rápido disponíveis, mantenha selecionada a AMI padrão do Amazon Linux .

 

Mantenha também a AMI padrão do Amazon Linux 2023 selecionada.

Uma Imagem de Máquina da Amazon (AMI) fornece as informações necessárias para iniciar uma instância, que é um servidor virtual na nuvem. Uma AMI inclui:

Um modelo para o volume raiz da instância (por exemplo, um sistema operacional ou um servidor de aplicativos com aplicativos).

Permissões de inicialização que controlam quais contas da AWS podem usar a AMI para iniciar instâncias.

Um mapeamento de dispositivo de bloco que especifica os volumes a serem anexados à instância quando ela for iniciada.

A lista de Início Rápido contém as AMIs mais usadas. Você também pode criar sua própria AMI ou selecionar uma AMI no AWS Marketplace, uma loja online onde você pode vender ou comprar software que roda na AWS.

 

Etapa 3: Tipo de instância
No painel Tipo de instância , mantenha a opção padrão t2.micro selecionada.

O Amazon EC2 oferece uma ampla seleção de tipos de instâncias otimizados para atender a diferentes casos de uso. Os tipos de instância incluem diversas combinações de CPU, memória, armazenamento e capacidade de rede, proporcionando a flexibilidade necessária para escolher a combinação ideal de recursos para suas aplicações. Cada tipo de instância inclui um ou mais tamanhos de instância , permitindo que você dimensione seus recursos de acordo com os requisitos da sua carga de trabalho.

O tipo de instância t2.micro possui 1 CPU virtual e 1 GiB de memória.

Observação : você poderá estar impedido de usar outros tipos de instância neste laboratório.

 

Etapa 4: Par de chaves (login)
Para o campo Nome do par de chaves - obrigatório , escolha vockey .

O Amazon EC2 usa criptografia de chave pública para criptografar e descriptografar informações de login. Para garantir que você consiga fazer login no sistema operacional convidado da instância que você criar, você identifica um par de chaves existente ou cria um novo par de chaves ao iniciar a instância. O Amazon EC2 instala a chave no sistema operacional convidado quando a instância é iniciada. Dessa forma, quando você tentar fazer login na instância e fornecer a chave privada, você será autorizado a se conectar à instância.

Observação : neste laboratório, você não usará o par de chaves que especificou para fazer login na sua instância.

 

Etapa 5: Configurações de rede
Ao lado de Configurações de rede, selecione Editar .

 

Para VPC , selecione Lab VPC .

A VPC de laboratório foi criada usando um modelo do AWS CloudFormation durante o processo de configuração do seu laboratório. Essa VPC inclui duas sub-redes públicas em duas Zonas de Disponibilidade diferentes.

 Observação : Mantenha a sub-rede padrão PublicSubnet1 . Esta é a sub-rede na qual a instância será executada. Observe também que, por padrão, a instância receberá um endereço IP público.

 

Em Firewall (grupos de segurança) , escolha Crie e configure o grupo de segurança:

Nome do grupo de segurança: Web Server security group

Descrição: Security group for my web server

Um grupo de segurança atua como um firewall virtual que controla o tráfego de uma ou mais instâncias. Ao iniciar uma instância, você associa um ou mais grupos de segurança a ela. Você adiciona regras a cada grupo de segurança que permitem o tráfego de entrada e saída das instâncias associadas. Você pode modificar as regras de um grupo de segurança a qualquer momento; as novas regras são aplicadas automaticamente a todas as instâncias associadas a ele.

Em Regras de grupo de segurança de entrada , observe que existe uma regra. Remova essa regra.

 

Etapa 6: Configurar o armazenamento
Na seção Configurar armazenamento , mantenha as configurações padrão.

O Amazon EC2 armazena dados em um disco virtual conectado à rede chamado Elastic Block Store .

Você iniciará a instância do Amazon EC2 usando um volume de disco padrão de 8 GiB. Este será o seu volume raiz (também conhecido como volume de inicialização).

 

Etapa 7: Detalhes avançados
Expandir Detalhes avançados .

 

Para proteção contra término , selecione Ativar .

  Quando uma instância do Amazon EC2 não é mais necessária, ela pode ser encerrada , o que significa que a instância é excluída e seus recursos são liberados. Uma instância encerrada não pode ser acessada novamente e os dados nela contidos não podem ser recuperados. Se você quiser evitar que a instância seja encerrada acidentalmente, pode habilitar a proteção contra encerramento , que impede que ela seja encerrada enquanto essa configuração permanecer ativada.

 

Role a página até o final e copie e cole o código abaixo na caixa de dados do usuário :

#!/bin/bash
dnf install -y httpd
systemctl enable httpd
systemctl iniciar httpd
echo  '<html><h1>Olá do seu servidor web!</h1></html>' > /var/www/html/index.html
  Ao iniciar uma instância, você pode passar dados do usuário para a instância, que podem ser usados ​​para executar tarefas automatizadas de instalação e configuração após a inicialização da instância.

Sua instância está executando o Amazon Linux 2023. O script shell que você especificou será executado como usuário root do sistema operacional convidado quando a instância for iniciada. O script irá:

Instale um servidor web Apache (httpd)

Configure o servidor web para iniciar automaticamente na inicialização do sistema.

Execute o servidor web assim que a instalação for concluída.

Crie uma página web simples.

 

Etapa 8: Inicie a instância
Na parte inferior do painel Resumo , selecione Iniciar instância.

Você verá uma mensagem de Sucesso.

 

Selecione " Ver todas as instâncias".

Na lista de instâncias, selecione Servidor Web .

Analise as informações exibidas na guia Detalhes . Ela inclui informações sobre o tipo de instância, configurações de segurança e configurações de rede.

À instância é atribuído um DNS IPv4 público que você pode usar para contatar a instância a partir da Internet.

Para visualizar mais informações, arraste a barra divisória da janela para cima.

Inicialmente, a instância aparecerá no estado Pendente , o que significa que está sendo iniciada. Em seguida, mudará para Inicializando e, finalmente, para Executando .

 

Aguarde até que sua instância exiba o seguinte:

Estado da instância:  Correndo

Verificações de status:   2/2 verificações aprovadas

 

 Parabéns! Você iniciou com sucesso sua primeira instância do Amazon EC2.

 

Tarefa 2: Monitore sua instância
O monitoramento é uma parte importante para manter a confiabilidade, a disponibilidade e o desempenho de suas instâncias do Amazon Elastic Compute Cloud (Amazon EC2) e de suas soluções da AWS.

 

Selecione a aba Verificações de status .

Com o monitoramento de status de instâncias, você pode determinar rapidamente se o Amazon EC2 detectou algum problema que possa impedir a execução de aplicativos em suas instâncias. O Amazon EC2 realiza verificações automatizadas em todas as instâncias EC2 em execução para identificar problemas de hardware e software.

Observe que as verificações de acessibilidade do sistema e da instância foram aprovadas.

 

Selecione a aba Monitoramento .

Esta aba exibe as métricas do Amazon CloudWatch para sua instância. No momento, não há muitas métricas para exibir porque a instância foi iniciada recentemente.

Você pode selecionar o ícone de três pontos em qualquer gráfico e escolher "Ampliar" para ver uma versão expandida da métrica escolhida.

O Amazon EC2 envia métricas para o Amazon CloudWatch para suas instâncias do EC2. O monitoramento básico (a cada cinco minutos) está ativado por padrão. Você também pode ativar o monitoramento detalhado (a cada minuto).

 

Nas açõesNo menu localizado na parte superior do console, selecione Monitorar e solucionar problemas.  Obter registro do sistema .

O Log do Sistema exibe a saída do console da instância, uma ferramenta valiosa para diagnóstico de problemas. É especialmente útil para solucionar problemas de kernel e configurações de serviço que podem causar o encerramento da instância ou torná-la inacessível antes que seu daemon SSH possa ser iniciado. Se você não visualizar o log do sistema, aguarde alguns minutos e tente novamente.

 

Percorra a saída e observe que o pacote HTTP foi instalado a partir dos dados do usuário que você adicionou ao criar a instância.

Saída do console

Selecione Cancelar .

 

Certifique-se de que o Servidor Web ainda esteja selecionado. Em seguida, nas AçõesNo menu, selecione Monitorar e solucionar problemas.  Obter captura de tela da instância .

Esta imagem mostra como seria o console da sua instância do Amazon EC2 se uma tela estivesse conectada a ele.

Captura de tela

 

Se você não conseguir acessar sua instância via SSH ou RDP, poderá capturar uma captura de tela da instância e visualizá-la como uma imagem. Isso fornece visibilidade sobre o status da instância e permite uma solução de problemas mais rápida.

 

Selecione Cancelar .

 Parabéns! Você explorou diversas maneiras de monitorar sua instância.

 

Tarefa 3: Atualize seu grupo de segurança e acesse o servidor web.
Ao iniciar a instância EC2, você forneceu um script que instalou um servidor web e criou uma página web simples. Nesta tarefa, você acessará o conteúdo do servidor web.

 

Certifique-se de que o Servidor Web ainda esteja selecionado. Escolha a guia Detalhes .

 

Copie o endereço IPv4 público da sua instância para a área de transferência.

 

Abra uma nova aba no seu navegador, cole o endereço IP que você acabou de copiar e pressione Enter .

Pergunta: Você consegue acessar seu servidor web? Por que não?

Você não consegue acessar seu servidor web porque o grupo de segurança não permite tráfego de entrada na porta 80, que é usada para requisições web HTTP. Esta demonstração mostra como usar um grupo de segurança como firewall para restringir o tráfego de rede permitido dentro e fora de uma instância.

Para corrigir isso, você deverá atualizar o grupo de segurança para permitir o tráfego da web na porta 80.

 

Mantenha a aba do navegador aberta, mas retorne à aba do Console EC2 .

 

No painel de navegação à esquerda, selecione Grupos de segurança .

 

Selecione Grupo de segurança do servidor web .

 

Selecione a aba Regras de entrada .

O grupo de segurança não possui atualmente nenhuma regra de entrada.

 

Escolha Editar regras de entrada , selecione Adicionar regra e, em seguida, configure:

Tipo: HTTP 

Fonte: Anywhere-IPv4 

Selecione Salvar regras

 

Volte à aba do servidor web que você abriu anteriormente e atualize.a página.

Você deverá ver a mensagem "Olá do seu servidor web!"

 

 Parabéns! Você modificou com sucesso seu grupo de segurança para permitir tráfego HTTP em sua instância do Amazon EC2.

 

Tarefa 4: Redimensionar sua instância: Tipo de instância e volume EBS
À medida que suas necessidades mudam, você pode perceber que sua instância está sobrecarregada (muito pequena) ou subutilizada (muito grande). Nesse caso, você pode alterar o tipo de instância . Por exemplo, se uma instância t2.micro for pequena demais para sua carga de trabalho, você pode alterá-la para uma instância m5.medium . Da mesma forma, você pode alterar o tamanho de um disco.

 

Interrompa sua instância
Antes de poder redimensionar uma instância, você precisa pará- la.

Ao interromper uma instância, ela é desligada. Não há cobrança de tempo de execução para uma instância EC2 interrompida, mas a cobrança de armazenamento para os volumes Amazon EBS anexados permanece.

No Console de Gerenciamento do EC2 , no painel de navegação à esquerda, escolha Instâncias e selecione a Instância do servidor web .

 

No estado de instância No menu, selecione Parar instância .

 

Selecione Parar

Sua instância será desligada normalmente e, em seguida, deixará de funcionar.

 

Aguarde até que o estado da instância seja exibido: Parou .

 

Alterar o tipo de instância e ativar a proteção contra interrupções.
Selecione a instância do servidor Web e, em seguida, em Ações.No menu, selecione Configurações da instância.  Altere o tipo de instância e, em seguida, configure:

Tipo de instância: t2.small 

Selecione Aplicar

Quando a instância for reiniciada, ela será executada como uma instância t2.small , que possui o dobro da memória de uma instância t2.micro . OBSERVAÇÃO : Você pode estar impedido de usar outros tipos de instância neste laboratório.

 

Selecione a instância do servidor Web e, em seguida, em Ações.No menu, selecione Configurações da instância.   Alterar a proteção de parada . Selecione Ativar e, em seguida, Salvar a alteração.

  Ao interromper uma instância, ela é desligada. Quando você a inicia posteriormente, ela geralmente é migrada para um novo computador host subjacente e recebe um novo endereço IPv4 público . Uma instância mantém seu endereço IPv4 privado atribuído . Ao interromper uma instância, ela não é excluída. Quaisquer volumes EBS e os dados neles contidos são mantidos.

 

Redimensionar o volume EBS
Com a instância do Servidor Web ainda selecionada, escolha a guia Armazenamento , selecione o nome do ID do Volume e, em seguida, marque a caixa de seleção ao lado do volume exibido.

 

Nas açõesmenu, selecione Modificar volume .

O volume do disco tem atualmente um tamanho de 8 GiB. Agora você aumentará o tamanho deste disco.

 

Alterar o tamanho para: NOTA : Neste laboratório, você poderá estar impedido de criar volumes do Amazon EBS maiores que 10 GB.10 

 

Selecione Modificar

 

Selecione "Modificar" novamente para confirmar e aumentar o tamanho do volume.

 

Iniciar a instância redimensionada
Você deverá iniciar a instância novamente, que agora terá mais memória e mais espaço em disco.

No painel de navegação à esquerda, selecione Instâncias .

 

Selecione a instância do servidor web .

 

No estado de instânciamenu, selecione Iniciar instância .

 Parabéns! Você redimensionou com sucesso sua instância do Amazon EC2. Nesta tarefa, você alterou o tipo da instância de t2.micro para t2.small . Você também modificou o volume do disco raiz de 8 GiB para 10 GiB.

 

Tarefa 5: Explorar os limites do EC2
O Amazon EC2 oferece diversos recursos que você pode utilizar. Esses recursos incluem imagens, instâncias, volumes e snapshots. Ao criar uma conta da AWS, existem limites padrão para esses recursos, definidos por região.

 

No Console de Gerenciamento da AWS, na caixa de pesquisa ao lado de Serviços , pesquisar e escolherService Quotas

 

Escolha os serviços da AWS no menu de navegação e, em seguida, na barra de pesquisa "Encontrar serviços da AWS ", pesquise ec2e selecione Amazon Elastic Compute Cloud (Amazon EC2) .

 

Na barra de pesquisa "Encontrar quotas" , pesquise por "<nome_da_cota>" running on-demand, mas não faça nenhuma seleção. Em vez disso, observe a lista filtrada de quotas de serviço que correspondem aos critérios.

Observe que existem limites para o número e os tipos de instâncias que podem ser executadas em uma região. Por exemplo, há um limite para o número de instâncias do tipo "Running On-Demand Standard..." que você pode iniciar nesta região. Ao iniciar instâncias, a solicitação não deve fazer com que seu uso exceda os limites de instâncias atualmente definidos para essa região.

Se você for o proprietário da conta da AWS, poderá solicitar um aumento para muitos desses limites.

 

Tarefa 6: Testar a proteção de parada
Você pode interromper sua instância quando não precisar acessá-la, mas ainda quiser mantê-la ativa. Nesta tarefa, você aprenderá como usar a proteção de parada .

 

No Console de Gerenciamento da AWS, na caixa de pesquisa ao lado de Em Serviços , pesquise e escolha EC2retornar ao console do EC2.

 

No painel de navegação à esquerda, selecione Instâncias .

 

Selecione a instância do servidor web e, em Estado da instância,No menu, selecione Parar instância .

 

Em seguida, selecione Parar

Observe que há uma mensagem que diz: Falha ao parar a instância i-1234567xxx. A instância 'i-1234567xxx' não pode ser interrompida. Modifique o atributo de instância 'disableApiStop' e tente novamente.

Isso demonstra que a proteção contra parada que você habilitou anteriormente neste laboratório agora está fornecendo uma salvaguarda para evitar a parada acidental de uma instância. Se você realmente deseja parar a instância, precisará desabilitar a proteção contra parada.

 

Nas açõesNo menu, selecione Configurações da instância.  Alterar proteção de parada .

 

Remova a marca de seleção ao lado de Habilitar .

 

Selecione Salvar

Agora você pode encerrar a instância.

 

Selecione novamente a instância do servidor Web e, no estado da instância,No menu, selecione Parar instância .

 

Selecione Parar

 Parabéns! Você testou com sucesso a proteção contra interrupções e interrompeu sua instância.

 

Submissão do seu trabalho
Para registrar seu progresso, selecione Enviar na parte superior destas instruções.

 

Quando solicitado, escolha Sim .

Após alguns minutos, o painel de notas aparecerá, mostrando quantos pontos você ganhou em cada tarefa. Se os resultados não forem exibidos após alguns minutos, selecione "Notas" na parte superior destas instruções.

  Importante:   Algumas das verificações realizadas pelo processo de submissão neste laboratório só concederão crédito se tiverem decorrido pelo menos 5 minutos desde a conclusão da ação. Se não receber crédito na primeira submissão, poderá ser necessário aguardar alguns minutos e submeter novamente para receber crédito por esses itens.

 Dica: Você pode enviar seu trabalho várias vezes. Depois de fazer alterações, selecione "Enviar" novamente. Seu último envio será registrado para este laboratório.

 

Para obter feedback detalhado sobre seu trabalho, selecione Relatório de Envio .

 Dica: Para as verificações em que você não obteve a pontuação máxima, o relatório de envio geralmente fornece detalhes úteis.

 

Laboratório concluído
Parabéns! Você concluiu o experimento.

Selecione "Finalizar Laboratório" na parte superior desta página e, em seguida, selecione "Sim" para confirmar que deseja finalizar o laboratório.  

Um painel "Finalizar Laboratório" será exibido, indicando que "Você pode fechar esta caixa de mensagem agora".

 

Selecione o X no canto superior direito para fechar o painel.

 

Recursos adicionais
Inicie sua instância

Tipos de instâncias do Amazon EC2

Imagens de máquina da Amazon (AMI)

Amazon EC2 - Dados do usuário e scripts de shell

Volume do dispositivo raiz do Amazon EC2

Como etiquetar seus recursos do Amazon EC2

Grupos de segurança

Pares de chaves do Amazon EC2

Verificações de status para suas instâncias

Obtendo a saída do console e reiniciando instâncias

Métricas e dimensões do Amazon EC2

Redimensionando sua instância

Pare e inicie sua instância

Limites de serviço do Amazon EC2

Encerrar sua instância

Proteção contra rescisão por instância

 

© 2023, Amazon Web Services, Inc. e suas afiliadas. Todos os direitos reservados. Este trabalho não pode ser reproduzido ou redistribuído, no todo ou em parte, sem a prévia autorização por escrito da Amazon Web Services, Inc. É proibida a cópia, o empréstimo ou a venda para fins comerciais.