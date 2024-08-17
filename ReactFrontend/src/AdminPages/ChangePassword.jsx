import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { changePassowrd } from '../services/Admin';

function AdminPasswordChange() {
  // create state members
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // get a hook to navigate
  const navigate = useNavigate();

  const empId = sessionStorage.getItem('empId') || '';
  console.log(empId);

  const onCancel = () => {
    setOldPassword(''); 
    setNewPassword('');
  };

  const onChangePassword = async () => {
    // client-side validation
    if (oldPassword.length === 0) {
      toast.warning('Enter current password');
    } else if (newPassword.length === 0) {
      toast.warning('Enter new password');
    } else {
      try {
        const result = await changePassowrd(oldPassword, newPassword, empId);

        if (result === "Password Updated") {
          toast.success('Password successfully changed');
          toast.success('Login again');

          sessionStorage.clear();
          navigate('/admin-login');
        }
      } catch (error) {
        toast.error('Failed to change password');
      }
    }
  };

  return (
    <div>
      <h1 style={{ marginTop: '100px' }}>Change Password</h1>

      <div className='row mt-5'>
        <div className='col'>
          <div className='row'>
            <div className='col'>
              <div className='mb-3'>
                <label htmlFor='oldPassword'>Old Password</label>
                <input
                  onChange={(e) => setOldPassword(e.target.value)}
                  value={oldPassword} 
                  type='password'
                  className='form-control'
                  id='oldPassword'
                />
              </div>
            </div>

            <div className='col'>
              <div className='mb-3'>
                <label htmlFor='newPassword'>New Password</label>
                <input
                  onChange={(e) => setNewPassword(e.target.value)}
                  value={newPassword} //"value" is useful for manipulating the field(clearing)
                  type='password'
                  className='form-control'
                  id='newPassword'
                />
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col'>
              <button onClick={onChangePassword} className='btn btn-success'>
                Change Password
              </button>
              <button onClick={onCancel} className='btn btn-danger ms-4'>
                Cancel
              </button>
            </div>
          </div>
        </div>

        <div className='col-5'></div>
      </div>
    </div>
  );
}

export default AdminPasswordChange;
