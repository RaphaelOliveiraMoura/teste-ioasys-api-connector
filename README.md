# EMPRESAS API

## Executando a aplicação 🚀

### Prerequisitos

- NodeJs
- Algum gerenciador de pacotes (yarn ou npm)

### Instalando e executando

**Clonando o projeto**

```
  ~ git clone https://github.com/RaphaelOliveiraMoura/teste-ioasys-api-gatwey.git
```

**Instalando dependências**

```
  ~/project_folder yarn install
  or
  ~/project_folder npm install
```

**Configurando variáveis de ambiente**

É necessario criar um arquivo chamado `.env` contendo as variáveis necessárias para a execução da aplicação na raiz do projeto. Para saber quais são estas variáveis, existe um arquivo chamado `.env.example` contendo o exemplo de como o .env deve ser preenchido.

Nesse projeto só foi utilizado a variável `API_IOASYS_URL` que representa a URL da API da ioasys `https://empresas.ioasys.com.br/api/v1`.

**Executando projeto** (em modo de desenvolvimento)

Por padrão a aplicação executa na porta 3333, então certifique-se que não há nenhum processo executando nessa porta antes de tentar inicia-la.

```
  ~/project_folder yarn start
  or
  ~/project_folder npm start
```
