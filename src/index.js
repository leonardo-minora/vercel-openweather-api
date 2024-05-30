const apiKey = process.env.API_KEY;
// console.log(process.env)

async function fetchDataByName(cityName) {
	try {
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&lang=pt`
		);

		if (!response.ok) {
			throw new Error(
				`Erro: ${response.status}. Please see https://openweathermap.org/faq#error${response.status} for more info.`
			);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Erro:", error);
		throw error;
	}
}

async function fetchDataById(cityId) {
	try {
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${apiKey}&lang=pt`
		);

		if (!response.ok) {
			throw new Error(
				`Erro: ${response.status}. Please see https://openweathermap.org/faq#error${response.status} for more info.`
			);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Erro:", error);
		throw error;
	}
}

const express = require("express")
const cors = require("cors")

const server = express();
const port = process.env.PORT || 8080

server.use(express.urlencoded({extended: true}))
server.use(express.json())
server.use(cors())

server.get("/", (request, response) => {
	response.json({"status": "on", "data": "API Version 1.0"})
})

server.get("/cidade/id/:id", async (request, response) => {
	const id = request.params.id
	// console.info(id)
	const dados = await fetchDataById(id)
	response.json(dados)
})

server.get("/cidade/nome/:nome", async (request, response) => {
	const cidade = request.params.nome
	const dados = await fetchDataByName(cidade)
	response.json(dados)
})

server.listen(port, () => {
	console.log(`API esta rodando na porta ${port}`);
})