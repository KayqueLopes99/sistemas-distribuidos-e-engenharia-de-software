## Desenvolvimento de soluções orientadas por eventos com o AWS Lambda
### Introdução à computação sem servidor com o AWS Lambda
* **Abstrai totalmente a infraestrutura**: não é necessário gerenciar instâncias, sistemas operacionais ou servidores.
* Permite focar **somente no código** do aplicativo, enquanto a AWS gerencia execução, escalabilidade e alta disponibilidade.
* **Elimina tarefas operacionais**, como provisionamento de servidores, manutenção do SO, aplicação de patches e ajuste de capacidade.
* **Execução sob demanda**: você paga apenas quando o código está sendo executado, reduzindo custos e aumentando agilidade para testes e inovação.

O AWS Lambda é o serviço de computação sem servidor.AWS Lambda:•Permite que você execute código sem provisionar ou gerenciar servidores•Aciona seu código em resposta a eventos que você configura•Escala automaticamente com base na demanda•Incorpora monitoramento e registro em log integrados com o AmazonCloudWatch


> Permite que você traga seu próprio código

> Integra-se a outros serviços da AWS

> uso em Aplicativosweb e Back-ends.


### Visão geral de como o AWS Lambda funciona
- As funções do Lambda e as fontes de eventos são os componentes principais do AWS Lambda. Uma fonte de evento é a entidade que publica eventos no AWS Lambda, e uma função do Lambda é o código personalizado que você fornece que processa os eventos. O AWS Lambda executa a função do Lambda em seu nome.

- Ao criar uma função, você define as permissões para esta função e especifica quais eventos a acionam

### Modelos de execução para invocar funções do Lambda

O **AWS Lambda** pode ser acionado por eventos usando dois modelos:

* **Push**: a **fonte do evento invoca diretamente** a função Lambda quando o evento ocorre.
* **Pull (sondagem)**: a **fonte coloca informações em uma fila ou fluxo**, e o Lambda **sonda a fila** e executa a função ao detectar eventos.


### Permissões do AWS Lambda
O **AWS Lambda** usa dois tipos de permissões gerenciadas pelo **IAM**:

* **Permissões de invocação**: permitem que fontes de eventos acionem a função Lambda.
* **Permissões de execução**: permitem que a função Lambda interaja com outros serviços e recursos da AWS.

### Visão geral da criação e configuração de funções do Lambda
- Criando uma função Lambda

1. **Pacote de implantação**:

   * Crie um arquivo `.zip` ou `.jar` com **seu código e dependências**.
   * Permite usar **qualquer linguagem suportada** ou um **runtime personalizado**.

2. **Tempos de execução suportados**:

   * Node.js, Python, Ruby, Java, Go, .NET.
   * É possível **alterar o runtime** ao atualizar a função.

3. **Manipulador da função**:

   * Ponto de entrada chamado pelo Lambda.
   * Recebe **dois objetos principais**:

     * **Evento**: contém informações sobre o evento que acionou a função (ex.: dados de API Gateway, S3, SQS, ou objeto customizado).
     * **Contexto**: fornece informações sobre a execução da função, como tempo restante e metadados da execução.

4. **Flexibilidade**:

   * Você pode usar o **IDE e a linguagem** de sua preferência.
   * O evento pode ser um **objeto JSON, POJO ou outro formato serializável**, dependendo da origem do evento.

### Visão geral da implantação de funções do Lambda
1. Versionamento

Cada função Lambda possui inicialmente a versão $LATEST.

Publicar uma nova versão cria um snapshot imutável da $LATEST com ARN exclusivo e número sequencial.

Permite trabalhar com diferentes ambientes: desenvolvimento, beta, produção.