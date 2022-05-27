let title, screens, screenPrice, rollback, fullPrice, adaptive;

title = "Training project";
screens = "Simple, Complex, Interactive";
screenPrice = 50;
rollback = 24;
fullPrice = 256;
adaptive = false;

console.log(typeof title, typeof fullPrice, typeof adaptive);

console.log(screens.length);

console.log("Стоимость верстки экранов " + screenPrice + " долларов");
console.log("Стоимость разработки сайта" + " " + fullPrice + " " + "долларов");

console.log(screens.toLocaleLowerCase());
console.log(screens.split(', '));

console.log(fullPrice * (rollback/100));