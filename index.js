'use strict';

var daySumm = [];
var globalTable = {
    goods: [],
    abon: []
};

function showSumm() {
    const summ = getAllSumms();
    const abon = document.querySelector('.total-summ-abon');
    const goods = document.querySelector('.total-summ-goods');
    const total = document.querySelector('.total-summ-total');

    abon.textContent = summ.abonSumm;
    goods.textContent = summ.goodsSumm;
    total.textContent = summ.totalSumm;
}

function clearAbon() {
    const name = document.querySelector('.abon-name');
    const type = document.querySelector('.abon-type');
    const num = document.querySelector('.abon-num');
    const dur = document.querySelector('.abon-dur');
    const summ = document.querySelector('.abon-summ');
    const desc = document.querySelector('.abon-desc');

    name.value = '';
    type.value = '';
    num.value = '';
    dur.value = '';
    summ.value = '';
    desc.value = '';
}

function clearGoods() {
    const item = document.querySelector('.goods-item');
    const count = document.querySelector('.goods-count');
    const price = document.querySelector('.goods-price');

    item.value = '';
    count.value = '';
    price.value = '';
}

function getAllSumms() {
    const abons = globalTable.abon;
    const goods = globalTable.goods;
    var summ = {
        abonSumm: 0,
        goodsSumm: 0,
        totalSumm: 0
    };

    abons.forEach((item) => {
        summ.abonSumm += parseFloat(item.summ);
    });

    goods.forEach((item) => {
        summ.goodsSumm += parseFloat(item.price) * parseFloat(item.count);
    });

    summ.totalSumm = parseFloat(summ.goodsSumm) + parseFloat(summ.abonSumm);

    summ.abonSumm = Number.isNaN(summ.abonSumm) ? '0' : summ.abonSumm;
    summ.goodsSumm = Number.isNaN(summ.goodsSumm) ? '0' : summ.goodsSumm;
    summ.totalSumm = Number.isNaN(summ.totalSumm) ? '0' : summ.totalSumm;

    return summ;
}

function addUser(rowId, data) {
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
    
    nameCell.textContent = rowData.fio = data ? data.fio : name.value;
    summCell.textContent = rowData.summ = data ? data.summ : summ.value;
    numCell.textContent = rowData.abonNum = data ? data.abonNum : abonemNum.value;
    typeCell.textContent = rowData.abonType = data ? data.abonType : abonemType.value;
    descCell.textContent = rowData.desc = data ? data.desc : abonemDesc.value;
    durationCell.textContent = rowData.duration = data ? data.duration : abonemDuration.value;
    dateCell.textContent = rowData.date = data ? data.date : `${time.getDate()} ${monthNames[time.getMonth()]}`;
    timeCell.textContent = rowData.time = data ? data.time : `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
    numberCell.textContent = rowId;

    // daySumm.push(parseInt(summ.value));

    // var summNumber =  0;
    
    // for(let i = 0; i < daySumm.length; i++) {
    //     summNumber += daySumm[i];
    // }
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

    data ? null : globalTable.abon.push(rowData);

    return row;
}

function addGoods(rowId, data) {
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
    timeCell.textContent = rowData.time = data ? data.time : `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
    nameCell.textContent = rowData.goodsName = data ? data.goodsName : goodsName.value;
    countCell.textContent = rowData.count = data ? data.count : goodsCount.value;
    priceCell.textContent = rowData.price = data ? data.price : goodsPrice.value;

    row.appendChild(numberCell);
    row.appendChild(nameCell);
    row.appendChild(countCell);
    row.appendChild(priceCell);
    row.appendChild(timeCell);

    data ? null : globalTable.goods.push(rowData);

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
    return fetch('https://sporthouses.herokuapp.com/api/goods',{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        method: 'GET'
    })
    .then(data => {
        return data.json();
    })
    .catch(err => {
        console.log(err);
    });
}

function sendGoodsData(data) {
    const dataJSN = JSON.stringify(data);

    fetch('https://sporthouses.herokuapp.com/api/goods', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        method: 'POST',
        body: dataJSN
    })
    .catch(err => {
        console.log(err);
    });
}

function sendAbonData(data) {
    const dataJSN = JSON.stringify(data);

    fetch('https://sporthouses.herokuapp.com/api/abon', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        method: 'POST',
        body: dataJSN
    })
    .catch(err => {
        console.log(err);
    });
}

async function getAbonData() {
    return fetch('https://sporthouses.herokuapp.com/api/abon',
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        method: 'GET'
    })
    .then(data => {
        return data.json();
    })
    .catch(err => {
        console.log(err);
    });
};

function addAbonRow(data) {
    const table = document.querySelector('.pass tbody');

    table.appendChild(addUser(table.rows.length + 1, data));

    clearAbon();
}

function addGoodsRow(data) {
    const table = document.querySelector('.goods-table tbody');

    table.appendChild(addGoods(table.rows.length + 1, data));

    clearGoods();
}

async function initTables() {
    const abonData = await getAbonData();
    const goodsData = await getGoodsData();

    globalTable.abon = abonData;
    globalTable.goods = goodsData;

    abonData.forEach((item) => {
        addAbonRow(item);
    });

    goodsData.forEach((item) => {
        addGoodsRow(item);
    });

    showSumm();
}

function resetAbon() {
    const dataJSN = JSON.stringify([]);

    fetch('https://sporthouses.herokuapp.com/api/abon', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        method: 'POST',
        body: dataJSN
    })
    .catch(err => {
        console.log(err);
    });
}

function resetGoods() {
    const dataJSN = JSON.stringify([]);

    fetch('https://sporthouses.herokuapp.com/api/goods', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        method: 'POST',
        body: dataJSN
    })
    .catch(err => {
        console.log(err);
    });
}

(function() {
    const abonButton = document.querySelector('.abon');
    const goodsButton = document.querySelector('.goods');
    const summ = document.querySelector('.abon-summ');
    const count = document.querySelector('.goods-count');
    const price = document.querySelector('.goods-price');

    summ.onkeypress = (evt) => {
        var e = event || evt;
        var charCode = e.which || e.keyCode;

        if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;

        return true;
    };

    count.onkeypress = (evt) => {
        var e = event || evt;
        var charCode = e.which || e.keyCode;

        if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;

        return true;
    };

    price.onkeypress = (evt) => {
        var e = event || evt;
        var charCode = e.which || e.keyCode;

        if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;

        return true;
    };

    initTables();

    abonButton.onclick = (e) => {
        e.preventDefault();

        addAbonRow();
        showSumm();
        sendAbonData(globalTable.abon);
    };

    goodsButton.onclick = (e) => {
        e.preventDefault();

        addGoodsRow();
        showSumm();
        sendGoodsData(globalTable.goods);
    };
})();