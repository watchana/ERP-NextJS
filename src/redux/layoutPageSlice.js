import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  contentLeftStatus: true,
  contentDividerStatus: false,
  contentRightStatus: false,
  contentLeftGrid: 12,
  contentRightGrid: 0
}

const layoutTwoPageSlice = createSlice({
  name: 'layoutPage',
  initialState,
  reducers: {
    contentDefault: state => {
      state.contentLeftStatus = true
      state.contentDividerStatus = false
      state.contentRightStatus = false
      state.contentLeftGrid = 12
      state.contentRightGrid = 0
    },
    contentDetailRight: state => {
      state.contentLeftStatus = true
      state.contentDividerStatus = true
      state.contentRightStatus = true
      state.contentLeftGrid = 5
      state.contentRightGrid = 7
    },
    contentDetailLeft: state => {
      state.contentLeftStatus = true
      state.contentDividerStatus = true
      state.contentRightStatus = true
      state.contentLeftGrid = 7
      state.contentRightGrid = 5
    },
    contentMiddleLeft: state => {
      state.contentLeftStatus = true
      state.contentDividerStatus = false
      state.contentRightStatus = false
      state.contentLeftGrid = 12
      state.contentRightGrid = 0
    },
    contentMiddleRight: state => {
      state.contentLeftStatus = false
      state.contentDividerStatus = false
      state.contentRightStatus = true
      state.contentLeftGrid = 0
      state.contentRightGrid = 12
    },
    contentUpdate: state => {
      state.contentLeftStatus = false
      state.contentDividerStatus = false
      state.contentRightStatus = true
      state.contentLeftGrid = 0
      state.contentRightGrid = 12
    }
  }
})

// Export actions to use them in components and thunks
export const {
  contentDefault,
  contentDetailRight,
  contentDetailLeft,
  contentMiddleLeft,
  contentMiddleRight,
  contentUpdate
} = layoutTwoPageSlice.actions

// Export reducer to include it in the store
export default layoutTwoPageSlice.reducer
