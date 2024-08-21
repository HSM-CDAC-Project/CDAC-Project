import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../services/Customer'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { loginAction } from '../feature/customerslice'

function LoginCustomer() {
  // create state members
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // get the navigate object
  const navigate = useNavigate()

  // use dispatch to update global state
  const dispatch = useDispatch()

  const onLogin = async () => {
  // Client-side validation
  if (email.length === 0) {
    toast.warning('Please enter your email');
  } else if (password.length === 0) {
    toast.warning('Please enter your password');
  } else {
    try {
      const result = await login(email, password);
      if (result) {
        // const { customerId } = result;
        const { jwt, msg } = result;

        // Store customerId in local storage
        // localStorage.setItem('customerId', customerId);
        localStorage.setItem('jwt', jwt);
        localStorage.setItem('customerId', msg);

        // Dispatch login action to update global state
        dispatch(loginAction());

        // Navigate to cart page
        navigate('/');
      } else {
        toast.error('Invalid email or password');
      }
    } catch (error) {
      toast.error('Login failed, please try again');
    }
  }
}
  

  return (
    <div>
      <h2 style={{textAlign:'center', marginTop:'100px'}}>Customer Login</h2>

      <div className='row'>
        <div className='col'></div>

        <div className='col'>
          <div className='form'>
            <div className='mb-3'>
              <label htmlFor=''>Email</label>
              <input
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                type='email'
                className='form-control'
              />
            </div>
            <div className='mb-3'>
              <label htmlFor=''>Password</label>
              <input
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                type='password'
                className='form-control'
              />
            </div>
            <div className='mb-3'>
                new here ? <Link to='/register-customer'>Register here</Link>
              </div>
            <div className='mb-3'>
              
              <button onClick={onLogin} className='mt-2 btn btn-success'>
                Login
              </button>
            </div>
          </div>
        </div>

        <div className='col'></div>
      </div>
    </div>
  )
}

export default LoginCustomer