import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Step4CVUpload = () => {
    const {
        profileSetupStep, setProfileSetupStep,
        profilePicUrl, setProfilePicUrl,
        userCvUrl, setUserCvUrl,
        isProfileComplete,
        setOpenModal,
    } = useContext(AppContext);

    const setShowPicForEdit = useRef(false);
    const [picPreview, setPicPreview] = useState(false);

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
            if (res.data.success) {
                setProfilePicUrl(res.data.url);
                toast.success('Profile update successfully..!');
            }

        } catch (error) {
            error.response.data.message ?
                toast.error(error.response.data.message) :
                console.log("Profile pic upload failed", error);
        }
    };

    const previewImageUrl = userCvUrl.replace(
        "/upload/",
        "/upload/pg_1,f_png,w_80/"
    );

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
        setOpenModal(false);
    };

    return (
        <div className="flex flex-col gap-4 border-0">
            <form onSubmit={handleProfileSubmit} >
                <h3 className="text-lg font-semibold  text-gray-300">
                    {setShowPicForEdit.current ? 'Edit ' : 'Upload '}Your Profile Photo
                </h3>
                {/* File Input */}
                <div className="border-0 relative">

                    {
                        setShowPicForEdit.current || picPreview ?
                            //  For Second time upload 
                            < img src={profilePicUrl}
                                className="w-20 h-20 mt-2 rounded-full border-3" />
                            :
                            // For first time
                            ''

                    }
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

            </form>


            <form onSubmit={handleCvSubmit}>
                <h3 className="border-0 mt-2 text-lg font-semibold  text-gray-300">
                    {userCvUrl == '' ? 'Upload ' : 'Reupload '}Your Resume / CV
                </h3>


                {  // Pdf preview if already uploaded  
                    userCvUrl == '' ?
                        ''
                        :
                        <a href={userCvUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block">
                            <img
                                src={previewImageUrl}
                                alt="PDF Preview"
                                className="border mt-2 rounded shadow hover:opacity-90 cursor-pointer"
                            />
                        </a>
                }

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
            <div className={`flex ${isProfileComplete ? 'justify-end' : 'justify-between'}  mt-4`}>
                {!isProfileComplete &&
                    <button
                        onClick={() => setProfileSetupStep(profileSetupStep - 1)}
                        className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-md transition"
                    >
                        Back
                    </button>}

                {!isProfileComplete && <button
                    onClick={() => setProfileSetupStep(profileSetupStep + 1)}
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md transition"
                >
                    Next
                </button>}
            </div>

        </div>
    );
};

export default Step4CVUpload;
