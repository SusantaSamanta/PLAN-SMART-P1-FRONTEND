import React, { useState } from "react";
import CompletedInterviews from "../../components/Dashboard/CompletedInterviews";
import PendingInterviews from "../../components/Dashboard/PendingInterviews";

const DashboardAiInterview = () => {

  const [activeTab, setActiveTab] = useState("pending");
  return (
    <div className="w-full px-0 md:px-4 py-0 md:py-4">
      {/* Page Title */}
      <h1 className=" text-xl md:text-2xl font-semibold text-white mb-3 md:mb-6">
        AI Interviews
      </h1>

      {/* ================= TOP NAV ================= */}
      <div className="flex gap-10 border-b border-gray-700 mb-4 md:mb-8">
        <button
          onClick={() => setActiveTab("pending")}
          className={`pb-2 text-base font-semibold transition-all border-b-2 border-[#ffffff00]
            ${
              activeTab === "pending"
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-gray-400 hover:text-white"
            }`}
        >
          Pending <span className="hidden md:inline-block">Interviews</span>
        </button>

        <button
          onClick={() => setActiveTab("completed")}
          className={`pb-2 text-base font-semibold transition-all border-b-2 border-[#ffffff00]
            ${
              activeTab === "completed"
                ? "text-green-600 border-b-2 border-green-600"
                : "text-gray-400 hover:text-white"
            }`}
        >
          Completed <span className="hidden md:inline-block">Interviews</span>
        </button>
      </div>

      {/* ================= CONTENT ================= */}
      {activeTab === "pending" && <PendingInterviews />}
      {activeTab === "completed" && <CompletedInterviews />}
    </div>
  );
};

export default DashboardAiInterview;