import { createSlice } from "@reduxjs/toolkit";
const CurrentInterviewDataSlice = createSlice({
    name: "currentInterviewData",
    initialState: {},
    reducers: {
        addCurrentInterviewData(state, action) {
            // console.log(action.payload)
            return action.payload
        },
        clearCurrentInterviewData(state, action) {
            return {}
        }
    }
});

export default CurrentInterviewDataSlice.reducer;
export const { addCurrentInterviewData, clearCurrentInterviewData } = CurrentInterviewDataSlice.actions;

