# Bot de sistema de hospedagem via discord

Host Bot é um bot de discord feito em typescript que gerencia os containers docker pelo seu servidor do discord, é possivel hospedar aplicações node.js com apenas 1 comando.

## Características

- [] Hospeda bots de discord pelo seu servidor do discord
- [x] É possivel Reiniciar / Parar / Iniciar a aplicação
- [x] Obter backup da aplicação via DM
- [x] Commit da aplicação
- [x] Ver informações CPU | Memoria | Disco | Rede
- [x] Reiniciar aplicação automaticamente apos queda
- [x] Sistema de multiplos nodes
- [x] Sistema de logs
- [x] Sistema de vencimento da aplicação
- [x] Sistema de planos
- Totalmente configuravel
- Bot em Português / Inglês

### Capturas de tela

#### Informações da aplicação

<img width="400" alt="image" src="https://media.discordapp.net/attachments/996221556499955732/998263736311750766/2.PNG">

#### Sistema em modo publico

<img width="400" alt="image" src="https://github.com/SnaffX/host-bot/blob/master/screenshots/2.png">

### 🛠 Tecnologias

As seguintes ferramentas foram usadas por todo o ecossistema do bot:

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma.io](https://www.prisma.io/)
- [RabbitMQ](https://www.rabbitmq.com/)
- [Discord.js](https://discord.js.org)
- [Postgree](https://www.postgresql.org)

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Docker](https://www.docker.com), [Docker-Compose](https://docs.docker.com/compose/), [Node.js](https://nodejs.org/en/).
Além disto é bom ter um editor em seu computador para editar o codigo se necessario [VSCode](https://code.visualstudio.com/)

É obrigatorio possuir uma conexão com banco de dados ( Postgre ou Mysql ) e [RabbitMQ](https://www.rabbitmq.com/)

Você pode subir os container dos serviços obrigatorios no diretorio src/templates
Todos os serviços do projeto foi usado no linux ubuntu 20.04
Todas as configurações do bot está no diretorio src/config/config.json

Você pode editar as linguagem do bot em src/locales

### 🎲 Rodando o bot em servidor linux ubuntu

#### Rodando o bot via terminal:

```bash
$ git clone https://github.com/SnaffX/host-bot
$ cd host-bot
$ npm install ou yarn install
$ npm run build
$ npx prisma db push
$ npm run production
```

#### Rodando o bot via docker-compose:

```bash
# Clone este repositório
$ git clone https://github.com/SnaffX/host-bot

# Acesse a pasta do bot
$ cd host-bot

# Fazendo upload do bot para o docker
$ docker-compose up -D
```

### Autor

---

<a href="https://github.com/SnaffX">
 <img style="border-radius: 50%;" src="https://images-ext-1.discordapp.net/external/wq557Lu1bEkS7ixVr-mN0fcqEFq1-rmIf4pFtkAH4Bs/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/665200472596152341/2a2e4a2bedd8e136a8750298d158eee4.png" width="100px;" alt=""/>
 <br />
 <sub><b>Adriel Vieira</b></sub></a>

Feito com ❤️ por Adriel Vieira
Qualquer duvida sobre o sistema, entre em contato: Morty#3549
