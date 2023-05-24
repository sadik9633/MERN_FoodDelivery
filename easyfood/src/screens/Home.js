import { React, useState } from 'react'
import Carousal from '../components/Carousal'
import Cart from '../components/Cart'
import Footer from '../components/Footer'
import Navabar from '../components/Navabar'



function Home() {

  return (
    <>
      <div><Navabar></Navabar></div>
      <div><Carousal /></div>
      <div className='m-5'><Cart></Cart></div>
      <div><Footer></Footer></div>
    </>
  )
}

export default Home