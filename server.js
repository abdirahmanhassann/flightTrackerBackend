"use strict";
const run = require('./returnFlight.js');
let { db } = require('./firebase.js');
const express = require('express');
const app = express();
require('dotenv').config();
async function fb() {
    const document = await db.collection('users').get();
    const g = document.docs.map((doc) => { return Object.assign(Object.assign({}, doc.data()), { id: doc.id }); });
    // const emails=document.docs.map((doc:any)=>doc.id)
    console.log(g);
    for (const item of g) {
        console.log(item, item.id, 'item');
        //console.log(email)
        if (item.queries) {
            for (const element of item.queries) {
                if (element.from && element.to) {
                    let newflight = new run();
                    let budget;
                    while (!budget) {
                        budget = await newflight
                            .returnFlight(element.from.trim(), element.to.trim(), element.budget, item.id, element.type, element.dateFrom, element.dateTo);
                    }
                }
                console.log('End of all queries.')
            }
        }
    }
}
fb();
app.get("/", async (req, res) => {
//    await fb();
    res.send("Render Puppeteer server is finished!");
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
