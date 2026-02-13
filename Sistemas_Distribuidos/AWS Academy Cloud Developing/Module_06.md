## Introdução ao armazenamento em cache com o AmazonCloudFronte o AmazonElastiCache
### Visão geral do armazenamento em cache
- Na computação, um cache é uma camada de armazenamento físico de dados de alta velocidade. O objetivo principal de um cache é aumentar a performance da recuperação de dados reduzindo a necessidade de acessar a camada de armazenamento mais lenta subjacente.

Os caches podem ser aplicados e usados em várias camadas de tecnologia para:

- Acelere a recuperação de conteúdo da webno lado do cliente usando cabeçalhos cache-controldo HTTP.

- Resolver nomes de domínio para endereços IP usando o AmazonRoute53.

- Considere: Velocidadee Custo; Padrão de dados e acesso; Desatualização; 


### Armazenamento em cache com o AmazonCloudFront
- Uma rede de entrega de conteúdo (CDN) é um sistema distribuído globalmente de servidores de armazenamento em cache. Uma CDN armazena em cache cópias de arquivos normalmente solicitados (conteúdo estático, como HTML, CSS, JavaScript e arquivos de imagem) que são hospedados no servidor de origem do aplicativo. A CDN entrega uma cópia local do conteúdo solicitado de uma borda de cache ou Point of Presence (PoP -Ponto de presença) que fornece a entrega mais rápida para o solicitante.

> Em vez de percorrer o caminho todo novamente a solictações é acelerada pela guarda cache. 

- O Amazon CloudFront é uma CDN que entrega dados, vídeos, aplicativos e Application Programming Interfaces a clientes mundialmente, com segurança e altas velocidades de transferência em um ambiente fácil para o desenvolvedor. 

- Rede global e rápida de entrega de conteúdo
- Otimizadas para performance e escala
- Recursos de segurança integrados
- Profundamente integrado com os serviços da AWS
- Altamente programável

- Ao usar o CloudFront para distribuir seu conteúdo, você cria uma distribuiçãopara informar ao CloudFront de onde deseja que o conteúdo seja entregue (ou seja, de quais servidores de origem obter seus arquivos) e os detalhes sobre como monitorar e gerenciar a entrega de conteúdo. Em seguida, o CloudFront usa os servidores de ponto que estão próximos de seus visualizadores para entregar esse conteúdo rapidamente quando alguém desejar vê-lo ou usá-lo.

Você pode controlar o tempo de permanência dos arquivos em um cache do CloudFront antes de o CloudFront encaminhar outra solicitação para sua origem. 


O Amazon S3 Transfer Acceleration possibilita transferências de arquivos rápidas, fáceis e seguras em longas distâncias entre o seu cliente e um bucket do S3. O Transfer Acceleration aproveita os pontos de presença distribuídos globalmente do Amazon CloudFront. Conforme os dados chegam em um ponto de presença, eles são roteados para o Amazon S3 por um caminho de rede otimizado.

### Armazenamento em cache com o AmazonElastiCache
- O Amazon ElastiCache é um repositório de chaves/valores na memóriaentre o aplicativo e o armazenamento de dados (banco de dados) que ele acessa. O objetivo principal de um armazenamento de chaves/valores na memória é fornecer acesso ultrarrápido (latência inferior a milissegundos) e de baixo custo a cópias de dados. 

-  web service que facilita implantar, operar e ajustar a escala de um datastore ou cache na memória na nuvem.

- Conceitos:

- **Nó:** Menor componente de uma implantação; bloco de RAM seguro e conectado à rede;
- **Cluster:** Agrupamento lógico de um ou mais nós.  
- **Endpoint:** Endereço exclusivo usado pelo aplicativo para se conectar a um nó ou cluster.  
- **Fragmento (Shard):** Agrupamento de 1 a 6 nós Redis relacionados.  
- **Grupo de replicação:** Conjunto de fragmentos do Redis, com um nó primário de leitura/gravação e até cinco nós secundários somente leitura.

- Um cache é um componente que armazena dados para que futuras solicitações para esses dados possam ser atendidas mais rapidamente. Um acerto de cache ocorrequando as informações solicitadas estão no cache e são atuais. Um erro de cacheocorre quando o cache não contém as informações solicitadas ou as informações expiram.

- Uma estratégia é sempre aplicar um tempo de vida (TTL) a todas as chaves de cache.

### Estratégias de armazenamento em cache
## 1. Carregamento por Demanda (Lazy Loading)
- Atualiza o cache somente quando necessário (cache miss).  
- Ideal para dados lidos com frequência, mas pouco atualizados.  

## 2. Gravação Direta (Write-Through)
- Adiciona ou atualiza dados no cache sempre que são gravados no banco de dados.  
- Ideal para dados que precisam de atualização em tempo real.  
- Evita erros de cache desatualizado para dados acessados frequentemente.  
