const fs = require("fs");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("AresLink API funcionando 🚀");
});

app.get("/mission", (req, res) => {
    const data = JSON.parse(fs.readFileSync("db.json", "utf8"));
    res.json(data.mission);
});

app.get("/messages", (req, res) => {
    const data = JSON.parse(fs.readFileSync("db.json", "utf8"));
    res.json(data.messages);
});

app.get("/tasks", (req, res) => {
    const data = JSON.parse(fs.readFileSync("db.json", "utf8"));

    res.json(data.tasks);
});

app.post("/tasks", (req, res) => {
    const data = JSON.parse(fs.readFileSync("db.json", "utf8"));

    const newTask = {
        id: Date.now(),
        title: req.body.title,
        priority: req.body.priority,
        assignedTo: req.body.assignedTo,
        status: "Pendente"
    };


    data.tasks.push(newTask);

    fs.writeFileSync(
        "db.json",
        JSON.stringify(data, null, 2)
    );

    res.status(201).json(newTask);
});


app.put("/tasks/:id", (req, res) => {
    const taskId = Number(req.params.id);

    const data = JSON.parse(
        fs.readFileSync("db.json", "utf8")
    );

    const task = data.tasks.find(
        task => task.id === taskId
    );

    if (task) {
        task.status = "Concluída";
    }

    fs.writeFileSync(
    "db.json",
    JSON.stringify(data, null, 2)
);

    res.json(task);
});

app.post("/messages", (req, res) => {
    const data = JSON.parse(fs.readFileSync("db.json", "utf8"));

    const newMessage = {
        id: Date.now(),
        sender: req.body.sender,
        receiver: req.body.receiver,
        title: req.body.title,
        content: req.body.content,
        status: "Transmitindo",
        createdAt: new Date().toISOString()
    };

    data.messages.push(newMessage);
    setTimeout(() => {
        const updatedData = JSON.parse(
            fs.readFileSync("db.json", "utf8")
        );

        const message = updatedData.messages.find(
            msg => msg.id === newMessage.id
        );

        if (message) {
            message.status = "Recebida";

            fs.writeFileSync(
                "db.json",
                JSON.stringify(updatedData, null, 2)
            );
        }
    }, 10000);

    fs.writeFileSync(
        "db.json",
        JSON.stringify(data, null, 2)
    );

    res.status(201).json(newMessage);
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});