import axios from 'axios';
import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navabar from '../components/Navabar';


function Signup() {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState('');

  const location = useNavigate();

  const validateInput = (inputName, inputValue) => {
    const errorsCopy = { ...errors };
    switch (inputName) {
      case 'name':
        errorsCopy.username = inputValue.length < 3 ? 'Name must be at least 3 characters' : '';
        break;
      case 'email':
        errorsCopy.email = !/\S+@\S+\.\S+/.test(inputValue) ? 'Invalid email address' : '';
        break;
      case 'password':
        errorsCopy.password = inputValue.length < 6 && inputValue ? 'Password must be at least 6 characters' : '';
        break;
      case 'address':
        errorsCopy.address = inputValue.length < 10 ? 'Address must be at least 10 characters' : '';
        break;
      default:
        break;
    }
    setErrors(errorsCopy);
  };

  const registerUser = async (e) => {
    e.preventDefault();
    if (Object.values(errors).some((value) => value)) {
      alert('Please fix validation errors before submitting.');
      return;
    }
    if (!username || !email || !password || !address) {
      alert('Please fill in all fields.');
      return;
    }
    const body = {
      username,
      email,
      location: address,
      password,
    };
    try {
      const result = await axios.post('http://localhost:8000/register', body);
      alert(result.data.message);
      location('/login');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert(error.response.data.message);
        location('/login');
      }
    }
  };

  return (
    <>
      <div>
        <Navabar></Navabar>
      </div>
      <div className="container w-50 mt-5 bg-secondary p-4 rounded">
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className={`form-control ${errors.username ? 'is-invalid' : ''}`}
              id="name"
              name="name"
              value={username}
              onChange={(e) => {
                setUserName(e.target.value);
                validateInput('name', e.target.value);
              }}
            />
            {errors.username && <div className="invalid-feedback">{errors.username}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              id="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateInput('email', e.target.value);
              }}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              id="password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validateInput('password', e.target.value)
              }}
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              className={`form-control ${errors.address ? 'is-invalid' : ''}`}
              id="address"
              name="address"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                validateInput('address', e.target.value)
              }}
            />
            {errors.address && <div className="invalid-feedback">{errors.address}</div>}
          </div>
          <button onClick={(e) => registerUser(e)} type="submit" className="btn btn-primary mt-3">
            Register
          </button>

          <Link to={'/login'}>
            <button type="submit" className="btn btn-danger mt-3 ms-3">
              Already a user
            </button>
          </Link>
        </form>
      </div>
    </>
  )
}

export default Signup