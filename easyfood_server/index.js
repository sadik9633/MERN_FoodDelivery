const express = require('express')


const app = express()

const cors = require('cors')

const logic = require('./Service/logic')
const jwt=require('jsonwebtoken')

// connectn with frontend

app.use(cors({ origin: 'http://localhost:3000' }))

app.use(express.json())

// port seting for server

app.get('/',(req,res)=>{
    res.send('helloworld')
})

app.listen(8000, () => {
   console.log("server started at port 8000");
})


app.post("/register",(req,res)=>{
    logic.register(req.body.username,req.body.location,req.body.email,req.body.password,req.body.date).then(result=>{
        res.status(result.statusCode).json(result)
       })
})
app.post('/login',(req,res)=>{

    logic.login(req.body.email,req.body.password).then(result=>{
        //convert object to json and send
    res.status(result.statusCode).json(result) 
    })
})

app.get('/allFoods', (req, res) => {
    logic.allFoods().then(result => {
       res.status(result.statusCode).json(result)
    })
 })
 
 app.post('/addToCart', (req, res) => {
    logic.addcart(req.body.email, req.body.id, req.body.name, req.body.img, req.body.qty, req.body.price, req.body.totalprice).then(result => {
      res.status(result.statusCode).json(result)
    })
  })
app.post('/getaddtocart',(req,res)=>{

    logic.getaddtocart(req.body.email).then(result=>{
res.status(result.statusCode).json(result)
    })
})

app.post('/removefromcart', (req, res) => {
    const { email, itemId } = req.body;
    logic.removefromcart(email, itemId).then(result => {
      res.status(result.statusCode).json(result);
    });
  });
       