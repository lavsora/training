'use strict'

let title = prompt('Как называется ваш проект?');

const screens = prompt('Какие типы экранов нужно разработать?');
const screenPrice = +prompt('Сколько будет стоить данная работа?');
const adaptive = confirm('Нужен ли адаптив на сайте?');
const service1 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice1 = +prompt('Сколько это будет стоить?');
const service2 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice2 = +prompt('Сколько это будет стоить?');
const rollback = 24;

let fullPrice;
let servicePercentPrice;
let allServicePrices;

const showTypeOf = function(variable) {
    console.log(variable, typeof variable);
};

const getRollBackMessage = function(price) {
    switch(true) {
        case price >= 30000:
            console.log('Даем скидку в 10%');
            break;
        case price >= 15000:
            console.log('Даем скидку в 5%');
            break;
        case price >= 0:
            console.log('Скидка не предусмотрена');
            break;
        default:
            console.log('Что то пошло не так');
    }
}

const getAllServicePrices = function(servPrice1, servPrice2) {
    return servPrice1 + servPrice2;
};

function getFullPrice(scrPrice, allServPrice) {
    return scrPrice + allServPrice;
};

const getTitle = function(str, callback) {
    return callback(str).charAt(0).toUpperCase() + callback(str).substring(1).toLowerCase();
};

const getServicePercentPrices = function(fPrice, rBack) {
    return Math.ceil(fPrice - fPrice * (rBack/100));
};

allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);
fullPrice = getFullPrice(screenPrice, allServicePrices);
title = getTitle(title, function(strDeleteTabs) {
    return strDeleteTabs.trim();
});
servicePercentPrice = getServicePercentPrices(fullPrice, rollback);

showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log(screens);

getRollBackMessage(fullPrice);

console.log('Чистая прибыль ' + servicePercentPrice + ' долларов');