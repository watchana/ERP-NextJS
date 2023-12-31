// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice' // Adjust the path to your userSlice file
import layoutTwoPageSlice from './layoutPageSlice' // Adjust the path to your layoutPageSlice file

// Create a makeStore function
const makeStore = () =>
  configureStore({
    reducer: {
      user: userReducer,
      layoutPage: layoutTwoPageSlice
    }
  })

// Use the new "createWrapper" function to create the wrapper
import { createWrapper } from 'next-redux-wrapper'

export const wrapper = createWrapper(makeStore)
