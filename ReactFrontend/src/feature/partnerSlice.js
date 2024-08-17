import { createSlice } from '@reduxjs/toolkit'

const partnerSlice = createSlice({
  name: 'partner',
  initialState: {
    loginStatus: false,
  },
  reducers: {
    loginAction: (state) => {
      state.loginStatus = true
    },
    logoutAction: (state) => {
      state.loginStatus = false
    },
  },
})

export const { loginAction, logoutAction } = partnerSlice.actions
export default partnerSlice.reducer
