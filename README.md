# case-menu.com.vc
Case para o processo seletivo da Menu.com.vc

## Configurações iniciais
Recomendado o uso dos seguintes softwares:

Visual Studio Code
Yarn
Docker
PostBird
Insomnia

## Inicialização
Baixar o projeto:

git clone https://github.com/adrianomm06/case-menu.com.vc.git
Baixar as dependências do projeto com o seguinte comando:

```yarn```
Criar o container no Docker para acesso aos banco de dados Postgres:

```docker run --name menu_database -e POSTGRES_PASSWORD=mudar123 -p 5433:5432 -d postgres```

Realizar a conexão do banco via Postbird e criar a database "menucase".

Na pasta do projeto realizar os seguintes comandos para subir o banco de dados:

```yarn sequelize db:migrate```

Inicializar o projeto com o seguinte comando:

```yarn start```

URL: http://localhost:3333/

Insomia:
Na raiz do projeto tem uma pasta Insomia, com um arquivo json com a configuração das chamadas da API.

Testes:
Para a execução dos testes, basta rodar o comando:

```yarn test```
