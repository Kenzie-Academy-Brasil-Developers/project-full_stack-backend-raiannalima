# Projeto Full-Stack Backend Motor Shop

Este é um projeto denominado Motors Shop e trata-se de uma plataforma de e-commerce para a compra e venda de carros.
Aqui nesta documentação você encontrará as referências da parte backend do projeto. 

## Tecnologias utilizadas: 

- NodeJS (https://nodejs.org/en);
- ExpressJs (https://expressjs.com/pt-br/);
- TypeScript (https://www.typescriptlang.org/);
- Typeorm (https://typeorm.io/);
- Postgresql (https://www.postgresql.org/);

## Iniciando o projeto - Rodando a API:

- No terminal, digite o comando para entrar no psql: 
```bash

psql

```

- Em seguida, digite o comando para criação da sua database: 
```bash

CREATE DATABASE database_name

```

- Vá até a raiz do projeto e crie um arquivo ".env" com os requisitos conforme o arquivo ".env.example":
```bash
PORT = application_run_port
DATABASE_URL = postgres://<username>:<password>@<host>:<port>/<database>
SECRET_KEY = jwt_secret_key
EXPIRES_IN = jwt_expires_in
```

- Digite o comando para instalar as dependências da aplicação: 
```bash

    npm install
```

- Digite o comando para gerar as migrações: 
```bash
   npm run typeorm migration:generate ./src/migrations/InitialMigration -- -d ./src/data-source.ts
```

- Digite o comando para rodar as migrações: 
```bash
   npm run typeorm migration:run -- -d ./src/data-source
```

- Digite o comando para rodar o servidor: 
```bash
   npm run dev
```

- O servidor estará rodando na porta 3000 do seu localhost: (https://localhost:3000). 

## Conhecendo o projeto - Rotas da API: 

### Rotas de usuário: 

| Método | Rota                       | Descrição                                             |
| ------ | -------------------------- | ------------------------------------------------------|
| POST   | user                       | Criação de um usuário.                                |
| PATCH  | user/:user_id              | Atualização de um usuário.                            |
| DELETE | user/:user_id              | Deleção de um usuário.                                |

#### Criação de usuário:

##### -> Requisição - POST:

```
POST /user
Host: http://localhost:3000;
Authorization: None;
Content-type: application/json;
```

###### Body: 

```json
{
	"name": "Anunciante",
	"email": "anunciante@email.com",
	"cpf": "99977755544",
	"birth": "1994/10/10",
	"tel": "51987777788",
	"password": "1234",
	"typeAccount": "Anunciante"
}
```

###### Response de sucesso:

```
201 Created
```

```json
{
	"id": 1,
	"name": "Anunciante",
	"email": "anunciant2@email.com",
	"cpf": "900887755",
	"tel": "51998786777",
	"birth": "1994/10/10",
	"typeAccount": "Anunciante"
}
```

###### Responses de erro:

-> Criando um usuário se uma chave estiver faltando: 

```
500 Internal Server Error
```

```json
{
	"message": "Internal server error"
}
```

-> Se o CPF ou EMAIL do usuário já existir:

```
400 Bad Request
```

```json
{
	"message": "User/CPF already exists."
}
```

O typeAccount é um ENUM e pode receber somente dois valores: Anunciante ou Comprador. 

#### Edição de usuário:

##### -> Requisição - PATCH:

```
PATCH /user/:user_id
Host: http://localhost:3000;
Authorization: Bearer Token;
Content-type: application/json;
```

###### Body: 

```json
{
	"name": "Novo Nome",
	"email": "novoemail@email.com",
	"cpf": "7778889944",
	"birth": "1994/10/10",
	"tel": "51996732332",
	"password": "1234",
	"typeAccount": "Comprador"
}
```

###### Response de sucesso:

```
200 OK
```

```json
{
	"id": 2,
	"name": "Novo Nome",
	"email": "novoemail@email.com",
	"cpf": "777777887",
	"tel": "99998888",
	"birth": "1994/10/10",
	"typeAccount": "Comprador"
}
```

###### Response de erro:

-> Editar um usuário que não é o seu próprio:

```
403 Forbidden
```

```json
{
	"message": "You do not have permission to edit/delete this user."
}
```

#### Deleção de usuário:

##### -> Requisição - DELETE:

```
PATCH /user/:user_id
Host: http://localhost:3000;
Authorization: Bearer Token;
Content-type: application/json;
```

###### Body: 

```json
Vazio
```

###### Response de sucesso:

```
204 No Content
```

###### Response de erro:

-> Editar um usuário que não é o seu próprio:

```
403 Forbidden
```

```json
{
	"message": "You do not have permission to edit/delete this user."
}
```

### Rota de login: 

| Método | Rota                       | Descrição                                             |
| ------ | -------------------------- | ------------------------------------------------------|
| POST   | login                      | Autenticação de usuário.                              |

#### Autenticação de usuário:

##### -> Requisição - POST:

```
POST /login
Host: http://localhost:3000;
Authorization: None;
Content-type: application/json;
```

###### Body: 

```json
{
	"email": "novo_usuario@email.com",
	"password": "1234"
}
```

###### Response de sucesso:

```
200 OK
```

```json
{
	"token": "token"
}
```

###### Responses de erro:

-> Logar com um dado errado:

```
401 Unauthorized
```

```json
{
	"message": "Email or password wrong"
}
```

-> Logar faltando alguma chave:

```
400 Bad Request
```

```json
{
	"message": {
		"email": [
			"Required"
		]
	}
}
```

### Rotas de anúncios: 

| Método | Rota                             | Descrição                                             |
| ------ | -------------------------------- | ------------------------------------------------------|
| POST   | anouncement                      | Criação de um anúncio.                                |
| GET    | anouncement                      | Listagem de todos os anúncios.                        |
| GET    | anouncement/advertiser/:user_id  | Listagem de todos anúncios de um anunciante.          |
| GET    | anouncement/:anouncement_id      | Listagem de um anúncio.                               |
| PATCH  | anouncement/:anouncement_id      | Edição de um anúncio.                                 |
| DELETE | anouncement/:anouncement_id      | Deleção de um anúncio.                                |

#### Criação de anúncio:

##### -> Requisição - POST:

```
POST /anouncement
Host: http://localhost:3000;
Authorization: Bearer Token;
Content-type: application/json;
```

###### Body: 

```json
{
	"brand": "Brand Car",
	"model": "Model Car",
	"year": 2001,
	"fuel": "Gas",
	"mileage": 309,
	"color": "White",
	"price_fipe": 22000,
	"price": 21900,
	"description": "Novo carro!",
	"cover_image": "https://picsum.photos/200/300",
	"images": [
		{
			"image_url": "any"
		},
		{
			"image_url": "any"
		},
		{
			"image_url": "any"
		}
	]
}
```

###### Response de sucesso:

```
201 Created
```

```json
{
	"id": 11,
	"brand": "Brand Car",
	"model": "Model Car",
	"year": 2001,
	"fuel": "Gas",
	"mileage": 309,
	"color": "White",
	"price_fipe": 22000,
	"price": 21900,
	"description": "New Car!",
	"cover_image": "https://picsum.photos/200/300",
	"images": [
		{
			"image_url": "any"
		},
		{
			"image_url": "any"
		},
		{
			"image_url": "any"
		}
	]
}
```

###### Responses de erro:

-> Criação de um anúncio sem token:

```
401 Unauthorized
```

```json
{
	"message": "jwt must be provided"
}
```

-> Criação de um anúncio sendo comprador:

```
400 Bad Request
```

```json
{
	"message": "User is not Advertiser."
}
```

-> Criação de um anúncio faltando uma chave:

```
500 Internal Server Error
```

```json
{
	"message": "Internal server error"
}
```

#### Listagem de todos os anúncios:

##### -> Requisição - GET:

```
GET /anouncement
Host: http://localhost:3000;
Authorization: None;
Content-type: application/json;
```

###### Body: 

```json
Vazio
```

###### Response:

```
200 OK
```

```json
[
	{
		"id": 5,
		"brand": "brand_5",
		"model": "model_5",
		"year": 2001,
		"fuel": "Gas",
		"mileage": "309.00",
		"color": "White",
		"price_fipe": 22000,
		"price": 21900,
		"description": "Car!",
		"cover_image": "https://picsum.photos/200/300"
	},
	{
		"id": 6,
		"brand": "brand_6",
		"model": "model_6",
		"year": 2001,
		"fuel": "Gas",
		"mileage": "309.00",
		"color": "red",
		"price_fipe": 22000,
		"price": 21900,
		"description": "Car!",
		"cover_image": "https://picsum.photos/200/300"
	},
	{
		"id": 7,
		"brand": "brand_7",
		"model": "model_7",
		"year": 2001,
		"fuel": "Gas",
		"mileage": "309.00",
		"color": "black",
		"price_fipe": 22000,
		"price": 21900,
		"description": "Car!",
		"cover_image": "https://picsum.photos/200/300"
	},
]	
```

#### Listagem de todos os anúncios de um anunciante:

##### -> Requisição - GET:

```
GET anouncement/advertiser/:user_id 
Host: http://localhost:3000;
Authorization: None;
Content-type: application/json;
```

###### Body: 

```json
Vazio
```

###### Response de sucesso:

```
200 OK
```

```json
[
	{
		"id": 5,
		"brand": "brand_5",
		"model": "model_5",
		"year": 2001,
		"fuel": "Gas",
		"mileage": "309.00",
		"color": "White",
		"price_fipe": 22000,
		"price": 21900,
		"description": "Car!",
		"cover_image": "https://picsum.photos/200/300"
	},
	{
		"id": 6,
		"brand": "brand_6",
		"model": "model_6",
		"year": 2001,
		"fuel": "Gas",
		"mileage": "309.00",
		"color": "red",
		"price_fipe": 22000,
		"price": 21900,
		"description": "Car!",
		"cover_image": "https://picsum.photos/200/300"
	},
	{
		"id": 7,
		"brand": "brand_7",
		"model": "model_7",
		"year": 2001,
		"fuel": "Gas",
		"mileage": "309.00",
		"color": "black",
		"price_fipe": 22000,
		"price": 21900,
		"description": "Car!",
		"cover_image": "https://picsum.photos/200/300"
	},
]	
```

###### Response de erro:

-> Procurar pelos anúncios de um usuário inexistente:

```
404 Not Found
```

```json
{
	"message": "User not found."
}
```

#### Listagem de um anúncio:

##### -> Requisição - GET:

```
GET anouncement/:anouncement_id 
Host: http://localhost:3000;
Authorization: None;
Content-type: application/json;
```

###### Body: 

```json
Vazio
```

###### Response de sucesso:

```
200 OK
```

```json
{
	"id": 5,
	"brand": "brand_5",
	"model": "model_5",
	"year": 2001,
	"fuel": "Gas",
	"mileage": "309.00",
	"color": "Black",
	"price_fipe": 22000,
	"price": 21900,
	"description": "Car!",
	"cover_image": "https://picsum.photos/200/300"
}
```

###### Response de erro:

-> Procurar por anúncio inexistente:

```
404 Not Found
```

```json
{
	"message": "Anouncement not found"
}
```

#### Edição de um anúncio:

##### -> Requisição - PATCH:

```
PATCH anouncement/:anouncement_id 
Host: http://localhost:3000;
Authorization: Bearer Token;
Content-type: application/json;
```

###### Body: 

```json
{
	"brand": "New Brand",
	"model": "New Model"
}
```

###### Response de sucesso:

```
200 OK
```

```json
{
	"id": 12,
	"brand": "New Brand",
	"model": "New Model",
	"year": 2001,
	"fuel": "Gas",
	"mileage": "309.00",
	"color": "Blue",
	"price_fipe": 22000,
	"price": 21900,
	"description": "Car!",
	"cover_image": "https://picsum.photos/200/300",
	"user": {
		"id": 5,
		"name": "user",
		"email": "user@email.com",
		"cpf": "8888889900",
		"tel": "5199887766",
		"birth": "1994-10-10",
		"password": "$2a$10$uamUa2l1XCzLhNQptveijOwtYI6i6dgXConNMxtK2U1c1bRz5Y3vm",
		"typeAccount": "Anunciante"
	},
	"comments": [],
	"images": [
		{
			"id": 34,
			"image_url": "any"
		},
		{
			"id": 35,
			"image_url": "any"
		},
		{
			"id": 36,
			"image_url": "any"
		}
	]
}
```

###### Responses de erro:

-> Edição de um anúncio sem token:

```
401 Unauthorized
```

```json
{
	"message": "jwt must be provided"
}
```

-> Edição de um anúncio que não existe:

```
500 Internal Server Error
```

```json
{
	"message": "Internal server error"
}
```

-> Edição de um anúncio sem ser o anunciante:

```
403 Forbidden
```

```json
{
	"message": "You do not have permission to edit/delete this ad."
}
```

#### Deleção de um anúncio:

##### -> Requisição - DELETE:

```
DELETE anouncement/:anouncement_id 
Host: http://localhost:3000;
Authorization: Bearer Token;
Content-type: application/json;
```

###### Body: 

```json
Vazio
```

###### Response de sucesso:

```
204 No Content
```

###### Responses de erro:

-> Deleção de um anúncio que não existe:

```
500 Internal Server Error
```

```json
{
	"message": "Internal server error"
}
```

-> Deleção de um anúncio sem ser o anunciante:

```
403 Forbidden
```

```json
{
	"message": "You do not have permission to edit/delete this ad."
}
```

### Rotas de comentários: 

| Método | Rota                             | Descrição                                             |
| ------ | -------------------------------- | ------------------------------------------------------|
| POST   | /comment/:anouncement_id         | Criação de um comentário.                             |
| GET    | /comment/:anouncement_id         | Listagem de todos os comentários de um anúncio.       |
| PATCH  | /comment/:comment_id             | Edição de um comentário.                              |
| DELETE | /comment/:comment_id             | Deleção de um comentário.                             |

#### Criação de comentário:

##### -> Requisição - POST:

```
POST /comment/:anouncement_id 
Host: http://localhost:3000;
Authorization: Bearer Token;
Content-type: application/json;
```

###### Body: 

```json
{
	"comment": "New comment."
}
```

###### Response de sucesso:

```
201 Created
```

```json
{
	"comment": "New comment",
	"user": {
		"id": 1,
		"name": "One",
		"email": "One@email.com",
		"cpf": "999776655",
		"tel": "51777777777",
		"birth": "1994-10-10",
		"password": "$2a$10$7byNPw1nX0mPQV20BLFqBO27oNAI4XP1QaF4Ml/RlPg1MZAVOmbRO",
		"typeAccount": "Comprador"
	},
	"anouncement": {
		"id": 9,
		"brand": "brand_9",
		"model": "model_9",
		"year": 2020,
		"fuel": "Gas",
		"mileage": "309.00",
		"color": "White",
		"price_fipe": 22000,
		"price": 21900,
		"description": "Car!",
		"cover_image": "https://picsum.photos/200/300"
	},
	"id": 12
}
```

###### Responses de erro: 

-> Criação de um comentário sem token:

```
401 Unauthorized
```

```json
{
	"message": "jwt must be provided"
}
```

#### Listagem de todos os comentários de um anúncio:

##### -> Requisição - GET:

```
GET /comment/:anouncement_id
Host: http://localhost:3000;
Authorization: None;
Content-type: application/json;
```

###### Body: 

```json
Vazio
```

###### Response de sucesso:

```
200 OK
```

```json
[
	{
		"id": 7,
		"comment": "Comment 7."
	},
	{
		"id": 8,
		"comment": "Comment 8."
	},
	{
		"id": 9,
		"comment": "Comment 9."
	},
	{
		"id": 10,
		"comment": "Comment 10."
	},
	{
		"id": 11,
		"comment": "Comment 11."
	},
	{
		"id": 12,
		"comment": "Comment 12."
	}
]
```

###### Response de erro:

-> Procurar pelos comentários em um anúncio inexistente:

```
404 Not Found
```

```json
{
	"message": "Anouncement not found"
}
```

#### Edição de um comentário:

##### -> Requisição - PATCH:

```
PATCH /comment/:comment_id 
Host: http://localhost:3000;
Authorization: Bearer Token;
Content-type: application/json;
```

###### Body: 

```json
{
	"comment": "New comment."
}
```

###### Response de sucesso:

```
200 OK
```

```json
{
	"id": 11,
	"comment": "New comment."
}
```

###### Responses de erro:

-> Edição de um comentário que não existe:

```
500 Internal Server Error
```

```json
{
	"message": "Internal server error"
}
```

-> Edição de um comentário que não é o seu, sem ser o anunciante:

```
403 Forbidden
```

```json
{
	"message": "You do not have permission to edit this commit."
}
```

#### Deleção de um comentário:

##### -> Requisição - DELETE:

```
DELETE /comment/:comment_id 
Host: http://localhost:3000;
Authorization: Bearer Token;
Content-type: application/json;
```

###### Body: 

```json
Vazio
```

###### Response de sucesso:

```
204 No Content
```

###### Responses de erro:

-> Deleção de um comentário que não existe:

```
500 Internal Server Error
```

```json
{
	"message": "Internal server error"
}
```

-> Deleção de um comentário sem ser o anunciante:

```
403 Forbidden
```

```json
{
	"message": "You do not have permission to edit this commit."
}
```

## Este projeto é uma ideia da Kenzie Academy e foi implementado por: 

- [Raianna Lima] (https://github.com/raiannalimacode) 












































