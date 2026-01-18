import { useContext } from "react";
import { DashboardContext } from "../../../context/DashboardContext";

const jobs = [
  {
    id: 1,
    sector: 'Artificial Intelligence / ML',
    role: 'Freshers',
    title: "Junior AI Engineer",
    company: "iqigai.ai",
    companyLogo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYo6PtK2QNF0jmMbQAgdPUJlk9yiP2YlFpuvJEXWm78w&s',
    location: "Bengaluru / Mumbai",
    jobtype: "Full Time",
    compensation: {
      type: "CTC",
      value: "4 – 8 LPA",
    },
    requiredskills: ['Strong Python programming', 'Understanding of machine learning algorithms', 'Experience with data preprocessing & visualization', 'Familiarity with libraries (NumPy, Pandas, Scikit-learn)'],
    description: [
      `This role helps candidates prepare for AI and machine learning interviews.
      You will practice algorithm understanding, model evaluation, and 
      real-world AI problem-solving.`
    ],
  },
  {
    id: 2,
    sector: 'Web Development',
    role: 'Freshers',
    title: "Junior Associate Web Developer",
    company: "Vara Infrovate",
    companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_(2019).png',
    location: "Kolkata / Soltlake",
    jobtype: "Full Time",
    compensation: {
      type: "CTC",
      value: "3 – 5 LPA",
    },
    requiredskills: ['Strong understanding of HTML5, CSS3, JavaScript, MySql, Mongodb', 'Hands-on experience with React (components, props, hooks)', 'Knowledge of responsive design', 'Familiarity with Git & GitHub', 'Tailwind / Bootstrap'],
    description: [
      `This role focuses on frontend development interview preparation. 
      Candidates will practice HTML, CSS, JavaScript, and React concepts 
      commonly tested in frontend interviews.`,

      `You will be evaluated on UI logic, component structure, state management, 
      and basic API integration.`
    ],
  },
  {
    id: 3,
    sector: 'Web Development',
    role: 'Freshers',
    title: "Web Developer Intern",
    company: "Vara Infrovate",
    companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_(2019).png',
    location: "Kolkata / Soltlake",
    jobtype: "Internship",
    compensation: {
      type: "Stipend",
      value: "₹10k – ₹20k / month",
    },
    requiredskills: ['Strong understanding of HTML5, CSS3, JavaScript, MySql, Mongodb', 'Hands-on experience with React (components, props, hooks)', 'Knowledge of responsive design', 'Familiarity with Git & GitHub', 'Tailwind / Bootstrap'],
    description: [
      "This internship role is designed for frontend interview practice.",
      "Candidates will be tested on basic web concepts and UI logic.",
    ],
  },
];

const JobList = ({ onSelectJob, selectedJob }) => {

  const { allJobs, setAllJobs, checkIsJobApplied } = useContext(DashboardContext);

  return (
    <div>
      <h2 className="text-lg font-semibold p-4 border-b border-gray-700">
        Job Profiles
      </h2>

      {
        allJobs.length === 0 ? (
          <div className="flex justify-center items-center py-8">
            <span className="text-sm text-gray-400 tracking-wide">
              Loading jobs…
            </span>
          </div>
        )
          :
          allJobs.map((job) => (
            <div
              key={job._id}
              onClick={() => onSelectJob(job)}
              className={`p-4 border-b border-gray-800 cursor-pointer hover:bg-[#1c2541]
            ${selectedJob?._id === job._id ? "bg-[#1c2541]" : ""}`} // where selectedJob?.id is use because setSelectedJob initially null 
            >
              <h3 className="font-medium text-white">{job.title}</h3>
              <p className="text-sm text-gray-400">
                {job.company} • {job.location}
              </p>

              <div className="flex justify-between mt-2 text-xs">
                <span className="text-blue-400">{job.type}</span>
                <span className="bg-gray-700 px-2 py-1 rounded">
                  {
                    checkIsJobApplied(job._id)
                  }
                </span>
              </div>
            </div>
          ))}
    </div>
  );
};

export default JobList;





























