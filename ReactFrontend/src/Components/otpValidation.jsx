import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { loginAction } from '../feature/adminSlice'
import { useDispatch } from 'react-redux'



function OtpValidation() {
  const [enteredOtp, setEnteredOtp] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Retrieve OTP from location state
  const location = useLocation()
  const { otp: apiOtp } = location.state

  const validateOtp = () => {
    if (enteredOtp === apiOtp) {
        dispatch(loginAction())

        toast.success('welcome to the application')
        navigate('/all-partners')
     
    } else {
      toast.error('Invalid OTP, please try again')
    }
  }

  return (
    <div>
      <h2 className='page-title'>OTP Validation</h2>

      <div className='row'>
        <div className='col'></div>

        <div className='col'>
          <div className='form'>
            <div className='mb-3'>
              <label htmlFor='otp'>Enter OTP</label>
              <input
                onChange={(e) => setEnteredOtp(e.target.value)}
                type='text'
                className='form-control'
                placeholder='Enter OTP'
              />
            </div>
            <div className='mb-3'>
              <button onClick={validateOtp} className='mt-2 btn btn-success'>
                Validate OTP
              </button>
            </div>
          </div>
        </div>

        <div className='col'></div>
      </div>
    </div>
  )
}

export default OtpValidation
