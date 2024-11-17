const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static(path.resolve('../frontend/build')))

app.get('/_status', (req, res) => {
    res.send("ok")
});
app.get('/component/*', (req, res) => {
    res.sendFile(path.resolve('../frontend/build/index.html'));
});
app.get('/api/countries', (req, res) => {
    fetch("https://chub.uat.stg-01.micontenthub.com/api/countries")
        .then(resp => resp.json())
        .then(data => res.json(data));
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})
