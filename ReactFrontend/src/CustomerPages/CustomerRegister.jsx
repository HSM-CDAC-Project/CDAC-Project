import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../services/Customer'
import { toast } from 'react-toastify'

function RegisterCustomer() {
  // create state members
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [mobileNo, setMobileNo] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // get a hook to navigate
  // - navigate is referring a function which is used for navigation
  const navigate = useNavigate()

  const onCancel = () => {
    navigate('/login-customer')
  }

  const isValidEmail = () => {
    return email.includes('@')
  }

  const onRegister = async () => {
    console.log('onRegister')

    // client side validation
    if (firstName.length === 0) {
      toast.warning('enter first name')
    } else if (lastName.length === 0) {
      toast.warning('enter last name')
    } else if (email.length === 0) {
      toast.warning('enter email')
    } else if (!isValidEmail()) {
      toast.warning('Email is not valid')
    } else if (mobileNo.length === 0) {
      toast.warning('enter mobile number')
    } else if (password.length === 0) {
        toast.warning('enter password')
      }else if (confirmPassword.length === 0) {
      toast.warning('confirm password')
    } else if (password !== confirmPassword) {
      toast.warning('password does not match')
    } else {
      // make the API call and receive the result
      const result = await register(firstName, lastName, email, mobileNo, password)
      if (result) {
        toast.success('successfully registered a customer')
        navigate('/login-customer')
      } else {
        toast.error('Failed to register the customer')
      }
    }
  }

  return (
    <div>
      <h2 style={{marginTop: '100px', textAlign:'center'}}>Register Customer</h2>

      <div className='row mt-5'>
        <div className='col-2'></div>

        <div className='col'>
          <div className='row'>
            <div className='col'>
              <div className='mb-3'>
                <label htmlFor=''>First Name</label>
                <input
                  onChange={(e) => {
                    setFirstName(e.target.value)
                  }}
                  type='text'
                  className='form-control'
                />
              </div>
            </div>

            <div className='col'>
              <div className='mb-3'>
                <label htmlFor=''>Last Name</label>
                <input
                  onChange={(e) => {
                    setLastName(e.target.value)
                  }}
                  type='text'
                  className='form-control'
                />
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col'>
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
            </div>

            <div className='col'>
              <div className='mb-3'>
                <label htmlFor=''>Mobile Number</label>
                <input
                  onChange={(e) => {
                    setMobileNo(e.target.value)
                  }}
                  type='tel'
                  className='form-control'
                />
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col'>
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
            </div>

            <div className='col'>
              <div className='mb-3'>
                <label htmlFor=''>Confirm Password</label>
                <input
                  onChange={(e) => {
                    setConfirmPassword(e.target.value)
                  }}
                  type='password'
                  className='form-control'
                />
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col'>
              <div className='mb-3'>
                Already have account ? <Link to='/login-customer'>Login here</Link>
              </div>

              <button onClick={onRegister} className='btn btn-success'>
                Register
              </button>
              <button onClick={onCancel} className='btn btn-danger ms-2'>
                Cancel
              </button>
            </div>
          </div>
        </div>

        <div className='col-2'></div>
      </div>
    </div>
  )
}

export default RegisterCustomer
