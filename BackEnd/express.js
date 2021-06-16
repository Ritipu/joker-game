import express from "express";
import * as fs from "fs/promises";
const app = express();
const port = 3001;

let i = 0

app.use(express.json())

app.get("/contador", (req, res) => 
    res.send(`${i++}`)
    )

app.listen(port, () => console.log(`Ready on ${port}`))