const express = require("express");
const { exec } = require('child_process');

const app = express();
app.use(express.json());

app.post("/compile", (req, res) => {
    const { code, language } = req.body;

    // You can switch the docker image based on the language.
    // For now, let's assume it's always Python.
    const dockerImage = 'python:3.9';

    exec(`echo "${code}" | docker run --rm -i ${dockerImage} python`, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json({ output: stdout || stderr });
    });
});

app.listen(8080, () => {
    console.log("Compiler service running on port 8080");
});
