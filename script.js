'use strict'

let title;
let screens;
let screenPrice;
let adaptive;
let fullPrice;
let servicePercentPrice;
let allServicePrices;
let service1;
let service2;

const rollback = 10;

const isNumber = function(num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
}

const asking = function() {
    title = prompt('Как называется ваш проект?', 'Калькулятор верстки');
    screens = prompt('Какие типы экранов нужно разработать?', 'Простые');

    do {
        screenPrice = prompt('Сколько будет стоить данная работа?');
    }
    while (!isNumber(screenPrice));

    adaptive = confirm('Нужен ли адаптив на сайте?');
}

const showTypeOf = function(variable) {
    return variable + ` - ` + typeof variable;
};

const getRollBackMessage = function(price) {
    switch(true) {
        case price >= 30000:
            return 'Даем скидку в 10%';
            
        case price >= 15000:
            return'Даем скидку в 5%';
            
        case price >= 0:
            return'Скидка не предусмотрена';
            
        default:
            return'Что то пошло не так';
    }
}

const getAllServicePrices = function() {
    let servPrice1;
    let servPrice2;
    let sumServPrice;

    for (let i = 0; i < 2; i++) {

        if (i === 0) {
            service1 = prompt('Какой дополнительный тип услуги нужен?');

            do {
                servPrice1 = +prompt('Сколько это будет стоить?');
            } while (!isNumber(servPrice1))

        } else if (i === 1) {
            service2 = prompt('Какой дополнительный тип услуги нужен?');

            do {
                servPrice2 = +prompt('Сколько это будет стоить?');
            } while (!isNumber(servPrice2))

        }
    }

    return sumServPrice = servPrice1 + servPrice2;
};

function getFullPrice() {
    return +screenPrice + allServicePrices;
};

const getTitle = function(str) {
    str = str.trim();

    return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
};

const getServicePercentPrices = function() {
    return Math.ceil(fullPrice - fullPrice * (rollback/100));
};

asking();
screenPrice = screenPrice.replace(/\s/g, '');
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
title = getTitle(title);
servicePercentPrice = getServicePercentPrices();

console.log(showTypeOf(title));
console.log(showTypeOf(fullPrice));
console.log(showTypeOf(adaptive));

console.log("allServicePrices", allServicePrices);

console.log(screens);

console.log(getRollBackMessage(fullPrice));

console.log('Чистая прибыль ' + servicePercentPrice + ' долларов');
