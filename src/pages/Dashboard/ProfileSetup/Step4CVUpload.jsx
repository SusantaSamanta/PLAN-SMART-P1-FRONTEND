import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../../context/AppContext";

const Step4CVUpload = () => {
    const {
        profileSetupStep, setProfileSetupStep,
        profileSetupForm, setProfileSetupForm,
    } = useContext(AppContext);

    const [cvFile, setCvFile] = useState(profileSetupForm.cv || null);
    const [previewUrl, setPreviewUrl] = useState(null);

    // Handle file selection
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // ✅ Validate type
        const validTypes = [
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];
        if (!validTypes.includes(file.type)) {
            alert("Please upload only PDF or DOCX files.");
            return;
        }

        setCvFile(file);

        // ✅ Create preview URL (to open later)
        const fileURL = URL.createObjectURL(file);
        setPreviewUrl(fileURL);
    };

    // Sync with global form state
    useEffect(() => {
        if (cvFile) {
            setProfileSetupForm((prev) => ({
                ...prev,
                cvFile: cvFile,
            }));
        }
        console.log('ok');
        
    }, [cvFile, setProfileSetupForm]);

    // Submit handler
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!cvFile) {
            alert("Please upload your CV before proceeding.");
            return;
        }

        console.log("Form with CV:", profileSetupForm);
        setProfileSetupStep(profileSetupStep + 1);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold mb-2 text-gray-300">
                Upload Your Resume / CV
            </h3>

            {/* File Input */}
            <div className="flex flex-col gap-3">
                <input
                    type="file"
                    accept=".pdf, .docx"
                    onChange={handleFileChange}
                    className="bg-[#1b2544] border border-gray-600 p-3 rounded-md text-white cursor-pointer file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                    required
                />

                {/* Preview Button */}
                {previewUrl && (
                    <button
                        type="button"
                        onClick={() => window.open(previewUrl, "_blank")}
                        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md transition w-fit"
                    >
                        Preview CV
                    </button>
                )}
            </div>

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
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md transition"
                >
                    Next
                </button>
            </div>
        </form>
    );
};

export default Step4CVUpload;
