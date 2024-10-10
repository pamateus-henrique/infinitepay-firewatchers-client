import React from "react";
import { Button } from "@/components/ui/button";
import { Flame } from "lucide-react";

interface IncidentHeaderProps {
  incidentId: string;
  title: string;
}

const IncidentHeader: React.FC<IncidentHeaderProps> = ({
  incidentId,
  title,
}) => {
  return (
    <div className='bg-white border-b'>
      <div className='max-w-7xl px-4 sm:px-6 lg:px-8 py-4'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
          <div className='flex items-center'>
            <div className='bg-red-100 p-2 rounded-lg mr-3'>
              <Flame className='h-6 w-6 text-red-500' />
            </div>
            <div>
              <h1 className='text-xl font-semibold text-gray-900'>Incidents</h1>
              <p className='text-sm text-gray-600'>
                {incidentId} {title}
              </p>
            </div>
          </div>
          <div className='mt-4 sm:mt-0 flex space-x-2'>
            <Button variant='outline'>Subscribe</Button>
            <Button variant='ghost'>...</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentHeader;
