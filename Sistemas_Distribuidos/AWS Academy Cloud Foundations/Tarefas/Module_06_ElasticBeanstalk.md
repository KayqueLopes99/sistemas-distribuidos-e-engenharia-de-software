Atividade: AWS Elastic Beanstalk
Visão geral do laboratório
Esta atividade fornece a você uma conta da Amazon Web Services (AWS) com um ambiente AWS Elastic Beanstalk pré-criado. Você implantará código nesse ambiente e observará os recursos da AWS que o compõem.

 

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

 

Tarefa 1: Acessar o ambiente Elastic Beanstalk
No console, na caixa de pesquisa à direita de "to" (para). * Serviços * , pesquise e escolha * Elastic Beanstalk * .

Uma página intitulada "Ambientes" deve ser aberta, exibindo uma tabela com os detalhes de uma aplicação Elastic Beanstalk existente.  

Observação : Se o status na coluna Saúde não for "OK", significa que a inicialização ainda não foi concluída. Aguarde alguns instantes e o status deverá mudar para "OK".

aplicativo elastic-beanstalk

 

Na coluna Nome do ambiente , escolha o nome do ambiente.

A página do painel de controle do seu ambiente Elastic Beanstalk é aberta.

 

Observe que a página mostra que o estado de saúde do seu aplicativo está OK.

O ambiente Elastic Beanstalk está pronto para hospedar uma aplicação. No entanto, ainda não possui código em execução.

 

Testar o acesso ao ambiente.

Na parte superior da página, selecione o link Domínio (o URL termina em elasticbeanstalk.com ).

Ao selecionar o URL, uma nova aba do navegador será aberta. No entanto, você verá que ela exibe a mensagem de status HTTP 404 - Não encontrado .

Esse comportamento é esperado, pois este servidor de aplicativos ainda não possui nenhum aplicativo em execução.

Retorne ao console do Elastic Beanstalk.

Na próxima etapa, você implantará o código em seu ambiente Elastic Beanstalk.

 

Tarefa 2: Implante um aplicativo de exemplo no Elastic Beanstalk
Para baixar um aplicativo de exemplo, acesse este link: 
https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/samples/tomcat.zip

 

De volta ao painel do Elastic Beanstalk, escolha Carregar e Implantar .

 

Selecione "Escolher arquivo" e, em seguida, navegue até o arquivo tomcat.zip que você acabou de baixar e abra-o.

 

Selecione Implantar .

Levará um ou dois minutos para o Elastic Beanstalk atualizar seu ambiente e implantar o aplicativo.

 

Após a conclusão da implantação, selecione o link do URL do domínio (ou, se a aba do navegador que exibia o status 404 ainda estiver aberta, atualize a página).

O aplicativo web que você implantou é exibido.

aplicativo web

Parabéns, você implantou com sucesso um aplicativo no Elastic Beanstalk!

 

De volta ao console do Elastic Beanstalk, selecione Configuração no painel esquerdo.

Observe os detalhes aqui.

Por exemplo, no painel Tráfego e dimensionamento de instâncias , são indicados os grupos de segurança do EC2, o número mínimo e máximo de instâncias e os detalhes do tipo de instância das instâncias do Amazon Elastic Compute Cloud (Amazon EC2) que hospedam seu aplicativo web.

 

No painel "Rede, banco de dados e tags" , nenhum detalhe de configuração é exibido, pois o ambiente não inclui um banco de dados.

 

Na linha "Rede, banco de dados e tags" , selecione "Editar" .

Observe que você pode facilmente habilitar um banco de dados neste ambiente, se desejar: basta definir algumas configurações básicas e clicar em Aplicar . (No entanto, para os fins desta atividade, não é necessário adicionar um banco de dados.)

Selecione Cancelar na parte inferior da tela.

 

No painel esquerdo, em Ambiente , selecione Monitoramento .

Navegue pelos gráficos para ver os tipos de informação que estão disponíveis para você.

 

Tarefa 3: Explore os recursos da AWS que dão suporte à sua aplicação.
No console, na caixa de pesquisa à direita de "to" (para). * Serviços * , pesquise e selecione EC2

 

Selecione as instâncias .

Observe que duas instâncias que dão suporte ao seu aplicativo web estão em execução (ambas contêm "samp" em seus nomes).

 

Se você quiser continuar explorando os recursos do serviço Amazon EC2 criados pelo Elastic Beanstalk, fique à vontade. Você encontrará:

Um grupo de segurança com a porta 80 aberta.

Um balanceador de carga ao qual ambas as instâncias pertencem.

Um grupo de Auto Scaling que opera com duas a seis instâncias, dependendo da carga da rede.

Embora o Elastic Beanstalk tenha criado esses recursos para você, você ainda tem acesso a eles.

 

Submissão do seu trabalho
Para registrar seu progresso, selecione Enviar na parte superior destas instruções.

 

Quando solicitado, escolha Sim .

Após alguns minutos, o painel de notas aparecerá, mostrando quantos pontos você ganhou em cada tarefa. Se os resultados não forem exibidos após alguns minutos, selecione "Notas" na parte superior destas instruções.

  Importante:   Algumas das verificações realizadas pelo processo de submissão neste laboratório só concederão crédito se tiverem decorrido pelo menos 5 minutos desde a conclusão da ação. Se não receber crédito na primeira submissão, poderá ser necessário aguardar alguns minutos e submeter novamente para receber crédito por esses itens.

 Dica: Você pode enviar seu trabalho várias vezes. Depois de fazer alterações, selecione "Enviar" novamente. Seu último envio será registrado para este laboratório.

 

Para obter feedback detalhado sobre seu trabalho, selecione Relatório de Envio .

 Dica: Para as verificações em que você não obteve a pontuação máxima, o relatório de envio geralmente fornece detalhes úteis.