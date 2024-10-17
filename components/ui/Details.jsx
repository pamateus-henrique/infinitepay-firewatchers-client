// import React from "react";
// import { Incident } from "@/models/incident";

// interface Details {
//   incidentSource: string | null;
//   products: [] | null;
//   areas: [] | null;
//   performanceIndicators: [] | null;
//   impact: string | null;
//   treatment: string | null;
//   faultySystem: [] | null;
//   causes
//   onClick?: () => void;
// }

// const Participant: React.FC<Details> = ({ role, name, avatar, onClick }) => (
//   <div
//     className='flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors'
//     onClick={onClick}
//   >
//     <div className='flex items-center w-full text-sm justify-between'>
//       <div className=' text-gray-500'>{role}</div>
//       <div className=' flex items-center'>
//         {/* {avatar ? (
//           <img
//             src={avatar}
//             alt={name || "Avatar"}
//             className='w-6 h-6 rounded-full mr-2'
//           />
//         ) : (
//           <div className='w-8 h-8 rounded-full mr-2 bg-gray-200 flex items-center justify-center'>
//             <span className='text-gray-500 text-xs'>N/A</span>
//           </div>
//         )}
//         <div className=''>{name || "Not assigned"}</div> */}
//       </div>
//     </div>
//   </div>
// );

// interface IncidentParticipantsProps {
//   incident: Incident;
//   setActiveModal: (modalId: string) => void;
// }

// const IncidentParticipants: React.FC<IncidentParticipantsProps> = ({
//   incident,
//   setActiveModal,
// }) => {
//   return (
//     <div>
//       <Participant
//         role='Incident Lead'
//         name={incident?.leadName}
//         avatar={incident?.leadAvatar}
//         onClick={() => setActiveModal("changeRoles")}
//       />
//       <Participant
//         role='Reporter'
//         name={incident.reporterName}
//         avatar={incident.reporterAvatar}
//       />
//       <Participant
//         role='QE'
//         name={incident?.QEName}
//         avatar={incident?.QEAvatar}
//         onClick={() => setActiveModal("changeRoles")}
//       />
//       {/* Remove the "Active participants" section for now */}
//     </div>
//   );
// };

// export default IncidentParticipants;
