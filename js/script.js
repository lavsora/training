'use strict'

const title = document.getElementsByTagName('h1')[0];

const buttonStart = document.getElementsByClassName('handler_btn')[0];
const buttonReset = document.getElementsByClassName('handler_btn')[1];

const buttonScreen = document.querySelector('.screen-btn');

const number = document.querySelectorAll('.other-items.number');
const percent = document.querySelectorAll('.other-items.percent');

const inputSliderRollback = document.querySelector('.rollback input');
const spanRangeValue = document.querySelector('.rollback span');

const inputLayotPrice = document.getElementsByClassName('total-input')[0];
const inputAmountScreen = document.getElementsByClassName('total-input')[1];
const inputServicesPrice = document.getElementsByClassName('total-input')[2];
const inputFullPrice = document.getElementsByClassName('total-input')[3];
const inputFullPriceRollback = document.getElementsByClassName('total-input')[4];

let divScreen = document.getElementsByClassName('screen');

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    rollback: 0,
    isError: false,
    countScreen: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    servicesPercent: {},
    servicesNumber: {},
    init: function () {
        appData.addTitle();

        buttonStart.addEventListener('click', appData.checkValue);
        buttonScreen.addEventListener('click', appData.addScreenBlock);
        inputSliderRollback.addEventListener('input', appData.addRollback);
    },
    checkValue: function () {
        appData.isError = false;

        for (let i = 0; i < divScreen.length; i++) {
            const selectValue = document.querySelector('.screen select').value;
            const inputValue = document.querySelector('.screen input').value;

            if (selectValue === '' || inputValue === '') {
                appData.isError = true
            }
        }

        if (!appData.isError) {
            appData.start();
        } else {
            alert('Ошибка! Выберите тип экрана или введите количество экранов.')
        }
    },
    addTitle: function () {
        document.title = title.textContent;
    },
    start: function () {
        appData.addScreens();
        appData.addServices();
        appData.addPrices();
        appData.showResult();
    },
    showResult: function () {
        inputLayotPrice.value = appData.screenPrice;
        inputServicesPrice.value = appData.servicePricesPercent + appData.servicePricesNumber;
        inputFullPrice.value = appData.fullPrice;
        inputFullPriceRollback.value = appData.servicePercentPrice;
        inputAmountScreen.value = appData.countScreen;
    },
    addRollback: function () {
        spanRangeValue.textContent = `${inputSliderRollback.value}%`;
        appData.rollback = +inputSliderRollback.value;
    },
    addScreens: function () {
        for (let i = 0; i < divScreen.length; i++) {
            const select = document.querySelector('select');
            const input = document.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;

            appData.screens.push({
                id: i,
                name: selectName,
                price: +select.value * +input.value,
                count: +input.value
            });
        }
    },
    addServices: function () {
        percent.forEach(function (item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                appData.servicesPercent[label.textContent] = +input.value
            }
        })

        number.forEach(function (item) {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                appData.servicesNumber[label.textContent] = +input.value
            }
        })
    },
    addScreenBlock: function () {
        const cloneScreen = divScreen[0].cloneNode(true);

        cloneScreen.querySelector('input').value = '';
        divScreen[divScreen.length - 1].after(cloneScreen);
    },
    addPrices: function () {
        appData.screenPrice = appData.screens.reduce(function (sum, screen) {
            return sum + +screen.price;
        }, 0)

        for (let key in appData.screens) {
            appData.countScreen += appData.screens[key].count
        }

        for (let key in appData.servicesNumber) {
            appData.servicePricesNumber += appData.servicesNumber[key]
        }

        for (let key in appData.servicesPercent) {
            appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100)
        }

        appData.fullPrice = +appData.screenPrice + appData.servicePricesNumber + appData.servicePricesPercent;

        appData.servicePercentPrice = Math.ceil(appData.fullPrice - appData.fullPrice * (appData.rollback / 100));
    },
    logger: function () {
        console.log('appData.fullPrice - ' + appData.fullPrice);
        console.log('appData.servicePercentPrice - ' + appData.servicePercentPrice);
        console.log(appData.screens);

        for (let key in appData) {
            console.log('Свойства и методы appData: ' + key);
        }
    }
}

appData.init();
