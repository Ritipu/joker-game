import express from "express";
import * as fs from "fs/promises";

const server = express();
const port = 3001;

const PERGUNTAS_JSON = "perguntas.json";
const JOGO = "jogo.json";
const PERGUNTA_ATUAL = "pergunta_atual.json"

const easySet = new Set();
const mediumSet = new Set();
const hardSet = new Set();

let pergunta = undefined;
let timerControl = undefined;

// funcoes para gerador de perguntas 
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

//funcao gerador Joker
async function getIndiceJoker() {
	try {
		const pergunta = await fs.readFile(PERGUNTA_ATUAL)
		const perguntaLegivel = JSON.parse(pergunta.toString())

		const jokerKeys = []
		for (let i = 0; i < perguntaLegivel.options.length; i++) {
			if (perguntaLegivel.options[i].key !== perguntaLegivel.answer) {
				jokerKeys.push(perguntaLegivel.options[i].key)
			}
		}

		const indice = Math.floor(Math.random() * (jokerKeys.length - 0))

		const objKey = { jokerKey: jokerKeys[indice] }

		return objKey
	} catch (err) {
		console.log(err)
	}

}

async function apagaVisualJoker() {
	const conteudo = await fs.readFile(JOGO)
	const conteudoLegivel = JSON.parse(conteudo.toString())

	conteudoLegivel.jogoTemplate.jokersP1.pop()

	await fs.writeFile(JOGO, JSON.stringify(conteudoLegivel, null, 2))
}

// funcao atribuicao pontos
async function atribuicaoPontos() {

	// if (conteudoLegivel.jogoTemplate.pontuacaoP1 > 0) {
	// 	conteudoLegivel.jogoTemplate.pontuacaoP1 -= 300
	// }

	// if (conteudoLegivel.jogoTemplate.pontuacaoP1 <= 0) {
	// 	conteudoLegivel.jogoTemplate.pontuacaoP1 = 0
	// }
}
server.use(express.json());

// URI para gravar Nome
server.post('/nome', async (req, res) => {
	try {

		const conteudo = await fs.readFile(JOGO)
		const conteudoLegivel = JSON.parse(conteudo.toString())

		console.log(`Player Name: ${req.body.nome}`)
		conteudoLegivel.jogoTemplate.nomeJogador = req.body.nome


		await fs.writeFile(JOGO, JSON.stringify(conteudoLegivel, null, 2))

		res.sendStatus(201)
	} catch (err) {
		res.status(500).send("Erro")
	}
})

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
			timerControl = 30;
			let indice = easyIndices[numPergunta - 1]
			pergunta = easyQuestionsFilter[indice]
		}

		if (numPergunta > 10 && numPergunta <= 20) {
			timerControl = 40;
			let indice = mediumIndices[numPergunta - 11]
			pergunta = mediumQuestionsFilter[indice]
		}

		if (numPergunta > 20 && numPergunta <= 27) {
			timerControl = 50;
			let indice = hardIndices[numPergunta - 21]
			pergunta = hardQuestionsFilter[indice]
		}

		await fs.writeFile(PERGUNTA_ATUAL, JSON.stringify(pergunta, null, 2))

		res.status(200).json({
			...pergunta,
			numPergunta,
			timerControl
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
		await apagaVisualJoker()

		const key = await getIndiceJoker()
		console.log(key)
		res.status(200).json(key)
	} catch (err) {
		res.status(500).send("Erro")
	}
})

//URI's para PontosP1
server.get('/pontosScreen', async (req, res) => {
	try {
		const conteudo = await fs.readFile(JOGO)
		const conteudoLegivel = JSON.parse(conteudo.toString())


		res.status(200).json(conteudoLegivel.jogoTemplate.pontuacaoP1)
	} catch (err) {
		res.status(500).send("Erro")
	}
})

server.post('/pontos', async (req, res) => {
	try {

		const pontosObj = await fs.readFile(JOGO)
		const pontosObjLegivel = JSON.parse(pontosObj.toString())

		const answerObj = await fs.readFile(PERGUNTA_ATUAL)
		const answerObjLegivel = JSON.parse(answerObj.toString())

		// comparacao da resposta errada
		if (req.body.key !== answerObjLegivel.answer) {
			if (pontosObjLegivel.jogoTemplate.pontuacaoP1 > 0) {
				pontosObjLegivel.jogoTemplate.pontuacaoP1 -= 300
			}

			if (pontosObjLegivel.jogoTemplate.pontuacaoP1 <= 0) {
				pontosObjLegivel.jogoTemplate.pontuacaoP1 = 0
			}
		}

		// comparacao da resposta certa
		if (req.body.key === answerObjLegivel.answer) {
			pontosObjLegivel.jogoTemplate.pontuacaoP1 += 100
		}

		await fs.writeFile(JOGO, JSON.stringify(pontosObjLegivel, null, 2))

		res.sendStatus(201)
	} catch (err) {
		res.status(500).send("Erro")
	}
})

server.get('/pontosJoker', async (req, res) => {
	try {
		const conteudo = await fs.readFile(JOGO)
		const conteudoLegivel = JSON.parse(conteudo.toString())

		const jokerPontuacao = conteudoLegivel.jogoTemplate.jokersP1.length * 100;

		conteudoLegivel.jogoTemplate.pontuacaoP1 += jokerPontuacao;

		await fs.writeFile(JOGO, JSON.stringify(conteudoLegivel, null, 2))

		res.sendStatus(201)
	} catch (err) {
		res.status(500).send("Erro")
	}
})
//URI para controlo de video
server.get('/video', async (req, res) => {
	try {
		const conteudo = await fs.readFile(JOGO)
		const conteudoLegivel = JSON.parse(conteudo.toString())

		res.status(200).json(conteudoLegivel.jogoTemplate.perguntaNumero)
	} catch (err) {
		res.status(500).send("Erro")
	}
})

server.listen(port, () => console.log(`Ready on ${port}`))