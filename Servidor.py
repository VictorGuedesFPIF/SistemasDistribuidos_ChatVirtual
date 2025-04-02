import asyncio
import bcrypt
import aio_pika
from fastapi import WebSocket, FastAPI
import json
import uvicorn
from typing import Dict


app = FastAPI()
contas = []
clientesConectados: Dict[str, WebSocket] = {}

# Indica o Host e a porta que será usada para o RabbitMQ
Rabbiturl = "amqp://localhost:5672/"


async def criarConta(conta):
    for i in range(len(contas)):
        if conta["email"] == contas[i]["email"]:
            return False
    conta["senha"] = criptografaSenha(conta.get("senha").encode())
    contas.append(conta)
    return True

def criptografaSenha(senha):
    salt = bcrypt.gensalt()
    hash = bcrypt.hashpw(senha, salt)
    return hash

async def login(email, senha):
    for conta in contas:
        if conta["email"] == email:
            if bcrypt.checkpw(senha.encode(), conta["senha"]):
                contaVerificada = {
                    "nomeCompleto": conta.get("nomeCompleto"),
                    "email": conta.get("email"),
                    "contatos": conta.get("contatos")
                }
                return contaVerificada
    return False

async def procuraContato(alvo):
    for conta in contas:
        if conta.get('email') == str(alvo):
            achado = {'nome':conta.get('nomeCompleto'), 'email':conta.get('email')}
            return achado

    return False

async def adicionaContato(email, adicionar):
    for i in range(len(contas)):
        if contas[i]["email"] == email:
            contas[i]["contatos"].append(adicionar)

async def produtorRabbit(email, destino, mensagem):
    conexao = await aio_pika.connect_robust(Rabbiturl)
    canal = await conexao.channel()
    queue = await canal.declare_queue('chat', durable=True)

    body = {
        "origem":email,
        "destino":destino,
        "conteudo":mensagem
    }

    await canal.default_exchange.publish(
        aio_pika.Message(body=json.dumps(body).encode(), delivery_mode=2),
        routing_key=queue.name
    )

    await conexao.close()

async def processandoRabbit(message: aio_pika.IncomingMessage):
    async with message.process():
        mensagem = json.loads(message.body.decode())
        origem = mensagem.get("origem")
        destino = mensagem.get("destino")
        conteudo = mensagem.get("conteudo")

        if destino in clientesConectados:
            await clientesConectados[destino].send_json({"origem":origem, "conteudo":conteudo})



async def consumidorRabbit():
    conexao = await aio_pika.connect_robust(Rabbiturl)
    canal = await conexao.channel()
    queue = await canal.declare_queue('chat', durable=True)

    await queue.consume(lambda msg: asyncio.create_task(processandoRabbit(msg)))

    await asyncio.Future()

@app.websocket("/ws/{usuario}/search")
async def searchPeople(websocket: WebSocket, usuario: str):
    await websocket.accept()
    try:
        contatoChat = await websocket.receive_json()
        pesquisado = await procuraContato(contatoChat)
        if pesquisado != bool:
            await adicionaContato(usuario, pesquisado)
        await websocket.send_json(pesquisado)
    except Exception as e:
        print(f"Erro no websocket {e.args}")

@app.websocket("/ws/{usuario}/chat")
async def searchPeople(websocket: WebSocket, usuario: str):
    await websocket.accept()
    try:
        clientesConectados[usuario] = websocket
        mensagemRecebida = await websocket.receive_json()
        await produtorRabbit(usuario, mensagemRecebida.get("alvo"), mensagemRecebida.get("mensagem"))
        await consumidorRabbit()

    except Exception as e:
        print(f"Erro no websocket {e.args}")


@app.websocket("/ws/{usuario}")
async def newConnection(websocket: WebSocket, usuario: str):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_json()

            if data["status"] == "cadastro":
                conta = {
                    "nomeCompleto": data.get("nomeCompleto"),
                    "email": data.get("email"),
                    "senha": data.get("senha"),
                    "contatos": []
                }
                validaCad = await criarConta(conta)
                await websocket.send_json(validaCad)

            elif data["status"] == "login":
                validaLog = await login(data["email"], data["senha"])
                await websocket.send_json(validaLog)


    except Exception as e:
        print(f"Erro no websocket{e}")

uvicorn.run(app, host="0.0.0.0", port=8000)





