- Sincronização:

1.  DynamoDB - estrelinha e abre
2.  Tables \> Create Table
3.  Coloca nome (ex: `pontuação`)
4.  id (chave de partição)
5.  cria a table
6.  carrega a table e clica nela depois que carregar
7.  explore itens
8.  create item
9.  adiciona os atributos (obs: não importa os atributos, da certo se o id 1 for tudo string já no id 2 tem coisa tipo booleano)
10. // Função Lambda:
11. abrir o serviço lambda
12. ir em create function
13. coloca nome (ex: `pontuacao-crud`)
14. deixa em node.js 22.x (deixa)
15. x86\_64 (deixa)
16. clica em change default execution role
17. use an existing role
18. labRole (ou a role que você estiver usando, ex: LabRole)
19. create function
20. dismiss
21. (Contexto: "crud lambda dynamo api aws" / Link: `https://docs.aws.amazon.com/pt_br/apigateway/latest/developerguide/http-api-dynamo-db.html`)
22. Copie o código (da etapa 2 do link, ou o abaixo) e cole no `index.mjs`. Altere para API Rest:
    ```javascript
    import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
    import {
      DynamoDBDocumentClient,
      ScanCommand,
      PutCommand,
      GetCommand,
      DeleteCommand,
      UpdateCommand,
    } from "@aws-sdk/lib-dynamodb";

    const client = new DynamoDBClient({});
    const dynamo = DynamoDBDocumentClient.from(client);

    // Altere para o nome da sua tabela
    const tableName = "Pontuacao"; 

    export const handler = async (event) => {
      let body;
      let statusCode = 200;

      const headers = {
        "Content-Type": "application/json",
      };

      try {
        const method = event.httpMethod;
        const path = event.path;
        const pathParams = event.pathParameters;
        const queryParams = event.queryStringParameters;

        switch (method) {
          // 🔹 Listar todos os itens
          case "GET":
            if (pathParams && pathParams.id) {
              // GET /items/{id}
              const result = await dynamo.send(
                new GetCommand({
                  TableName: tableName,
                  Key: { id: pathParams.id },
                })
              );
              body = result.Item || {};
            } else {
              // GET /items
              const result = await dynamo.send(
                new ScanCommand({ TableName: tableName })
              );
              body = result.Items;
            }
            break;

          // 🔹 Criar novo item
          case "POST":
            const requestJSON = JSON.parse(event.body);
            // Altere os campos obrigatórios e o Item
            if (!requestJSON.id || !requestJSON.naome || !requestJSON.pontuacao) {
              throw new Error("Campos obrigatórios: id, name, pontuacao");
            }
            await dynamo.send(
              new PutCommand({
                TableName: tableName,
                Item: {
                  id: requestJSON.id,
                  nome: requestJSON.name,
                  pontuacao: requestJSON.pontuacao,
                }
              })
            );
            body = { message: `Item ${requestJSON.id} criado com sucesso!` };
            break;

          // 🔹 Atualizar item existente
          case "PUT":
            if (!pathParams || !pathParams.id) {
              throw new Error("O ID do item é obrigatório para atualização");
            }
            const updateData = JSON.parse(event.body);
             // Altere os campos de atualização
            await dynamo.send(
              new UpdateCommand({
                TableName: tableName,
                Key: { id: pathParams.id },
                UpdateExpression: "set #n = :n, price = :p",
                ExpressionAttributeNames: { "#n": "name" },
                ExpressionAttributeValues: {
                  ":n": updateData.name,
                  ":p": updateData.price,
                },
                ReturnValues: "ALL_NEW",
              })
            );
            body = { message: `Item ${pathParams.id} atualizado com sucesso!` };
            break;

          // 🔹 Excluir item
          case "DELETE":
            if (!pathParams || !pathParams.id) {
              throw new Error("O ID do item é obrigatório para exclusão");
            }
            await dynamo.send(
              new DeleteCommand({
                TableName: tableName,
                Key: { id: pathParams.id },
              })
            );
            body = { message: `Item ${pathParams.id} excluído com sucesso!` };
            break;

          default:
            throw new Error(`Método não suportado: ${method}`);
        }
      } catch (err) {
        statusCode = 400;
        body = { error: err.message };
      }

      return {
        statusCode,
        headers,
        body: JSON.stringify(body),
      };
    };
    ```
23. *OBS: foi modificado os parâmetro no POST e o nome de `tableName`. Lembre-se de mudar os itens no código para os que você usa.*
24. depois realiza o deploy
25. // Teste da Lambda
26. depois vai em Test (ou vai para a aba de teste acima)
27. coloca o nome no teste
28. seleciona o template: API gateway AWS proxy
29. altera o `resource` para `/items`
30. altera o `httpMethod` para `GET`
31. // API GATEWAY
32. seleciona o serviço API GATEWAY
33. create API
34. usa o REST API (clica em build)
35. coloca no nome e cria
36. create resource
37. resource name: `items`
38. habilita o CORS
39. create resource
40. create metodo
41. (No dropdown) seleciona `GET`
42. (Integration type) seleciona `lambda`
43. ativa o `lambda proxy integration`
44. seleciona a lambda criada (ex: `pontuacao-crud`)
45. create method
46. // Deploy da API
47. deploy API
48. (No popup) seleciona `[New Stage]`
49. stage name: `v1`
50. deploy
51. copia URL (Invoke URL) e colocar `/items` no final (ex: `URL_DA_API/v1/items`)