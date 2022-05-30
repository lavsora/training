const title = prompt('Как называется ваш проект?');
let screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные');
const screenPrice = +prompt('Сколько будет стоить данная работа?');
let adaptive = confirm('Нужен ли адаптив на сайте?');

const service1 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice1 = +prompt('Сколько это будет стоить?');
const service2 = prompt('Какой дополнительный тип услуги нужен?');
const servicePrice2 = +prompt('Сколько это будет стоить?');

const rollback = 24;
const fullPrice = screenPrice + servicePrice1 + servicePrice2;

const servicePercentPrice = Math.ceil(fullPrice - fullPrice * (rollback/100));

console.log('Чистая прибыль ' + servicePercentPrice + ' рублей');

switch(true) {
    case fullPrice >= 30000:
        console.log('Даем скидку в 10%');
        break;
    case fullPrice >= 15000:
        console.log('Даем скидку в 5%');
        break;
    case fullPrice >= 0:
        console.log('Скидка не предусмотрена');
        break;
    default:
        console.log('Что то пошло не так');
        break;
}

console.log(typeof title, typeof fullPrice, typeof adaptive);

console.log(screens.length);

console.log("Стоимость верстки экранов " + screenPrice + " долларов");
console.log("Стоимость разработки сайта " + fullPrice + " долларов");

console.log(screens.toLocaleLowerCase());
console.log(screens.split(', '));

console.log("Процент отката посреднику за работу " + fullPrice * (rollback/100) + " долларов");