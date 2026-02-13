## Desenvolvimento de soluções de armazenamento com o AmazonSimpleStorageService (AmazonS3)
### Introdução ao Amazon S3
- O Amazon Simple Storage Service (Amazon S3) é um serviço de armazenamento de objetos que oferece escalabilidade líder do setor, disponibilidade de dados, segurança e performance. Isso significa que clientes de todos os tamanhos e setores podem usá-lo para armazenar qualquer volume de dados em uma grande variedade de casos de uso, como sites, aplicativos para dispositivos móveis, backup e restauração, arquivamento, aplicativos empresariais, dispositivos IoT e análises de big data. 

- Há muitos casos de uso para o AmazonS3, como armazenamento e distribuição de conteúdo, backup e restauração, arquivamento.

**Bucket:**
É o contêiner onde os arquivos são armazenados no Amazon S3.
Também organiza os dados e controla acesso e cobrança.

**Objeto:**
É o arquivo armazenado no S3 (foto, vídeo, texto, etc.).
Possui dados e metadados que descrevem o arquivo.

**Chave (Key):**
É o nome único que identifica um objeto dentro do bucket.
Permite localizar e acessar o arquivo.

> Obs: Um contêiner é como uma caixa ou pasta que serve para guardar coisas dentro.


### Criação de buckets do Amazon S3
- Ao criar um bucket no Amazon S3, você deve escolher um nome único no mundo, seguindo regras como ter entre 3 e 63 caracteres, usar apenas letras minúsculas, números e hífen, e evitar pontos para não causar problemas com HTTPS.
- globalmente exclusivo.
- O Amazon S3 cria buckets na região que você especifica. É possível escolher uma região para otimizar a latência, minimizar os custos ou atender a requisitos regulatórios

- Você pode acessar um bucket pelo console ou por URL, usando estilo de caminho (bucket no caminho do link) ou estilo hospedado virtual (bucket no domínio), sendo este último mais simples e ideal para hospedar sites estáticos no S3.

No Amazon S3 não existem pastas reais, apenas buckets e objetos, mas é possível simular pastas usando prefixos no nome dos arquivos.
Assim, objetos com o mesmo início de nome aparecem organizados como pastas, facilitando a organização e a busca.


### Trabalho com objetos do Amazon S3•
- Um objeto é um arquivo armazenado no S3 e possui uma chave (nome único) que o identifica dentro do bucket.
Essa chave usa UTF-8, pode ter até 1024 bytes e pode incluir letras, números, símbolos e prefixos para organizar arquivos.

- Os objetos consistem em metadadose dados de objeto. Metadadosde objeto são um conjunto de pares de chave/valor que fornece informações adicionais sobre o objeto.Há dois tipos de metadadosde o


Metadados do sistema: Gerenciados automaticamente pelo Amazon S3, descrevem características do objeto como tamanho, data de criação e versão, e alguns podem ser ajustados (armazenamento, criptografia).

Metadados definidos pelo usuário: Informações personalizadas adicionadas no upload ou depois, armazenadas junto ao objeto e que obrigatoriamente devem começar com x-amz-meta-.


> A operação **PUT** Object permite que você adicione um objeto a um bucket do S3. 

> Você usa a operação **GET** Object para recuperar objetos do Amazon S3.

> Você pode usar a operação **SELECT** ObjectContentpara filtrar o conteúdo de um objeto do AmazonS3 com base em uma instrução simples de StructuredQuery Language

> Com a operação DELETE Object, você pode excluir um único objeto ou vários objetos.

### Proteção de dados e gerenciamento de acesso aos recursos do Amazon S3
- A proteção de dados protege os dados em trânsito(à medida que são transferidos para e do AmazonS3) e em repouso (enquanto estão armazenados em discos em datacenters do AmazonS3). 

- Para proteger dados armazenados no Amazon S3, você pode usar:

Criptografia no lado do cliente: Você criptografa os dados antes de enviá-los ao S3 e gerencia as chaves.

Criptografia no lado do servidor: O S3 criptografa e descriptografa automaticamente, podendo usar chaves da própria AWS (SSE-S3), do AWS KMS (SSE-KMS) ou fornecidas por você (SSE-C).


> Você pode gerenciar o acesso aos recursos do Amazon S3 escrevendo políticas de acesso que concedam a outras pessoas permissão para executar as operações dos recursos.

> Uso: O Secure Sockets Layer (SSL) é um protocolo de segurança que, juntamente com seu sucessor, o Transport Layer Security (TLS), proporciona privacidade, autenticação e integridade às comunicações na internet

Há dois tipos de políticas de acesso:•Políticas baseadas em identidade –Você anexa essas políticas a usuários, grupos e funções do AWS Identity and Access Management (IAM) na sua conta para conceder acesso aos recursos da AWS.•Políticas baseadas em recursos–Você anexa essas políticas aos recursos do Amazon S3. As políticas de bucket e as ACLs são políticas baseadas em recursos.


- As **ACLs** são uma das opções da política de acesso baseada em recurso que podem ser usadas para gerenciar o acesso aos buckets e objetos. Use as ACLs para conceder permissões básicas de leitura/gravação a outras contas da AWS.

- Uma política de bucket é outro tipo de políticado IAM baseada em recursos. Você pode adicionar uma política de buckets a um bucket do S3 para conceder permissões ao bucket e aos objetos contidos nele a outras contas da AWS ou usuários do IAM.

- Por padrão, todos os objetos e buckets são privados. 

> CROS:
- Às vezes, os sites precisam carregar recursos de outros lugares. O Cross-OriginResourceSharing(CORS –Compartilhamento de recursos de origem cruzada) define uma maneira de os aplicativosWeb clientes carregados em um domínio interagirem com recursos em outro domínio.

- CORS permite que um site em um domínio acesse recursos de outro domínio, como arquivos em um bucket do Amazon S3.
No S3, você configura regras de CORS para definir quais origens e métodos HTTP podem acessar seus recursos.