import express from "express";

const server = express();
const port = 3001;

let i = 0

server.use(express.json())

server.get("/contador", (req, res) => res.send(`${i++}`))

server.listen(port, () => console.log(`Ready on ${port}`))