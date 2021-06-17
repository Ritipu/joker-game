import express from "express";
import * as fs from "fs/promises"

const server = express();
const port = 3001;
const CONTADOR_JSON = "contador.json"


server.use(express.json())

server.get("/contador", async (req, res) => {
    try {
        const conteudo = await fs.readFile(CONTADOR_JSON)
        const conteudoLegivel = JSON.parse(conteudo.toString())
        res.status(200).json(conteudoLegivel.count)
    } catch (err) {
        res.status(500).send("Erro a ler o contador")
    }
})

server.post("/contador/", async (req, res) => {
    try {
        const conteudo = await fs.readFile(CONTADOR_JSON)
        const conteudoLegivel = JSON.parse(conteudo) // 20
        // Gravacao no JSON
        conteudoLegivel.count = conteudoLegivel.count + 1
        
        await fs.writeFile(CONTADOR_JSON, JSON.stringify(conteudoLegivel, null, 2))

        res.sendStatus(200)

    } catch (err) {
        res.status(500).send("Erro a actualizar o contador")
    }
})

server.listen(port, () => console.log(`Ready on ${port}`))