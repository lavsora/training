'use strict'

const appData = {
    title: '',
    screens: '',
    screenPrice: 0,
    adaptive: true,
    rollback: 10,
    fullPrice: 0,
    servicePercentPrice: 0,
    allServicePrices: 0,
    service1: '',
    service2: '',
    asking: function() {
        appData.title = prompt('Как называется ваш проект?', 'Калькулятор верстки');
        appData.screens = prompt('Какие типы экранов нужно разработать?', 'Простые');
    
        do {
            appData.screenPrice = prompt('Сколько будет стоить данная работа?');
        }
        while (!appData.isNumber(appData.screenPrice));
    
        appData.adaptive = confirm('Нужен ли адаптив на сайте?');
    },
    getTitle: function(str) {
        str = str.trim();
    
        return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
    },
    getFullPrice: function() {
        return +appData.screenPrice + appData.allServicePrices;
    },
    getAllServicePrices: function() {
        let sum = 0;
    
        for (let i = 0; i < 2; i++) {
            let price = 0;
    
            if (i === 0) {
                appData.service1 = prompt('Какой дополнительный тип услуги нужен?');
            } else if (i === 1) {
                appData.service2 = prompt('Какой дополнительный тип услуги нужен?');
            }
    
            do {
                price = prompt('Сколько это будет стоить?');
            } while (!appData.isNumber(price))
    
            sum += +price;
        }
    
        return sum;
    },
    getRollBackMessage: function(price) {
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
    },
    getServicePercentPrices: function() {
        return Math.ceil(appData.fullPrice - appData.fullPrice * (appData.rollback/100));
    },
    isNumber: function(num) {
        return !isNaN(parseFloat(num)) && isFinite(num) && !/\s/g.test(num);
    },
    start: function() {
        appData.asking();
        appData.allServicePrices = appData.getAllServicePrices();
        appData.fullPrice = appData.getFullPrice();
        appData.title = appData.getTitle(appData.title);
        appData.servicePercentPrice = appData.getServicePercentPrices();

        appData.logger();
    },
    logger: function() {
        console.log('appData.fullPrice - ' + appData.fullPrice);
        console.log('appData.servicePercentPrice - ' + appData.servicePercentPrice);

        for (let key in appData) {
            console.log('Свойства и методы appData: ' + key);
        }
    }
}

appData.start();
