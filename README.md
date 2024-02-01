##  Como rodar localmente

### 👾 Clone repo

```
git clone git@github.com:jefersonpmatos/farmersApi.git
```

### 🔧 Install deps

```
npm install or yarn add
```

### 🚀 Run the project:

```
npm run dev or yarn dev
```

***

## Rotas da API

### Registro de Novo Agricultor

Endpoint: `POST /farmer/register`

### Descrição
Registra um novo agricultor com suas informações.

### Parâmetros do Corpo da Requisição (JSON)
- `cpfCnpj`: CPF ou CNPJ do agricultor (string com ou sem caracteres especiais)
- `name`: Nome do agricultor (string)
- `farmName`: Nome da fazenda (string)
- `city`: Cidade do agricultor (string)
- `state`: Estado do agricultor (string)
- `totalAreaHectares`: Área total da fazenda em hectares (number)
- `cultivableAreaHectares`: Área agricultável em hectares (number)
- `vegetationAreaHectares`: Área de vegetação em hectares (number)
- `crops`: Lista de culturas na fazenda (array de strings)

### Exemplo
```json
{
  "cpfCnpj": "12345678901",
  "name": "João da Silva",
  "farmName": "Fazenda Feliz",
  "city": "Cidade A",
  "state": "Estado X",
  "totalAreaHectares": 100,
  "cultivableAreaHectares": 80,
  "vegetationAreaHectares": 20,
  "crops": ["Milho"]
}

```

### Exemplo resposta de sucesso

```json
Status: 201 Created 

{
  "message": "Agricultor cadastrado com sucesso",
  "data": {
    "id": 1,
    "cpfCnpj": "12345678901",
    "name": "João da Silva",
    "farmName": "Fazenda Feliz",
    "city": "Cidade A",
    "state": "Estado X",
    "totalAreaHectares": 100,
    "cultivableAreaHectares": 80,
    "vegetationAreaHectares": 20
  }
}

```
***
### Edição de Agricultor Existente
Endpoint: PUT `/farmer/:id`

### Descrição
Edita as informações de um agricultor existente com base no ID.

### Parâmetros do Corpo da Requisição (JSON)
Qualquer campo que você deseja editar (exceto CPF/CPNJ), por exemplo:

- `name`: Nome do agricultor (string)
- `farmName`: Nome da fazenda (string)
- `city`: Cidade do agricultor (string)
- `state`: Estado do agricultor (string)
- `totalAreaHectares`: Área total da fazenda em hectares (number)
- `cultivableAreaHectares`: Área agricultável em hectares (number)
- `vegetationAreaHectares`: Área de vegetação em hectares (number)
- `crops`: Lista de culturas na fazenda (array de strings)

```json
{
  "name": "Novo Nome",
  "farmName": "Nova Fazenda",
  "totalAreaHectares": 120,
  "cultivableAreaHectares": 90,
  "vegetationAreaHectares": 30,
  "cropName": ["Trigo", "Cevada"]
}
```

### Exemplo resposta de sucesso

```json
Status: 200 OK

{
  "message": "Agricultor atualizado com sucesso",
  "data": {
    "id": 1,
    "cpfCnpj": "12345678901",
    "name": "Novo Nome",
    "farmName": "Nova Fazenda",
    "city": "Cidade A",
    "state": "Estado X",
    "totalAreaHectares": 120,
    "cultivableAreaHectares": 90,
    "vegetationAreaHectares": 30
  }
}

```
***

### Exclusão de Agricultor
Endpoint: DELETE `/farmer/:id`

### Descrição
Exclui um agricultor com base no ID.

### Exemplo resposta de sucesso
```json
Status: 200 OK
{
  "message": "Agricultor excluído com sucesso"
}

```
***

### Obtenção de métricas
Endpoint: GET `/metrics`

### Descrição
Esta rota retorna métricas do dashboard relacionadas a fazendas, áreas cultiváveis, distribuição de cultivos e outras estatísticas.

### Exemplo resposta de sucesso
A resposta contém um objeto JSON com as seguintes métricas:
```json
Status: 200 OK

{
  "totalFarms": "Número total de fazendas.",
  "totalArea": "Área total de todas as fazendas em hectares.",
  "cultivableAreaHectares": "Área cultivável total em hectares.",
  "vegetationAreaHectares": "Área de vegetação total em hectares.",
  "totalNumberOfStates": "Número total de estados.",
  "stateWithMostFarms": "Estado com o maior número de fazendas.",
  "stateWithLessFarms": "Estado com o menor número de fazendas.",
  "totalFarmsByState": "Lista de estados com detalhes sobre o número de fazendas e áreas.",
  "totalCrops": "Número total de cultivos.",
  "crops": "Lista de cultivos com o número de fazendas associadas."
}

```










