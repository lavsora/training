const title = "Training project";
let screens = "Simple, Complex, Interactive";
const screenPrice = 50;
let rollback = 24;
const fullPrice = 256;
let adaptive = false;

console.log(typeof title, typeof fullPrice, typeof adaptive);

console.log(screens.length);

console.log("Стоимость верстки экранов " + screenPrice + " долларов");
console.log("Стоимость разработки сайта " + fullPrice + " долларов");

console.log(screens.toLocaleLowerCase());
console.log(screens.split(', '));

console.log("Процент отката посреднику за работу " + fullPrice * (rollback/100) + "%");