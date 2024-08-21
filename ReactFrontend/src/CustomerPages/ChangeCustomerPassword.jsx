import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { changePassword } from '../services/Customer'

function ChangeCustomerPassword() {
  // create state members
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const customerId = localStorage.getItem('customerId')
  // get a hook to navigate
  // - navigate is referring a function which is used for navigation
  const navigate = useNavigate()

//   const customerId = localStorage.getItem('customerId') || '';
  console.log(customerId);

  const onCancel = () => {
    window.location.reload();
  }

 

  const onChangePassword = async () => {

    // client side validation
    if (oldPassword.length === 0) {
      toast.warning('enter current password')
    } else if (newPassword.length === 0) {
      toast.warning('enter new password')
    } else {
      try {
        const result = await changePassword(oldPassword, newPassword,customerId);

        if(result=="Password Updated")
        toast.success('Password successfully changed')
        toast.success('login again')

        localStorage.clear();
        navigate('/');

      } catch (error) {
        toast.error('Failed to change password')
      }      
    }
  }

  return (
    <div>
      <h2 className='page-title'>Change Password</h2>

      <div className='row mt-5'>
        <div className='col-2'></div>

        <div className='col'>
          <div className='row'>
            <div className='col'>
              <div className='mb-3'>
                <label htmlFor=''>Old Password</label>
                <input
                  onChange={(e) => {
                    setOldPassword(e.target.value)
                  }}
                  type='password'
                  className='form-control'
                />
              </div>
            </div>

            <div className='col'>
              <div className='mb-3'>
                <label htmlFor=''>New Password</label>
                <input
                  onChange={(e) => {
                    setNewPassword(e.target.value)
                  }}
                  type='password'
                  className='form-control'
                />
              </div>
            </div>
          </div>

          
          <div className='row'>
            <div className='col'>
              <button onClick={onChangePassword} className='btn btn-success'>
                Change Password
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

export default ChangeCustomerPassword
