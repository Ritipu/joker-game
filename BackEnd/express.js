import express from "express";
import * as fs from "fs/promises"

const server = express();
const port = 3001;
const PERGUNTAS_JSON = "perguntas.json"

// const mediumQuestions = questoes.filter(elem => elem.level === 'medium')
// const hardQuestions = questoes.filter(elem => elem.level === 'hard')

server.use(express.json())

server.get("/perguntasEasy", async (req, res) => {
	try {
		const conteudo = await fs.readFile(PERGUNTAS_JSON)

		const conteudoLegivel = JSON.parse(conteudo.toString())

		const questoes = conteudoLegivel.questions

		const easyQuestions = questoes.filter(elem => elem.level === 'easy')


		const indiceQuestionsEasy = Math.floor(Math.random() * (easyQuestions.length - 0)) + 0

		const easySet = new Set()
		console.log(easySet)

		res.status(200).json(easyQuestions[indiceQuestionsEasy])
	} catch (err) {
		res.status(500).send("Erro a ler o contador")
	}
})

server.listen(port, () => console.log(`Ready on ${port}`))