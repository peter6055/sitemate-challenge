const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors())


app.get('/', (req, res) => {
    res.send('This server works');
});


const PORT = 3050;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

