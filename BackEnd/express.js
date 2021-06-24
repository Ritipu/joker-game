import express from "express";
import * as fs from "fs/promises";

const server = express();
const port = 3001;

const PERGUNTAS_JSON = "perguntas.json";
const JOGO = "jogo.json";

const easySet = new Set();
const mediumSet = new Set();
const hardSet = new Set();

let pergunta = undefined;

// funcoes para gerador de perguntas 
function getIndicePerguntasEasy() {
	while (easySet.size !== 10) {
		const indiceQuestionsEasy = Math.floor(Math.random() * (10 - 0))
		if (!easySet.has(indiceQuestionsEasy)) {
			easySet.add(indiceQuestionsEasy)
		}
	}

	const arrayEasyQuestions = Array.from(easySet)
	console.log(`Perguntas Fáceis: [${arrayEasyQuestions}]`)

	return arrayEasyQuestions
}

function getIndicePerguntasMedias() {
	while (mediumSet.size !== 10) {
		const indiceQuestionsMedium = Math.floor(Math.random() * (10 - 0))
		if (!mediumSet.has(indiceQuestionsMedium)) {
			mediumSet.add(indiceQuestionsMedium)
		}
	}

	const arrayMediumQuestions = Array.from(mediumSet)
	console.log(`Perguntas Médias: [${arrayMediumQuestions}]`)

	return arrayMediumQuestions
}

function getIndicePerguntasDificeis() {
	while (hardSet.size !== 7) {
		const indiceQuestionsHard = Math.floor(Math.random() * (7 - 0))
		if (!hardSet.has(indiceQuestionsHard)) {
			hardSet.add(indiceQuestionsHard)
		}
	}

	const arrayHardQuestions = Array.from(hardSet)
	console.log(`Perguntas Dificeis: [${arrayHardQuestions}] \n`)

	return arrayHardQuestions
}

async function getPerguntaFacil() {
	try {
		const dataPerguntas = await fs.readFile(PERGUNTAS_JSON)
		const dataLegivel = JSON.parse(dataPerguntas.toString())
		const questoes = dataLegivel.questions

		const easyQuestionsFilter = questoes.filter(elem => elem.level === 'easy')

		return easyQuestionsFilter
	} catch (error) {
		console.log(error)
	}
}

async function getPerguntaMedia() {
	try {
		const dataPerguntas = await fs.readFile(PERGUNTAS_JSON)
		const dataLegivel = JSON.parse(dataPerguntas.toString())
		const questoes = dataLegivel.questions

		const mediumQuestionsFilter = questoes.filter(elem => elem.level === 'medium')

		return mediumQuestionsFilter
	} catch (error) {
		console.log(error)
	}
}

async function getPerguntaDificil() {
	try {
		const dataPerguntas = await fs.readFile(PERGUNTAS_JSON)
		const dataLegivel = JSON.parse(dataPerguntas.toString())
		const questoes = dataLegivel.questions

		const hardQuestionsFilter = questoes.filter(elem => elem.level === 'hard')

		return hardQuestionsFilter
	} catch (error) {
		console.log(error)
	}
}


server.use(express.json());

// URI's para Num Perguntas JSON

server.post('/numeroPergunta', async (req, res) => {
	try {

		const conteudo = await fs.readFile(JOGO)

		const conteudoLegivel = JSON.parse(conteudo.toString())
		
		conteudoLegivel.jogoTemplate.perguntaNumero += 1

		if (conteudoLegivel.jogoTemplate.perguntaNumero === 28) {
			conteudoLegivel.jogoTemplate.perguntaNumero = 1
		}
		await fs.writeFile(JOGO, JSON.stringify(conteudoLegivel, null, 2))

		res.sendStatus(201)
	} catch (err) {
		res.status(500).send("Erro")
	}
})

// URI's para Perguntas
server.get("/perguntas", async (req, res) => {
	try {
		const easyQuestionsFilter = await getPerguntaFacil()
		const mediumQuestionsFilter = await getPerguntaMedia()
		const hardQuestionsFilter = await getPerguntaDificil()

		const easyIndices = getIndicePerguntasEasy() // array de pos unicas
		const mediumIndices = getIndicePerguntasMedias() // array de pos unicas
		const hardIndices = getIndicePerguntasDificeis() // array de pos unicas

		const dataNumPergunta = await fs.readFile(JOGO)
		const dataNumPerguntaLegivel = JSON.parse(dataNumPergunta.toString())
		const numPergunta = dataNumPerguntaLegivel.jogoTemplate.perguntaNumero

		if (numPergunta <= 10) {
			let indice = easyIndices[numPergunta - 1]
			pergunta = easyQuestionsFilter[indice]
		}

		if (numPergunta > 10 && numPergunta <= 20) {
			let indice = mediumIndices[numPergunta - 11]
			pergunta = mediumQuestionsFilter[indice]
		}

		if (numPergunta > 20 && numPergunta <= 27) {
			let indice = hardIndices[numPergunta - 21]
			pergunta = hardQuestionsFilter[indice]
		}

		res.status(200).json({
			...pergunta,
			numPergunta
		})
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

//URI's para PontosP1
server.get('/pontosP1', async (req, res) => {
	try {
		const conteudo = await fs.readFile(JOGO)

		const conteudoLegivel = JSON.parse(conteudo.toString())


		res.status(200).json(conteudoLegivel.jogoTemplate.pontuacaoP1)
	} catch (err) {
		res.status(500).send("Erro")
	}
})

server.post('/maisPontosP1', async (req, res) => {
	try {
		const conteudo = await fs.readFile(JOGO)

		const conteudoLegivel = JSON.parse(conteudo.toString())

		conteudoLegivel.jogoTemplate.pontuacaoP1 += 100

		await fs.writeFile(JOGO, JSON.stringify(conteudoLegivel, null, 2))

		res.sendStatus(201)
	} catch (err) {
		res.status(500).send("Erro")
	}
})

server.delete('/menosPontosP1', async (req, res) => {
	try {
		const conteudo = await fs.readFile(JOGO)

		const conteudoLegivel = JSON.parse(conteudo.toString())

		if (conteudoLegivel.jogoTemplate.pontuacaoP1 > 0) {
			conteudoLegivel.jogoTemplate.pontuacaoP1 -= 300
		}

		if (conteudoLegivel.jogoTemplate.pontuacaoP1 <= 0) {
			conteudoLegivel.jogoTemplate.pontuacaoP1 = 0
		}

		await fs.writeFile(JOGO, JSON.stringify(conteudoLegivel, null, 2))

		res.sendStatus(201)
	} catch (err) {
		res.status(500).send("Erro")
	}
})

//URI's para PontosP2
server.get('/pontosP2', async (req, res) => {
	try {
		const conteudo = await fs.readFile(JOGO)

		const conteudoLegivel = JSON.parse(conteudo.toString())


		res.status(200).json(conteudoLegivel.jogoTemplate.pontuacaoP2)
	} catch (err) {
		res.status(500).send("Erro")
	}
})

server.listen(port, () => console.log(`Ready on ${port}`))