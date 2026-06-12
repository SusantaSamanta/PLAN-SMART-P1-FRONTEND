import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

export const DashboardContext = createContext();

const DashboardContextProvider = ({ children }) => {

  const [allJobs, setAllJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([
    // {
    //         _id: "6967baa367eed333bd4a52ae",
    //         job: "6966a852abba16823e4a784e",
    //         attempts: 2
    // }
  ]);
  const [reappliedJobs, setReappliedJobs] = useState([]);
  const [interviewPageOpen, setInterviewPageOpen] = useState(false);
  




  // const checkAbleToApplyNow = (isInterviewStarted, interviewStartedAt) => {
  //   const now = new Date();
  //   const ONE_HOUR = 60 * 60 * 1000;
  //   if (isInterviewStarted == false) return false;
  //   if (isInterviewStarted && now - interviewStartedAt > ONE_HOUR) {
  //     return true;
  //   }
  // };


  const checkForReapply = (jobId) => {
    const appliedJob = reappliedJobs.find(
      (job) => String(job.job) === String(jobId)
    );
    if (appliedJob) return ["Reapply", true]; // present in reapplied arr
    else return ["Apply", true] // mean not applied before so not present in reapplied arr
  }

  const checkIsJobApplied = (jobId) => {
    // console.log(jobId)
    const appliedJob = appliedJobs.find(
      (job) => String(job.job) === String(jobId)
    );
    // if (!appliedJob) return ["Apply", true];
    if (!appliedJob) return checkForReapply(jobId); // not present in applied job and check it for reapply s
    else return [" Already Applied", false] // present in already applied jobs arr
  };


  const valueToSend = {
    allJobs, setAllJobs,
    appliedJobs, setAppliedJobs,
    reappliedJobs, setReappliedJobs,
    checkIsJobApplied,
    interviewPageOpen, setInterviewPageOpen,
    
  }


  useEffect(() => { // Receive all jobs which are applied 
    const call = async () => {
      try {
        const { data } = await axios.get('/api/user/job/get-applied-jobs');
        // console.log(data.ableToApply);
        if (data.success) {
          setAppliedJobs(data.notAbleToApply);
          setReappliedJobs(data.ableToApply);
        }
      } catch (error) {
        console.log(error);
      }
    }
    call();
  }, [allJobs])




  return (
    <DashboardContext.Provider value={valueToSend}>
      {children}
    </DashboardContext.Provider>
  )
}

export default DashboardContextProvider;