import React, { useContext, useRef, useState } from "react";
import Step1BasicInfo from "./Step1BasicInfo";
import Step2Education from "./Step2Education";
import { AppContext } from "../../../context/AppContext";
import Step3Skills from "./Step3Skills";
import Step4CVUpload from "./Step4CVUpload";
import Step5ReviewSubmit from "./Step5ReviewSubmit";

// import Step4Preferences from "./Step4Preferences";
// import Step5ResumeUpload from "./Step5ResumeUpload";

const ProfileSetup = () => {

  const {
    profileSetupStep, setProfileSetupStep,
  } = useContext(AppContext);


  const renderStep = () => {
    switch (profileSetupStep) {
      case 1:
        return <Step1BasicInfo />;
      case 2:
        return <Step2Education />;
      case 3:
        return <Step3Skills />;
      case 4:
        return <Step4CVUpload />;
      case 5:
        return <Step5ReviewSubmit />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-full flex flex-col items-center md:justify-center border-0">
      <div className="min-h-full md:h-auto w-full md:max-w-2xl  bg-[#121b33] p-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Profile Setup</h2>
          <span className="text-gray-400">Step {profileSetupStep} of 5</span>
        </div>
        {renderStep()}
      </div>
    </div>
  );
};

export default ProfileSetup;
