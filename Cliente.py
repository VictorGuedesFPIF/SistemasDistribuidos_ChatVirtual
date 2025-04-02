import websockets
import asyncio
import json


url = "ws://localhost:8000/ws"

async def criaConta(nomeCompleto, user_id, senha):
    async with websockets.connect(f'ws://localhost:8000/ws/{user_id}') as websocket:
        conta = { "status": "cadastro", "nomeCompleto":nomeCompleto, "email":user_id, "senha":senha}

        await websocket.send(json.dumps(conta))
        resposta = await websocket.recv()
        return json.loads(resposta)

async def login(user_id, senha):
    async with websockets.connect(f"{url}/{user_id}") as websocket:
        log = {"status": "login", "email":user_id, "senha":senha}
        await websocket.send(json.dumps(log))

        resp = await websocket.recv()
        return json.loads(resp)


async def procuraContato(alvo, user_id):
    async with websockets.connect(f"{url}/{user_id}/search") as websocket:

        await websocket.send(alvo)
        achado = await websocket.recv()
        return json.loads(achado)


async def mandaMensagem(alvo, mensagem, user_id):
    async with websockets.connect(f"{url}/{user_id}/chat") as websocket:
        mensagem = {"alvo":alvo, "mensagem":mensagem}
        await websocket.send(json.dumps(mensagem))

async def recebeMensagem(user_id):
    async with websockets.connect(f"{url}/{user_id}/chat") as websocket:
        mensagem = await websocket.recv()
        return json.loads(mensagem)

async def main():
    while True:
        c1 = await criaConta("123", "123", "123")
        c2 = await criaConta("456", "456", "456")
        print(c1)
        print(c2)
        input()
        p1 = await login("123", "123")
        print(f'\t{p1["nomeCompleto"]},\t{p1["email"]}')
        input()
        enc = await procuraContato("456", "123")
        print(f'\t{enc["nome"]}')
        input()
        print(p1["contatos"])
        input()
        await mandaMensagem("456", "Bom dia", "123")
        p2 = await login("456", "456")

        enc2 = await procuraContato("123", "456")
        print(p2)
        mensage = await recebeMensagem("456")
        print(f'\t{mensage.get("origem")}, \t{mensage.get("conteudo")}')


asyncio.run(main())


