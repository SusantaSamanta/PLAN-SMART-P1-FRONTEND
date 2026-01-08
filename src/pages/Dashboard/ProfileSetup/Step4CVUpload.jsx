import React, { useContext, useRef, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Step4CVUpload = () => {
    const {
        profileSetupStep, setProfileSetupStep,
        profilePicUrl, setProfilePicUrl,
        cvUrl, setCvUrl,
    } = useContext(AppContext);

    const setShowPicForEdit = useRef(false);

    if (profilePicUrl != '../src/assets/dummyProfile.jpg') {
        setShowPicForEdit.current = true;
        // console.log(setShowPicForEdit.current, profilePicUrl);
    }


    const handleProfileSubmit = async (e) => {
        e.preventDefault();

        // get file from input
        const fileInput = e.target.querySelector('input[type="file"]');
        const file = fileInput?.files[0];

        if (!file) {
            toast.error("Please select a profile photo");
            return;
        }
        const formData = new FormData();
        formData.append("avatar", file);

        try {
            const res = await axios.post(
                "/api/user/set-profile-pic",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
        } catch (error) {
            error.response.data.message ?
                toast.error(error.response.data.message) :
                console.log("Profile pic upload failed", error);
        }
    };

    const handleCvSubmit = async (e) => {
        e.preventDefault();

        // get file from input
        const fileInput = e.target.querySelector('input[type="file"]');
        const file = fileInput?.files[0];

        if (!file) {
            toast.error("Please select a pdf or word file");
            return;
        }
        const formData = new FormData();
        formData.append("avatar", file);

        try {
            const res = await axios.post(
                "/api/user/set-profile-pic",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
        } catch (error) {
            error.response.data.message ?
                toast.error(error.response.data.message) :
                console.log("Profile pic upload failed", error);
        }
    };

    return (
        <div className="flex flex-col gap-4 border-0">
            <form onSubmit={handleProfileSubmit} >
                <h3 className="text-lg font-semibold  text-gray-300">
                    {setShowPicForEdit.current ? 'Edit ' : 'Upload '}Your Profile Photo
                </h3>
                {/* File Input */}
                {
                    setShowPicForEdit.current ?
                        // For Second time upload 
                        <div className="border-0 relative">
                            <img src={profilePicUrl}
                                className="w-20 h-20 mt-4 rounded-full border-3" />
                            <div className="flex gap-3 mt-4 justify-center items-center">
                                <input
                                    type="file"
                                    accept=".jpg, .jpeg, .png"
                                    className="w-full bg-[#1b2544] border border-gray-600 p-0 rounded-md text-white cursor-pointer file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                                />

                                <button type="submit" className=" bg-green-700 hover:bg-green-800 px-6 py-2 rounded-md transition">
                                    Save
                                </button>
                            </div>
                        </div>
                        :
                        // For first time 
                        <div className="flex gap-3 mt-4 justify-center items-center">
                            <input
                                type="file"
                                accept=".jpg, .jpeg, .png"
                                className="w-full bg-[#1b2544] border border-gray-600 p-0 rounded-md text-white cursor-pointer file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                            />

                            <button type="submit" className=" bg-green-700 hover:bg-green-800 px-6 py-2 rounded-md transition">
                                Save
                            </button>
                        </div>
                }
            </form>


            <form onSubmit={handleCvSubmit}>
                <h3 className="border-0 mt-2 text-lg font-semibold  text-gray-300">
                    Upload Your Resume / CV
                </h3>

                {/* File Input */}
                <div className="mt-4 flex  gap-3  justify-center items-center">
                    <input
                        type="file"
                        accept=".pdf, .docx"
                        className="w-full bg-[#1b2544] border border-gray-600 p-0 rounded-md text-white cursor-pointer file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                    />
                    <button type="submit" className=" bg-green-700 hover:bg-green-800 px-6 py-2 rounded-md transition">
                        Save
                    </button>

                </div>
            </form>
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-4">
                <button
                    type="button"
                    onClick={() => setProfileSetupStep(profileSetupStep - 1)}
                    className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-md transition"
                >
                    Back
                </button>

                <button
                    onClick={() => setProfileSetupStep(profileSetupStep + 1)}
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md transition"
                >
                    Next
                </button>
            </div>

        </div>
    );
};

export default Step4CVUpload;
