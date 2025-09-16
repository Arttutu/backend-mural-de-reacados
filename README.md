# Mural de recados - backend

## Descrição

O projeto mural de recados é um sistema web que permite que o usuários criem recados anexando imagens e a cada 10 minutos os recados são apagados automaticamente. O mural de recados backend foi construido utilizando Nest.js, Prisma ORM, Mongodb, Google scheduler, Google Storage, Google e Docker. O projeto é desafio proposto pela empresa Geraup para a vaga Desenvolvedor Fullstack.

## Tecnologias

![Nest.js](https://img.shields.io/badge/Nest.js-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)![Google Cloud](https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=googlecloud&logoColor=white)![Google Storage](https://img.shields.io/badge/Google_Storage-4285F4?style=for-the-badge&logo=googlecloud&logoColor=white)![Google Cloud Scheduler](https://img.shields.io/badge/Google_Cloud_Scheduler-4285F4?style=for-the-badge&logo=googlecloud&logoColor=white)![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

## Instruções de Instalação

### Pré-requisitos

- [Docker](https://www.docker.com/)
- [Git](https://git-scm.com/downloads)
- [Conta no Google Cloud](https://cloud.google.com/)

### Etapas

Clonar o projeto

```bash
    git clone https://github.com/Arttutu/backend-mural-de-reacados.git
    cd /backend-mural-de-reacados
```

### Adicione suas credenciais Google.

Entre em IAM e administrados => Contas e serviços => Selecione sua conta => chaves => baixar chave em formato JSON.

Vai em permissões e autoriza o acesso a leitura e escrita do **Google Storage**

Adicione o arquivo baixado **service-account.json** a raiz do projeto em /backend-mural-de-recados

### Configuração de variavéis essenciais

Primeiro acesse Google Storage e cria um buckt novo , acessas as Configuração e copie o projeto id, depois crie um arquivo .env na raiz no projeto com as seguintes variaveis

```bash
 GCP_BUCKET="Aqui você coloca o nome do buckt"
 GCP_KEYFILE_PATH=./service-account.json
 GCP_PROJECT_ID="ID do seu projeto aqui"
 DATABASE_URL ="Aqui você coloca sua url de conexação com o banco de dados mongodb"
```

### Configuração do Google Scheduler

Entre no google scheduler e configure um job para a rota do tipo **DELETE** **/messages/old**.

Adicione o tempo que você quer deletar suas mensagens. [Para saber mais sobre Configuração do tempo](https://cloud.google.com/scheduler/docs/configuring/cron-job-schedules?hl=pt_BR&_gl=1*j875lp*_ga*MTY0ODc3MDk5OS4xNzU3ODY0MTYw*_ga_WH2QY8WWF5*czE3NTgwNTc3MDckbzgkZzEkdDE3NTgwNjEyMDEkajU1JGwwJGgw#defining_the_job_schedule)

Utilizar o docker para criar uma imagem.

```bash
  docker build -t mural-backend .
  docker run -p 8080:8080 mural-backend
```

## Como utilizar

Acesse localmente na porta 8080

- http://localhost:8080/

### Rotas disponiveis

- /messages
- /messages/old

### Estrutura da tabela `messages`

| Campo     | Tipo     | Descrição                        |
| --------- | -------- | -------------------------------- |
| \_id      | ObjectId | Identificador único da mensagem  |
| author    | String   | Nome do usuário                  |
| content   | String   | Conteúdo do recado               |
| image     | String   | URL da imagem anexada (opcional) |
| createdAt | Date     | Data de criação do recado        |

Caso você queira testar o frontend da aplicação e siga as intruções para instalar:

- https://github.com/Arttutu/backend-mural-de-reacados

Pronto! depois desse passo é só criar seus recados!
