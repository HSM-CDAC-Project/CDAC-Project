import { configureStore } from '@reduxjs/toolkit'
import adminSlice from './feature/adminSlice'
import customerslice from './feature/customerslice'

export const store = configureStore({
    reducer: {
      admin: adminSlice,
      customer: customerslice

    },
  })