var express = require("express");
var app = express();
const cors = require('cors');
const fs = require('fs');

app.use(express.logger());
app.use(cors());

app.get('/api/abon', async (request, response) => {
    const state = await getStateAbon();

    response.send(state)
});

app.post('/api/abon', (request, response) => {
    const state = request.body;

    setStateAbon(state, '/abon.json')
});

app.get('/api/goods', async (request, response) => {
    const state = await getStateGoods();

    response.send(state)
});

app.post('/api/goods', (request, response) => {
    const state = request.body;

    setStateGoods(state, '/goods.json')
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

async function getStateGoods() {
    const state = await readFile(__dirname.concat('/goods.json'));

    return state;
}

async function setStateGoods(data, path) {
    writeFile(__dirname.concat(path), JSON.stringify(data));
}

async function getStateAbon() {
    const state = await readFile(__dirname.concat('/abon.json'));

    return state;
}

async function setStateAbon(data, path) {
    writeFile(__dirname.concat(path), JSON.stringify(data));
}

function readFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            data ? resolve(JSON.parse(data)) : reject(err);
        });
    })
};

function writeFile(name, file) {
    return new Promise((resolve, reject) => {
        fs.writeFile(name, file, 'utf8', (err) => {
            if (err) {
                reject(err);
            }
        });
    })
};