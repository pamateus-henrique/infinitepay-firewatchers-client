import React from "react";
import { IncidentOverview } from "@/models/incident";
import { calculateTimeDifference } from "@/utils/time";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

interface IncidentListProps {
  incidents: IncidentOverview[];
}

const IncidentList: React.FC<IncidentListProps> = ({ incidents }) => {
  return (
    <ul className='divide-y divide-gray-200'>
      {incidents.map((incident) => (
        <li key={incident.id}>
          <div className='p-4 hover:bg-gray-50 cursor-pointer'>
            <div className='flex items-start space-x-3'>
              <input type='checkbox' className='mt-1' />
              <div className='flex-grow space-y-1'>
                <div className='flex items-center space-x-2'>
                  <span className='font-semibold text-sm'>
                    INC-{incident.id}
                  </span>
                  <span className='text-sm'>{incident.title}</span>
                </div>
                <div className='flex flex-wrap items-center gap-2 text-xs text-gray-600'>
                  <span
                    className={`px-2 py-0.5 rounded ${
                      incident.severity === "Major"
                        ? "bg-red-100 text-red-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {incident.severity === "Major" ? "Major" : "Investigating"}
                  </span>
                  <span className='px-2 py-0.5 rounded bg-gray-100'>
                    {incident.type || "Default"}
                  </span>
                  <span>
                    Reported {calculateTimeDifference(incident.impactStartedAt)}{" "}
                    ago
                  </span>
                  <div className='flex items-center space-x-1'>
                    <Avatar className='h-5 w-5'>
                      <AvatarImage
                        src={incident.leadAvatar}
                        alt={incident.lead}
                      />
                      <AvatarFallback>{incident.lead[0]}</AvatarFallback>
                    </Avatar>
                    <span>{incident.lead}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default IncidentList;
