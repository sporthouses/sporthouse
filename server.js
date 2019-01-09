var express = require("express");
var app = express();
const cors = require('cors');
const fs = require('fs');

app.use(express.logger());
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/'));

app.get('/api/abon', async (request, response) => {
    const state = await getStateAbon();

    // response.send(state);
    response.status(200).json(state);
});

app.post('/api/abon', (request, response) => {
    const state = request.body;

    try {
        const result = await setStateAbon(state, '/abon.json');
        response.status(200).json(result);
    } catch (error) {
        console.log(error);
    };
});

app.get('/api/goods', async (request, response) => {
    const state = await getStateGoods();

    // response.send(state);
    response.status(200).json(state);
});

app.post('/api/goods', (request, response) => {
    const state = request.body;

    try {
        const result = await setStateGoods(state, '/goods.json');
        response.status(200).json(result);
    } catch (error) {
        console.log(error);
    };
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
    return writeFile(__dirname.concat(path), JSON.stringify(data));
}

async function getStateAbon() {
    const state = await readFile(__dirname.concat('/abon.json'));

    return state;
}

async function setStateAbon(data, path) {
    return writeFile(__dirname.concat(path), JSON.stringify(data));
}

function readFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            data ? resolve(data) : reject(err);
        });
    })
};

function writeFile(name, file) {
    return new Promise((resolve, reject) => {
        fs.writeFile(name, file, 'utf8', (err, data) => {
            data ? resolve(data) : reject(err);
        });
    })
};