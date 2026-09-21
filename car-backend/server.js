const express = require('express');
const app = express();
const cors= require('cors')
const { MongoClient } =require('mongodb')
require('dotenv').config()
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ofz2urn.mongodb.net/?appName=Cluster0`
const client = new MongoClient(uri);

async function connectDB(){

    await client.connect()
    console.log("تم الاتصال بنجاح")
}
connectDB();
app.use(cors())
app.use(express.json()); 

app.get('/',function(req,res){
    res.send('أهلا من السيرفر')
});

app.get('/about',function(req,res){
    res.send('هاي الصفحه انا الي عملتها')

})
let cars =[
  {brand: "toyota", price: 15000},
  {brand: "honda", price: 18000},
  {brand: "bmw", price: 25000},
  {brand: "سوزوكس", price: 25000}
]

app.get('/cars',function(req,res){
    res.json(cars)

})

app.post('/cars',function(req,res){
    cars.push(req.body);
    res.json(cars);

})

app.listen(3000, function(){
    console.log('السيرفر شغال على بورت 3000')

})