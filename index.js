'use strict';

var daySumm = [];
var globalTable = {
    goods: [],
    abon: []
};

function getAllValues() {
    const table = document.querySelector('.pass');

console.log(obj)
}

function addUser() {
    const name = document.querySelector('.abon-name');
    const abonemNum = document.querySelector('.abon-num');
    const abonemType = document.querySelector('.abon-type');
    const abonemDesc = document.querySelector('.abon-desc');
    const abonemDuration = document.querySelector('.abon-dur');
    const summ = document.querySelector('.abon-summ');

    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    const numCell = document.createElement('td');
    const typeCell = document.createElement('td');
    const descCell = document.createElement('td');
    const durationCell = document.createElement('td');
    const dateCell = document.createElement('td');
    const summCell = document.createElement('td');
    const timeCell = document.createElement('td');
    const numberCell = document.createElement('td');
    const time = new Date();
    const summary = document.querySelector('.summary');
    const monthNames = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня","Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
    var rowData = {};
    
    nameCell.textContent = rowData.fio = name.value;
    summCell.textContent = rowData.summ = summ.value;
    numCell.textContent = rowData.abonNum = abonemNum.value;
    typeCell.textContent = rowData.abonType = abonemType.value;
    descCell.textContent = rowData.desc = abonemDesc.value;
    durationCell.textContent = rowData.duration = abonemDuration.value;
    dateCell.textContent = rowData.date = `${time.getDate()} ${monthNames[time.getMonth()]}`;
    timeCell.textContent = rowData.time = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
    numberCell.textContent = daySumm.length + 1;

    daySumm.push(parseInt(summ.value));

    var summNumber =  0;
    
    for(let i = 0; i < daySumm.length; i++) {
        summNumber += daySumm[i];
    }
    // summary.children[summary.children.length - 1].textContent = summNumber;

    row.appendChild(numberCell);
    row.appendChild(numCell);
    row.appendChild(nameCell);
    row.appendChild(typeCell);
    row.appendChild(dateCell);
    row.appendChild(durationCell);
    row.appendChild(summCell);
    row.appendChild(descCell);
    row.appendChild(timeCell);

    globalTable.abon.push(rowData);

    return row;
}

function addGoods(rowId) {
    const goodsName = document.querySelector('.goods-item');
    const goodsPrice = document.querySelector('.goods-price');
    const goodsCount = document.querySelector('.goods-count');
    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    const priceCell = document.createElement('td');
    const countCell = document.createElement('td');
    const numberCell = document.createElement('td');
    const timeCell = document.createElement('td');
    const time = new Date();
    var rowData = {};

    numberCell.textContent = rowId;
    timeCell.textContent = rowData.time = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
    nameCell.textContent = rowData.goodsName = goodsName.value;
    countCell.textContent = rowData.count = goodsCount.value;
    priceCell.textContent = rowData.price = goodsPrice.value;

    row.appendChild(numberCell);
    row.appendChild(nameCell);
    row.appendChild(countCell);
    row.appendChild(priceCell);
    row.appendChild(timeCell);

    globalTable.goods.push(rowData);

    return row;
}

// {
//     abonNum: '',
//     fio: '',
//     abonType: '',
//     date: '',
//     duration: '',
//     summ: '',
//     desc: '',
//     time: ''
// }

// {
//     goodsName: '',
//     count: '',
//     price: '',
//     time: ''
// }

async function getGoodsData() {
    return fetch('https://sporthouses.herokuapp.com/api/goods')
    .then(data => {
        return data.json();
    });
}

function sendGoodsData(data) {
    const dataJSN = JSON.stringify(data);

    fetch('https://sporthouses.herokuapp.com/api/goods', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: dataJSN
    })
}

function sendAbonData(data) {
    const dataJSN = JSON.stringify(data);

    fetch('https://sporthouses.herokuapp.com/api/abon', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: dataJSN
    })
}

async function getAbonData() {
    return fetch('https://sporthouses.herokuapp.com/api/abon')
    .then(data => {
        return data.json();
    });
};

function addAbonRow() {
    const table = document.querySelector('.pass tbody');
    const summary = document.querySelector('.summary');
    const name = document.querySelector('.abon-name');
    const summ = document.querySelector('.abon-summ');
    var firstTime = true;

    // firstTime ? table.children[1].removeChild(summary) : table.removeChild(summary);
    table.appendChild(addUser());

    // var summNumber =  0;

    // for(let i = 0; i < daySumm.length; i++) {
    //     summNumber += daySumm[i];
    // }
    // summary.children[summary.children.length - 1].textContent = summNumber;

    // table.appendChild(summary);
    firstTime = false;
    name.value = '';
    summ.value = '';
}

function addGoodsRow() {
    const table = document.querySelector('.goods-table tbody');

    table.appendChild(addGoods(table.rows.length + 1));
}

// function initTables() {
//     const abonData = await getAbonData();
//     const goodsData = await getGoodsData();

//     globalTable.abon = abonData;
//     globalTable.goods = goodsData;

// }

(function() {
    const abonButton = document.querySelector('.abon');
    const goodsButton = document.querySelector('.goods');
    const table = document.querySelector('.pass');
    const summary = document.querySelector('.summary');
    const name = document.querySelector('.name');
    const summ = document.querySelector('.summ');
    var firstTime = true;

    abonButton.onclick = (e) => {
        e.preventDefault();

        addAbonRow();
        sendAbonData(globalTable.abon);
    };

    goodsButton.onclick = (e) => {
        e.preventDefault();

        addGoodsRow();
        sendGoodsData(globalTable.goods);
    };
})();