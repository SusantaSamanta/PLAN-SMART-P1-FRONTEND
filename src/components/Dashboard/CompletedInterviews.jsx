import React from 'react'

const CompletedInterviews = () => {
    // 🔹 Dummy data (replace with API)
    const completed = [
        {
            id: 1,
            title: "Data Analyst",
            company: "Fractal Analytics",
            attempts: 2,
            score: null,
        },
    ];

    return (
        <div className="space-y-5">
            {completed.length === 0 ? (
                <p className="text-gray-400">No completed interviews</p>
            ) : (
                completed.map((item) => (
                    <div
                        key={item.id}
                        className="bg-[#121b33] p-5 rounded-xl border border-gray-700 flex flex-col md:flex-row md:items-center md:justify-between"
                    >
                        {/* Info */}
                        <div>
                            <h3 className="text-white text-lg font-medium">
                                {item.title}
                            </h3>
                            <p className="text-gray-400 text-sm">
                                {item.company}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                Attempts: {item.attempts}
                            </p>
                        </div>

                        {/* Action */}
                        <button className="mt-4 md:mt-0 px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded-md text-sm font-semibold">
                            View Score
                        </button>
                    </div>
                ))
            )}
        </div>
    );
};


export default CompletedInterviews;