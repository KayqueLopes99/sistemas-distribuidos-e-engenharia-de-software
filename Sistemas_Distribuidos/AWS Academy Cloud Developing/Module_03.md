## Introdução ao AWS IdentityandAccess Management (IAM)
-  Como as responsabilidades de segurança são compartilhadas entre você e a AWS
> A segurança e a conformidade são uma responsabilidade compartilhada entre você (o cliente) e a AWS. A AWS opera, gerencia e controla a segurança danuvem. Essa responsabilidade inclui proteger componentes, como o sistema operacional host e a camada de virtualização, até a segurança física das instalações em que o serviço opera.Você assume a responsabilidade e o gerenciamento nanuvem.

- A segurança e a conformidade são uma responsabilidade compartilhada entre você (o cliente) e a AWS. A AWS opera, gerencia e controla a segurança danuvem. Essa responsabilidade inclui proteger componentes, como o sistema operacional host e a camada de virtualização, até a segurança física das instalações em que o serviço opera.Você assume a responsabilidade e o gerenciamento nanuvem. 

####  Uma visão geral do IAM
- O IAM é um serviço web que ajuda você a controlar com segurança o acesso de seus usuários aos recursos da AWS. Você usa o IAM para controlar quempode usar seus recursos da AWS (esse é o componente de identidade ou autenticação) e quaisrecursos eles podem usar e de quais maneiras (este é o componente de gerenciamento de acesso ou autorização).

Usuário IAM: Representa uma pessoa ou aplicação e possui credenciais permanentes.

Grupo IAM: Conjunto de usuários que compartilham as mesmas permissões.

Função IAM (Role): Identidade com permissões, mas sem credenciais fixas, usando acessos temporários.

Política IAM: Documento que define exatamente quais ações são permitidas ou negadas.

###  Como usar o IAM para autenticação
Em vez de criar um usuário com senha e chave permanentes, você cria uma **função (role)** que fornece acesso **por tempo limitado**, o que é mais seguro.

Use credenciais temporárias quando:

* Alguém precisa acessar outra conta da AWS por um tempo.
* Usuários fazem login fora da AWS (Google, empresa, etc.).
* Aplicativos móveis precisam acessar AWS.
* Programas rodando no EC2 precisam acessar AWS.


> Como fornecer credenciais para aplicativos
* Usar **funções do IAM** ou credenciais temporárias gerenciadas pela AWS.
* Assim, você não precisa salvar chaves manualmente.


> AWS CLI e credenciais

* Você configura com: `aws configure`
* As chaves ficam em um arquivo chamado **credentials**.
* Você pode criar vários perfis (ex: teste, produção).

Isso facilita:
✔ Reutilizar credenciais
✔ Trocar de perfil
✔ Evitar vazar chaves no códig


### Autorização com o IAM
- O IAM permite controlar o acesso aos recursos da AWS por meio de políticas e permissões.
Existem dois tipos de políticas no IAM:

Políticas baseadas em identidade: ligadas a usuários, grupos ou funções e dizem o que eles podem fazer.

Políticas baseadas em recurso: ligadas ao próprio recurso e dizem quem pode acessá-lo e o que pode fazer.

Este diagrama mostra a lógica que a AWS usa ao avaliar políticas do IAM. A AWS avalia todas as políticas aplicáveis e passa por essa lógica de avaliação.•Por padrão, todas as solicitações são negadas. 



- Obs: Sempre usar grupos para atribuir permissões e usar o princípio do privilégio 