import React from "react";
import IncidentList from "@/components/IncidentList";

export default function IncidentsPage() {
  return (
    <div className='space-y-6'>
      <header className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold flex items-center'>
          <span className='text-red-500 mr-2'>🔥</span> Incidents
        </h1>
        <div className='flex space-x-4'>
          <label className='flex items-center'>
            <input type='checkbox' className='mr-2' />
            Include private incidents
          </label>
          <button className='px-3 py-1 bg-gray-200 rounded'>Export CSV</button>
          <button className='px-3 py-1 bg-gray-200 rounded'>Filter</button>
          <button className='px-3 py-1 bg-gray-200 rounded'>Save view</button>
          <button className='px-4 py-2 bg-black text-white rounded'>
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
        <IncidentList />
      </div>
    </div>
  );
}
