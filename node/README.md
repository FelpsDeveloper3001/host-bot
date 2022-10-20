# node do sistema de hospedagem via discord

Host Node é a aplicação principal para o sistema de hospedagem funcionar, atravez dele que o Host Bot fará a comunicação e upload de aplicações

### 🛠 Tecnologias

As seguintes ferramentas foram usadas por todo o ecossistema do node:

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma.io](https://www.prisma.io/)
- [RabbitMQ](https://www.rabbitmq.com/)
- [Postgree](https://www.postgresql.org)

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Docker](https://www.docker.com), [Docker-Compose](https://docs.docker.com/compose/), [Node.js](https://nodejs.org/en/).

É obrigatorio possuir uma conexão com banco de dados ( [Postgre](https://www.postgresql.org/) ) e [RabbitMQ](https://www.rabbitmq.com/)

Todas as configurações do node está no diretorio src/config/config.json

### 🎲 Rodando o node em servidor linux

#### Rodando o node via terminal:

```bash
# Clone este repositório
$ git clone https://github.com/SnaffX/host-node

# Acesse a pasta do bot
$ cd host-node

# Instale as dependências
$ npm install ou yarn install

# faça o build do node
$ npm run build

# Execute a aplicação em modo de produção
$ npm run production

# O bot ficará disponivel para uso
```

#### Rodando o bot docker-compose:

```bash
# Clone este repositório
$ git clone https://github.com/SnaffX/host-node

# Acesse a pasta do node
$ cd host-node

# Fazendo upload do node para o docker
$ docker-compose up -D

# O node ficará disponivel para uso
```

### Autor

---

<a href="https://github.com/SnaffX">
 <img style="border-radius: 50%;" src="https://images-ext-1.discordapp.net/external/wq557Lu1bEkS7ixVr-mN0fcqEFq1-rmIf4pFtkAH4Bs/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/665200472596152341/2a2e4a2bedd8e136a8750298d158eee4.png" width="100px;" alt=""/>
 <br />
 <sub><b>Adriel Vieira</b></sub></a>

Feito com ❤️ por Adriel Vieira
Qualquer duvida sobre o sistema, entre em contato: Morty#3549
