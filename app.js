// app.js
const express = require('express');
const fs = require('fs');
const path = require('path')
const app = express();
const port = 8080;
const cors=require('cors');

app.use(cors());
app.options('*', cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/index.html'));
});

//app.get('/', (req, res) => {
//    res.send('Express JS on Vercel')
//})


app.post('/saveResults', cors(), (req, res) => {
    const results = req.body;
    const fileName = '/tmp/results.json';
    //const filePath = path.join(__dirname, fileName);

    fs.writeFile(fileName, JSON.stringify(results), (err) => {
        if (err) {
            console.error('Error writing results to file:', err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Results saved to:', fileName);
            res.status(200).send('Results saved successfully');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

