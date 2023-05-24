const mongoose=require ('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/mernFood',{useNewUrlParser:true})

const User=mongoose.model('User',{

    username: String,
    location: String,
    email: String,
    password: Number,
    cart:[{
      email: String,
        id:String,
        name:String,
        img:String,
        qty:String,        
        price:String,
        totalprice:String
    }]
})

const Fooditem = mongoose.model('FoodItem',

  { id:String,
  CategoryName:String,
  name:String,
  img: String,
  options: [
    {
      half:String,
      full:String
    }
  ],
  description:String,
}
  
)



module.exports={
      User,Fooditem
}