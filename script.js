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

const getAllServicePrices = function(servPrice1, servPrice2) {
    return servPrice1 + servPrice2;
};

function getFullPrice(scrPrice, allServPrice) {
    return scrPrice + allServPrice;
};

const getTitle = function(str) {
    str = str.trim();

    return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
};

const getServicePercentPrices = function(fPrice, rBack) {
    return Math.ceil(fPrice - fPrice * (rBack/100));
};

allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);
fullPrice = getFullPrice(screenPrice, allServicePrices);
title = getTitle(title);
servicePercentPrice = getServicePercentPrices(fullPrice, rollback);

console.log(showTypeOf(title));
console.log(showTypeOf(fullPrice));
console.log(showTypeOf(adaptive));

console.log(screens);

console.log(getRollBackMessage(fullPrice));

console.log('Чистая прибыль ' + servicePercentPrice + ' долларов');