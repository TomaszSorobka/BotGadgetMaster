const puppeteer = require('puppeteer');

puppeteer.launch({
    args: ['--proxy-server=x.botproxy.net:8080'],
    headless: false
}).then(async browser => {
    const page = await browser.newPage();
    page.authenticate({
        username: 'proxy-user',
        password: 'proxy-password'
    });
    await page.setExtraHTTPHeaders({
        'SomeHeader': 'test'
    });
    await page.goto('http://httpbin.org/ip');
    // other actions...
    let content = await page.content();
    console.log(content);
    await browser.close();
});