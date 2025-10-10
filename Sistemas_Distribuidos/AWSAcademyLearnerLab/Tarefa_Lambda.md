
### Guia Passo a Passo: Laboratório AWS com Amazon Q Developer

Este guia detalha todas as etapas para completar a atividade "Exploring Amazon Q Developer with AWS Lambda", criando uma função que valida e-mails com a ajuda de inteligência artificial.

-----

###  Tarefa 1: Configurando o Ambiente ⚙️

O objetivo aqui é criar o espaço de trabalho no AWS Lambda e garantir que o Amazon Q esteja pronto para uso.

1.  **Acesse o Console da AWS:** Faça login no seu AWS Academy Learner Lab e abra o Console de Gerenciamento da AWS.

2.  **Abra o Serviço Lambda:** Na barra de busca superior, digite `Lambda` e selecione o serviço.

3.  **Verifique a Região:** Certifique-se de que a região no canto superior direito está definida como **N. Virginia (us-east-1)**.

4.  **Crie a Função Lambda:**

      * Clique no botão **Create function** (Criar função).
      * Preencha os seguintes campos:
          * **Name** (Nome): `myFunction` (ou outro nome de sua preferência).
          * **Runtime** (Ambiente de execução): **Python 3.12**.
          * **Architecture** (Arquitetura): **x86\_64**.
          * **Permissions** (Permissões): Clique em **Change default execution role** (Alterar função de execução padrão).
          * Selecione **Use an existing role** (Usar uma função existente).
          * Em **Existing role**, escolha **LabRole**.
      * Clique em **Create function**.

5.  **Ative o Amazon Q:**

      * Após a função ser criada, feche o painel "Function overview" para ter mais espaço no editor de código.
      * Na parte inferior do editor, localize o link **Amazon Q**.
      * Verifique se há um **ícone de play (▶️)** ao lado dele. Isso indica que as sugestões automáticas estão ativas.
      * Se vir um ícone de pause (⏸️), clique no link e selecione **Resume auto-suggestions** (Retomar sugestões automáticas).

-----

###  Tarefa 2: Gerando e Testando Código com IA 🤖

Agora você usará o Amazon Q para escrever, entender e testar o código da sua função.

#### **2.1 - Gerando a Função de Validação**

1.  **Abra o arquivo:** No explorador de arquivos à esquerda, clique em `lambda_function.py`.

2.  **Escreva o Comentário-Comando:** Abaixo do código existente, em uma nova linha, digite o seguinte comentário em inglês:

    ```python
    # Function that validates an email address using regex
    ```

3.  **Aceite a Sugestão:** Espere um momento. O Amazon Q irá sugerir o código completo da função `validate_email`. Pressione a tecla **`Tab`** para aceitá-lo.

#### **2.2 - Entendendo o Código com o Chat**

1.  **Abra o Chat:** No canto superior direito da tela, clique no ícone do **Amazon Q** para abrir o painel de chat.
2.  **Faça uma Pergunta:** Copie a linha de código que começa com `regex =` da sua função.
3.  **Cole no Chat** e pergunte: `O que esta linha de código faz?`. O Q irá fornecer uma explicação detalhada da expressão regular.

#### **2.3 - Gerando a Função Principal (`lambda_handler`)**

1.  **Limpe o Código:** Feche o painel do chat. Apague o conteúdo padrão da função `lambda_handler` (o bloco `return` com "Hello from Lambda\!").

2.  **Escreva o Novo Comentário:** No lugar do código apagado, digite o seguinte comentário:

    ```python
    # Main function to test the email validation
    ```

3.  **Aceite as Sugestões:** O Amazon Q irá sugerir a nova lógica para a função `lambda_handler` em partes. Pressione **`Tab`** para aceitar cada sugestão até que a função esteja completa, com os blocos `if` e `else` para e-mails válidos e inválidos.

4.  **Verifique a Indentação:** Confira se o espaçamento de todas as linhas está correto, pois isso é crucial em Python.

#### **2.4 - Pedindo Ajuda para os Testes 💡**

1.  **Abra o Chat Novamente:** Clique no ícone do Amazon Q.
2.  **Peça um Exemplo de Teste:** No chat, cole a pergunta: `My Lambda code is pasted below. What would be good example JSON input in run a test event?`
3.  **Forneça o Contexto:** Logo abaixo da pergunta, **copie e cole todo o seu código Python** do editor.
4.  **Execute a Consulta:** O Q irá analisar seu código e fornecer exemplos de JSON para testar um e-mail válido e um inválido.

#### **2.5 - Executando os Testes**

1.  **Faça o Deploy:** No topo do editor, clique no botão **Deploy** para publicar seu código.

2.  **Crie o Teste de Sucesso ✅:**

      * Clique na aba **Test**.
      * Selecione **Create new event** (Criar novo evento).
      * **Event name** (Nome do evento): `TestEmail`
      * No campo **Event JSON**, apague o conteúdo padrão e cole o exemplo de **e-mail válido** sugerido pelo Q (ex: `{'email': 'user@example.com'}`).
      * Clique em **Save** (Salvar) e depois em **Test**. O resultado deve mostrar que o e-mail é válido.

3.  **Crie o Teste de Falha ❌:**

      * Clique no ícone de `+` para criar outro evento de teste.
      * **Event name**: `TestImproperFormat`
      * No campo **Event JSON**, cole o exemplo de **e-mail inválido** (ex: `{'email': 'testexample.com'}`).
      * Clique em **Save** e depois execute o **Test** com este novo evento. O resultado deve mostrar que o e-mail é inválido.

-----

> O que o Lambda 
- O AWS Lambda é um serviço que permite executar seu código sob demanda sem precisar gerenciar servidores, pagando apenas pelo tempo exato de computação que você usa.