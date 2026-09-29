const express = require('express');
const app = express();
const cors= require('cors')
const bcrypt = require('bcrypt')
const jsonWebToken = require('jsonwebtoken')
const { MongoClient,ObjectId } =require('mongodb')
require('dotenv').config()
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ofz2urn.mongodb.net/?appName=Cluster0`
const client = new MongoClient(uri);
let carsCollection
let usersCollection 
async function connectDB(){

    await client.connect()
    const db = client.db("car-app")
    carsCollection = db.collection("cars")
    usersCollection=db.collection("users")
}
connectDB();
app.use(cors())
app.use(express.json()); 


// auth
app.post('/register',async function(req,res){ 
    
    let existingUser =await usersCollection.findOne({username:req.body.username})
    if(existingUser){
        return res.status(400).json({message:"the name is used"})
    }
    const hashPassward= await bcrypt.hash(req.body.password,10)
    await usersCollection.insertOne({username:req.body.username,password:hashPassward})
    return res.status(201).json({message:"the user has been added"})

})

app.post('/login',async function(req,res){

    if(typeof req.body.username !== 'string')
    {return res.status(400).json({ message: 'invalid input' });}
    if(typeof req.body.password !== 'string')
    {return res.status(400).json({ message: 'invalid input' });}


    let checkUserName= await usersCollection.findOne({username:req.body.username})
    if (!checkUserName){return res.status(401).json({message:('invalid username or password')})}
    const isMatch = await bcrypt.compare(req.body.password , checkUserName.password)
    if(!isMatch){return res.status(401).json({message:('invalid username or password')})}
    res.status(200).json({message:("Logged in")})
    })



app.get('/',function(req,res){
    res.send('أهلا من السيرفر')
});

// app.get('/about',function(req,res){
//     res.send('هاي الصفحه انا الي عملتها')

// })
// let cars =[
//   {brand: "toyota", price: 15000},
//   {brand: "honda", price: 18000},
//   {brand: "bmw", price: 25000},
//   {brand: "سوزوكس", price: 25000}
// ]

// app.get('/cars',function(req,res){
//     res.json(cars)

// })

// app.post('/cars',function(req,res){
//     cars.push(req.body);
//     res.json(cars);

// })
app.get('/cars', async function(req,res){
    let allCars = await carsCollection.find().toArray();
    res.json(allCars)

})

app.post('/cars',async function(req,res){
    let informationTheCar = await carsCollection.insertOne(req.body)
    res.json(informationTheCar)


})

app.delete('/cars/:id',async function(req,res){
    let deleteItem = await carsCollection.deleteOne({_id: new ObjectId(req.params.id)})
    res.send(deleteItem)
})


app.put('/cars/:id',async function(req,res){
let updateData= await carsCollection.updateOne(
{_id:new ObjectId(req.params.id)},
{$set:req.body})
res.send(updateData)
})



app.listen(3000, function(){
    console.log('السيرفر شغال على بورت 3000')

})

