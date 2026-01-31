Laboratório 6: Dimensionamento e balanceamento de carga da sua arquitetura
Visão geral e objetivos do laboratório
Este laboratório demonstra como usar os serviços Elastic Load Balancing (ELB) e Auto Scaling para balancear a carga e dimensionar automaticamente sua infraestrutura.

O Elastic Load Balancing distribui automaticamente o tráfego de entrada de aplicativos entre várias instâncias do Amazon EC2. Isso permite que você alcance tolerância a falhas em seus aplicativos, fornecendo de forma transparente a quantidade necessária de capacidade de balanceamento de carga para rotear o tráfego do aplicativo.

O Auto Scaling ajuda a manter a disponibilidade da aplicação e permite aumentar ou diminuir a capacidade do Amazon EC2 automaticamente, de acordo com as condições definidas. Você pode usar o Auto Scaling para garantir que esteja executando o número desejado de instâncias do Amazon EC2. O Auto Scaling também pode aumentar automaticamente o número de instâncias do Amazon EC2 durante picos de demanda para manter o desempenho e diminuir a capacidade durante períodos de baixa demanda para reduzir custos. O Auto Scaling é ideal para aplicações com padrões de demanda estáveis ​​ou que apresentam variabilidade de uso por hora, dia ou semana.  

Ao final deste laboratório, você será capaz de:

Crie uma Imagem de Máquina da Amazon (AMI) a partir de uma instância em execução.

Crie um balanceador de carga.

Crie um modelo de lançamento e um grupo de Auto Scaling.

Dimensionar automaticamente novas instâncias

Crie alarmes no Amazon CloudWatch e monitore o desempenho da sua infraestrutura.

 

Duração
Este laboratório leva aproximadamente 30 minutos .

 

restrições de serviço da AWS
Neste ambiente de laboratório, o acesso aos serviços e ações da AWS pode estar restrito àqueles necessários para concluir as instruções do laboratório. Você poderá encontrar erros se tentar acessar outros serviços ou executar ações além das descritas neste laboratório.

Atenção : Qualquer tentativa de executar 20 ou mais instâncias simultaneamente (independentemente do tamanho) resultará na desativação imediata da conta da AWS e todos os recursos da conta serão excluídos imediatamente.

Cenário
Você começa com a seguinte infraestrutura:

Arquitetura inicial

O estado final da infraestrutura é:

Arquitetura final

 

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

 

Tarefa 1: Criar uma AMI para Auto Scaling
Nesta tarefa, você criará uma AMI a partir do servidor web existente 1. Isso salvará o conteúdo do disco de inicialização para que novas instâncias possam ser iniciadas com conteúdo idêntico.

No Console de Gerenciamento da AWS , na caixa de pesquisa ao lado deEm Serviços , pesquise e selecione EC2 .

 

No painel de navegação à esquerda, selecione Instâncias .

Primeiro, você deverá confirmar se a instância está em execução.

 

Aguarde até que a tela de Verificações de Status do Servidor Web 1 exiba "2/2 verificações aprovadas" . Se necessário, selecione "Atualizar".Para atualizar o status.

Agora você criará uma AMI baseada nessa instância.

 

Selecione Servidor Web 1 .

 

Nas açõesNo menu, escolha Imagem e modelos  > Criar imagem e, em seguida, configure: 

Nome da imagem: WebServerAMI

Descrição da imagem: Lab AMI for Web Server

 

Selecione Criar imagem

Um banner de confirmação exibe o ID da AMI para sua nova AMI.

Você usará essa AMI ao iniciar o grupo de Auto Scaling mais tarde no laboratório.

 

Tarefa 2: Criar um balanceador de carga
Nesta tarefa, você primeiro criará um grupo de destino e, em seguida, um balanceador de carga capaz de distribuir o tráfego entre várias instâncias EC2 e Zonas de Disponibilidade.

No painel de navegação à esquerda, selecione Grupos de destino .

Análise : Os Grupos de Destino definem para onde enviar o tráfego que chega ao Balanceador de Carga. O Balanceador de Carga de Aplicativos pode enviar tráfego para vários Grupos de Destino com base na URL da solicitação recebida, como, por exemplo, solicitações de aplicativos móveis direcionadas a um conjunto diferente de servidores. Seu aplicativo web usará apenas um Grupo de Destino.

Selecione Criar grupo-alvo

Selecione um tipo de destino: Instâncias

Nome do grupo-alvo , digite:LabGroup

Selecione "Lab VPC" no menu suspenso "VPC" .

 

Selecione Avançar . A tela Registrar destinos será exibida.

Nota: Os alvos são as instâncias individuais que responderão às solicitações do balanceador de carga.

Você ainda não possui nenhuma instância de aplicativo web, então pode pular esta etapa.

 

Analise as configurações e selecione Criar grupo de destino

 

No painel de navegação à esquerda, selecione Balanceadores de Carga .

 

Na parte superior da tela, selecione Criar balanceador de carga .

São exibidos diversos tipos de balanceadores de carga. Você usará um Application Load Balancer que opera no nível da requisição (camada 7), roteando o tráfego para destinos — instâncias EC2, contêineres, endereços IP e funções Lambda — com base no conteúdo da requisição. Para mais informações, consulte: Comparação de balanceadores de carga .

 

Em Balanceador de Carga de Aplicativos , selecione Criar.

 

Em Nome do balanceador de carga , insira:LabELB

 

Desça até a seção de mapeamento de rede e, em seguida:

Para VPC , escolha Lab VPC.

Agora você especificará quais sub-redes o balanceador de carga deve usar. O balanceador de carga ficará voltado para a internet, portanto, você selecionará ambas as sub-redes públicas.

Escolha a primeira Zona de Disponibilidade exibida e, em seguida, selecione Sub-rede Pública 1 no menu suspenso Sub-rede que aparece abaixo dela.

Escolha a segunda Zona de Disponibilidade exibida e, em seguida, selecione Sub-rede Pública 2 no menu suspenso Sub-rede que aparece abaixo dela.

Você agora deve ter duas sub-redes selecionadas: Sub-rede Pública 1 e Sub-rede Pública 2 .

 

Na seção Grupos de segurança :

Escolha o menu suspenso Grupos de segurança e selecione Grupo de Segurança Web

Abaixo do menu suspenso, selecione o X ao lado do grupo de segurança padrão para removê-lo.

O grupo de segurança Web Security Group deverá ser o único visível agora.

 

Na linha Listener HTTP:80, defina a ação padrão para encaminhar para LabGroup .

 

Role a página até o final e selecione Criar balanceador de carga.

O balanceador de carga foi criado com sucesso.

Selecione Exibir balanceador de carga

O balanceador de carga exibirá o estado de provisionamento . Não é necessário aguardar até que esteja pronto. Por favor, continue com a próxima tarefa.

 

Tarefa 3: Criar um modelo de lançamento e um grupo de escalonamento automático
Nesta tarefa, você criará um modelo de inicialização para o seu grupo de Auto Scaling. Um modelo de inicialização é um modelo que um grupo de Auto Scaling usa para iniciar instâncias do EC2. Ao criar um modelo de inicialização, você especifica informações para as instâncias, como a AMI, o tipo de instância, um par de chaves e o grupo de segurança.

 

No painel de navegação à esquerda, selecione Iniciar modelos .

 

Selecione Criar modelo de lançamento

 

Configure as definições do modelo de lançamento e crie-o:

Nome do modelo de lançamento: LabConfig

Em Orientações sobre dimensionamento automático , selecione Forneça orientações para me ajudar a configurar um modelo que eu possa usar com o Auto Scaling do EC2.

Na área Imagens de Aplicativos e SO (Amazon Machine Image), selecione Minhas AMIs .

Amazon Machine Image (AMI) : escolha a AMI do Servidor Web.

Tipo de instância: escolha t2.micro

Nome do par de teclas : escolha a tecla de atalho

Firewall (grupos de segurança) : selecione Selecionar um grupo de segurança existente

Grupos de segurança : selecione   Grupo de Segurança Web

Desça até a área Detalhes avançados e expanda-a.

Desça até a configuração de monitoramento detalhado do CloudWatch . Selecione Habilitar

Observação: Isso permitirá que o Auto Scaling reaja rapidamente às mudanças de utilização.

Selecione Criar modelo de lançamento

Em seguida, você criará um grupo de Auto Scaling que utiliza esse modelo de inicialização.

 

Na caixa de diálogo Sucesso, escolha o modelo de inicialização LabConfig .

 

Das AçõesNo menu, escolha Criar grupo de dimensionamento automático.

 

Configure os detalhes na Etapa 1 (Escolha o modelo de inicialização ou a configuração):

Nome do grupo de Auto Scaling: Lab Auto Scaling Group

Iniciar modelo : confirme se o modelo LabConfig que você acabou de criar está selecionado.

Selecione a próxima

 

Configure os detalhes na Etapa 2 (Escolha as opções de inicialização da instância):

VPC : escolha Lab VPC

Zonas de disponibilidade e sub-redes : Selecione Sub-rede Privada 1 e, em seguida, selecione Sub-rede Privada 2 .

Selecione a próxima

 

Configure os detalhes na Etapa 3 (Configurar opções avançadas):

Selecione Conectar a um balanceador de carga existente

Grupos de destino de balanceadores de carga existentes : selecione LabGroup .

No painel Configurações adicionais :

Selecione Habilite a coleta de métricas de grupo no CloudWatch.

Isso coletará métricas em intervalos de 1 minuto, o que permite que o Auto Scaling reaja rapidamente às mudanças nos padrões de uso.

Selecione a próxima

 

Configure os detalhes na Etapa 4 (Configurar o tamanho do grupo e as políticas de dimensionamento - opcional):

Em Tamanho do grupo , configure:

Capacidade desejada: 2

Capacidade mínima: 2

Capacidade máxima: 6

Isso permitirá que o Auto Scaling adicione/remova instâncias automaticamente, mantendo sempre entre 2 e 6 instâncias em execução.

Em Políticas de dimensionamento , selecione Política de dimensionamento de rastreamento de destino e configure:

Nome da política de escalonamento: LabScalingPolicy

Tipo de métrica: Utilização média da CPU 

Valor alvo: 60

Isso instrui o Auto Scaling a manter uma utilização média da CPU em todas as instâncias em 60%. O Auto Scaling adicionará ou removerá capacidade automaticamente conforme necessário para manter a métrica no valor alvo especificado ou próximo a ele. Ele se ajusta às flutuações na métrica devido a um padrão de carga variável.

Selecione a próxima

 

Configure os detalhes na Etapa 5 (Adicionar notificações - opcional):

O recurso de dimensionamento automático pode enviar uma notificação quando um evento de dimensionamento ocorrer. Você usará as configurações padrão.

Selecione a próxima

 

Configure os detalhes na Etapa 6 (Adicionar tags - opcional):

As tags aplicadas ao grupo de Auto Scaling serão propagadas automaticamente para as instâncias que forem iniciadas.

Selecione Adicionar etiqueta e configure o seguinte:

Chave: Name

Valor: Lab Instance

Selecione a próxima

 

Configure os detalhes na Etapa 6 (Revisão):

Analise os detalhes do seu grupo de Auto Scaling.

Selecione Criar grupo de dimensionamento automático

Inicialmente, seu grupo de Auto Scaling mostrará uma contagem de instâncias igual a zero, mas novas instâncias serão iniciadas até atingir a contagem desejada de 2 instâncias.

 

Tarefa 4: Verificar se o balanceamento de carga está funcionando
Nesta tarefa, você verificará se o balanceamento de carga está funcionando corretamente.

No painel de navegação à esquerda, selecione Instâncias .

Você deverá ver duas novas instâncias chamadas Lab Instance . Elas foram iniciadas pelo Auto Scaling.

Se as instâncias ou os nomes não forem exibidos, aguarde 30 segundos e selecione atualizar.no canto superior direito.

Em seguida, você confirmará se as novas instâncias passaram na verificação de integridade.

 

No painel de navegação à esquerda, selecione Grupos de destino .

 

Selecione Grupo de Laboratório

 

Selecione a aba Metas .

Duas instâncias de destino chamadas Lab Instance devem ser listadas no grupo de destino.

 

Aguarde até que o status de ambas as instâncias mude para saudável .

Selecione AtualizarNo canto superior direito, para verificar se há atualizações.

O status "Saudável" indica que uma instância passou na verificação de integridade do balanceador de carga. Isso significa que o balanceador de carga enviará tráfego para a instância.

Agora você pode acessar o grupo de Auto Scaling através do Load Balancer.

 

No painel de navegação à esquerda, selecione Balanceadores de Carga .

 

Selecione o Balanceador de carga LabELB .

 

No painel Detalhes, copie o nome DNS do balanceador de carga, certificando-se de omitir o "(Registro A)".

Deverá ter uma aparência semelhante a esta: LabELB-1998580470.us-west-2.elb.amazonaws.com

 

Abra uma nova aba do navegador, cole o nome DNS que você acabou de copiar e pressione Enter.

O aplicativo deverá aparecer no seu navegador. Isso indica que o balanceador de carga recebeu a solicitação, enviou-a para uma das instâncias EC2 e, em seguida, retornou o resultado.

 

Tarefa 5: Testar o dimensionamento automático
Você criou um grupo de Auto Scaling com um mínimo de duas instâncias e um máximo de seis. Atualmente, duas instâncias estão em execução porque o tamanho mínimo é dois e o grupo não está sob carga. Agora, você aumentará a carga para que o Auto Scaling adicione instâncias adicionais.

Retorne ao Console de Gerenciamento da AWS, mas não feche a guia do aplicativo — você retornará a ela em breve.

 

na caixa de pesquisa ao lado deEm Serviços , pesquise e selecione CloudWatch .

 

No painel de navegação à esquerda, selecione Todos os alarmes .

Serão exibidos dois alarmes. Eles foram criados automaticamente pelo grupo de Auto Scaling. O objetivo é manter a carga média da CPU próxima a 60%, respeitando o limite de duas a seis instâncias.

     Nota : Siga estes passos apenas se não vir os alarmes em 60 segundos.

NoNo menu Serviços , escolha EC2 .

No painel de navegação à esquerda, selecione Grupos de dimensionamento automático .

Selecione Grupo de Autoescalonamento de Laboratório .

Na metade inferior da página, selecione a guia Dimensionamento Automático .

Selecione Política de dimensionamento de laboratório .

Selecione as açõese Editar .

Alterar o valor alvo para 50.

Selecione Atualizar

NoNo menu Serviços , escolha CloudWatch .

No painel de navegação à esquerda, selecione Todos os alarmes e verifique se você vê dois alarmes.

 

Selecione o alarme OK , que tem AlarmHigh no nome.

Se nenhum alarme estiver sendo exibido , aguarde um minuto e selecione "Atualizar".no canto superior direito até que o status do alarme mude.

O "OK" indica que o alarme não foi acionado. Trata-se do alarme para Utilização da CPU > 60 , que adicionará instâncias quando a média de uso da CPU estiver alta. O gráfico deve mostrar níveis muito baixos de CPU no momento.

Agora você instruirá o aplicativo a realizar cálculos que devem aumentar o nível de uso da CPU.

 

Retorne à aba do navegador com o aplicativo web.

 

Selecione Teste de Carga ao lado do logotipo da AWS.

Isso fará com que o aplicativo gere cargas elevadas. A página do navegador será atualizada automaticamente para que todas as instâncias no grupo de Auto Scaling gerem carga. Não feche esta guia.

 

Retorne à guia do navegador com o console do CloudWatch .

Em menos de 5 minutos, o alarme AlarmLow deverá mudar para OK e o status do alarme AlarmHigh deverá mudar para Em alarme .

Você pode escolher AtualizarNo canto superior direito, a cada 60 segundos, para atualizar a exibição.

Você deverá ver o gráfico AlarmHigh indicando um aumento na porcentagem de uso da CPU. Assim que essa porcentagem ultrapassar a linha de 60% por mais de 3 minutos, o Auto Scaling será acionado para adicionar instâncias adicionais.

 

Aguarde até que o alarme AlarmHigh entre no estado de alarme ativo .

Agora você pode visualizar as instâncias adicionais que foram iniciadas.

 

Na caixa de pesquisa ao lado deEm Serviços , pesquise e selecione EC2 .

 

No painel de navegação à esquerda, selecione Instâncias .

Agora, mais de duas instâncias com a etiqueta "Lab Instance" devem estar em execução. As novas instâncias foram criadas pelo Auto Scaling em resposta ao alerta do CloudWatch.