"use client";

import React, { useState, useEffect } from "react";
import IncidentCard from "@/components/IncidentCard";
import { FaFire } from "react-icons/fa";
import { api } from "@/utils/api";
import { IncidentOverview } from "@/models/incident";

export default function DashboardHome() {
  const [incidents, setIncidents] = useState<IncidentOverview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchIncidents() {
      try {
        const response = await api.get("/incidents"); // Adjust the URL to match your API endpoint
        console.log(response.data.incidents);
        setIncidents(response.data.incidents);
      } catch (err) {
        setError("Error fetching incidents. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchIncidents();
  }, []);

  return (
    <div className='space-y-6'>
      <header className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold'>Home</h1>
        <button className='p-2 sm:px-4 sm:py-2 bg-red-600 text-white rounded-md flex items-center'>
          <FaFire className='w-5 h-5' />
          <span className='hidden sm:inline ml-2'>Declare Incident</span>
        </button>
      </header>

      <section>
        <h2 className='text-xl font-semibold mb-4'>
          <span className='text-red-500 mr-2'>●</span>
          Active incidents
        </h2>
        {isLoading ? (
          <p>Loading incidents...</p>
        ) : error ? (
          <p className='text-red-500'>{error}</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4'>
            {incidents.map((incident) => (
              <IncidentCard key={incident.id} {...incident} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
