## Desenvolvimento de soluções NoSQL flexíveis com o AmazonDynamoDB

### Introdução ao AmazonDynamoDB
- Os dados não estruturados podem ser armazenados em um banco de dados NoSQL não relacional, como o Amazon DynamoDB. O Amazon DynamoDB é um serviço de banco de dados não relacional rápido e flexível para todos os aplicativosque precisam de latência consistente de até nove milissegundos em qualquer escala. O serviço é um banco de dados em nuvem gerenciado e é compatível com os modelos de armazenamento de documentos e chave-valor.

- Controle de acesso detalhado; Flexivel; Totalmente gerenciado;Performance rápida e consistente;

- Ele é ideal para aplicativos web sem servidor, microsserviços, mobile, jogos, IoT e grandes plataformas, como a Duolingo, que usa o DynamoDB para armazenar bilhões de registros.


### Principais conceitos do AmazonDynamoDB
> Componentes básicos do Amazon DynamoDB

- **Tabelas**  
  O DynamoDB armazena dados em tabelas, que contêm itens e seus atributos.

- **Itens (Items)**  
  Cada tabela possui zero ou mais itens.  
  Um item é um conjunto de atributos que representa um registro único.

- **Atributos**  
  São os dados que compõem um item.  
  Representam a menor unidade de informação.

- **Chave primária**  
  Identifica exclusivamente cada item da tabela.  
  Dois itens não podem ter a mesma chave primária.

O DynamoDB suporta **dois tipos de chave primária**:

* **Chave primária simples**: possui apenas a **chave de partição**, que identifica exclusivamente cada item (ex.: `SensorId` na tabela *SensorLocation*).
* **Chave primária composta**: possui **chave de partição + chave de classificação**, permitindo vários itens com a mesma partição, desde que a classificação seja diferente (ex.: `SensorId` + `Time` na tabela *SensorReadings*), facilitando consultas por grupo e ordenação.

* **Chave de partição**: identifica e distribui os itens na tabela.
* **Chave de classificação**: organiza e diferencia itens com a mesma chave de partição.

> Tipos de Atributos no DynamoDB

- **Tipos escalares**: valores únicos como número, string (texto), binário, booleano (true/false) e nulo.  
- **Tipos de vários valores**: conjuntos de strings, conjuntos de números e conjuntos binários.  
- **Tipos de documento**: estruturas complexas como listas e mapas (chave-valor).


### Partições e distribuição de dados
- O DynamoDB divide os dados em partições, que são áreas de armazenamento distribuídas automaticamente e replicadas em várias zonas de disponibilidade.
Os itens são organizados usando a chave de partição (e, se existir, a chave de classificação), garantindo acesso rápido e dados ordenados dentro da partição.


### Índices secundários
- O Amazon DynamoDB fornece acesso rápido a itens em uma tabela, especificando valores de chave primária.

- Um índice secundáriopermite que você realize consultas em atributos que não fazem parte da chave primária da tabela. Um índice secundário permite consultar os dados na tabela usando uma chave alternativa, além de consultas com base na chave primária. 

### Throughputde leitura/gravação
O DynamoDB replica automaticamente os dados em várias zonas de disponibilidade dentro de uma região da AWS, garantindo que as informações fiquem altamente disponíveis e duráveis, mesmo em caso de falhas. Após uma gravação, as cópias dos dados normalmente ficam sincronizadas em até um segundo.

O serviço oferece dois tipos de leitura: **eventualmente consistente**, que pode retornar dados desatualizados logo após uma gravação, mas se atualiza em pouco tempo; e **fortemente consistente**, que sempre retorna os dados mais recentes confirmados. O usuário pode escolher qual tipo usar, lembrando que leituras fortemente consistentes não são suportadas em índices secundários globais.

Transações no Amazon DynamoDB

Permitem operações de tudo ou nada em vários itens e tabelas.

Garantem propriedades ACID (atomicidade, consistência, isolamento e durabilidade).

Ajudam a manter a integridade dos dados em aplicações.

Indicadas para: transações financeiras, pedidos, jogos multijogador e coordenação entre serviços.

### Streams e tabelas globais
- Streams do DynamoDB são um recurso que registra, em tempo quase real, todas as modificações feitas nos itens de uma tabela.

- **Fragmento (Shard) em Streams do DynamoDB**

* Um fragmento é um contêiner que armazena vários registros de stream e contém informações para acessar e percorrer esses registros.
* Os registros de stream dentro de um fragmento são mantidos temporariamente e removidos automaticamente após 24 horas.


- As tabelas globais fornecem uma solução totalmente gerenciada para a implantação de banco de dados com vários mestres em várias regiões e não exigem que você crie e mantenha sua própria solução de replicação. Quando criar uma tabela global, especifique as regiões da AWS em que deseja que sua tabela esteja disponível. O DynamoDBexecuta todas as tarefas necessárias para criar tabelas idênticas nessas regiões e propaga continuamente as alterações de dados para todas elas. 

> Por streams e atualizações simutaneas.

### Backup e restauração
* **Backups sob demanda:**
  Permitem criar cópias completas da tabela a qualquer momento, sem impacto em desempenho ou disponibilidade, com retenção ilimitada e sem consumir throughput.

* **Criação e restauração:**
  São rápidas, podem ser feitas pelo Console ou API, e a restauração costuma estar disponível em minutos.

* **Recuperação Point-in-Time (PITR):**
  Permite restaurar a tabela para qualquer momento dos últimos **35 dias**, protegendo contra exclusões ou gravações acidentais.

* **Funcionamento do PITR:**
  O DynamoDB mantém backups incrementais automaticamente, sem necessidade de agendamento manual.


### Operações básicas para tabelas do AmazonDynamoDB
> 1. Operações de controle
Permitem que você crie e gerencie tabelas do DynamoDB.  
Essas operações também permitem que você trabalhe com índices, fluxos e outros objetos que dependem de tabelas.

> 2. Operações de dados
Permitem executar ações de **criação, leitura, atualização e exclusão (CRUD)** em dados de uma tabela.  

> 3. Operações em lote
Permitem que você habilite ou desabilite um **stream** em uma tabela, além de permitir o acesso a registros de modificação de dados contidos em um stream.

> 4. Operações de transação
Simplificam a experiência do desenvolvedor ao fazer alterações de **tudo ou nada** em vários itens dentro e entre tabelas.


## 1. CreateTable
- **Função:** Cria uma nova tabela no DynamoDB.
- **Assíncrona:** Retorna imediatamente `TableStatus=CREATING`; só pode ler/escrever quando `TableStatus=ACTIVE`.
- **Índices secundários:** Podem ser definidos durante a criação.

## 2. PutItem
- **Função:** Cria um novo item ou substitui um item existente com a mesma chave primária.
- **Operações condicionais:** Pode adicionar apenas se o item não existir ou substituir somente se determinados atributos forem iguais.

## 3. UpdateItem
- **Função:** Atualiza atributos de um item existente ou adiciona um novo item se não existir.
- **O que pode fazer:** Adicionar, definir ou remover atributos.
- **Atualizações condicionais:** Só atualiza se os atributos tiverem valores esperados.


## 4. DeleteItem
- **Função:** Exclui um item usando sua chave primária.
- **Exclusão condicional:** Só deleta se o item atender a uma condição específica.

## 5. Expressões de condição (ConditionExpression)
- Aplicável a `PutItem`, `UpdateItem` e `DeleteItem`.
- Determina se a operação será executada com base em uma condição.
- **Exemplo:** Definir `accountLocked = N` na tabela `AccountStatus` somente se a última tentativa de login falha tiver ocorrido há mais de 24 horas.

## 6. GetItem
- **Função:** Recupera um item específico de uma tabela.
- **Requisitos:** Nome da tabela + chave primária completa (partição e classificação, se houver).
- **Opções:**  
  - Projeção: recuperar apenas determinados atributos.  
  - Consistência: leitura fortemente consistente ou eventualmente consistente (padrão).  

## 7. Query
- **Função:** Lê itens que correspondem à chave primária de uma tabela ou índice secundário.
- **Filtro adicional:** Pode usar uma expressão de filtro para refinar os resultados.
- **Requisito:** Nome da tabela ou índice secundário.

## 8. Scan
- **Função:** Lê **todos os itens** de uma tabela ou índice.
- **Filtro opcional:** Pode refinar os resultados usando uma expressão de filtro.
- **Aviso:** Operação pesada e menos eficiente que `Query`.  
- **Dica:** Prefira `Query` quando possível; use `Scan` em paralelo se necessário.

## 9. Operações em Lote
Permitem gravar, excluir ou substituir vários itens em **uma única solicitação**, aproveitando paralelismo e melhorando o throughput.

## 10. Operações Transacionais
Permitem que você execute várias leituras ou gravações como uma **única operação tudo ou nada**, útil para fluxos de trabalho complexos.

- **TransactWriteItems:** Operação em lote com múltiplas gravações (`PutItem`, `UpdateItem`, `DeleteItem`).  
  - Pode verificar **condições de pré-requisito** antes da execução.  
- **TransactGetItems:** Operação em lote com múltiplas leituras (`GetItem`).  
  - Cancelada se tentar ler um item que está em uma transação de gravação ativa.
- **Regra geral:** Se qualquer operação na transação falhar, **toda a transação falha**.  












