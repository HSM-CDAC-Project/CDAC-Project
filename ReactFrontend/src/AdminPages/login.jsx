import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../services/Admin'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'

function LoginAdmin() {
  // create state members
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // get the navigate object
  const navigate = useNavigate()

  // use dispatch to update global state
  const dispatch = useDispatch()

  const onLogin = async () => {
    // client side validation
    if (email.length === 0) {
      toast.warning('enter email')
    } else if (password.length === 0) {
      toast.warning('enter password')
    } else {
      const result = await login(email, password)
      if (result) {
        const { firstName, lastName, otp, empId } = result

        const { jwt, msg } = result;

        // Store customerId in local storage
        // localStorage.setItem('customerId', customerId);
        localStorage.setItem('jwt', jwt);
        localStorage.setItem('empId', msg);
        // const { token } = result['data']
        // sessionStorage.setItem('token', token)

        // sessionStorage.setItem('empId', empId)
        // sessionStorage.setItem('firstName', firstName)
        // sessionStorage.setItem('lastName', lastName)


        // navigate('/otp-validation', { state: { otp } })
        navigate('/active-orders')


        // set the login status to true
        
      } else {
        toast.error('invalid email or password')
      }
    }
  }

  return (
    <div>
      <h2 className='page-title'>Login</h2>

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

export default LoginAdmin
