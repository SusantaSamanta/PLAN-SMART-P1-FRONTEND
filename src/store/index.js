import { configureStore } from "@reduxjs/toolkit";
import PendingInterviewsSlice from "./slices/PendingInterviewsSlice";
import CurrentInterviewDataSlice from "./slices/CurrentInterviewDataSlice"
import CompletedInterviewsSlice from "./slices/CompletedInterviewsSlice"
const store = configureStore({
    reducer: {
        pendingInterviews: PendingInterviewsSlice,
        currentInterviewData: CurrentInterviewDataSlice,
        completedInterviews: CompletedInterviewsSlice,
    }
})
    
export default store;
