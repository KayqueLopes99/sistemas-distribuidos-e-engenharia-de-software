## Desenvolvimento de soluções com o AmazonSQS e o AmazonSNS

### Introdução às filas de mensagens
- Uma fila de mensagens é um repositório temporário de mensagens que estão aguardando para serem processadas. Geralmente, as mensagens são pequenas e podem ser itens como solicitações, respostas, mensagens de erro, ou apenas informações. Exemplos de mensagens incluem registros de clientes, pedidos de produtos, faturas, registros de pacientes, etc.Para enviar uma mensagem, um componente chamado de produtor adiciona uma mensagem à fila. A mensagem é armazenada na fila até que outro componente chamado de consumidora recupere e processe.


Filas de mensagens permitem criar processos assíncronos, onde produtor e consumidor não dependem diretamente um do outro.

Processo síncrono:

Produtor gera uma mensagem e aguarda o consumidor processar.

Consumidor processa a mensagem e notifica o produtor.

Sistema fortemente acoplado, com alta dependência entre produtor e consumidor.
- A desvantagem de um sistema totalmente acoplado é que ele não é tolerante a falhas. 

Filas de mensagens quebram esse acoplamento

> Uma solução assíncrona também é mais escalável. Você pode adicionar e remover produtores e consumidores conforme exigido pelo aplicativo. Uma fila pode oferecer suporte a vários produtores e consumidores. Uma única fila pode ser usada simultaneamente por muitos componentes de aplicativosdistribuídos, sem que esses componentes precisem estar coordenados entre si para compartilhar a fila.


### Introdução ao AmazonSimpleQueueService (AmazonSQS)
- O Amazon Simple Queue Service (Amazon SQS) é um serviço de filas de mensagens gerenciado que permite o desacoplamento e a escalabilidade de microsserviços, sistemas distribuídos e aplicativos sem servidor. Você pode usar o Amazon SQS para enviar, armazenar e receber mensagens entre componentes de software em qualquer volume, sem perder mensagens ou precisar que outros serviços estejam disponíveis.

Aqui está um **resumo da arquitetura de funcionamento do Amazon SQS** que você descreveu:

- Arquitetura de Processamento com SQS

1. **Upload da imagem**:

   * Usuário envia uma foto para um **bucket do Amazon S3**.

2. **Gatilho Lambda**:

   * O **AWS Lambda** é acionado pelo upload.
   * Lambda envia uma **mensagem para uma fila do SQS** com informações sobre a imagem.

3. **Processamento assíncrono**:

   * Um **grupo de servidores EC2** atrás de um **Auto Scaling** consulta a fila do SQS.
   * Servidores processam a imagem e enviam o resultado de volta para o **S3**.

4. **Escalabilidade automática**:

   * O **Auto Scaling** ajusta o número de servidores de acordo com o **tamanho da fila do SQS**.
   * Servidores permanecem em espera quando a fila está vazia e retomam o processamento quando novas mensagens chegam.

5. **Resiliência**:

   * Se os servidores de processamento estiverem temporariamente desligados, o **Lambda continua enviando mensagens para a fila**, garantindo que nenhuma tarefa seja perdida.

O **Amazon SQS** oferece filas **Padrão**, com alta taxa de transferência e entrega “pelo menos uma vez”, mas com ordem ocasionalmente fora de sequência.
As filas **FIFO** garantem **ordem exata e processamento único**, mas têm **taxa de transferência limitada**.

### Conceitos do desenvolvedor do AmazonSQS

O ciclo de vida de uma mensagem do Amazon SQS é o seguinte:1.Um componente de produtor envia uma mensagem para a fila do SQS.2.Um componente consumidor recupera a mensagem da fila. O tempo limite de visibilidade começa.3.O componente consumidor processa a mensagem e, em seguida, a exclui da fila durante o período de tempo limite de visibilidade.

- O ciclo de vida de uma mensagem do Amazon SQS é o seguinte:1.Um componente de produtor envia uma mensagem para a fila do SQS.2.Um componente consumidor recupera a mensagem da fila. O tempo limite de visibilidade começa.3.O componente consumidor processa a mensagem e, em seguida, a exclui da fila durante o período de tempo limite de visibilidade.C


- Operações:
- A operação SendMessageentrega uma mensagem a uma fila específica. 
- Você pode recuperar uma ou mais mensagens (até 10) da fila usando a operação ReceiveMessage.

- Quando um consumidor recebe e processa uma mensagem de uma fila, a mensagem permanece na fila. O Amazon SQS não exclui a mensagem automaticamente. Como o Amazon SQS é um sistema distribuído, não há garantia de que o consumidor realmente receba a mensagem (por exemplo, devido a um problema de conectividade ou devido a um problema no aplicativo). Assim, o consumidor deve excluir a mensagem da fila depois de recebê-la e processá-la.

- O **Amazon SQS** recupera mensagens usando **sondagem curta** por padrão: a chamada `ReceiveMessage` verifica apenas um subconjunto de servidores e retorna imediatamente as mensagens disponíveis. Por outro lado, com a sondagem longa, o Amazon SQS consulta todos os servidores e aguarda até que uma mensagem esteja disponível na fila para enviar uma resposta. 

- Para evitar que uma mensagem seja recebida e processada novamente quando o tempo limite de visibilidade expirar, o consumidor deve excluir a mensagem. Você pode usar a operação DeleteMessage para excluir uma mensagem específica de uma fila específica. 

- O Amazon SQS permite configurar filas via API CreateQueue, incluindo sondagem longa (ReceiveMessageWaitTimeSeconds).
Outras APIs importantes incluem Set/GetQueueAttributes (gerenciar atributos), GetQueueUrl, ListQueues e DeleteQueue para manipulação de filas.

- Proteção: Criptografia, IAM e VPC

### Introdução ao AmazonSimpleNotificationService (AmazonSNS)
- O Amazon Simple Notification Service (Amazon SNS) trabalha em conjunto com o Amazon Simple Queue Service (Amazon SQS).

-O AmazonSimpleNotificationService (AmazonSNS) é um serviço de envio de mensagens de publicação/assinatura totalmente gerenciado, altamente disponível, seguro e durável que permite o desacoplamento de microsserviços, sistemas distribuídos e aplicativos sem servidor. O AmazonSNS oferece tópicos para um envio de mensagens do tipo “muitos para muitos”, com base em pushe alto throughput. 

O **Amazon SNS** gerencia a entrega de mensagens de forma assíncrona entre **publicadores** e **assinantes** por meio de **tópicos**.
Ele suporta vários endpoints, incluindo **Lambda, SQS, HTTP(S), e-mail, SMS** e **notificações push para dispositivos móveis**.


### Conceitos do desenvolvedor do AmazonSNS
**Principais chamadas de API do Amazon SNS**:

* **CreateTopic**: cria um tópico para publicar notificações; se já existir, retorna o ARN existente.
* **Subscribe**: prepara um endpoint para receber mensagens, enviando um **token de confirmação**; a assinatura só é completa com **ConfirmSubscription**.
* **ConfirmSubscription**: valida o token enviado ao endpoint e cria a assinatura, retornando o ARN.
* **DeleteTopic**: exclui um tópico e todas as assinaturas associadas, interrompendo futuras entregas.
* **Publish**: envia uma mensagem a todos os assinantes de um tópico; retorna um **ID de mensagem** e garante tentativa de entrega.

> OBS: O ARN (Amazon Resource Name) é um identificador único usado na AWS para identificar recursos de forma global.

> Filtrar politicas.

### Introdução ao AmazonMQ
- O Amazon MQ é um serviço gerenciado de agente de mensagens para o Apache ActiveMQ que facilitaa configuração e a operação de agentes de mensagens na nuvem. Os agentes de mensagem permitema comunicação e a troca de informações entre diferentes sistemas de software (geralmente, usando diferentes linguagens de programação em diferentes plataformas). O Amazon MQ facilita a migração de sistemas de mensagens para a nuvem e preserva as conexões existentes entre aplicativos. 

- O Amazon MQ é um serviço de agente de mensagens gerenciado que fornece compatibilidade com muitos agentes de mensagem populares. O Amazon SQS e o Amazon SNS são serviços de fila e tópico, respectivamente, altamente escaláveis, simples de usar e não exigem a configuração de agentes de mensagens.