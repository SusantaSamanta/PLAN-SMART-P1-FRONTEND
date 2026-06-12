import { createSlice } from "@reduxjs/toolkit";
const PendingInterviewsSlice = createSlice({
    name: "pendingInterviews",
    initialState: [],
    reducers: {
        addPendingInterviews(state, action) {
            // console.log(action.payload); // this is an array which we send from despatch(reducerFun(payload))
            // action.payload.forEach((item) => {
            //     state.push(item);    /// instead of map it we also return where it replace with initial state       
            // })
            return action.payload // payload mean parameter which send where addPendingInterviews() call
        },
        deletePendingInterview(state, action) {
            return state.filter(
                (item) => item.applicationId !== action.payload
            );
        },
    }
});



export default PendingInterviewsSlice.reducer;
export const { addPendingInterviews, deletePendingInterview } = PendingInterviewsSlice.actions;



