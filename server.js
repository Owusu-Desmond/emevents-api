const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const routes = require("./routes/eventsRoutes");


const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies, extended: true allows to parse nested objects    

app.use("/api", routes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})
