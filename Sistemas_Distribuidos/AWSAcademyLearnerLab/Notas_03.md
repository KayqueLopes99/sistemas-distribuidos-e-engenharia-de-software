## Leanner Lab aws - Como acessar o Learner Lab
- Para acessar o AWS Academy Learner Lab, siga estes passos:
- Modules.
- Learner Lab.
- README: Inntruções de como acessar o Learner Lab. Esta contém informações importantes sobre o laboratório. Navegação, serviços disponíveis, regras, etc.
- Start Lab.
- AWS.
- Duração da sessão: 4 horas.
- Quando a sessão expirar, você será desconectado automaticamente. Salve seu trabalho com frequência.

- Use o link reset se quiser redefinir ou limpar sua conta da aws. Ela não redefinirá seu orçamento. Excuira tudo o que vc criou na conta aws.

- End lab.
- termina as instâncias mas não deleta os recursos.
- Interrope as instâncias mas não deleta os recursos.

- Limite de orçamento: $50 USD.
- Monitore seus gastos para não exceder o limite de $50 USD.

> Dashboard: 
- Visão geral do seu laboratório.
- Status do laboratório.
- Serviços disponíveis.
- Links úteis.


## Dicas gerais para solução de problemas
- Use um navegador compatível (Chrome, Firefox, Edge).
- Permita aplicações de terceiros e cookies.

> Cores no learner lab:
- Verde: Tudo está funcionando bem e está tudo pronto.
- Amarelo: Processando.
- Vermelho: Desativado.

> Orçamento disponível.

> Tempo restante da sessão.

> Aws details: 
- Baixar o arquivo PEM e outras informações do ssh.
- PEM: arquivo de chave privada para acessar instâncias EC2 via SSH.
- PEM é um arquivo de chave privada usado para autenticação segura ao acessar instâncias EC2 na AWS. 
- SSH: É um protocolo de rede que permite a comunicação segura entre dois computadores.

> Reset: 
- redefini todas as configurações do console.

> Botão de tela cheia.

* **AWS VERDE**: precione para abrir o console da AWS em uma nova aba.

* Na lateral a informações do arquivo readme do laboratorio.
- Ex: accessing EC2 instances, como preservar seu orçamento e como acessar o ssh.

> Se quiser calcular orçamento:
- AWS Pricing Calculator: https://calculator.aws/#/
- Aqui você pode estimar os custos dos serviços da AWS que planeja usar.
- Informe os serviços, a quantidade de uso e a região para obter uma estimativa precisa.

> Baixar o arquivo PEM: 
- Clique em "AWS Details" no painel do laboratório.
- Clique em "Download PEM File" para baixar o arquivo de chave privada.
- Salve o arquivo em um local seguro no seu computador.

> Sempre desligue ou termine suas instâncias EC2 quando não estiverem em uso para evitar custos desnecessários.

- Encerre o laboratório quando terminar para liberar recursos.

## Como iniciar serviços por meio do console da AWS
-  Caixa de pesquisa: Digite o nome do serviço que deseja usar (ex: EC2, S3, RDS).
- Favoritos: Adicione serviços que você usa com frequência à sua lista de favoritos para acesso rápido.
- Ex: EC2.
- Verifique se o console está gerenciando recursos da região do norte da Virgínia (us-east-1) para evitar custos adicionais.

> Para criar uma instância EC2:
- No console da AWS, vá para o serviço EC2.
- Clique em "Launch Instance".
- Siga as etapas do assistente para configurar sua instância (escolha a AMI, tipo de instância, configurações de rede, etc.).
- Revise e lance a instância.

- Acesse sua instância via SSH usando o arquivo PEM baixado anteriormente.

- Instance state: Iniciado, Parado, Terminada.
