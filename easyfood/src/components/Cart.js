import axios from 'axios';
import { React, useEffect, useState } from 'react'
import { Row, Col, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const [allFoods, setAllFoods] = useState([])
  const [selectedOptions, setSelectedOptions] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)

  const location = useNavigate();


  const fetchData = async () => {
    const result = await axios.get('http://localhost:8000/allFoods')
    const initialOptions = result.data.foods.map(item => ({ quantity: 1, price: item.options?.[0]?.half || 0 }))
    setSelectedOptions(initialOptions)
    setAllFoods(result.data.foods);
  }

  useEffect(() => {
    // calculate total price whenever user's selection changes
    const totalPrice = selectedOptions.reduce((acc, curr) => acc + curr.quantity * curr.price, 0)
    setTotalPrice(totalPrice)
  }, [selectedOptions])

  const handleOptionChange = (event, optionName, index) => {
    const newSelectedOptions = [...selectedOptions]
    const newOption = { ...newSelectedOptions[index], [optionName]: parseFloat(event.target.value) }
    newSelectedOptions[index] = newOption
    setSelectedOptions(newSelectedOptions)
  }

  const addToCart = (email, id, name, img, qty, price, totalprice) => {
    const data = {
      email: email,
      id: id,
      name: name,
      img: img,
      qty: qty,
      price: price,
      totalprice: totalprice
    };

    axios.post('http://localhost:8000/addToCart', data)
      .then(result => {
        alert(result.data.message);
        location('/myorder');

      })
      .catch(error => {
        if (error.response && error.response.status === 400) {
          alert(error.response.data.message);

        }
        if (!localStorage.getItem('currentEmail')) {
          alert('please login before order')
        }
      });
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="text-center">
      <Row>
        {allFoods?.map((item, index) => (
          <Col className='p-4' lg={4} md={6}>
            <Card className='mt-3' style={{ width: "18rem", maxHeight: "470px" }}>
              <Card.Img variant="top" height={"180px"} src={item.img} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>
                  {item.description}
                </Card.Text>
                <div className='container w-100'>
                  <select className='m-2 h-100 bg-primary rounded' style={{ border: 'none' }} onChange={(e) => handleOptionChange(e, 'quantity', index)}>
                    {Array.from(Array(6), (e, i) => (
                      <option Key={i + 1} value={i + 1}> {i + 1}</option>
                    ))}
                  </select>
                  <select className='m-2 h-100 bg-primary rounded' style={{ border: 'none' }} onChange={(e) => handleOptionChange(e, 'price', index)}>
                    {item.options?.map((option, i) => (
                      <>
                        <option key={`half-${i}`} value={option.half}>Half : {option.half}</option>
                        <option key={`full-${i}`} value={option.full}>Full : {option.full}</option>
                      </>
                    ))}
                  </select>
                  <br></br>
                  <div className='d-inline h-100 fs-6 text-white'>
                    Total price: {selectedOptions[index].quantity * selectedOptions[index].price}<br></br>
                    <Button className='mt-1' onClick={() => addToCart(localStorage.getItem('currentEmail'), item.id, item.name, item.img, selectedOptions[index].quantity, selectedOptions[index].price, selectedOptions[index].quantity * selectedOptions[index].price)}>Order It</Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Cart