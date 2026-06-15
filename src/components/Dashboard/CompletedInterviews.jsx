import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addCompletedInterviews } from "../../store/slices/CompletedInterviewsSlice";

const CompletedInterviews = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    const firstTime = useRef(false);
    useEffect(() => {
        const getCompletedInterviews = async () => {
            if (firstTime.current) { return }
            firstTime.current = true;
            try {
                const response = await axios.get("/api/user/job/get-completed-interviews");
                if (response.data.success) {
                    dispatch(addCompletedInterviews(response.data.interviews));
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        getCompletedInterviews();
    }, [firstTime]);

    const completed = useSelector((state) => state.completedInterviews);
    const [handleShowReview, setHandleShowReview] = useState(false);


    if (loading) {
        return (
            <div className="flex justify-center py-10">
                <p className="text-gray-400">
                    Loading completed interviews...
                </p>
            </div>
        );
    }

    if (completed.length === 0) {
        return (
            <div className="flex justify-center py-10">
                <p className="text-gray-400">
                    No completed interviews found.
                </p>
            </div>
        );
    }




    return (

        <div className="space-y-5">
            {completed.map((item) => (
                <div
                    key={item._id}
                    className="bg-[#121b33] p-3 md:p-5 rounded-xl border border-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                    <div className="flex">
                        <img src={item.job?.companyLogo}
                            alt={item.job?.company}
                            className="w-12 h-12 mr-4 rounded-full object-contain bg-white border-2"
                        />
                        <div>

                            <h3 className="text-white text-lg font-medium">
                                {item.job?.title}
                            </h3>

                            <p className="text-gray-400 text-sm">
                                <span className="mr-0">{item.job?.company}</span> • <span className="ml-0">{new Date(item.createdAt).toLocaleDateString()}</span>
                            </p>

                            <p className="text-xs text-gray-500 mt-1">
                                Attempt: {item.whichAttempt}
                            </p>

                            <p className="text-xs text-gray-500 mt-1">
                                {/* {new Date(item.createdAt).toLocaleDateString()} */}
                            </p>

                            <p className="text-sm text-green-400 mt-2">
                                Overall Score:{" "}
                                {item.review?.[0]?.overallScore ?? "N/A"}/10
                            </p>
                        </div>
                    </div>

                    <button onClick={() => setHandleShowReview(item)}
                        className="self-start md:self-center px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-semibold cursor-pointer"
                    >
                        View Review
                    </button>

                    {handleShowReview && (
                        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/60 backdrop-blur-[2px]">
                            <div className="bg-[#121b33] w-full md:max-w-2xl rounded-b-none md:rounded-xl border border-gray-700 p-6 max-h-[90vh] overflow-y-auto">

                                <h2 className="text-2xl font-bold text-white mb-6">
                                    {handleShowReview.job?.title}
                                </h2>

                                <div className="grid grid-cols-3 gap-4 mb-6">

                                    <div className="bg-[#1a2748] p-4 rounded-lg text-center">
                                        <p className="text-gray-400 text-sm">Overall</p>
                                        <p className="text-green-400 text-2xl font-bold">
                                            {handleShowReview.review?.[0]?.overallScore}/10
                                        </p>
                                    </div>

                                    <div className="bg-[#1a2748] p-4 rounded-lg text-center">
                                        <p className="text-gray-400 text-sm">Communication</p>
                                        <p className="text-blue-400 text-2xl font-bold">
                                            {handleShowReview.review?.[0]?.communicationScore}/10
                                        </p>
                                    </div>

                                    <div className="bg-[#1a2748] p-4 rounded-lg text-center">
                                        <p className="text-gray-400 text-sm">Technical</p>
                                        <p className="text-purple-400 text-2xl font-bold">
                                            {handleShowReview.review?.[0]?.technicalScore}/10
                                        </p>
                                    </div>

                                </div>

                                <div className="mb-5">
                                    <h3 className="text-green-400 font-semibold mb-2">
                                        Strengths
                                    </h3>

                                    <div className="flex flex-wrap gap-2">
                                        {handleShowReview.review?.[0]?.strengths?.map(
                                            (strength, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm"
                                                >
                                                    {strength}
                                                </span>
                                            )
                                        )}
                                    </div>
                                </div>

                                <div className="mb-5">
                                    <h3 className="text-yellow-400 font-semibold mb-2">
                                        Areas Of Improvement
                                    </h3>

                                    <div className="flex flex-wrap gap-2">
                                        {handleShowReview.review?.[0]?.areasOfImprovement?.map(
                                            (area, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm"
                                                >
                                                    {area}
                                                </span>
                                            )
                                        )}
                                    </div>
                                </div>

                                <div className="mb-5">
                                    <h3 className="text-blue-400 font-semibold mb-2">
                                        Feedback
                                    </h3>

                                    <div className="bg-[#1a2748] p-4 rounded-lg text-gray-300">
                                        {handleShowReview.review?.[0]?.feedback}
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        onClick={() => setHandleShowReview(null)}
                                        className="px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-700"
                                    >
                                        Close
                                    </button>
                                </div>

                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CompletedInterviews;