import React from "react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, AlertTriangle, Activity, Tag } from "lucide-react";
import { calculateTimeDifference } from "@/utils/time";

interface IncidentCardProps {
  id: number;
  type: string;
  title: string;
  severity: string;
  status: string;
  impactStartedAt: string;
  lead: string;
  summary: string;
  leadAvatar: string;
}

const IncidentCard: React.FC<IncidentCardProps> = ({
  id,
  title,
  type,
  severity,
  status,
  summary,
  impactStartedAt,
  lead,
  leadAvatar,
}) => {
  const timeDifference = calculateTimeDifference(impactStartedAt);

  return (
    <Link href={`/incidents/${id}`} className='block'>
      <div className='bg-white rounded shadow mb-4 flex flex-col hover:shadow-md transition-shadow'>
        {/* Section 1: ID and Title */}
        <div className='flex px-2 py-3 bg-slate-200'>
          <span className='font-semibold text-sm mr-1'>{id}: </span>
          <h4 className='font-bold text-gray-700 text-sm truncate flex-1'>
            {title}
          </h4>
        </div>
        <Separator />

        {/* Section 2: Duration, Severity, Status, Type*/}
        <div className=''>
          <div className='flex space-x-4 px-2 py-2'>
            <div className='flex items-center'>
              <AlertTriangle
                className={`h-4 w-4 mr-1 ${
                  severity === "Minor" ? "text-yellow-800" : "text-red-800"
                }`}
              />
              <span
                className={`rounded text-sm ${
                  severity === "Minor" ? "text-yellow-800" : "text-red-800"
                }`}
              >
                {severity}
              </span>
            </div>
            <div className='flex items-center'>
              <Activity className='h-4 w-4 mr-1 text-red-800' />
              <span className='text-red-800 rounded text-sm'>{status}</span>
            </div>
            <div className='flex items-center'>
              <Tag className='h-4 w-4 mr-1 text-gray-800' />
              <span className='text-gray-800 rounded text-sm'>{type}</span>
            </div>
            <div className='flex items-center'>
              <Clock className='h-4 w-4 mr-1 text-gray-500' />
              <span className='text-gray-500 text-sm'>{timeDifference}</span>
            </div>
          </div>
        </div>
        <Separator />
        {/* Section 3: Fixed-size Description and Reporter */}
        <div className='flex-grow flex flex-col justify-between p-2 h-48'>
          <p className='text-gray-600 mb-2 line-clamp-3 overflow-hidden'>
            {summary}
          </p>
          <div className='px-1 flex gap-2 items-center'>
            <Avatar className='h-6 w-6'>
              <AvatarImage src={leadAvatar} alt={"Lead Image"} />
              <AvatarFallback>{lead[0]}</AvatarFallback>
            </Avatar>
            <span className='text-sm text-gray-500'>{lead}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default IncidentCard;
