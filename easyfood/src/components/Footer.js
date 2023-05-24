import React from 'react'
import { Link } from 'react-router-dom'


function Footer() {
  return (
<div>
  <hr></hr>
  <footer className='d-flex flex-wrap justify-content-between align-items-center py-3 my-4'>
    <div className='col-md-4 d-flex align-items-center justify-content-center justify-content-md-start'>
      <Link to={'/'} className="mb-3 me-2 mb-md-0 text-muted text-decoration-none 1h-1"></Link>
      <span className='text-muted ms-5'>@ 2023 OrderOut, Inc</span>
    </div>
    <div className='col-md-4 d-flex justify-content-center mb-3 mb-md-0'>
      <ul className='nav list-unstyled d-flex justify-content-center'>
        <li className='nav-item'>
          <Link to={'/'} className="nav-link"><i class="fab fa-instagram"></i></Link>
        </li>
        <li className='nav-item ms-3'>
          <Link to={'/'} className="nav-link"><i class="fab fa-youtube"></i></Link>
        </li>
        <li className='nav-item ms-3'>
          <Link to={'/'} className="nav-link"><i class="fab fa-facebook"></i></Link>
        </li>
      </ul>
    </div>
  </footer>
</div>  )
}

export default Footer