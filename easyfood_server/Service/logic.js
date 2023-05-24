const db=require('./db')
const jwt = require("jsonwebtoken")


const register = (username,location,email,password,date) => {
    //if(acno in userDetails){
    return db.User.findOne({ email }).then(user => {
      if (user) {
        return {
          status: false,
          message: 'user alredy present',
          statusCode: 401
        }
      }
      else {
        // create new user object in db
        const newuser = new db.User({
          username:username,
          location:location,
          email:email,
          password:password,
          date:date,
          cart:[]
          
        })
        //save in db
        newuser.save()
        return {
          status: true,
          message: 'registered',
          statusCode: 200
        }
      }
    })
  
  }

  const  login = (email,password) => {
    //if (acno in userDetails) {
    return db.User.findOne({ email:email,password:password }).then(user => {
      if (user) {
        currentUser = user.username
        //console.log(this.currentUser);
        currentEmail = email
  
  //token generation
  const token = jwt.sign({ currentEmail }, "superkey123"
  )
          return {
          status: true,
          message: 'login success',
          statusCode: 200,
          currentUser,
          currentEmail,
          token
        
        }
      }
      else {
        return {
          status: false,
          message: 'incurrect email or password',
          statusCode: 401
        }
      }
    })
  }

  const allFoods=()=>{
    return db.Fooditem.find().then(result=>{
           if(result){
               return{
                   statusCode:200,
                   foods:result
               }
           }
           else{
               return{
                   statusCode:404,
                   message:"no data is available"
               }
           }
       })
    }

    const addcart = (email,id,name,img,qty,price,totalprice) => {
      qty = parseInt(qty);
      price = parseInt(price);
      totalprice = parseInt(totalprice);
    
      return db.User.findOne({email}).then(user => {
        if(user) {
          if(user.cart.some(item => item.id === id)) {
            return {
              status: false,
              message: 'Item already added to your cart',
              statusCode: 400
            };
          } else {
            user.cart.push({
              email: email,
              id: id,
              name: name,
              img: img,
              qty: qty,
              price: price,
              totalprice: totalprice
            });
    
            user.save();
    
            return {
              status: true,
              statusCode: 200,
              message: 'Item ordered'
            };
          }
        } else {
          return {
            status: false,
            message: 'Please register or login before order',
            statusCode: 401
          };
        }
      });
    };        const getaddtocart = (email) => {
          return db.User.findOne( {email} ).then(user=>{
            if(user){
              return {
                status: true,
                statusCode: 200,
                cart:user.cart
              }
            }else{
              return {
                status: false,
                statusCode: 401,
                message:"booking is empty"
              }
            }
          })
        }

        const removefromcart = (email, itemId) => {
          return db.User.findOneAndUpdate({ email }, { $pull: { cart: { id: itemId } } })
            .then(user => {
              if (user) {
                return {
                  status: true,
                  statusCode: 200,
                  message: "Item removed from cart"
                };
              } else {
                return {
                  status: false,
                  statusCode: 401,
                  message: "User not found"
                };
              }
            })
            .catch(error => {
              console.log(error);
              return {
                status: false,
                statusCode: 500,
                message: "Internal server error"
              };
            });
        };
            
  module.exports = {
    register,login,allFoods,addcart,getaddtocart,removefromcart
  }





