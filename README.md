# Bot de sistema de hospedagem via discord

Host Bot é um bot de discord feito em typescript que gerencia os containers docker pelo seu servidor do discord, é possivel hospedar aplicações de diferentes linguagens com apenas um comando

## Características

- Hospeda bots de discord pelo seu servidor do discord
- É possivel Reiniciar / Parar / Iniciar a aplicação
- Obter backup da aplicação via DM
- Commit da aplicação
- Ver informações CPU | Memoria | Disco | Rede
- Reiniciar aplicação automaticamente apos queda
- Sistema de multiplos nodes
- Sistema de logs
- Sistema de vencimento da aplicação
- Sistema de planos indidual
- Pode-se usar em modo individual ou publico
- Totalmente configuravel
- Bot em Português / Inglês

### Capturas de tela

#### Informações da aplicação

<img width="400" alt="image" src="https://media.discordapp.net/attachments/996221556499955732/998263736311750766/2.PNG">

#### Sistema em modo individual

<img width="400" alt="image" src="https://media.discordapp.net/attachments/688522093675151408/1032721459744870471/unknown.png?width=344&height=473">

#### Sistema em modo publico

<img width="400" alt="image" src="https://media.discordapp.net/attachments/688522093675151408/1032724132623823028/unknown.png">

### 🛠 Tecnologias

As seguintes ferramentas foram usadas por todo o ecossistema do bot:

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma.io](https://www.prisma.io/)
- [RabbitMQ](https://www.rabbitmq.com/)
- [Discord.js](https://discord.js.org)
- [Postgree](https://www.postgresql.org)
- [Strapi.io](https://strapi.io/)

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Docker](https://www.docker.com), [Docker-Compose](https://docs.docker.com/compose/), [Node.js](https://nodejs.org/en/).
Além disto é bom ter um editor em seu computador para editar o codigo se necessario [VSCode](https://code.visualstudio.com/)

É obrigatorio possuir uma conexão com banco de dados ( Postgre ou Mysql ), [Strapi](https://strapi.io/) e [RabbitMQ](https://www.rabbitmq.com/)

Todas as configurações do bot está no diretorio src/config/config.json

### 🎲 Rodando o bot em servidor linux

#### Rodando o bot via terminal:

```bash
# Clone este repositório
$ git clone https://github.com/SnaffX/host-bot

# Acesse a pasta do bot
$ cd host-bot

# Instale as dependências
$ npm install

# faça o build do bot
$ npm run build

# enviar as ultimas atualizações do banco de dados
$ npx prisma db push

# Execute a aplicação em modo de produção
$ npm run production

# O bot ficará disponivel para uso
```

#### Rodando o bot docker-compose:

```bash
# Clone este repositório
$ git clone https://github.com/SnaffX/host-bot

# Acesse a pasta do bot
$ cd host-bot

# Fazendo upload do bot para o docker
$ docker-compose up -D

# O bot ficará disponivel para uso
```

### Autor

---

<a href="https://github.com/SnaffX">
 <img style="border-radius: 50%;" src="https://images-ext-1.discordapp.net/external/wq557Lu1bEkS7ixVr-mN0fcqEFq1-rmIf4pFtkAH4Bs/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/665200472596152341/2a2e4a2bedd8e136a8750298d158eee4.png" width="100px;" alt=""/>
 <br />
 <sub><b>Adriel Vieira</b></sub></a>

Feito com ❤️ por Adriel Vieira
Qualquer duvida sobre o sistema, entre em contato: Morty#3549
