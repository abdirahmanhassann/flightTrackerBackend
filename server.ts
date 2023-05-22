
const  run=require('./returnFlight.ts');
let {db} = require('./firebase/firebase')
const express= require('express')
const app=express()
require('dotenv').config()

async function fb(){
   const document = await db.collection('users').get();
  const g=document.docs.map((doc:any)=>{return{...doc.data(),id:doc.id}})
 // const emails=document.docs.map((doc:any)=>doc.id)
console.log(g)
  for (const item of g) {
   console.log(item,item.id,'item')
   //console.log(email)
   if (item.queries) {
     for (const element of item.queries) {
       if (element.from && element.to) {
         let newflight = new run();
        let budget;
    
        while(!budget){
         budget= await newflight
         .returnFlight(element.from.trim()
         , element.to.trim(),
         element.budget
         ,item.id,
         element.type,
         element.dateFrom,
         element.dateTo
         
         );
        }
          
       }
     }
   }
 }
}

app.get("/", async (req:any, res:any) => {
  
  await fb();
  res.send("Render Puppeteer server is finished!");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});