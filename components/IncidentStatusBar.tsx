import React from "react";

interface IncidentStatusBarProps {
  stages: string[];
  status: string;
  severity: string;
  type: string;
  duration: string;
  setActiveModal: (modalId: string) => void;
}

const IncidentStatusBar: React.FC<IncidentStatusBarProps> = ({
  stages,
  status,
  severity,
  type,
  duration,
  setActiveModal,
}) => {
  const currentIndex = stages.indexOf(status);
  const visibleStages = stages.slice(
    Math.max(0, currentIndex - 1),
    Math.min(stages.length, currentIndex + 2)
  );

  return (
    <div className='bg-gray-100 shadow-sm p-4 space-x-4 flex items-center text-sm'>
      <div
        className='flex items-center space-x-2 bg-white p-1 mr-1 cursor-pointer'
        onClick={() => setActiveModal("changeStatus")}
      >
        <div className='hidden sm:flex items-center space-x-2'>
          {stages.map((stage, index) => (
            <React.Fragment key={stage}>
              <span
                className={`${
                  stage === status
                    ? "text-red-500 font-semibold"
                    : "text-gray-500"
                }`}
              >
                {stage}
              </span>
              {index < stages.length - 1 && (
                <span className='text-gray-300'>{">"}</span>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className='sm:hidden flex items-center space-x-2'>
          {visibleStages.map((stage, index) => (
            <React.Fragment key={stage}>
              <span
                className={`${
                  stage === status
                    ? "text-red-500 font-semibold"
                    : "text-gray-500"
                }`}
              >
                {stage}
              </span>
              {index < visibleStages.length - 1 && (
                <span className='text-gray-300'>{">"}</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className='flex items-center space-x-4'>
        <span
          className='bg-yellow-100 text-yellow-800 px-2 py-1 rounded cursor-pointer'
          onClick={() => setActiveModal("changeSeverity")}
        >
          {severity}
        </span>
        <span className='bg-blue-100 text-blue-800 px-2 py-1 rounded'>
          {type}
        </span>
        <span className='bg-gray-100 text-gray-800 px-2 py-1 rounded'>
          {duration}
        </span>
      </div>
    </div>
  );
};

export default IncidentStatusBar;
