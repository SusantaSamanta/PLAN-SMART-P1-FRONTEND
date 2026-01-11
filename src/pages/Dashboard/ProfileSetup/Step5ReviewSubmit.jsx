import React, { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Step5ReviewSubmit = () => {
    const {
        profileSetupStep, setProfileSetupStep,
        profileSetupForm, setProfileSetupForm,
        profilePicUrl, setProfilePicUrl,
        userCvUrl, setUserCvUrl,
        setIsProfileComplete,
    } = useContext(AppContext);

    const navigate = useNavigate();
    const [agree, setAgree] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleFinalSubmit = async () => {
        if (!agree) {
            toast.error("Please confirm that all details are correct");
            return;
        }

        try {
            setLoading(true);

            const { data } = await axios.get(
                "/api/user/final-profile-submit",
            );

            if (data.success) {
                setIsProfileComplete(true);
                toast.success("Profile setup completed successfully 🎉");
                navigate(`/dashboard`);

            } else {
                toast.error("Profile setup not completed !");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };



    const Section = ({ title, children, onEdit }) => (
        <div className="bg-[#1b2544] p-4 rounded-md border border-gray-700">
            <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold">{title}</h3>
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
            <span className="font-medium">{value || "-"}</span>
        </div>
    );


    return (
        <div className="flex flex-col gap-6">

            {/* BASIC INFO */}
            <Section
                title="Basic Information"
                onEdit={() => setProfileSetupStep(1)}
            >
                <Item label="Name" value={profileSetupForm.name} />
                <Item label="Email" value={profileSetupForm.email} />
                <Item label="Phone" value={profileSetupForm.phone} />
                <Item label="Location" value={profileSetupForm.location} />
            </Section>

            {/* EDUCATION & EXPERIENCE */}
            <Section
                title="Education & Experience"
                onEdit={() => setProfileSetupStep(2)}
            >
                <Item label="Qualification" value={profileSetupForm.highestQualification} />
                <Item label="University" value={profileSetupForm.university} />
                <Item label="Graduation Year" value={profileSetupForm.graduationYear} />
                <Item
                    label="Has Experience"
                    value={profileSetupForm.hasExperience}
                />
                {profileSetupForm.hasExperience == 'yes' && ( // <Item label="Current Role" value={profileSetupForm.currentRole} />
                    <Item
                        label="Experience"
                        value={
                            profileSetupForm.hasExperience
                                ? `${profileSetupForm.experienceYears} Years`
                                : "Fresher"
                        }
                    />
                )}
                {profileSetupForm.hasExperience == 'yes' && (
                    <Item label="Current Role" value={profileSetupForm.currentRole} />
                )}
            </Section>

            {/* SKILLS */}
            <Section
                title="Technical Skills"
                onEdit={() => setProfileSetupStep(3)}
            >
                <div className="flex flex-wrap gap-2">
                    {profileSetupForm.skills?.map((skill, i) => (
                        <span
                            key={i}
                            className="bg-blue-600 px-3 py-1 rounded-full text-sm"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </Section>

            {/* FILES */}
            <Section
                title="Profile Photo & Resume"
                onEdit={() => setProfileSetupStep(4)}
            >
                <Item label="Profile Photo" value={profilePicUrl ? "Uploaded" : "Not uploaded"} />
                <Item label="Resume / CV" value={userCvUrl ? "Uploaded" : "Not uploaded"} />
            </Section>

            {/* CONFIRMATION */}
            <div className="flex items-start gap-2">
                <input
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                    className="mt-1"
                />
                <p className="text-sm text-gray-300">
                    I confirm that all the above details are correct.
                </p>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex justify-between mt-4">
                <button
                    onClick={() => setProfileSetupStep(4)}
                    className="px-6 py-2 bg-gray-700 hover:bg-gray-800 rounded"
                >
                    Back
                </button>

                <button
                    onClick={handleFinalSubmit}
                    disabled={loading}
                    className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded disabled:opacity-60"
                >
                    {loading ? "Submitting..." : "Final Submit"}
                </button>
            </div>
        </div>
    );
};

export default Step5ReviewSubmit;
