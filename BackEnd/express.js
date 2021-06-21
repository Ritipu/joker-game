import express from "express";
import * as fs from "fs/promises"

const server = express();
const port = 3001;
const PERGUNTAS_JSON = "perguntas.json"
const JOGO = "jogo.json"

// const mediumQuestions = questoes.filter(elem => elem.level === 'medium')
// const hardQuestions = questoes.filter(elem => elem.level === 'hard')

// Cada joker vale 100 pontos no final do jogo
// - 300 pontos por resposta errada
// 100 pontos por pergunta certa

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
		res.status(500).send("Erro")
	}
})

server.get("/joker", async (req, res) => {
	try {
		const conteudo = await fs.readFile(JOGO)

		const conteudoLegivel = JSON.parse(conteudo.toString())


		res.status(200).json(conteudoLegivel.jogoTemplate.jokersP1)
	} catch (err) {
		res.status(500).send("Erro")
	}
})

server.delete('/joker', async (req, res) => {
	try {
		const conteudo = await fs.readFile(JOGO)

		const conteudoLegivel = JSON.parse(conteudo.toString())

		conteudoLegivel.jogoTemplate.jokersP1.pop()

		await fs.writeFile(JOGO, JSON.stringify(conteudoLegivel, null, 2))

		res.sendStatus(201)
	} catch (err) {
		res.status(500).send("Erro")
	}
})
server.listen(port, () => console.log(`Ready on ${port}`))