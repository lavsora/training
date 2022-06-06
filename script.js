'use strict'

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    rollback: 10,
    fullPrice: 0,
    servicePercentPrice: 0,
    allServicePrices: 0,
    services: {},
    start: function() {
        appData.asking();
        appData.addPrices();
        appData.getFullPrice();
        appData.getTitle();
        appData.getServicePercentPrices();

        appData.logger();
    },
    asking: function() {
        do {
            appData.title = prompt('Как называется ваш проект?', 'Калькулятор верстки');
        } while (!appData.isString(appData.title))

        for (let i = 0; i < 2; i++) {
            let name;
            let price = 0

            do {
               name = prompt('Какие типы экранов нужно разработать?');
            } while (!appData.isString(name));

            do {
                price = prompt('Сколько будет стоить данная работа?');
            } while (!appData.isNumber(price));

            appData.screens.push({id: i, name: name, price: price})
        }

        for (let i = 0; i < 2; i++) {
            let name;
            let price = 0;

            do {
               name = prompt('Какой дополнительный тип услуги нужен?');
            } while (!appData.isString(name));
    
            do {
                price = prompt('Сколько это будет стоить?');
            } while (!appData.isNumber(price));
    
            appData.services[name] = +price;
        }
    
        appData.adaptive = confirm('Нужен ли адаптив на сайте?');
    },
    addPrices: function() {
        appData.screenPrice = appData.screens.reduce(function(sum, screen) {
            return sum + +screen.price;
        }, 0)

        for (let key in appData.services) {
            appData.allServicePrices += appData.services[key]
        }
    },
    isNumber: function(num) {
        return !isNaN(parseFloat(num)) && isFinite(num) && !/\s/g.test(num);
    },
    isString: function(str) {
        return isNaN(parseFloat(str));
    },
    getTitle: function() {
        appData.title = appData.title.trim()[0].toUpperCase() + appData.title.trim().substring(1).toLowerCase();
    },
    getFullPrice: function() {
        appData.fullPrice = +appData.screenPrice + appData.allServicePrices;
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
        appData.servicePercentPrice = Math.ceil(appData.fullPrice - appData.fullPrice * (appData.rollback/100));
    },
    logger: function() {
        console.log('appData.fullPrice - ' + appData.fullPrice);
        console.log('appData.servicePercentPrice - ' + appData.servicePercentPrice);
        console.log(appData.screens);

        for (let key in appData) {
            console.log('Свойства и методы appData: ' + key);
        }
    }
}

appData.start();
