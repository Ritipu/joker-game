import express from "express";
import * as fs from "fs/promises";

const server = express();
const port = 3001;

const PERGUNTAS_JSON = "perguntas.json";
const JOGO = "jogo.json";
const PERGUNTA_ATUAL = "pergunta_atual.json"

let session_ID = 0;

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

async function getIndicePerguntasEasy() {
	try {
		const easyQuestionsFilter = await getPerguntaFacil()
		while (easySet.size !== 10) {
			const indiceQuestionsEasy = Math.floor(Math.random() * easyQuestionsFilter.length)
			if (!easySet.has(indiceQuestionsEasy)) {
				easySet.add(indiceQuestionsEasy)
			}
		}

		const arrayEasyQuestions = Array.from(easySet)
		console.log(`Perguntas Fáceis: [${arrayEasyQuestions}]`)

		return arrayEasyQuestions

	} catch (error) {
		console.log(error)
	}
}

async function getIndicePerguntasMedias() {
	try {
		const mediumQuestionsFilter = await getPerguntaMedia()
		while (mediumSet.size !== 10) {
			const indiceQuestionsMedium = Math.floor(Math.random() * mediumQuestionsFilter.length)
			if (!mediumSet.has(indiceQuestionsMedium)) {
				mediumSet.add(indiceQuestionsMedium)
			}
		}

		const arrayMediumQuestions = Array.from(mediumSet)
		console.log(`Perguntas Médias: [${arrayMediumQuestions}]`)

		return arrayMediumQuestions

	} catch (error) {
		console.log(error)
	}
}

async function getIndicePerguntasDificeis() {
	try {
		const hardQuestionsFilter = await getPerguntaDificil()
		while (hardSet.size !== 5) {
			const indiceQuestionsHard = Math.floor(Math.random() * hardQuestionsFilter.length)
			if (!hardSet.has(indiceQuestionsHard)) {
				hardSet.add(indiceQuestionsHard)
			}
		}
	
		const arrayHardQuestions = Array.from(hardSet)
		console.log(`Perguntas Dificeis: [${arrayHardQuestions}] \n`)
	
		return arrayHardQuestions
	} catch (error) {
		console.log(error)
	}
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

	conteudoLegivel.jogo.jokersP1.pop()

	await fs.writeFile(JOGO, JSON.stringify(conteudoLegivel, null, 2))
}

async function incrementaID() {
	return session_ID += 1
}

server.use(express.json());

// URI para gerar ID
server.get('/geraID', async (req, res) => {
	try {
		const testeAsync = await incrementaID()
		console.log(`ID do Jogo: ${testeAsync}`)
		res.status(200).json(testeAsync)
	} catch (err) {
		res.status(500).send("Erro")
	}
})

server.get('/gravaJogo/:id', (req, res) => {
		
		// const conteudo = await fs.readFile(JOGO)
		// const conteudoLegivel = JSON.parse(conteudo.toString())
		res.send(console.log('Ola do servidor. O teu ID e: ' + req.params.id))
})

// URI para gravar Nome
server.post('/nome', async (req, res) => {
	try {

		const conteudo = await fs.readFile(JOGO)
		const conteudoLegivel = JSON.parse(conteudo.toString())

		console.log(`Player Name: ${req.body.nome}`)
		conteudoLegivel.jogo.nomeJogador = req.body.nome


		await fs.writeFile(JOGO, JSON.stringify(conteudoLegivel, null, 2))

		res.sendStatus(201)
	} catch (err) {
		res.status(500).send("Erro")
	}
})

// URI's para Num Perguntas JSON - jogo/:id/numeroPergunta
server.post('/numeroPergunta', async (req, res) => {
	try {

		const conteudo = await fs.readFile(JOGO)
		const conteudoLegivel = JSON.parse(conteudo.toString())

		conteudoLegivel.jogo.perguntaNumero += 1

		if (conteudoLegivel.jogo.perguntaNumero === 26) {
			conteudoLegivel.jogo.perguntaNumero = 1
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

		const easyIndices = await getIndicePerguntasEasy() // array de pos unicas
		const mediumIndices = await getIndicePerguntasMedias() // array de pos unicas
		const hardIndices = await getIndicePerguntasDificeis() // array de pos unicas

		const dataNumPergunta = await fs.readFile(JOGO)
		const dataNumPerguntaLegivel = JSON.parse(dataNumPergunta.toString())
		const numPergunta = dataNumPerguntaLegivel.jogo.perguntaNumero

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

		if (numPergunta > 20 && numPergunta <= 25) {
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

		res.status(200).json(conteudoLegivel.jogo.jokersP1)
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


		res.status(200).json(conteudoLegivel.jogo.pontuacaoP1)
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
			if (pontosObjLegivel.jogo.pontuacaoP1 > 0) {
				pontosObjLegivel.jogo.pontuacaoP1 -= 300
			}

			if (pontosObjLegivel.jogo.pontuacaoP1 <= 0) {
				pontosObjLegivel.jogo.pontuacaoP1 = 0
			}
		}

		// comparacao da resposta certa
		if (req.body.key === answerObjLegivel.answer) {
			pontosObjLegivel.jogo.pontuacaoP1 += 100
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

		const jokerPontuacao = conteudoLegivel.jogo.jokersP1.length * 100;
		conteudoLegivel.jogo.pontuacaoP1 += jokerPontuacao;



		await fs.writeFile(JOGO, JSON.stringify(conteudoLegivel, null, 2))

		res.sendStatus(201)
	} catch (err) {
		res.status(500).send("Erro")
	}
})

server.post('/restartState', async (req, res) => {
	try {
		const conteudo = await fs.readFile(JOGO)
		const conteudoLegivel = JSON.parse(conteudo.toString())

		conteudoLegivel.jogo.jokersP1 = [1, 1, 1, 1, 1, 1, 1];
		conteudoLegivel.jogo.pontuacaoP1 = 0;


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

		res.status(200).json(conteudoLegivel.jogo.perguntaNumero)
	} catch (err) {
		res.status(500).send("Erro")
	}
})

server.listen(port, () => console.log(`Ready on ${port}`))