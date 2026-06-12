import { configureStore } from "@reduxjs/toolkit";
import PendingInterviewsSlice from "./slices/PendingInterviewsSlice";
import CurrentInterviewDataSlice from "./slices/CurrentInterviewDataSlice"
const store = configureStore({
    reducer: {
        pendingInterviews: PendingInterviewsSlice,
        currentInterviewData: CurrentInterviewDataSlice,
    }
})
    
export default store;
