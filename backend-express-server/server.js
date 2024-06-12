const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors())


app.get('/', (req, res) => {
    res.send('200 OK');
});


require("./src/routes/ticket.route.js")(express, app);


const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

