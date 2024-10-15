import React from "react";
import { Incident } from "@/models/incident";

interface ParticipantProps {
  role: string;
  name: string | null;
  avatar: string | null;
  onClick?: () => void;
}

const Participant: React.FC<ParticipantProps> = ({
  role,
  name,
  avatar,
  onClick,
}) => (
  <div
    className='flex items-center mb-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors'
    onClick={onClick}
  >
    <div className='flex items-center'>
      {avatar ? (
        <img
          src={avatar}
          alt={name || "Avatar"}
          className='w-8 h-8 rounded-full mr-2'
        />
      ) : (
        <div className='w-8 h-8 rounded-full mr-2 bg-gray-200 flex items-center justify-center'>
          <span className='text-gray-500 text-xs'>N/A</span>
        </div>
      )}
      <div>
        <div className='font-semibold'>{name || "Not assigned"}</div>
        <div className='text-sm text-gray-500'>{role}</div>
      </div>
    </div>
  </div>
);

interface IncidentParticipantsProps {
  incident: Incident;
  setActiveModal: (modalId: string) => void;
}

const IncidentParticipants: React.FC<IncidentParticipantsProps> = ({
  incident,
  setActiveModal,
}) => {
  return (
    <div>
      <Participant
        role='Incident Lead'
        name={incident?.leadName}
        avatar={incident?.leadAvatar}
        onClick={() => setActiveModal("changeRoles")}
      />
      <Participant
        role='Reporter'
        name={incident.reporterName}
        avatar={incident.reporterAvatar}
      />
      <Participant
        role='QE'
        name={incident?.QEName}
        avatar={incident?.QEAvatar}
        onClick={() => setActiveModal("updateQE")}
      />
      <h3 className='font-semibold mt-4 mb-2'>Active participants</h3>
      {/* {incident.activeParticipants?.map((participant, index) => (
        <Participant
          key={index}
          role="Active"
          name={participant.name}
          avatar={participant.avatar}
        />
      ))} */}
    </div>
  );
};

export default IncidentParticipants;
