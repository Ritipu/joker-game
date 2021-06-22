import express from "express";
import * as fs from "fs/promises"

const server = express();
const port = 3001;

const PERGUNTAS_JSON = "perguntas.json"
const JOGO = "jogo.json"

const easySet = new Set()
const mediumSet = new Set()
const hardSet = new Set()

// Cada joker vale 100 pontos no final do jogo
// - 300 pontos por resposta errada
// 100 pontos por pergunta certa

server.use(express.json())

// URI's para Perguntas
server.get("/perguntasEasy", async (req, res) => {
	try {
		const conteudo = await fs.readFile(PERGUNTAS_JSON)
		const conteudoLegivel = JSON.parse(conteudo.toString())
		const questoes = conteudoLegivel.questions

		const easyQuestions = questoes.filter(elem => elem.level === 'easy')
		console.log(easyQuestions.length)
		// get different indexes for questions
		const size = easySet.size
		while (easySet.size === size) {
			if (easySet.size === 10) { 
				easySet.clear()
			}

			const indiceQuestionsEasy = Math.floor(Math.random() * (easyQuestions.length - 0))

			if (!easySet.has(indiceQuestionsEasy)) {
				easySet.add(indiceQuestionsEasy)
			}
		}

		const array = Array.from(easySet) // convert set to array
		const lastIndex = array.slice(-1)[0] // get last index of the array

		res.status(200).json(easyQuestions[lastIndex])
	} catch (err) {
		res.status(500).send("Erro")
	}
})

server.get("/perguntasMedium", async (req, res) => {
	try {
		const conteudo = await fs.readFile(PERGUNTAS_JSON)
		const conteudoLegivel = JSON.parse(conteudo.toString())
		const questoes = conteudoLegivel.questions

		const mediumQuestions = questoes.filter(elem => elem.level === 'medium')
		console.log(mediumQuestions.length)
		// get different indexes for questions
		const size = mediumSet.size
		while (mediumSet.size === size) {
			if (mediumSet.size === 10) { 
				mediumSet.clear()
			}

			const indiceQuestionsMedium = Math.floor(Math.random() * (mediumQuestions.length - 0))

			if (!mediumSet.has(indiceQuestionsMedium)) {
				mediumSet.add(indiceQuestionsMedium)
			}
		}

		const array = Array.from(mediumSet) // convert set to array
		const lastIndex = array.slice(-1)[0] // get last index of the array

		res.status(200).json(mediumQuestions[lastIndex])
	} catch (err) {
		res.status(500).send("Erro")
	}
})

server.get("/perguntasHard", async (req, res) => {
	try {
		const conteudo = await fs.readFile(PERGUNTAS_JSON)
		const conteudoLegivel = JSON.parse(conteudo.toString())
		const questoes = conteudoLegivel.questions

		const hardQuestions = questoes.filter(elem => elem.level === 'hard')
		console.log(hardQuestions.length)
		// get different indexes for questions
		const size = hardSet.size
		while (hardSet.size === size) {
			if (hardSet.size === 7) { 
				hardSet.clear()
			}

			const indiceQuestionsHard = Math.floor(Math.random() * (hardQuestions.length - 0))

			if (!hardSet.has(indiceQuestionsHard)) {
				hardSet.add(indiceQuestionsHard)
			}
		}

		const array = Array.from(hardSet) // convert set to array
		const lastIndex = array.slice(-1)[0] // get last index of the array

		res.status(200).json(hardQuestions[lastIndex])
	} catch (err) {
		res.status(500).send("Erro")
	}
})

//URI's para Joker
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