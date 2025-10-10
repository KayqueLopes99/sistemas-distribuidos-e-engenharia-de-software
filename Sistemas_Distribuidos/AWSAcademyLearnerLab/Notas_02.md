## AWS Academy Learner Lab Conformidade e Segurança (REGARS)

> Objetivos:
* Ao final deste módulo, você será capaz de:
- Identificar as características e regras do AWS Academy Learner Lab.

- Entender o que é o Modelo de Responsabilidade Compartilhada da AWS (quem é responsável pelo quê: você ou a AWS).

- Conhecer algumas das melhores práticas de segurança da AWS.

- Aplicar essas boas práticas de segurança e conformidade especificamente no seu laboratório.

- Saber onde encontrar mais recursos e informações sobre segurança na AWS.



### Section 1: AWS Academy Learner Lab overview
- Esta seção explica o que é o ambiente de laboratório, suas principais características e as regras que você precisa seguir.
- O **AWS Academy Learner Lab** é um ambiente de prática, tipo "sandbox" (caixa de areia), para você explorar os serviços da AWS com segurança e por um longo período.

> Características do Laboratório ⚙️

* **Acesso Restrito a Serviços:** Você não pode usar todos os serviços da AWS, apenas uma seleção específica para o aprendizado.
* **Dados e Recursos Salvos:** Tudo o que você criar (máquinas virtuais, arquivos, etc.) ficará guardado na sua conta até a data de término do curso.
* **Orçamento Limite de $50 USD.**
* **Timer de Sessão de 4 horas:** Por padrão, sua sessão no console da AWS será encerrada automaticamente após 4 horas de inatividade.

> Regras e Conformidade (Compliance) 📜
- Esta parte detalha suas responsabilidades e as regras do jogo.

* **Política de Uso Aceitável.**
* **Auditoria e Monitoramento.**
* **Suas Responsabilidades:**
    * **Cuidado com o Orçamento:** É sua responsabilidade monitorar seus gastos para não exceder o limite de $50.
    * **Siga as Melhores Práticas:** Você deve seguir as **melhores práticas de segurança** da AWS ao usar o laboratório.
    * **Pré-requisitos:** Antes de começar a usar o laboratório, você deve:
        1.  Completar este módulo sobre Segurança e Conformidade.
        2.  Ler a seção "Readme" (Leia-me) do laboratório.


### Section 2: AWS shared responsibility model
> A Divisão Principal:
* **Responsabilidade da AWS: Segurança *DA* Nuvem (Security *of* the Cloud)**
    A AWS é responsável por proteger a infraestrutura global que executa todos os seus serviços. É a base de tudo.
* **Sua Responsabilidade: Segurança *NA* Nuvem (Security *in* the Cloud)**
    Você é responsável por proteger tudo o que você coloca ou configura *dentro* dessa infraestrutura.


> Detalhando as Responsabilidades
- 1. O que a AWS Protege (Segurança DA Nuvem)

- A AWS gerencia e controla a segurança de todos os componentes, desde a segurança física das instalações até o software que permite a existência da nuvem.

A responsabilidade da AWS inclui:
* **Infraestrutura Global:**
    * **Regiões:** As áreas geográficas onde os data centers estão localizados.
    * **Zonas de Disponibilidade (Availability Zones):** Os múltiplos data centers dentro de uma Região.
    * **Locais de Borda (Edge Locations):** Pontos de presença globais para entregar conteúdo mais rápido.
* **Serviços Fundamentais:** A segurança do hardware e software que sustenta:
    * Computação (servidores físicos)
    * Armazenamento (discos físicos)
    * Bancos de Dados (hardware e software base)
    * Rede (cabos, roteadores, switches físicos)
* **Segurança Física:** Proteger os data centers com guardas, cercas, câmeras e controle de acesso rigoroso.
* **Camada de Virtualização (Hypervisor):** O software que cria e gerencia as máquinas virtuais (instâncias EC2) sobre o hardware físico.

**Em resumo:** A AWS garante que a "casa" (a nuvem).

- 2. O que VOCÊ Protege (Segurança NA Nuvem) 🧑
- Você assume a responsabilidade por tudo o que implementa na nuvem. As medidas que você precisa tomar dependem dos serviços que usa.

Sua responsabilidade inclui:

* **Dados do Cliente:** Você é o dono dos seus dados e é responsável por protegê-los.
    * **Criptografia**.
    * **Integridade dos dados:** Garantir que seus dados não sejam alterados indevidamente.

* **Plataforma, Aplicações e Gerenciamento de Acesso:**
    * **Aplicações:** A segurança do software que você instala ou desenvolve.
    * **Gerenciamento de Identidade e Acesso (IAM).** 

* **Sistema Operacional, Rede e Firewall:**
    * **Sistema Operacional (em serviços como o EC2)** 
    * **Configuração de Rede e Firewall:** Configurar os *Security Groups* (firewall virtual) para permitir ou bloquear o tráfego de rede para suas instâncias.
* **Proteção do Tráfego de Rede**.

- Responsável por trancar a porta da sua casa, decidir quem entra, instalar alarmes e proteger seus bens.

#### Exemplo Prático: Um Aplicativo Web

Imagine que você criou um site que usa os seguintes serviços:
* **Amazon EC2:** Uma máquina virtual para rodar o servidor web.
* **Amazon RDS:** Um banco de dados para guardar as informações do site.
* **Amazon S3:** Um serviço para armazenar imagens e arquivos.

Neste cenário, a divisão de responsabilidades seria:

**O que a AWS faz:**
* Protege os servidores físicos onde sua instância EC2 e seu banco de dados RDS estão rodando.
* Garante a segurança dos discos físicos que armazenam os dados do S3.
* Mantém a segurança da rede física (cabos, switches) que conecta tudo.
* Garante a segurança do *hypervisor* que executa sua máquina virtual EC2.

**O que VOCÊ faz:**
* **Na EC2:** Atualizar o sistema operacional (Windows/Linux) com os patches de segurança mais recentes.
* **No Aplicativo:** Garantir que o código do seu site não tenha falhas de segurança.
* **Firewall:** Configurar os *Security Groups* para que apenas o tráfego web (portas 80/443) chegue na sua EC2, e para que apenas a sua EC2 possa se conectar ao banco de dados RDS.
* **No S3:** Configurar as políticas do *bucket* para definir quem pode ver ou enviar arquivos, e ativar a criptografia para proteger os dados armazenados.
* **Em Tudo:** Gerenciar os usuários e permissões (IAM) para controlar quem pode modificar esses recursos.


### Section 3: AWS security best practices
- Usando VPCs para Proteger Recursos 🛡️
+ Uma **VPC** é basicamente a sua própria **rede privada e isolada** na nuvem da AWS. Pense nela como um condomínio fechado, onde você controla quem entra e quem sai. Dentro dessa VPC, você tem várias camadas de segurança para proteger seus recursos, como instâncias EC2 e bancos de dados.

As principais ferramentas de segurança da VPC são:
* **Security Groups** (Grupos de Segurança)
* **Network Access Control Lists (ACLs)** (Listas de Controle de Acesso à Rede)
* **Subnets** (Sub-redes)
* **Route Tables** (Tabelas de Roteamento)

- As Camadas de Segurança da VPC

+ 1. Security Groups
O **Security Group** atua como um firewall virtual diretamente na sua instância EC2 (no nível do apartamento). Ele controla o que pode entrar e sair *daquela instância específica*.

* **Regras:** Todas as regras são avaliadas antes de permitir o tráfego. Por padrão, ele nega todo o tráfego de entrada e permite todo o de saída.

+ 2. Network ACLs
A **Network ACL** é uma camada de segurança opcional que funciona como um firewall no nível da **sub-rede** (no nível do seu condomínio). Ela controla o tráfego que entra e sai *de toda a sub-rede*, afetando todas as instâncias dentro dela.
* **Regras:** As regras são avaliadas em ordem numérica. A primeira regra que corresponder ao tráfego é aplicada.

+ 3. Subnets: Pública vs. Privada
Dentro da sua VPC, você cria **sub-redes** para organizar seus recursos. Elas podem ser:

* **Sub-rede Pública:** É usada para recursos que precisam de acesso direto à internet, como um servidor web. Ela tem uma rota para um *Internet Gateway*.
* **Sub-rede Privada:** É usada para recursos que **não devem** ser acessíveis pela internet, como um banco de dados. Ela é mais segura e se comunica com a internet de forma controlada (através de um *NAT Gateway*, por exemplo).

+ 4. Route Tables 

A **Tabela de Roteamento** controla para onde o tráfego de rede é direcionado. É como o "GPS" da sua VPC, contendo regras que dizem: "o tráfego destinado a este endereço IP deve ir por aqui". É a tabela de roteamento que define se uma sub-rede é pública (tem uma rota para a internet) ou privada (não tem).

+ Monitoramento com VPC Flow Logs

O **VPC Flow Logs** é uma ferramenta que permite capturar e registrar informações sobre o tráfego de IP que entra e sai das interfaces de rede da sua VPC. Pense nele como as **gravações das câmeras de segurança** da sua rede. Ele não bloqueia o tráfego, mas registra tudo para que você possa analisar atividades suspeitas ou resolver problemas de conectividade. Esses logs podem ser enviados para o **Amazon CloudWatch** ou **Amazon S3**.

> Melhores Práticas de Rede

Para manter sua rede segura, siga estas diretrizes:

* **Controle o Tráfego:** Aplique regras de segurança tanto para o tráfego de **entrada (inbound)** quanto de **saída (outbound)**.
* **Separe em Camadas:** Use sub-redes (públicas e privadas) para separar as camadas da sua aplicação (ex: servidores web na pública, bancos de dados na privada).
* **Acesso Mínimo:** Configure os Security Groups e Network ACLs para permitir **apenas** o tráfego estritamente necessário. Se um servidor web só precisa da porta 443 (HTTPS), não libere mais nada.
* **Automatize a Proteção:** Use ferramentas para detectar ameaças e anomalias de forma automática.
* **Limite a Exposição:** Exponha o mínimo possível de seus recursos para a internet e redes internas.


### Section 4: AWS Academy Learner Lab best practices
- Use the allowed Regions. All service access is limited to the us-east-1 and us-west-2 Regions.
> labRole.
- Inicie apenas o número de instâncias necessárias e dimensione-as de acordo com suas necessidades. 

- Desative ou exclua recursos de computação quando não precisar mais deles.


### Section 5: Additional resources
- ...


