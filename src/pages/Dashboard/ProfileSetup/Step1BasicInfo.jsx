import React, { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Step1BasicInfo = () => {

    const {
        profileSetupStep, setProfileSetupStep,
        profileSetupForm, setProfileSetupForm,
        isProfileComplete,
        openModal, setOpenModal,
    } = useContext(AppContext);


    const handleChange = (e) => {
        const { name, value } = e.target;   // key:value ||  like name:'Susanta, email:'sus123'
        setProfileSetupForm((preData) => ({
            ...preData, [name]: value        // setProfileSetupForm(..preData, [email]:'sus123')
        }))
    }




    const handelSubmit = async (e) => {

        isProfileComplete ? '' : setProfileSetupStep(profileSetupStep + 1);

        e.preventDefault();
        const { name, email, phone, location, highestQualification, university, graduationYear, hasExperience, experienceYears, currentRole, skills } = profileSetupForm
        try {
            const { data } = await axios.post('/api/user/set-profile',
                {
                    profileData: { name, email, phone, location, highestQualification, university, graduationYear, hasExperience, experienceYears, currentRole, skills }
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
        setOpenModal(false);

    }





    return (
        <form onSubmit={handelSubmit} className="flex flex-col gap-4">
            <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={profileSetupForm.name}
                onChange={handleChange}
                className="bg-[#1b2544] border border-gray-600 p-3 rounded-md text-white"
                required
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={profileSetupForm.email}
                onChange={handleChange}
                className="bg-[#1b2544] border border-gray-600 p-3 rounded-md text-white"
                required
            />
            <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={profileSetupForm.phone}
                onChange={handleChange}
                className="bg-[#1b2544] border border-gray-600 p-3 rounded-md text-white"
                required
            />
            <input
                type="text"
                name="location"
                placeholder="Location (City, Country)"
                value={profileSetupForm.location}
                onChange={handleChange}
                className="bg-[#1b2544] border border-gray-600 p-3 rounded-md text-white"
                required
            />
            <div className="flex justify-end">
                <button type="submit"
                    // onClick={() => setProfileSetupStep(profileSetupStep + 1)} 
                    className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md transition" >
                    {isProfileComplete ? 'Save' : 'Next'}
                </button>
            </div>
        </form>
    );
};

export default Step1BasicInfo;
