const { Builder, By, Key, until } = require('selenium-webdriver');

async function aliexpressSearchTest() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Перейти на сторінку Aliexpress
        await driver.get('https://www.aliexpress.com/');

        // Шукати товар за ключовими словами
        let searchBox = await driver.findElement(By.xpath("//input[@name='SearchText']"));
        await searchBox.sendKeys('battery', Key.RETURN);

        // Очікування результатів пошуку
        await driver.wait(until.elementLocated(By.className('list-items')), 5000);

        // Перевірка наявності результатів
        let searchResults = await driver.findElements(By.className('list-items'));
        if (searchResults.length > 0) {
            console.log('Результати пошуку успішно відображені');
        } else {
            console.log('Результати пошуку не відображені');
        }

        // Порівняння цін різних товарів
        let products = await driver.findElements(By.className('list-item'));
        let firstProduct = await products[0].findElement(By.css('.price'));
        let firstProductPrice = await firstProduct.getText();
        let secondProduct = await products[1].findElement(By.css('.price'));
        let secondProductPrice = await secondProduct.getText();

        console.log('Ціна першого товару:', firstProductPrice);
        console.log('Ціна другого товару:', secondProductPrice);

    } finally {
        // Закриття веб-драйвера
        await driver.quit();
    }
}

// Виклик функції для тестування
aliexpressSearchTest();