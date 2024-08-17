import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


function RegisterUser() {
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
    navigate('/login')
  }

  const onRegister = async () => {
    // client side validation
    if (firstName.length === 0) {
      toast.warning('enter first name')
    } else if (lastName.length === 0) {
        toast.warning('enter last name')
    } else if (email.length === 0) {
        toast.warning('enter email')
    } else if (mobileNo.length === 0) {
        toast.warning('enter Mobile Number')
    } else if (password.length === 0) {
        toast.warning('enter password')
    } else if (confirmPassword.length === 0) {
        toast.warning('confirm password')
    } else if (password !== confirmPassword) {
        toast.warning('password does not match')
    } else {
      
        toast.warning('successfully registered a user')
        navigate('/login')
      }
    }
  

  return (
    <div className='containerUser'>

      <h2 className='page-title'>Register</h2>


        <div className='form'>
          <div className='row'>
            <div className='col'>
              <div className='input-box'>
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
              <div className='input-box'>
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
              <div className='input-box'>
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
              <div className='input-box'>
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
              <div className='input-box'>
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
              <div className='input-box'>
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
              <div className='input-box'>
                Already have account ? <Link to='/login'>Login here</Link>
              </div>
              <div className='input-box'>
              <button onClick={onRegister} className='btn btn-success'>
                Register
              </button>
              <button onClick={onCancel} className='btn btn-danger ms-3'>
                Cancel
              </button>
              </div>
            </div>
          </div>
        </div>

      </div>
  )
}

export default RegisterUser