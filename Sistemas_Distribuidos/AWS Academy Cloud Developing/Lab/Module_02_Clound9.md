Introdução ao AWS Cloud9
Visão geral

O AWS Cloud9 é um ambiente de desenvolvimento integrado (IDE) com base na web que contém uma coleção de ferramentas para codificar, criar, executar, testar, depurar e lançar software na nuvem. Neste laboratório, você abrirá um ambiente de desenvolvimento pré-configurado do AWS Cloud9 e criará um programa Hello World em Node.js, Python ou Ruby.

Objetivos

Depois de concluir este laboratório, você será capaz de:

Usar o ambiente de desenvolvimento do AWS Cloud9 para criar, editar e executar arquivos de código.
Duração

O laboratório levará aproximadamente 30 minutos para ser concluído.


Como acessar o Console de Gerenciamento da AWS
Na parte superior destas instruções, clique em Start Lab para iniciar o laboratório.
Um painel Iniciar laboratório é aberto exibindo o status do laboratório.

Aguarde até a mensagem "Status do laboratório: pronto" ser exibida e clique no X para fechar o painel Iniciar laboratório.
Na parte superior das instruções, clique em AWS
O Console de Gerenciamento da AWS será aberto em uma nova guia do navegador. O sistema fará o seu login automaticamente.

DICA: se uma nova guia do navegador não abrir, normalmente um banner ou um ícone na parte superior do navegador indicará que o navegador está impedindo que o site abra janelas pop-up. Clique no banner ou no ícone e escolha "Permitir pop-ups".
Organize a guia do Console de Gerenciamento da AWS para que ela seja exibida com estas instruções. Em um cenário ideal, você poderá ver as duas guias do navegador ao mesmo tempo, o que facilita o acompanhamento das etapas do laboratório.

Tarefa 1: Conectar-se e preparar seu ambiente de desenvolvimento do AWS Cloud9
Um ambiente do AWS Cloud9 foi criado para você usar neste laboratório. O ambiente de desenvolvimento integrado (IDE) do AWS Cloud9 fornece um console para trabalho e um sistema de arquivos para uso.

Uma instância Amazon Elastic Compute Cloud (Amazon EC2) é a peça fundamental desse ambiente do AWS Cloud9. No entanto, esse sistema subjacente fica oculto atrás do console do AWS Cloud9. Dessa forma, você pode se concentrar na interação com seu código e linha de comando e com os respectivos recursos da AWS, como o Amazon Simple Storage Service (Amazon S3).

Para se conectar ao ambiente de desenvolvimento do AWS Cloud9:

No Console de Gerenciamento da AWS, na lista Serviços, escolha Cloud9.
Para abrir o ambiente do AWS Cloud9 fornecido, escolha Abrir IDE.
Para baixar para o sistema de arquivos do AWS Cloud9, acesse o terminal bash do AWS Cloud9 (na parte inferior da página) e execute o seguinte comando wget:
wget https://aws-tc-largeobjects.s3-us-west-2.amazonaws.com/DEV-ILT-TF-200-ACCDEV-1/lab-1-cloud9.zip -P /home/ec2-user/environment
Para descompactar o arquivo lab-1-cloud9.zip, execute o seguinte comando:
unzip lab-1-cloud9.zip
Esse processo pode levar alguns minutos.

Para limpar seu ambiente, execute os seguintes comandos para remover os arquivos.zip e README:
rm *.zip
rm README.md
Tarefa 2: Explorar o ambiente de desenvolvimento do AWS Cloud9
Reserve alguns minutos para explorar o ambiente de desenvolvimento do AWS Cloud9 antes de ir para a próxima etapa.
Observe que o sistema de arquivos do AWS Cloud9 (no lado esquerdo do IDE) contém as seguintes pastas sob a pasta raiz cloud9-start:

Node_8.10.0
Python_3.6.8
Ruby_2.6.0
Você não precisa fazer nada com essas pastas no momento. Por enquanto, lembre-se de que elas estão disponíveis.

Para ver o nome completo do caminho de seu diretório de trabalho atual, no terminal do AWS Cloud9, execute o seguinte comando print working directory:
pwd
O seguinte resultado será exibido:

/home/ec2-user/environment
Para verificar se você pode acessar seus recursos da AWS a partir do AWS Cloud9, execute o seguinte comando no terminal do AWS Cloud9:
aws s3 ls
Você deve ver uma lista dos buckets do S3, semelhante a este exemplo:



Parabéns! Você concluiu esta tarefa. Agora você sabe como emitir solicitações de linha de comando e interagir com recursos da AWS no terminal do AWS Cloud9.

Tarefa 3: Criar um arquivo de texto
Nesta tarefa, você criará um arquivo de texto e usará o editor do AWS Cloud9 para adicionar texto a ele.

No menu Arquivo, escolha Novo arquivo.
No menu Arquivo, escolha Salvar como.
Na caixa Nome de arquivo, insira hello_world.txt.
Escolha Salvar.
Você deve ver o novo arquivo criado no sistema de arquivos do AWS Cloud9.

Se ainda não estiver aberto, clique duas vezes no novo arquivo hello_world.txt para abri-lo.
Adicione o texto de exemplo a seguir ao arquivo: Hello world!.
Salve o arquivo.
Parabéns! Você concluiu esta tarefa. Agora você sabe como criar e editar arquivos no AWS Cloud9.

Tarefa 4: Executar o código da solução que exibe Hello World!
Na maioria dos laboratórios do curso Desenvolvimento de nuvem da AWS Academy, você pode escolher uma linguagem de programação para trabalhar. Esses laboratórios estão disponíveis em Node.js (versão 8.10.0), Python (versão 3.6.8) e Ruby (versão 2.6.0).

Escolha a linguagem que você usará.
Lembre-se das três pastas no sistema de arquivos do AWS Cloud9 que você viu anteriormente.

Na janela Ambiente, selecione a pasta da linguagem que você usará para expandi-la.
Agora você deve ver um arquivo helloworld e uma pasta de solução.

Selecione a pasta da solução para expandi-la e clique duas vezes no arquivo helloworld que está dentro dessa pasta.
Você deve ter acabado de abrir a versão da solução do arquivo helloworld.

Reserve alguns minutos para ler o código no arquivo helloworld para entender o que o código fará.
Quando o código for executado, ele imprimirá hello <seunome>.

Agora, você executará o arquivo helloworld da solução.

Para definir o caminho do terminal do AWS Cloud9 para a pasta de sua linguagem preferida, no comando a seguir, substitua os caracteres <FMI> (que representam <Fill Me In>) pelo nome da pasta de sua linguagem e execute o comando:
cd <FMI>
DICA: suas opções para a pasta de linguagem são: node_8.10.0, python_3.6.8 e ruby_2.6.0

Por exemplo, se você optar por usar Node.js, defina o caminho do terminal para a pasta Node.js executando o seguinte comando:

cd node_8.10.0
Agora, você executará o arquivo da solução.

Cada linguagem tem sua própria maneira de ser executada. No terminal do AWS Cloud9, você deve usar run command da respectiva linguagem para executar o arquivo da solução helloworld.

No terminal do AWS Cloud9, execute o arquivo da solução usando run command da linguagem escolhida, que está na seguinte tabela:
DICA: run command requer que você passe uma variável, ou seja, seu nome. Certifique-se de substituir <FMI> pelo seu nome.

Linguagem	Comando
Node_8.10.0	node solution/helloworld.js <FMI>
Python_3.6.8	python3 solution/helloworld.py <FMI>
Ruby_2.6.0	ruby solution/helloworld.rb <FMI>
OBSERVAÇÃO: como você está executando a versão da solução do arquivo (e não o seu próprio código), deve usar o caminho completo da sua pasta.

Por exemplo, se você estiver usando Node.js e seu nome for Alex, você já estará no caminho node_8.10.0. Você executaria um comando como o da tabela acima no terminal do AWS Cloud9:

node solution/helloworld.js Alex
Você verá uma saída semelhante a este exemplo:



Parabéns! Você concluiu esta tarefa. Agora você sabe como executar um arquivo em sua linguagem de codificação preferencial visando os arquivos do seu sistema de arquivos e também pode passar uma variável para o programa em tempo de execução.

Desafio: Seja multilíngue!
Tente executar o arquivo helloworld da solução a partir de outro arquivo de solução de código. Você verá que, embora a sintaxe das linguagens seja diferente, os conceitos são semelhantes.

Por exemplo, se você acabou de executar o arquivo da solução para Node.js, tente executar o arquivo da solução para Ruby ou Python. Certifique-se de navegar até a pasta de linguagem correta dentro da pasta do ambiente e substitua <FMI> pelo seu nome, como no seguinte exemplo:

ruby ~/environment/ruby_2.6.0/solution/helloworld.rb <FMI>
Tarefa 5: Editar e executar o arquivo de código helloworld
Nesta tarefa, você usará o editor do AWS Cloud9 para editar um arquivo de código para exibir o texto Hello World!

Primeiro, feche as guias de código da solução helloworld que foram abertas na tarefa anterior.
Clique duas vezes no novo arquivo helloworld que está na respectiva pasta de código para abri-lo. (OBSERVAÇÃO: não abra o arquivo helloworld que está na pasta da solução desta vez.)
Leia o conteúdo desse arquivo.
Você notará algumas diferenças entre esse arquivo e o arquivo da solução que você analisou e executou antes.

Você verá <FMI>s no código.

Faça o possível para substituir a seção <FMI> pelo código ausente.
DICA: se você não conseguir concluir esta etapa, consulte o respectivo código da solução helloworld executado pela última vez. Você pode simplesmente copiar o código da solução e colá-lo no código da tarefa e, em seguida, executá-lo.

Depois de modificar o código dentro do arquivo helloworld, salve as alterações.
Navegue até a pasta correta da linguagem que você escolheu. Para fazer isso, no comando a seguir, substitua <FMI> pela linguagem escolhida e execute o comando no terminal do AWS Cloud9:
cd ~/environment/<FMI>
Por exemplo, se você quiser usar Node.js, execute o seguinte comando:

cd ~/environment/node_8.10.0
No terminal do AWS Cloud9, execute o arquivo helloworld recém-editado usando run command da linguagem escolhida, que está na tabela a seguir. Substitua <FMI> pelo seu nome.
Linguagem	Comando
Node_8.10.0	node helloworld.js <FMI>
Python_3.6.8	python3 helloworld.py <FMI>
Ruby_2.6.0	ruby helloworld.rb <FMI>
Confirmar se o código funciona
Verifique se você obtém o mesmo resultado de quando executou o código da solução.
Você deve ver uma saída um pouco semelhante à imagem abaixo:



Parabéns! Você concluiu esta tarefa e também o primeiro laboratório. Você editou arquivos de código, substituiu seções <FMI> no terminal e no código, fez referência a arquivos de solução (se necessário), navegou até os arquivos que queria executar, executou um arquivo na linguagem de sua escolha e observou as saídas.