"use client";

import React, { useState, useEffect } from "react";
import IncidentList from "@/components/IncidentList";
import { api } from "@/utils/api";
import { IncidentOverview } from "@/models/incident";

export default function IncidentsPage() {
  const [incidents, setIncidents] = useState<IncidentOverview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchIncidents() {
      try {
        const response = await api.get("/incidents");
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
      <header className='flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center'>
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl sm:text-3xl font-bold flex items-center'>
            <span className='text-red-500 mr-2'>🔥</span> Incidents
          </h1>
          <div className='flex sm:hidden'>
            <button
              className='p-2 bg-gray-200 rounded text-sm mr-2'
              title='Include private'
            >
              <span className='sr-only'>Include private</span>
              👁️
            </button>
            <button
              className='p-2 bg-gray-200 rounded text-sm mr-2'
              title='Export CSV'
            >
              <span className='sr-only'>Export CSV</span>
              📊
            </button>
            <button
              className='p-2 bg-gray-200 rounded text-sm mr-2'
              title='Filter'
            >
              <span className='sr-only'>Filter</span>
              🔍
            </button>
            <button
              className='p-2 bg-gray-200 rounded text-sm mr-2'
              title='Save view'
            >
              <span className='sr-only'>Save view</span>
              💾
            </button>
            <button
              className='p-2 bg-black text-white rounded text-sm'
              title='Declare incident'
            >
              <span className='sr-only'>Declare incident</span>
              🚨
            </button>
          </div>
        </div>
        <div className='hidden sm:flex sm:flex-wrap sm:gap-2'>
          <label className='flex items-center'>
            <input type='checkbox' className='mr-2' />
            <span className='text-sm'>Include private</span>
          </label>
          <button className='px-3 py-1 bg-gray-200 rounded text-sm'>
            Export CSV
          </button>
          <button className='px-3 py-1 bg-gray-200 rounded text-sm'>
            Filter
          </button>
          <button className='px-3 py-1 bg-gray-200 rounded text-sm'>
            Save view
          </button>
          <button className='px-4 py-2 bg-black text-white rounded text-sm w-full sm:w-auto'>
            Declare incident
          </button>
        </div>
      </header>

      <div className='bg-white rounded-lg shadow'>
        <div className='p-4 border-b'>
          <input
            type='text'
            placeholder='Search incidents'
            className='w-full px-3 py-2 border rounded'
          />
        </div>
        {isLoading ? (
          <p className='p-4'>Loading incidents...</p>
        ) : error ? (
          <p className='p-4 text-red-500'>{error}</p>
        ) : (
          <IncidentList incidents={incidents} />
        )}
      </div>
    </div>
  );
}
