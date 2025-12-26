import React, { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import axios from "axios";

const Step2Education = () => {


    const {
        profileSetupStep, setProfileSetupStep,
        profileSetupForm, setProfileSetupForm,
    } = useContext(AppContext);



    const handleChange = (e) => {
        const { name, value } = e.target;   // key:value ||  like name:'Susanta, email:'sus123'
        setProfileSetupForm((preData) => ({
            ...preData, [name]: value        // setProfileSetupForm(..preData, [email]:'sus123')
        }));
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        setProfileSetupStep(profileSetupStep + 1);

        if (profileSetupForm.hasExperience === 'no') {
            profileSetupForm.experienceYears = '';
            profileSetupForm.currentRole = '';
        }
        // console.log(profileSetupForm);
        const { name, email, phone, location, highestQualification, university, graduationYear, hasExperience, experienceYears, currentRole, skills, cvFile } = profileSetupForm

        try {
            const { data } = await axios.post('/api/user/set-profile',
                {
                    profileData: { name, email, phone, location, highestQualification, university, graduationYear, hasExperience, experienceYears, currentRole, skills, cvFile }
                },
                {
                    headers: { 'Content-Type': "application/json" }
                }
            )
            if (data.success) {
                console.log(data);
            }


        } catch (error) {
            console.log(error);
        }

    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold mb-2 text-gray-300">
                Education & Experience
            </h3>

            {/* Education Fields */}
            <input
                type="text"
                name="highestQualification"
                placeholder="Highest Qualification (e.g. B.Tech, M.Sc)"
                value={profileSetupForm.highestQualification}
                onChange={handleChange}
                className="bg-[#1b2544] border border-gray-600 p-3 rounded-md text-white"
                required
            />

            <input
                type="text"
                name="university"
                placeholder="University / College Name"
                value={profileSetupForm.university}
                onChange={handleChange}
                className="bg-[#1b2544] border border-gray-600 p-3 rounded-md text-white"
                required
            />

            <input
                type="number"
                name="graduationYear"
                placeholder="Graduation Year"
                value={profileSetupForm.graduationYear}
                onChange={handleChange}
                className="bg-[#1b2544] border border-gray-600 p-3 rounded-md text-white"
                required
            />

            {/* Experience Question */}
            <div className="flex flex-col gap-2 border-0">
                <label className="text-gray-300 font-medium">
                    Do you have any job experience?
                </label>
                <div className="flex gap-5">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="hasExperience"
                            value="yes"
                            checked={profileSetupForm.hasExperience === "yes"}
                            onChange={handleChange}
                            required
                        />
                        <span>Yes</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="hasExperience"
                            value="no"
                            checked={profileSetupForm.hasExperience === "no"}
                            onChange={handleChange}
                            required
                        />
                        <span>No</span>
                    </label>
                </div>
            </div>



            {/* if user press yes show  */}
            {profileSetupForm.hasExperience === "yes" &&
                <div className="flex gap-2">
                    <input
                        type="number"
                        name="experienceYears"
                        placeholder="Years of Work Experience"
                        value={profileSetupForm.experienceYears}
                        onChange={handleChange}
                        className="w-[40%] p-3 bg-[#1b2544] border border-gray-600 rounded-md text-white"
                        required
                    />

                    <input
                        type="text"
                        name="currentRole"
                        placeholder="Current / Last Job Role"
                        value={profileSetupForm.currentRole}
                        onChange={handleChange}
                        className="w-full p-3 bg-[#1b2544] border border-gray-600 rounded-md text-white"
                        required
                    />
                </div>
            }

            {/* Buttons */}
            <div className="flex justify-between mt-4">
                <button
                    onClick={() => setProfileSetupStep(profileSetupStep - 1)}
                    className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-md transition"
                >
                    Back
                </button>

                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md transition"
                >
                    Next
                </button>
            </div>
        </form>
    );
};

export default Step2Education;
