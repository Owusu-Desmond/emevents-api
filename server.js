const express = require("express");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send("Hello world")
})

app.post('/', (req, res) => {
    res.send("This is a post request")
})

app.put('/user', (req, res) => {
    res.send("Got put request to the user route")
})

app.delete('/user', (req, res) => {
    res.send("Got delete request to the user route")
})
    
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})
