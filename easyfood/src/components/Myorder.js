import React, { useState, useEffect } from 'react';
import Navabar from '../components/Navabar';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import axios from 'axios';

function Myorder() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // make API call to fetch cart data
    fetch('http://localhost:8000/getaddtocart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: localStorage.getItem('currentEmail')
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.status) {
          setCartItems(data.cart);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.post('http://localhost:8000/removefromcart', {
        email: localStorage.getItem('currentEmail'), // replace with logged-in user's email
        itemId: id
      });
      if (response.data.status) {
        setCartItems(cartItems.filter(item => item.id !== id));
        alert(response.data.message)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div><Navabar /></div>
      <div>
        {cartItems.length === 0 ? (
          <div className="text-center mt-5"><img width={"200px"} src='https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-4344468-3613896.png' />
            <h4>Cart is Empty</h4>
          </div>
        ) : (
          <Table responsive="xm" className='container mt-5'>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Image</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td><img width={'70px'} height={'70px'} src={item.img} alt={item.name} /></td>

                  <td>{item.qty}</td>

                  <td>{item.price}</td>
                  <td>{item.totalprice}</td>
                  <td><i className='fa-solid fa-trash' onClick={() => handleDelete(item.id)} /></td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </>
  )
}

export default Myorder;