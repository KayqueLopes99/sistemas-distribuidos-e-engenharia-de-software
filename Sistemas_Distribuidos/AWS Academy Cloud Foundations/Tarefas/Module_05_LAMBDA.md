Atividade: AWS Lambda
Visão geral do laboratório
diagrama arquitetônico

 

Nesta atividade prática, você criará uma função AWS Lambda. Você também criará um evento Amazon EventBridge para acionar a função a cada minuto. A função utiliza uma função do AWS Identity and Access Management (IAM). Essa função do IAM permite que a função interrompa uma instância do Amazon Elastic Compute Cloud (Amazon EC2) que esteja em execução na conta da Amazon Web Services (AWS).

 

Duração
Esta atividade leva aproximadamente 30 minutos para ser concluída.

 

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

 

Tarefa 1: Criar uma função Lambda
Na caixa de pesquisa à direita de Em Serviços , pesquise e selecione Lambda para abrir o console do AWS Lambda.

  

Selecione Criar uma função .

  

Na tela Criar função , configure as seguintes opções:

Escolha o autor do zero

Nome da função:myStopinator

Ambiente de execução: Python 3.11

EscolherAlterar a função de execução padrão

Função de execução: Usar uma função existente

Função existente: Na lista suspensa, escolha myStopinatorRole

 

Selecione a função Criar .

 

Tarefa 2: Configurar o gatilho
Nesta tarefa, você configurará um evento agendado para acionar a função Lambda, definindo um evento do Amazon EventBridge como a origem (ou gatilho) do evento. A função Lambda pode ser configurada para operar de forma semelhante a um cron job em um servidor Linux ou a uma tarefa agendada em um servidor Microsoft Windows. No entanto, você não precisa ter um servidor em execução para hospedá-la.

 

Selecione Adicionar gatilho .

 

Escolha o menu suspenso Selecionar um gatilho e selecione EventBridge (Eventos do CloudWatch) .

 

Para a regra, selecione Criar uma nova regra e configure estas definições:

Nome da regra:everyMinute

Tipo de regra: Expressão de agendamento

Expressão de agendamento:rate(1 minute)

Observação : Uma função Lambda stopinator mais realista e baseada em agendamento provavelmente seria acionada usando uma expressão cron em vez de uma expressão rate. No entanto, para os propósitos desta atividade, usar uma expressão rate garante que a função Lambda será acionada em tempo hábil para que você possa ver os resultados.

 

Selecione Adicionar .

 

Tarefa 3: Configurar a função Lambda
Nesta tarefa, você colará algumas linhas de código para atualizar dois valores no código da função. Não é necessário escrever código para concluir esta tarefa.

 

Abaixo do painel Visão geral da função , selecione Código e, em seguida, escolha lambda_function.py para exibir e editar o código da função Lambda.

 

No painel Fonte do código , exclua o código existente. Copie o código a seguir e cole-o na caixa:

importar boto3
região =  '<SUBSTITUIR_PELA_REGIÃO>'
instâncias = [ '<REPLACE_WITH_INSTANCE_ID>' ]
ec2 = boto3.client( 'ec2' , region_name = region)

def lambda_handler(event, context):
    ec2.stop_instances (InstanceIds = instances)
    print( 'Suas instâncias foram interrompidas: '  + str(instances))
Nota: Depois de colar o código na caixa Fonte do código , revise a linha 5. Se um ponto (.) foi adicionado, exclua-o.

 

Substitua o <REPLACE_WITH_REGION>marcador de posição pela região real que você está usando. Para fazer isso:

Selecione a região no canto superior direito e utilize o código da região. Por exemplo, o código da região Leste dos EUA (Norte da Virgínia) é us-east-1 .

Importante : Mantenha as aspas simples (' ') em torno da região no seu código. Por exemplo, para a Virgínia do Norte, seria:'us-east-1'

 

Seção de desafio : Verifique se uma instância EC2 chamada instance1 está em execução em sua conta e copie o ID da instância instance1 .   

Você é incentivado a descobrir como realizar esta tarefa sem instruções passo a passo específicas. No entanto, se precisar de orientações detalhadas, selecione este texto para revelar as etapas detalhadas:

      
      Abra outra aba do navegador e acesse https://console.aws.amazon.com/ec2. Selecione Instâncias. Observe que existe uma instância EC2 chamada *instance1* e que ela está em execução. Na aba Detalhes da instância instance1, copie o ID da instância (ele começará com i-). Observação: Deixe esta aba do navegador aberta. Você retornará a ela em breve.
 

Volte para a guia do navegador do console do AWS Lambda e substitua <REPLACE_WITH_INSTANCE_ID>pelo ID da instância real que você acabou de copiar.

Importante : Mantenha as aspas simples (' ') em torno do ID da instância no seu código.

Seu código agora deve ser semelhante ao exemplo a seguir. No entanto, você pode ter um valor diferente para a Região e também um valor diferente para o ID da instância:

diagrama arquitetônico

 

Selecione o menu Arquivo e salve as alterações. Em seguida, na caixa Fonte do código , selecione Implantar .

Sua função Lambda agora está totalmente configurada. Ela deverá tentar parar sua instância a cada minuto.

 

Selecione Monitor (a aba próxima ao topo da página).

Observe que um dos gráficos mostra quantas vezes sua função foi invocada. Há também um gráfico que mostra a contagem de erros e a taxa de sucesso em porcentagem.

 

Tarefa 4: Verificar se a função Lambda funcionou.
Volte para a guia do navegador do console do Amazon EC2 e verifique se sua instância foi interrompida.

Dica : Você pode escolher oAtualize o ícone ou atualize a página do navegador para ver a mudança de estado mais rapidamente.

 

Tente iniciar a instância novamente. O que você acha que vai acontecer?

Escolha aqui para revelar a resposta.

      
      A instância será interrompida novamente dentro de 1 minuto.