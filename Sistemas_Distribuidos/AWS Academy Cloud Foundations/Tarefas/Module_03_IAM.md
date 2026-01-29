Laboratório 1: Introdução ao AWS IAM
O AWS Identity and Access Management (IAM) é um serviço web que permite aos clientes da Amazon Web Services (AWS) gerenciar usuários e permissões de usuários na AWS. Com o IAM, você pode gerenciar usuários , credenciais de segurança, como chaves de acesso, e permissões que controlam a quais recursos da AWS os usuários podem acessar de forma centralizada.

 

Visão geral e objetivos do laboratório
Este laboratório demonstrará:

Visão geral do laboratório

Explorando usuários e grupos IAM pré-criados

Inspecionando as políticas de IAM aplicadas aos grupos pré-criados.

Seguindo um cenário do mundo real , a adição de usuários a grupos com capacidades específicas foi habilitada.

Localizando e utilizando o URL de login do IAM

Experimentando com os efeitos das políticas no acesso aos serviços.

 

restrições de serviço da AWS
Neste ambiente de laboratório, o acesso aos serviços e ações da AWS pode estar restrito àqueles necessários para concluir as instruções do laboratório. Você poderá encontrar erros se tentar acessar outros serviços ou executar ações além das descritas neste laboratório.

 

Gerenciamento de identidade e acesso da AWS
O AWS Identity and Access Management (IAM) pode ser usado para:

Gerencie usuários do IAM e seus acessos: você pode criar usuários e atribuir a eles credenciais de segurança individuais (chaves de acesso, senhas e dispositivos de autenticação multifator). Você pode gerenciar permissões para controlar quais operações um usuário pode executar.

Gerenciar funções do IAM e suas permissões: Uma função do IAM é semelhante a um usuário, pois é uma identidade da AWS com políticas de permissão que determinam o que a identidade pode e não pode fazer na AWS. No entanto, em vez de ser associada exclusivamente a uma pessoa, uma função pode ser assumida por qualquer pessoa que precise dela.

Gerencie usuários federados e suas permissões: você pode habilitar a federação de identidades para permitir que usuários existentes em sua empresa acessem o Console de Gerenciamento da AWS, chamem APIs da AWS e acessem recursos, sem a necessidade de criar um usuário do IAM para cada identidade.

 

Duração
Este experimento leva aproximadamente 40 minutos para ser concluído.

 

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

 

Tarefa 1: Explorar os Usuários e Grupos
Nesta tarefa, você explorará os usuários e grupos que já foram criados para você no IAM.

 

Na caixa de pesquisa à direita de Em Serviços , pesquise e selecione IAM para abrir o console do IAM.

    

No painel de navegação à esquerda, selecione Usuários .

Os seguintes usuários do IAM foram criados para você:

usuário-1

usuário-2

usuário-3

 

Selecione o link do usuário 1 .

Isso abrirá uma página de resumo para o usuário 1. A aba Permissões será exibida.

 

Observe que o usuário 1 não possui nenhuma permissão.

 

Selecione a aba Grupos .

O usuário 1 também não é membro de nenhum grupo.

 

Selecione a aba Credenciais de segurança .

O usuário 1 recebe uma senha de console .

 

No painel de navegação à esquerda, selecione Grupos de usuários .

   Os seguintes grupos já foram criados para você:

Administrador EC2

Suporte EC2

Suporte S3

  

Selecione o link do grupo EC2-Support .

Isso o levará à página de resumo do grupo EC2-Support .

   

Selecione a aba Permissões .

Este grupo possui uma Política Gerenciada associada, chamada AmazonEC2ReadOnlyAccess . Políticas Gerenciadas são políticas pré-configuradas (criadas pela AWS ou pelos seus administradores) que podem ser anexadas a Usuários e Grupos do IAM. Quando a política é atualizada, as alterações são aplicadas imediatamente a todos os Usuários e Grupos associados a ela.

 

Selecione o ícone de mais ( + ) ao lado da política AmazonEC2ReadOnlyAccess para visualizar os detalhes da política.

Observação : Uma política define quais ações são permitidas ou negadas para recursos específicos da AWS.

Esta política concede permissão para listar e descrever informações sobre EC2, Elastic Load Balancing, CloudWatch e Auto Scaling. Essa capacidade de visualizar recursos, mas não modificá-los, é ideal para atribuir a uma função de suporte.

A estrutura básica das declarações em uma Política de IAM é:

O efeito indica se as permissões devem ser permitidas ou negadas .

A ação especifica as chamadas de API que podem ser feitas em um serviço da AWS (por exemplo, cloudwatch:ListMetrics ).

O recurso define o escopo das entidades abrangidas pela regra de política (por exemplo, um bucket específico do Amazon S3 ou uma instância do Amazon EC2, ou * que significa qualquer recurso ).

 

Selecione o ícone de menos ( - ) para ocultar os detalhes da política.

 

No painel de navegação à esquerda, selecione Grupos de usuários .

 

Selecione o link do grupo S3-Support e, em seguida, escolha a guia Permissões .

O grupo S3-Support tem a política AmazonS3ReadOnlyAccess associada.

 

Selecione o ícone de mais ( + ) para visualizar os detalhes da apólice.

Esta política concede permissões para obter e listar recursos no Amazon S3.

 

Selecione o ícone de menos ( - ) para ocultar os detalhes da política.

 

No painel de navegação à esquerda, selecione Grupos de usuários .

 

Selecione o link do grupo EC2-Admin e, em seguida, escolha a guia Permissões .

Este grupo é ligeiramente diferente dos outros dois. Em vez de uma Política Gerenciada , ele possui uma Política Inline , que é uma política atribuída a apenas um usuário ou grupo. As Políticas Inline são normalmente usadas para aplicar permissões em situações pontuais.

 

Selecione o ícone de mais ( + ) para visualizar os detalhes da apólice.

Esta política concede permissão para visualizar (descrever) informações sobre o Amazon EC2, bem como a capacidade de iniciar e parar instâncias.

 

Selecione o ícone de menos ( - ) para ocultar os detalhes da política.

 

Cenário de Negócios
No restante deste laboratório, você trabalhará com esses usuários e grupos para habilitar permissões que suportem o seguinte cenário de negócios:

Sua empresa está expandindo o uso da Amazon Web Services e utiliza diversas instâncias do Amazon EC2 e uma grande quantidade de armazenamento do Amazon S3. Você deseja conceder acesso a novos funcionários de acordo com suas funções:

Usuário	Em grupo	Permissões
usuário-1	Suporte S3	Acesso somente leitura ao Amazon S3
usuário-2	Suporte EC2	Acesso somente leitura ao Amazon EC2
usuário-3	Administrador EC2	Visualizar, iniciar e parar instâncias do Amazon EC2
|

Tarefa 2: Adicionar usuários a grupos
Você contratou recentemente o usuário-1 para uma função onde ele fornecerá suporte ao Amazon S3. Você o adicionará ao grupo S3-Support para que ele herde as permissões necessárias por meio da política AmazonS3ReadOnlyAccess anexada .

Você pode ignorar quaisquer erros de "não autorizado" que aparecerem durante esta tarefa. Eles são causados ​​pelas permissões limitadas da sua conta no laboratório e não afetarão sua capacidade de concluir o laboratório.

 

Adicionar usuário-1 ao Grupo de Suporte S3
No painel de navegação à esquerda, selecione Grupos de usuários .

 

Selecione o link do grupo de suporte S3 .

 

Selecione a aba Usuários .

 

Na guia Usuários , selecione Adicionar usuários .

 

Na janela Adicionar usuários ao suporte S3 , configure o seguinte:

Selecione usuário-1 .

Na parte inferior da tela, selecione Adicionar usuários .

Na aba Usuários , você verá que o usuário 1 foi adicionado ao grupo.

 

Adicionar o usuário 2 ao grupo de suporte EC2
Você contratou o usuário 2 para uma função na qual ele fornecerá suporte para o Amazon EC2.

 

Utilizando etapas semelhantes às descritas acima, adicione o usuário 2 ao grupo EC2-Support .

O usuário user-2 agora deve fazer parte do grupo EC2-Support .

 

Adicionar o usuário 3 ao grupo EC2-Admin
Você contratou o usuário 3 como administrador do Amazon EC2, responsável por gerenciar suas instâncias do EC2.

 

Utilizando etapas semelhantes às descritas acima, adicione o usuário 3 ao grupo EC2-Admin .

O usuário user-3 agora deve fazer parte do grupo EC2-Admin .

 

No painel de navegação à esquerda, selecione Grupos de usuários .

Cada grupo agora deve ter o número 1 na coluna Usuários, indicando a quantidade de usuários em cada grupo.

Caso não haja um número 1 ao lado de cada grupo, revise as instruções acima para garantir que cada usuário esteja atribuído a um grupo de usuários, conforme mostrado na tabela na seção Cenário de Negócios.

 

Tarefa 3: Fazer login e testar usuários
Nesta tarefa, você testará as permissões de cada usuário do IAM.

 

No painel de navegação à esquerda, selecione Painel de controle .

Um URL de login para usuários do IAM nesta conta é exibido à direita. Ele será semelhante a : https://123456789012.signin.aws.amazon.com/console

Este link pode ser usado para fazer login na conta da AWS que você está usando atualmente.

 

Copie o URL de login para usuários do IAM nesta conta e cole-o em um editor de texto.

 

Abra uma janela privada (anônima).

Mozilla Firefox

Selecione as barras de menu.no canto superior direito da tela

Selecione Nova janela privada

Google Chrome

Selecione as reticênciasno canto superior direito da tela

Selecione Nova Janela Anônima

Microsoft Edge

Selecione as reticênciasno canto superior direito da tela

Selecione Nova janela InPrivate

Microsoft Internet Explorer

Selecione a opção de menu Ferramentas

Escolha a navegação InPrivate.

 

Cole o link de login de usuários do IAM na barra de endereços da sua sessão anônima do navegador e pressione Enter .

Em seguida, você fará login como usuário-1 , que foi contratado como sua equipe de suporte de armazenamento do Amazon S3.

 

Faça login com:

Nome de usuário do IAM: user-1

Senha: Lab-Password1

 

Na caixa de pesquisa à direita de Em Serviços , procure e selecione S3 para abrir o console do S3.

 

Escolha o nome do bucket existente na conta e navegue pelo conteúdo.

Como seu usuário faz parte do grupo S3-Support no IAM, ele tem permissão para visualizar uma lista de buckets do Amazon S3 e seus conteúdos.

Observação: O balde não contém nenhum objeto.

Agora, verifique se eles têm acesso ao Amazon EC2.

 

Na caixa de pesquisa à direita de Em Serviços , pesquise e selecione EC2 para abrir o console do EC2.

 

No painel de navegação à esquerda, selecione Instâncias .

Você não consegue visualizar nenhuma instância. Em vez disso, você vê uma mensagem informando que você não está autorizado a executar esta operação . Isso ocorre porque este usuário não recebeu permissões para acessar o Amazon EC2.

Você agora fará login como usuário-2 , que foi contratado como seu profissional de suporte do Amazon EC2.

 

Para encerrar a sessão do usuário 1 no Console de Gerenciamento da AWS, siga estas etapas:

Na parte superior da tela, selecione usuário-1.

Selecione Sair

captura de tela

 

Cole o link de login de usuários do IAM na barra de endereços da sua guia anônima do navegador e pressione Enter .

Observação: Este link deve estar no seu editor de texto.

 

Faça login com:

Nome de usuário do IAM: user-2

Senha: Lab-Password2

 

Na caixa de pesquisa à direita de Em Serviços , pesquise e selecione EC2 para abrir o console do EC2.

 

No painel de navegação à esquerda, selecione Instâncias .

Agora você pode visualizar uma instância do Amazon EC2 porque possui permissões somente de leitura. No entanto, você não poderá fazer nenhuma alteração nos recursos do Amazon EC2.

Se você não visualizar uma instância do Amazon EC2, sua região pode estar incorreta. No canto superior direito da tela, abra o menu "Região" e selecione a região que você anotou no início do laboratório (por exemplo, Virgínia do Norte ).

 

Selecione a instância com o nome LabHost .

 

No menu Estado da instância acima, selecione Parar instância .

 

Na janela Parar Instância , selecione Parar .

Você receberá uma mensagem de erro informando que não está autorizado a realizar esta operação . Isso demonstra que a política permite apenas a visualização de informações, sem a possibilidade de alterá-las.

 

Selecione o X para fechar a mensagem " Falha ao interromper a instância" .

Em seguida, verifique se o usuário 2 consegue acessar o Amazon S3.

 

Na caixa de pesquisa à direita de Em Serviços , procure e selecione S3 para abrir o console do S3.

Você verá a mensagem " Você não tem permissão para listar buckets porque o usuário 2 não tem permissão para acessar o Amazon S3".

Você agora fará login como usuário-3 , que foi contratado como seu administrador do Amazon EC2.

 

Encerre a sessão do usuário 2 no Console de Gerenciamento da AWS realizando as seguintes ações:

Na parte superior da tela, selecione usuário-2.

Selecione Sair

captura de tela

 

Cole o link de login de usuários do IAM em sua janela anônima e pressione Enter .

 

Cole o link de login na barra de endereços da sua aba anônima do navegador novamente. Se ele não estiver na sua área de transferência, recupere-o do editor de texto onde você o salvou anteriormente.

 

Faça login com:

Nome de usuário do IAM: user-3

Senha: Lab-Password3

 

Na caixa de pesquisa à direita de Em Serviços , pesquise e selecione EC2 para abrir o console do EC2.

 

No painel de navegação à esquerda, selecione Instâncias .

Como administrador do EC2, você agora deve ter permissões para parar a instância do Amazon EC2.

Selecione a instância com o nome LabHost .

Se você não visualizar uma instância do Amazon EC2, sua região pode estar incorreta. No canto superior direito da tela, abra o menu "Região" e selecione a região que você anotou no início do laboratório (por exemplo, Virgínia do Norte ).

 

No menu Estado da instância , escolha Parar instância .

 

Na janela Parar instância , escolha Parar .

A instância entrará em estado de parada e será encerrada.

 

Feche a janela anônima do seu navegador.

 

Submissão do seu trabalho
Para registrar seu progresso, selecione Enviar na parte superior destas instruções.

  Importante:   Algumas das verificações realizadas pelo processo de submissão neste laboratório só concederão crédito se tiverem decorrido pelo menos 5 minutos desde a conclusão da ação. Se não receber crédito na primeira submissão, poderá ser necessário aguardar alguns minutos e submeter novamente para receber crédito por esses itens.

 

Quando solicitado, escolha Sim .

Após alguns minutos, o painel de notas aparecerá, mostrando quantos pontos você ganhou em cada tarefa. Se os resultados não forem exibidos após alguns minutos, selecione "Notas" na parte superior destas instruções.

 Dica: Você pode enviar seu trabalho várias vezes. Depois de fazer alterações, selecione "Enviar" novamente. Seu último envio será registrado para este laboratório.

 

Para obter feedback detalhado sobre seu trabalho, selecione Relatório de Envio .

 Dica: Para as verificações em que você não recebeu a pontuação máxima, o relatório de envio geralmente fornece detalhes úteis.

 

Laboratório concluído
Parabéns! Você concluiu o experimento.

 

Escolher Clique em "Finalizar Laboratório" na parte superior desta página e selecione "Sim" para confirmar que deseja encerrar o laboratório.

Um painel indica que você pode fechar esta caixa de mensagem agora...

 

Selecione o X no canto superior direito para fechar o painel.

 

Conclusão
Parabéns! Você agora concluiu com sucesso:

Exploramos usuários e grupos IAM pré-criados.

Políticas de IAM inspecionadas, conforme aplicadas aos grupos pré-criados.

Simulamos um cenário real, adicionando usuários a grupos com capacidades específicas habilitadas.

Localizei e utilizei a URL de login do IAM.

Experimentamos os efeitos das políticas sobre o acesso aos serviços.

 

© 2023 Amazon Web Services, Inc. e suas afiliadas. Todos os direitos reservados. Este trabalho não pode ser reproduzido ou redistribuído, no todo ou em parte, sem a prévia autorização por escrito da Amazon Web Services, Inc. É proibida a cópia, o empréstimo ou a venda para fins comerciais.