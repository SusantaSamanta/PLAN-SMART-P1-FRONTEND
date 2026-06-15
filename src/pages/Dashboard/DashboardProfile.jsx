
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { getProfileData } from "../../../utils/checkUserLogin";
import Step1BasicInfo from "./ProfileSetup/Step1BasicInfo";
import Step2Education from "./ProfileSetup/Step2Education";
import Step3Skills from "./ProfileSetup/Step3Skills";
import Step4CVUpload from "./ProfileSetup/Step4CVUpload";
const DashboardProfile = () => {

    const navigate = useNavigate();
    const {
        profileSetupStep, setProfileSetupStep,
        profileSetupForm, setProfileSetupForm,
        profilePicUrl, setProfilePicUrl,
        userCvUrl, setUserCvUrl,
        isProfileComplete, setIsProfileComplete,
        openModal, setOpenModal,
    } = useContext(AppContext);


    useEffect(() => {
        const callGetProfile = async () => {
            const res = await getProfileData();
            if (res) {
                setProfileSetupForm(res.profileData);
                setProfilePicUrl(res.profilePicUrl);
                setUserCvUrl(res.cvUrl);
                setIsProfileComplete(res.fullyUpdated);
            }
        }
        callGetProfile()


    }, [])



    const openEditTab = (step) => {
        setProfileSetupStep(step);
        setOpenModal(true);
        // navigate(`/dashboard/profile-setup`);
    };
    const closeModal = () => {
        setOpenModal(false);
    };
    const renderStep = () => {
        switch (profileSetupStep) {
            case 1: return <Step1BasicInfo />;
            case 2: return <Step2Education />;
            case 3: return <Step3Skills />;
            case 4: return <Step4CVUpload />;
            default: return null;
        }
    };
    // const [whichPage, setWhichPage] = useState('')
    const pageTitleMap = {
        1: "Basic Details",
        2: "Education Details",
        3: "Skills Details",
        4: "File Upload",
    };





    const Section = ({ title, children, onEdit }) => (
        <div className="border-b border-gray-700 py-5">
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-medium text-white">{title}</h3>
                <button
                    onClick={onEdit}
                    className="text-sm text-blue-400 hover:underline"
                >
                    Edit
                </button>
            </div>
            <div className="flex flex-col gap-2">{children}</div>
        </div>
    );

    const Item = ({ label, value }) => (
        <div className="flex justify-between text-sm">
            <span className="text-gray-400">{label}</span>
            <span className="text-white font-medium">
                {value || "-"}
            </span>
        </div>
    );



    return (
        <>
            {
                isProfileComplete ?
                    <div className="w-full px-0 md:px-8 md:py-6 ">

                        {/* Header */}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                            <h1 className="text-2xl font-semibold text-white">My Profile</h1>
                            <button
                                onClick={() => openEditTab(1)}
                                className="mt-3 md:mt-0 px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-md"
                            >
                                Edit Profile
                            </button>
                        </div>

                        {/* Profile Card */}
                        <div className="bg-[#121b33] rounded-lg p-6 shadow-lg">

                            {/* BASIC INFO */}
                            <Section
                                title="Basic Details"
                                onEdit={() => openEditTab(1)}
                            >
                                <Item label="Full Name" value={profileSetupForm.name} />
                                <Item label="Email" value={profileSetupForm.email} />
                                <Item label="Phone" value={profileSetupForm.phone} />
                                <Item label="Location" value={profileSetupForm.location} />
                            </Section>

                            {/* EDUCATION & EXPERIENCE */}
                            <Section
                                title="Education & Experience"
                                onEdit={() => openEditTab(2)}
                            >
                                <Item label="Qualification" value={profileSetupForm.highestQualification} />
                                <Item label="University" value={profileSetupForm.university} />
                                <Item label="Graduation Year" value={profileSetupForm.graduationYear} />
                                <Item
                                    label="Has Experience"
                                    value={profileSetupForm.hasExperience}
                                />
                                {profileSetupForm.hasExperience == 'yes' && (
                                    <Item label="Experience" value={`${profileSetupForm.experienceYears} Years`} />
                                )}
                                {profileSetupForm.hasExperience == 'yes' && (
                                    <Item label="Current Role" value={profileSetupForm.currentRole} />
                                )}
                            </Section>

                            {/* SKILLS */}
                            <Section
                                title="Technical Skills"
                                onEdit={() => openEditTab(3)}
                            >
                                <div className="flex flex-wrap gap-2">
                                    {profileSetupForm.skills?.map((skill, i) => (
                                        <span
                                            key={i}
                                            className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </Section>

                            {/* FILES */}
                            <Section
                                title="Documents"
                                onEdit={() => openEditTab(4)}
                            >
                                <Item
                                    label="Profile Photo"
                                    value={profilePicUrl ? "Uploaded" : "Not Uploaded"}
                                />
                                <Item
                                    label="Resume / CV"
                                    value={userCvUrl ? "Uploaded" : "Not Uploaded"}
                                />
                            </Section>

                        </div>
                    </div>

                    :

                    <div className="flex flex-col items-center justify-center h-[80vh] text-center text-white">
                        <h2 className="text-2xl font-semibold mb-3">
                            ⚠️ Complete Your Profile to Proceed
                        </h2>
                        <p className="text-gray-400 max-w-md mb-6">
                            Please fill in your personal and technical details to unlock AI interview
                            suggestions and job recommendations.
                        </p>
                        <Link
                            to="/dashboard/profile-setup"
                            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md text-white font-medium transition"
                        >
                            Complete Profile Now
                        </Link>
                    </div>

            }


            {openModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-[2px]">
                    <div className="bg-[#121b33] w-full max-w-2xl mx-4 rounded-lg shadow-lg relative">

                        {/* Modal Header */}
                        <div className="flex justify-between items-center p-4 border-b border-gray-700">
                            <h2 className="text-lg font-semibold">
                                Edit {pageTitleMap[profileSetupStep]}
                            </h2>
                            <button
                                onClick={closeModal}
                                className="text-gray-400 hover:text-white text-xl"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 max-h-[80vh] overflow-y-auto">
                            {renderStep()}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default DashboardProfile