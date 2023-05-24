import axios from 'axios';
import { React, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navabar from '../components/Navabar';


function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState('')

  const location = useNavigate()

  const validateInput = (inputName, inputValue) => {
    const errorsCopy = { ...errors };
    switch (inputName) {
      case 'email':
        errorsCopy.email = !/\S+@\S+\.\S+/.test(inputValue) ? 'Invalid email address' : '';
        break;
      case 'password':
        errorsCopy.password = inputValue.length < 6 && inputValue ? 'Password must be at least 6 characters' : '';
        break;
      default:
        break;
    }
    setErrors(errorsCopy);
  };


  const LoginUser = async (e) => {
    e.preventDefault();
    if (Object.values(errors).some((value) => value)) {
      alert('Please fix validation errors before submitting.');
      return;
    }
    if (!email || !password) {
      alert('Please fill in all fields.');
      return;
    }
    const body = {
      email,
      password,
    };
    try {
      const result = await axios.post('http://localhost:8000/login', body);
      alert(result.data.message);
      localStorage.setItem('currentUser', result.data.currentUser);
      localStorage.setItem('currentEmail', result.data.currentEmail);
      localStorage.setItem('token', result.data.token);
      location('/');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert(error.response.data.message);
      }
    }
  };
  return (
    <>
      <div><Navabar></Navabar></div>
      <div style={{ marginTop: '100px' }} className='container w-50 bg-secondary p-4 rounded'>
        <form>
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
          <button onClick={(e) => LoginUser(e)} type="submit" className="btn btn-primary mt-3">
            Login
          </button>

          <Link to={'/signup'}>
            <button type="submit" className="btn btn-danger mt-3 ms-3">
              New user
            </button>
          </Link>
        </form>
      </div>
    </>
  )
}

export default Login