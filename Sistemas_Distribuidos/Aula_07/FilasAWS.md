# Parte 1: Passo a Passo para Criar a Fila SQS  
*(Feito por apenas UMA pessoa do grupo)*

O objetivo aqui é criar a **"caixa de correio" central** que todos os 6 servidores do jogo usarão para se comunicar.

---

## Acesse o Serviço SQS
1. No Console da AWS, na barra de busca no topo, digite **SQS** e clique no serviço **"Simple Queue Service"** que aparecer.

---

## Inicie a Criação da Fila
1. Na tela do SQS, clique no botão laranja **"Create queue" (Criar fila)**.

---

## Configure a Fila
- **Type (Tipo):** Deixe a opção padrão, **"Standard"**, selecionada (ela é mais flexível para o nosso caso).  
- **Name (Nome):** Dê um nome único para a fila do seu grupo.  
  Exemplo:  
```

banco-imobiliario-grupo-alpha

````
- **Outras Configurações:** Deixe todas as opções restantes como padrão. Role até o final da página.  

---

## Finalize a Criação
1. Clique no botão laranja **"Create queue"**.

> ⚠️ **Importante:**  
> O único item que é compartilhado entre todos é a **URL da Fila SQS**.  
> Todos devem usar o mesmo comando:
> ```bash
> export SQS_QUEUE_URL='...'
> ```
> Apenas **UMA pessoa cria a fila** e **envia o link da fila para os demais**.

---

## 🔗 Link do Repositório
[https://github.com/KayqueLopes99/jogo.git](https://github.com/KayqueLopes99/jogo.git)

---

# Parte 2: Lançar uma Nova Instância (Todos)

---

## Inicie o Processo
Na tela do EC2, clique no botão laranja **"Launch instances" (Lançar instâncias)**.

---

## Configurações Básicas
- **Name:**  
````

servidor-jogo-versao-final

```
- **Application and OS Images (AMI):**  
Selecione **Ubuntu**.
- **Instance type:**  
Escolha **t2.micro** (marcado como *Free tier eligible*).

---

## Par de Chaves (Passo mais importante)
1. Clique em **"Create new key pair" (Criar novo par de chaves)**.  
2. **Key pair name:**  
```

chave-final-do-jogo-kayque

```
3. **Key pair type:** RSA  
4. **Private key file format:** .pem  
5. Clique em **"Create key pair"**.  
6. O arquivo `.pem` será baixado automaticamente.  
Guarde-o na pasta **Downloads**.  
Esse é o arquivo que você usará para conectar no servidor.

---

## Configurações de Rede (Firewall)
1. No painel **"Network settings"**, clique em **"Edit"**.  
2. Em **"Security group name"**, coloque:  
```

regras-do-jogo-final

```
3. Adicione as seguintes **Inbound Rules**:
| Tipo | Porta | Source Type |
|------|--------|--------------|
| SSH | 22 | Anywhere |
| HTTP | 80 | Anywhere |
| Custom TCP | 5000 | Anywhere |

---

## Configurações Avançadas (IAM Role)
1. Role a página até **"Advanced details"**.  
2. No campo **"IAM instance profile"**, selecione **LabInstanceProfile**.  
> Obrigatório no AWS Academy para conceder permissões à instância.

---

## Lançar a Instância
Revise o resumo à direita e clique em **"Launch instance"**.

---

# Parte 3: Conectar à Nova Instância (A Hora da Verdade)

---

## Aguarde a Instância Ficar Pronta
- No painel de **Instances**, aguarde o status:
```

Running

```
e
```

2/2 checks passed

````

---

## Copie o Novo Endereço
1. Selecione a nova instância.  
2. Em **Details**, copie o campo **Public IPv4 DNS**.

---

## Conecte via PowerShell
1. Abra o **PowerShell**.  
2. Vá até a pasta onde está sua chave `.pem`:
 ```powershell
 cd Downloads
````

3. Conecte usando:

   ```powershell
   ssh -i "chave-final-do-jogo-kayque.pem" ubuntu@SEU-NOVO-ENDERECO-DNS.com
   ```
4. Quando perguntado:

   ```
   Are you sure you want to continue connecting (yes/no/[fingerprint])?
   ```

   Digite `yes` e pressione Enter.

> Se o prompt mudar para:
>
> ```
> ubuntu@ip-...:~$
> ```
>
> significa que a conexão foi bem-sucedida!

---

# Guia de Comandos para o PowerShell

---

## 🧩 Parte 1: Conectando à sua Instância EC2 (Executado no seu PC)

1. Abra o **PowerShell** e vá até sua pasta Downloads:

   ```powershell
   cd Downloads
   ```
2. Use o comando SSH para conectar:

   ```powershell
   ssh -i "NOME-DA-SUA-CHAVE.pem" ubuntu@ec2-18-207-151-89.compute-1.amazonaws.com
   ```
3. Na primeira vez, digite `yes` quando solicitado.

> Se der certo, o prompt muda de:
>
> ```
> PS C:\...>
> ```
>
> para:
>
> ```
> ubuntu@ip-...:~$
> ```

---

## 🧩 Parte 2: Configurando e Rodando o Jogo (Executado dentro da conexão SSH)

Execute os comandos a seguir **na ordem**:

```bash
# Atualize o servidor e instale ferramentas básicas
sudo apt update && sudo apt install git python3-pip python3.12-venv -y

# Clone o repositório do jogo
git clone https://github.com/KayqueLopes99/jogo.git

# Acesse a pasta
cd jogo/

# Crie e ative o ambiente virtual
python3 -m venv venv
source venv/bin/activate

# Instale as dependências
pip3 install Flask boto3

# Configure a variável com a URL da fila SQS
export SQS_QUEUE_URL='https://sqs.us-east-1.amazonaws.com/131407549918/banco-imobiliario-grupo-alpha'

# Execute o jogo
python3 app.py
```

---

## 🟢 Resultado

Após o último comando, o terminal exibirá algo como:

```
* Running on http://...
```

Isso significa que o **servidor Flask está rodando** e o jogo está ativo.
**Mantenha o PowerShell aberto** enquanto o grupo joga.

---


