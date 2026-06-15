import { createSlice } from '@reduxjs/toolkit'
import React from 'react'

const CompletedInterviewsSlice = createSlice({
  name: "completedInterviews",
  initialState: [],
  reducers: {
    addCompletedInterviews(state, action) {
      return action.payload
    },
    removeCompletedInterviews(state, action) {
      return []
    }
  }
})

export default CompletedInterviewsSlice.reducer;
export const { addCompletedInterviews, removeCompletedInterviews } = CompletedInterviewsSlice.actions;