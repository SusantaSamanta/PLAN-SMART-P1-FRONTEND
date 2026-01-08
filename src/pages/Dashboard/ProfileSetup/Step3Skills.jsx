import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import axios from "axios";

const Step3Skills = () => {

    const {
        profileSetupStep, setProfileSetupStep,
        profileSetupForm, setProfileSetupForm,
    } = useContext(AppContext);


    let previousData = profileSetupForm.skills.length > 0 ? profileSetupForm.skills : [];
    const [skillsObj, setSkillsObj] = useState(previousData);
    const [inputValue, setInputValue] = useState("");

    const handleAddSkill = () => {
        if (inputValue.trim() !== "" && !skillsObj.includes(inputValue.trim())) {
            setSkillsObj([...skillsObj, inputValue.trim()]);
            setInputValue("");
        }
    };


    useEffect(() => {
        setProfileSetupForm((preData) => ({
            ...preData, ['skills']: skillsObj        // setProfileSetupForm(..preData, [email]:'sus123')
        }));
    }, [skillsObj])

    // useEffect(() => {
    //     console.log(profileSetupForm.skills, 'ZZZZ');
    //     console.log(skillsObj, 'ook');
    // }, [profileSetupForm])


    const handleRemoveSkill = (skillToRemove) => {
        setSkillsObj(skillsObj.filter((skill) => skill !== skillToRemove));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("Skills:", skillsObj);
        setProfileSetupStep(profileSetupStep + 1);
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

    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold mb-2 text-gray-300">
                Technical Skills & Programming Languages
            </h3>

            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="Type a skill (e.g. React, Python)"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSkill())}
                    className="bg-[#1b2544] border border-gray-600 p-3 rounded-md text-white flex-1"
                />
                <button
                    type="button"
                    onClick={handleAddSkill}
                    className="bg-blue-600 hover:bg-blue-700 px-4 rounded-md transition"
                >
                    Add
                </button>
            </div>

            {/* Display Skills */}
            <div className="flex flex-wrap gap-2 mt-2">
                {skillsObj.length > 0 ? (
                    skillsObj.map((skill, i) => (
                        <span
                            key={i}
                            className="flex items-center gap-2 bg-blue-500/20 border border-blue-500 text-blue-300 px-3 py-1 rounded-full text-sm"
                        >
                            {skill}
                            <button
                                type="button"
                                onClick={() => handleRemoveSkill(skill)}
                                className="text-red-400 hover:text-red-600 font-bold ml-1"
                            >
                                ×
                            </button>
                        </span>
                    ))
                ) : (
                    <p className="text-gray-500 text-sm italic">No skills added yet.</p>
                )}
            </div>

            <div className="flex justify-between mt-4">
                <button onClick={() => setProfileSetupStep(profileSetupStep - 1)} className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-md transition">
                    Back
                </button>

                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md transition" >
                    Next
                </button>
            </div>
        </form>
    );
};

export default Step3Skills;
