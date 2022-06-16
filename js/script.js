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

const inputCms = document.querySelector('#cms-open');
const cmsVariants = document.querySelector('.hidden-cms-variants');
const otherBlock = document.querySelector('.hidden-cms-variants .main-controls__input');
const cmsSelect = document.querySelector('.hidden-cms-variants #cms-select');
const otherInput = document.querySelector('#cms-other-input');

let divScreen = document.getElementsByClassName('screen');

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    rollback: 0,
    cmsPercent: 0,
    cmsPercentPrice: 0,
    isError: false,
    countScreen: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    servicesPercent: {},
    servicesNumber: {},
    init: function () {
        this.addTitle();

        buttonStart.addEventListener('click', this.checkValue.bind(this));
        buttonReset.addEventListener('click', this.reset.bind(this));
        buttonScreen.addEventListener('click', this.addScreenBlock);
        inputSliderRollback.addEventListener('input', this.addSpanRangeValue);
        inputSliderRollback.addEventListener('change', this.addRollbackValue.bind(this));
        inputCms.addEventListener('change', this.cmsOpen.bind(this));
    },
    cmsOpen: function () {
        if (inputCms.checked) {
            cmsVariants.style.display = 'flex';
            this.otherSelectVision();
        } else {
            cmsVariants.style.display = 'none';

            cmsSelect.value = '';
            otherBlock.style.display = 'none';
        }
    },
    otherSelectVision: function() {
        cmsSelect.addEventListener('change', (() => {
            if (cmsSelect.value === 'other') {
                otherBlock.style.display = 'block';
            } else if (cmsSelect.value === '50'){
                otherBlock.style.display = 'none';
            } else {
                otherBlock.style.display = 'none';
            }
        }))
    },
    addCmsValue: function() {
        if (inputCms.checked) {
            if (cmsSelect.value === 'other') {
                this.cmsPercent = +otherInput.value;
            } else if (cmsSelect.value === '50'){
                this.cmsPercent = +cmsSelect.value;
            } else {
                this.cmsPercent = 0;
            }
        }
    },
    checkValue: function () {
        this.isError = false;

        for (let i = 0; i < divScreen.length; i++) {
            const selectValue = divScreen[i].querySelector('.screen select').value;
            const inputValue = divScreen[i].querySelector('.screen input').value;

            if (selectValue === '' || inputValue === '') {
                this.isError = true
            }
        }

        if (!this.isError) {
            this.start();
        } else {
            alert('Ошибка! Выберите тип экрана или введите количество экранов.')
        }
    },
    addTitle: function () {
        document.title = title.textContent;
    },
    start: function () {
        this.addScreens();
        this.addCmsValue();
        this.addServices();
        this.addPrices();
        this.showResult();
        this.disabledInputAndSelect();
        this.disabledBtnScreen();
        this.disabledCheckbox();
        this.btnResetVision();
    },
    reset: function () {
        this.deleteScreenBlock();
        this.deleteCheck();
        this.deleteSpanRangeValue();
        this.clearPrices();
        this.showResult();
        this.activatedCheckbox();
        this.activatedBtnScreen();
        this.visionInputAndSelect();
        this.btnStartVision();
    },
    showResult: function () {
        inputLayotPrice.value = this.screenPrice;
        inputServicesPrice.value = this.servicePricesPercent + this.servicePricesNumber;
        inputFullPrice.value = this.fullPrice;
        inputFullPriceRollback.value = this.servicePercentPrice;
        inputAmountScreen.value = this.countScreen;
    },
    disabledInputAndSelect: function () {
        for (let i = 0; i < divScreen.length; i++) {
            const select = divScreen[i].querySelector('.screen select');
            const input = divScreen[i].querySelector('.screen input');

            select.setAttribute('disabled', 'disabled');
            input.setAttribute('disabled', 'disabled');
        }
    },
    disabledCheckbox: function () {
        inputCms.setAttribute('disabled', 'disabled');
        cmsSelect.setAttribute('disabled', 'disabled');
        otherInput.setAttribute('disabled', 'disabled');

        percent.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            
            check.setAttribute('disabled', 'disabled');
        });

        number.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            
            check.setAttribute('disabled', 'disabled');
        });
    },
    disabledBtnScreen: function () {
        buttonScreen.setAttribute('disabled', 'disabled');
    },
    activatedCheckbox: function () {
        inputCms.removeAttribute('disabled');
        cmsSelect.removeAttribute('disabled');
        otherInput.removeAttribute('disabled');

        percent.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            
            check.removeAttribute('disabled');
        });

        number.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            
            check.removeAttribute('disabled');
        });
    },
    activatedBtnScreen: function () {
        buttonScreen.removeAttribute('disabled');
    },
    visionInputAndSelect: function () {
        const select = document.querySelector('.screen select');
        const input = document.querySelector('.screen input');

        select.value = '';
        input.value = '';

        select.removeAttribute('disabled');
        input.removeAttribute('disabled');
    },
    btnResetVision: function () {
        buttonStart.style.display = 'none';
        buttonReset.removeAttribute('style');
    },
    btnStartVision: function () {
        buttonReset.style.display = 'none';
        buttonStart.removeAttribute('style');
    },
    addSpanRangeValue: function () {
        spanRangeValue.textContent = `${inputSliderRollback.value}%`;
    },
    addRollbackValue: function () {
        this.rollback = +inputSliderRollback.value;
        this.servicePercentPrice = Math.ceil(this.fullPrice - this.fullPrice * (this.rollback / 100));

        this.showResult();
    },
    addScreens: function () {
        for (let i = 0; i < divScreen.length; i++) {
            const select = divScreen[i].querySelector('select');
            const input = divScreen[i].querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;


            this.screens.push({
                id: i,
                name: selectName,
                price: +select.value * +input.value,
                count: +input.value
            });
        }
    },
    addServices: function () {
        percent.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                this.servicesPercent[label.textContent] = +input.value
            }
        })

        number.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                this.servicesNumber[label.textContent] = +input.value
            }
        })
    },
    addScreenBlock: function () {
        const cloneScreen = divScreen[0].cloneNode(true);

        cloneScreen.querySelector('input').value = '';
        divScreen[divScreen.length - 1].after(cloneScreen);
    },
    addPrices: function () {
        this.screenPrice = this.screens.reduce((sum, screen) => {
            return sum + +screen.price;
        }, 0)

        for (let key in this.screens) {
            this.countScreen += this.screens[key].count
        }

        for (let key in this.servicesNumber) {
            this.servicePricesNumber += this.servicesNumber[key]
        }

        for (let key in this.servicesPercent) {
            this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100)
        }

        this.fullPrice = +this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;

        if (this.cmsPercent > 0) {
            this.cmsPercentPrice = Math.ceil(this.fullPrice * (this.cmsPercent / 100));
            this.fullPrice = this.fullPrice + this.cmsPercentPrice;
        }

        this.servicePercentPrice = Math.ceil(this.fullPrice - this.fullPrice * (this.rollback / 100));
    },
    deleteCheck: function () {
        if (inputCms.checked) {
            if (cmsSelect.value === 'other') {
                otherInput.value = '';
                otherBlock.style.display = 'none';
            }
            cmsSelect.value = '';
            inputCms.checked = false;
            cmsVariants.style.display = 'none';
        }

        percent.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');

            if (check.checked) check.checked = false;
        })

        number.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');

            if (check.checked) check.checked = false;
        })
    },
    deleteScreenBlock: function () {
        for (let i = 1; i < divScreen.length; i) {
            divScreen[i].remove();
        }
    },
    clearPrices: function () {
        this.screens = [];
        this.screenPrice = 0;
        this.countScreen = 0;
        this.rollback = 0;
        this.fullPrice = 0;
        this.cmsPercent = 0;
        this.cmsPercentPrice = 0;
        this.servicePercentPrice = 0;
        this.servicePricesPercent = 0;
        this.servicePricesNumber = 0;
        this.servicesPercent = {};
        this.servicesNumber = {};
    },
    deleteSpanRangeValue: function () {
        spanRangeValue.textContent = '0%';
        inputSliderRollback.value = 0;
    }
}

appData.init();
