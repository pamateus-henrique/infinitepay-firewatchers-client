"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { api } from "@/utils/api";
import { Incident } from "@/models/incident";
import IncidentHeader from "@/components/IncidentHeader";
import IncidentStatusBar from "@/components/IncidentStatusBar";
import IncidentParticipants from "@/components/IncidentParticipants";
import IncidentUpdates from "@/components/IncidentUpdates";
import RichTextEditor from "@/components/RichTextEditor";

export default function IncidentDetailPage() {
  const { incidentId } = useParams();
  const [incident, setIncident] = useState<Incident | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchIncident() {
      try {
        const response = await api.get(`/incidents/${incidentId}`);
        setIncident(response.data.incidents);
        console.log(response.data.incidents);
      } catch (err) {
        setError("Error fetching incident details. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchIncident();
  }, [incidentId]);

  const handleSummarySave = async (newSummary: string) => {
    try {
      await api.patch(`/incidents/${incidentId}`, {
        data: { summary: newSummary },
      });
      setIncident((prev) => (prev ? { ...prev, summary: newSummary } : null));
      // You might want to show a success message to the user here
    } catch (err) {
      console.error("Error updating summary:", err);
      // You might want to show an error message to the user here
    }
  };

  if (isLoading) return <p>Loading incident details...</p>;
  if (error) return <p className='text-red-500'>{error}</p>;
  if (!incident) return <p>Incident not found.</p>;

  return (
    <div className='-m-8 lg:-mt-8 flex flex-col'>
      <IncidentHeader
        incidentId={`INC-${incident.id}`}
        title={incident.title}
      />
      <IncidentStatusBar
        stages={[
          "Investigating",
          "Fixing",
          "Monitoring",
          "Cleanup",
          "Documentation",
          "InReview",
        ]}
        status={incident.status}
        severity={incident.severity}
        type={incident.type}
        duration='Ongoing for 2mo'
      />
      <div className='flex mt-4'>
        <div className='w-full md:w-3/4 px-8'>
          <div className='mb-6'>
            <h2 className='text-2xl font-bold mb-2'>Summary</h2>
            <RichTextEditor
              initialContent={incident.summary}
              onSave={handleSummarySave}
            />
          </div>
          <IncidentUpdates incident={incident} />
        </div>
        <div className='hidden md:block md:w-1/4 md:pr-0 pr-4'>
          <IncidentParticipants incident={incident} />
        </div>
      </div>
    </div>
  );
}
