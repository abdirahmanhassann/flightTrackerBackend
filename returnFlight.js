"use strict";
/// <reference types="node" />
/// <reference types="puppeteer" />
const puppeteer = require('puppeteer');
const nodemailer = require("nodemailer");
require('dotenv').config();
class Run {
    async returnFlight(destination1, destination2, budget, email, type, dateTo, dateFrom) {
        function swap(date) {
            const parts = date.split("-");
            const day = parts[0];
            const month = parts[1];
            const year = parts[2];
            const swappedDateStr = `${month}-${day}-${year}`;
            return swappedDateStr;
        }
        const browser = await puppeteer.launch({
            args: [
                "--disable-setuid-sandbox",
                "--no-sandbox",
                "--single-process",
                "--no-zygote",
            ],
            executablePath: process.env.NODE_ENV === "production"
                ? process.env.PUPPETEER_EXECUTABLE_PATH
                : puppeteer.executablePath(),
        });
        const page = await browser.newPage();
        await page.goto('https://www.google.us/travel/flights');
        try {
            const closeButton = await page.$('button[aria-label="Close"]');
            if (closeButton) {
                await closeButton.click();
            }
            console.log('on the website');
            const currency = await page.$x('//*[@id="yDmH0d"]/c-wiz[2]/div/div[2]/c-wiz/div[1]/c-wiz/div[2]/div[3]/c-wiz/footer/div[1]/c-wiz/button[3]');
           console.log('currency has just been found')
           await new Promise(resolve => setTimeout(resolve, 5000));
           console.log('5 secs after currency was found')
            await currency[0].scrollIntoView();
                        await new Promise(resolve => setTimeout(resolve, 5000));
            await currency[0].click();
            await new Promise(resolve => setTimeout(resolve, 2000));
            const modal = await page.$x('//*[@id="yDmH0d"]/div[5]/div[1]/div[3]/div/div[1]/div/div[1]/div/div/div/div[1]/div');
            if (await modal.length > 0) {
                const gbpElement = await modal[0].$x('.//*[contains(text(), "GBP")]');
                if (await gbpElement.length > 0) {
                    await gbpElement[0].scrollIntoView();
                    await gbpElement[0].click();
                }
                else {
                    console.log('Element containing "GBP" not found within the modal.');
                }
            }
            else {
                console.log('Modal not found.');
            }
            // const gbp=await page.$x('//*[@id="yDmH0d"]/div[7]/div[1]/div[3]/div/div[1]/div/div[1]/div/div/div/div[1]/div/label[14]')
            // await gbp[0].scrollIntoView()
            // await gbp[0].click();
            await new Promise(resolve => setTimeout(resolve, 1000));
            const continuee = await page.$x('//*[@id="yDmH0d"]/div[5]/div[1]/div[3]/div/div[2]/div/div[2]/div[2]/div/button');
            await continuee[0].click();
            await new Promise(resolve => setTimeout(resolve, 3000));
            console.log('before choosing type');
            if (type === 'One way') {
                const dropdownn = await page.$x('//*[@id="yDmH0d"]/c-wiz[2]/div/div[2]/c-wiz/div[1]/c-wiz/div[2]/div[1]/div[1]/div[1]/div/div[1]/div[1]');
                await dropdownn[0].click();
                await new Promise(resolve => setTimeout(resolve, 1000));
                const returning = await page.$x('//*[@id="ow32"]/div[2]/div[2]/ul/li[2]');
                await returning[0].click();
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
            const input = await page.$x('//*[@id="i15"]/div[1]/div/div/div[1]/div/div/input');
            await input[0].click();
            await page.keyboard.press('End');
            await page.keyboard.down('Shift');
            for (let i = 0; i < 20; i++) {
                await page.keyboard.press('Backspace');
            }
            await page.keyboard.up('Shift');
            await page.keyboard.type(destination1);
            await page.keyboard.press('ArrowRight');
            await page.keyboard.press('Enter');
            const input2 = await page.$x('//*[@id="i15"]/div[4]/div/div/div[1]/div/div/input');
            await input2[0].click();
            await page.keyboard.press('End');
            await page.keyboard.down('Shift');
            for (let i = 0; i < 20; i++) {
                await page.keyboard.press('Backspace');
            }
            await page.keyboard.up('Shift');
            await page.keyboard.type(destination2);
            await page.keyboard.press('ArrowRight');
            await page.keyboard.press('Enter');
            await new Promise(resolve => setTimeout(resolve, 1000));
            if (type === 'One way') {
                const date = await page.$x('//*[@id="yDmH0d"]/c-wiz[2]/div/div[2]/c-wiz/div[1]/c-wiz/div[2]/div[1]/div[1]/div[1]/div/div[2]/div[2]/div/div/div[1]/div/div/div[1]/div/div[1]/div/input');
                await date[0].click();
                await new Promise(resolve => setTimeout(resolve, 1000));
                await page.keyboard.type(swap(dateTo).replace(/-/g, "/"));
                await page.keyboard.press('Enter');
                await new Promise(resolve => setTimeout(resolve, 1000));
                await page.keyboard.press('Enter');
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
            else {
                await new Promise(resolve => setTimeout(resolve, 1000));
                const date1 = await page.$x('//*[@id="yDmH0d"]/c-wiz[2]/div/div[2]/c-wiz/div[1]/c-wiz/div[2]/div[1]/div[1]/div[1]/div/div[2]/div[2]/div/div/div[1]/div/div/div[1]/div/div[1]/div/input');
                await date1[0].click();
                await new Promise(resolve => setTimeout(resolve, 1000));
                await page.keyboard.type(swap(dateTo).replace(/-/g, "/"));
                await new Promise(resolve => setTimeout(resolve, 1000));
                await page.keyboard.press('Enter');
                await new Promise(resolve => setTimeout(resolve, 1000));
                await page.keyboard.press('Enter');
                await new Promise(resolve => setTimeout(resolve, 2000));
                const date2 = await page.$x('//*[@id="ow75"]/div[1]/div/div/div[1]/div/div[2]/div/input');
                await date2[0].click();
                await page.keyboard.type(swap(dateFrom).replace(/-/g, "/"));
                await new Promise(resolve => setTimeout(resolve, 2000));
                await page.keyboard.press('Enter');
                await new Promise(resolve => setTimeout(resolve, 2000));
                await page.keyboard.press('Enter');
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
            const submitButton = await page.$x('//*[@id="yDmH0d"]/c-wiz[2]/div/div[2]/c-wiz/div[1]/c-wiz/div[2]/div[1]/div[1]/div[2]/div/button');
            await submitButton[0].click();
            await new Promise(resolve => setTimeout(resolve, 2000));
            console.log('before identifying');
            const flight = await page.$x('//*[@id="yDmH0d"]/c-wiz[2]/div/div[2]/c-wiz/div[1]/c-wiz/div[2]/div[2]/div[3]/ul');
            const flightss = await flight[0].$$('li');
            console.log('evaluate method is about to run');
            console.log('working so far....');
            const arrayofflights = [];
            for (const i of flightss) {
                const textContent = await i.evaluate((node) => node.innerText);
                const textLines = textContent.split("\n");
                let airline;
                let duration;
                let price;
                let booking;
                console.log(textLines[6]);
                if (textLines[6] && textLines[6].includes('min')) {
                    airline = textLines[6].substring(textLines[6].indexOf('min') + 3);
                }
                else if (textLines[6] && textLines[6].includes('hr')) {
                    airline = textLines[6].substring(textLines[6].indexOf('hr') + 2);
                }
                if (textLines[5] && textLines[5].includes('£')) {
                    price = textLines[5];
                    booking = textLines[4];
                    price = price.substring(price.indexOf('£') + 2).replace(',', '');
                    price = Number(price);
                }
                else if (textLines[4] && textLines[4].includes('£')) {
                    price = textLines[4];
                    booking = textLines[5];
                    price = price.substring(price.indexOf('£') + 2).replace(',', '');
                    price = Number(price);
                }
                let flightObj = {
                    departureTime: textLines[0],
                    departureAirport: textLines[1],
                    arrivalTime: textLines[2],
                    arrivalAirport: textLines[3],
                    ticketBooking: booking,
                    price: price,
                    airline: airline
                };
                arrayofflights.push(flightObj);
            }
            if (arrayofflights[0].price && arrayofflights[0].price < budget) {
                await flightss[0].click();
                await new Promise(resolve => setTimeout(resolve, 3000));
                const po = await page.$x('//*[@id="yDmH0d"]/c-wiz[2]/div/div[2]/c-wiz/div[1]/c-wiz/div[2]/div[2]/div[3]/ul/li[1]');
                if (await po[0] && await po[0].click()) {
                    await po[0].click();
                    sendemail();
                    console.log('path found');
                }
                else {
                    sendemail();
                    console.log('path not found');
                }
                async function sendemail() {
                    const urll = await page.url();
                    console.log('url', urll);
                    let transporter = await nodemailer.createTransport({
                        host: "smtp.gmail.com",
                        port: 465,
                        secure: true,
                        auth: {
                            user: process.env.email,
                            pass: process.env.pass,
                        },
                        tls: {
                            rejectUnauthorized: false,
                        },
                    });
                    await transporter.sendMail({
                        from: process.env.email,
                        to: email,
                        subject: "Flight found",
                        html: `
    <h1>A flight under £${budget} from ${destination1} to ${destination2} found!</h1>
    <p>${urll}</p>
    `,
                    });
                    console.log('email has been sent');
                }
            }
            await browser.close();
            return arrayofflights;
        }
        catch (e) {
            console.log(e);
            await browser.close();
        }
    }
}
module.exports = Run;
