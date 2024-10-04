import React from 'react';
import { Incident } from '@/models/incident';

interface IncidentUpdatesProps {
  incident: Incident;
}

const IncidentUpdates: React.FC<IncidentUpdatesProps> = ({ incident }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Updates</h2>
      {/* Add your updates content here */}
      <p>Updates for the incident will be displayed here.</p>
    </div>
  );
};

export default IncidentUpdates;