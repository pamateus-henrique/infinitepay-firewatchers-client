import React from "react";

interface Incident {
  id: string;
  title: string;
  severity: "Major" | "Minor";
  status: string;
  team: string;
  duration: string;
  reportedTime: string;
  reporter: string;
}

const incidents: Incident[] = [
  {
    id: "INC-3418",
    title: "Pix Core is down",
    severity: "Major",
    status: "Monitoring",
    team: "Pix",
    duration: "3h 3m",
    reportedTime: "Reported 3h 3m ago",
    reporter: "Everton Costa",
  },
  {
    id: "INC-3417",
    title:
      "Transactions being reverted on authorizer and infinitecard creation/tokenization failing",
    severity: "Minor",
    status: "Documentation",
    team: "Authorization",
    duration: "5h 55m",
    reportedTime: "Reported 5h 55m ago",
    reporter: "Jhonatan Figueiredo Cardoso",
  },
  // Add more incidents here...
];

const IncidentList: React.FC = () => {
  return (
    <ul>
      {incidents.map((incident) => (
        <li key={incident.id} className='border-b last:border-b-0'>
          <div className='flex items-center p-4 hover:bg-gray-50 cursor-pointer'>
            <input type='checkbox' className='mr-4' />
            <div className='flex-grow'>
              <div className='flex items-center space-x-2 mb-1'>
                <span className='font-semibold'>{incident.id}</span>
                <span>{incident.title}</span>
              </div>
              <div className='flex items-center space-x-2 text-sm text-gray-600'>
                <span
                  className={`px-2 py-1 rounded ${
                    incident.severity === "Major"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {incident.severity}
                </span>
                <span className='px-2 py-1 rounded bg-blue-100 text-blue-800'>
                  {incident.status}
                </span>
                <span className='px-2 py-1 rounded bg-gray-100'>
                  {incident.team}
                </span>
                <span>{incident.duration}</span>
                <span>{incident.reportedTime}</span>
                <span>{incident.reporter}</span>
              </div>
            </div>
            <span className='text-gray-400'>›</span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default IncidentList;
