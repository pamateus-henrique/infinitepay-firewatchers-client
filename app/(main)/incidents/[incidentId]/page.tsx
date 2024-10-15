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
import DynamicModal from "@/components/DynamicModal";

export default function IncidentDetailPage() {
  const params = useParams();
  const incidentId = params.incidentId as string;
  const [incident, setIncident] = useState<Incident | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [stages, setStages] = useState<string[]>([]);

  useEffect(() => {
    async function fetchIncidentAndStages() {
      if (!incidentId) return;
      setIsLoading(true);
      try {
        const [incidentResponse, stagesResponse] = await Promise.all([
          api.get(`/incidents/${incidentId}`),
          api.get("/options/status"),
        ]);
        setIncident(incidentResponse.data.incidents);
        console.log(stagesResponse);
        const stages = stagesResponse.data.status.map((stage: any) => {
          return stage.name;
        });
        if (stagesResponse.error === false) {
          setStages(stages);
        } else {
          console.error("Unexpected format for statuses data:", stagesResponse);
          setStages([]);
        }
      } catch (err) {
        setError(
          "Error fetching incident details or statuses. Please try again later."
        );
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchIncidentAndStages();
  }, [incidentId]);

  const handleSummarySave = async (newContent: {
    html: string;
    plainText: string;
  }) => {
    setIsSaving(true);
    try {
      const incidentIdInt = parseInt(incidentId, 10);
      if (isNaN(incidentIdInt)) {
        throw new Error("Invalid incident ID");
      }
      const result = await api.post("/incidents/update/summary", {
        id: incidentIdInt,
        summary: newContent.html,
      });
      if (result.status === 200) {
        setIncident((prev) =>
          prev ? { ...prev, summary: newContent.html } : null
        );
        // You might want to show a success message to the user here
      } else {
        throw new Error("Failed to save content");
      }
    } catch (err) {
      console.error("Error updating summary:", err);
      // You might want to show an error message to the user here
    } finally {
      setIsSaving(false);
    }
  };

  const handleModalSuccess = (updatedData: Partial<Incident>) => {
    setIncident((prev) => (prev ? { ...prev, ...updatedData } : null));
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
        stages={stages}
        status={incident.status}
        severity={incident.severity}
        type={incident.type}
        duration='Ongoing for 2mo'
        setActiveModal={setActiveModal}
      />
      <div className='flex mt-4'>
        <div className='w-full md:w-3/4 px-8'>
          <div className='mb-6'>
            <RichTextEditor
              initialContent={incident.summary}
              onSave={handleSummarySave}
              isSaving={isSaving}
            />
          </div>
          <IncidentUpdates incident={incident} />
        </div>
        <div className='hidden md:block md:w-1/4 md:pr-0 pr-4'>
          <IncidentParticipants
            incident={incident}
            setActiveModal={setActiveModal}
          />
        </div>
      </div>
      <DynamicModal
        isOpen={!!activeModal}
        onClose={() => setActiveModal(null)}
        modalId={activeModal || ""}
        incidentId={parseInt(incidentId, 10)}
        initialData={incident || {}}
        onSuccess={handleModalSuccess}
      />
    </div>
  );
}
