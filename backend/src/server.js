const express = require("express");
const cors = require("cors");
const {uuid} = require("uuidv4");

const app = express();

app.use(cors());
app.use(express.json());

const DATABASE = [
    {
        id : uuid(),
        menssagem : "Hello World!"
    },
    {
        id : uuid(),
        menssagem : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti vero optio hic sequi voluptate voluptatibus"
    }
];

app.get("/", (require, response) => {
    return response.status(200).json(DATABASE);
});

app.post("/", (require,response) => {
    const {menssagem} = require.body;
    const project = {
        id : uuid(),
        menssagem : menssagem
    }
    DATABASE.push(project)

    return response.status(201).send("POST create");
});

app.delete("/:id", (require, response) => {

    const {id} = require.params

    const projetoIndice = DATABASE.findIndex(projeto => projeto.id == id);
    DATABASE.splice(projetoIndice, 1);

    return response.status(204).send("project deleted")
});

app.listen(3333, () => {
    return console.log("server running PORT 3333\n http://localhost:3333/");
});