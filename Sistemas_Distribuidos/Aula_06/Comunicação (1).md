##### **Request-reply**

### 1. Tutorial
Lançar 2 instâncias: Uma Cliente e outra Servidor (com HTTP)
Na criação da primeira instancia em Network settings: 
Adicione um novo security group, dê um nome e nas regras mude: 
Type -> Custom TCP 
Port range -> porta da atividade(12345) 
Source type -> Anywhere
	
Por fim, na segunda instancia selecione o **security group** que você criou.
### 2. Configurações das instâncias

1. Rodar esses comandos 
``` 
sudo apt update 
sudo apt install -y python3-pip libzmq3-dev
sudo apt install python3.12-venv
python3 -m venv venv
source venv/bin/activate
pip install pyzmq

sudo apt update
sudo apt install -y python3 python3-pip
pip3 install pika

```

2. Criar os arquivos necessários nas instâncias:
	   1. Em servidor: nano Servidor.py
	   2. Em cliente: nano Cliente.py
	
3. Rodar cada um dos arquivos:
```
python3 Servidor.py 
python3 Cliente.py 
```

### Algoritmos necessários

**Arquivo `Servidor.py`:**

``` py
import zmq
import json

# --- CONFIGURAÇÕES ---
PORTA = "12345"

# --- EXECUÇÃO ---
contexto = zmq.Context()
socket = contexto.socket(zmq.REP)  # Socket do tipo Resposta (REPly)
socket.bind(f"tcp://*:{PORTA}")   # O '*' permite que ele aceite conexões de qualquer IP

print(f"Servidor ZMQ rodando e escutando na porta {PORTA}...")

while True:
    # 1. Aguarda a chegada de uma solicitação do cliente
    mensagem_bytes = socket.recv()
    
    # Decodifica a mensagem de bytes para string e depois para JSON
    try:
        dados_recebidos = json.loads(mensagem_bytes.decode('utf-8'))
        print(f"Mensagem recebida com id: {dados_recebidos.get('id', 'N/A')}")
        
        # 2. Envia uma resposta de volta para o cliente
        # A resposta pode ser simples, apenas para confirmar o recebimento
        resposta = {"status": "recebido", "id": dados_recebidos.get('id')}
        socket.send_json(resposta) # send_json já codifica para JSON e bytes

    except json.JSONDecodeError:
        print("Recebida mensagem em formato inválido.")
        socket.send_string("Erro: formato de mensagem inválido")
```


**Arquivo `Cliente.py`:**
``` py
import zmq
import time
import json

#--- CONFIGURAções ---
#IMPORTANTE: Substitua pelo IP público da sua instância EC2 do SERVIDOR
IP_SERVIDOR = "13.218.226.77" 
PORTA = "12345"
ENDERECO_SERVIDOR = f"tcp://{IP_SERVIDOR}:{PORTA}"

#Use o número da sua matrícula real aqui
SUA_MATRICULA = 2023011415

#Calcula a quantidade de solicitações (usando divisão inteira)
QUANTIDADE_SOLICITACOES = SUA_MATRICULA // 10000

#--- EXECUÇÃO ---
contexto = zmq.Context()
print(f"Conectando ao servidor ZMQ em {ENDERECO_SERVIDOR}...")
socket = contexto.socket(zmq.REQ)
socket.connect(ENDERECO_SERVIDOR)

print(f"Iniciando envio de {QUANTIDADE_SOLICITACOES} solicitações...")

# O contador é inicializado APENAS UMA VEZ, aqui fora.
contador_pares = 0

#1. Medir o tempo de início
tempo_inicio = time.time()

#Loop para enviar todas as solicitações
for i in range(1, QUANTIDADE_SOLICITACOES + 1):
    # 2. Monta a solicitação no formato JSON especificado
    payload = {
        "id": i,
        "SUA_MATRICULA": SUA_MATRICULA,
        "item": i
    }

    # Verifica se o item é par e incrementa o contador
    if payload["item"] % 2 == 0:
        contador_pares += 1

    # Imprime o andamento a cada 1000 requisições
    if i % 1000 == 0:
        print(f"Enviando solicitação {i}/{QUANTIDADE_SOLICITACOES}...")

    # 3. Envia a mensagem
    socket.send_json(payload)
    
    # 4. Aguarda a resposta do servidor
    resposta = socket.recv_json()

#5. Medir o tempo final
tempo_fim = time.time()
print("Envio de todas as solicitações concluído.")

#Calcula e exibe o tempo total
duracao_total = tempo_fim - tempo_inicio

#--- RESULTADO FINAL PARA O PRINT ---
print("\n" + "="*40)
print(f"Tempo total para enviar e receber {QUANTIDADE_SOLICITACOES} solicitações: {duracao_total:.4f} segundos")

#NOVO: Imprime a frase final no formato exigido pela atividade 
# Usando o nome correto da variável: contador_pares
print(f"Número par de itens {contador_pares} onde foram processadas no número de matrícula: {SUA_MATRICULA}.")
print("="*40)
```
