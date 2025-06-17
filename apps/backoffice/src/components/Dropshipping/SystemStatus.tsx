
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Timer } from 'lucide-react';

interface CronJob {
  id: string;
  name: string;
  status: 'running' | 'stopped' | 'error';
  schedule: string;
  lastRun: string;
  nextRun: string;
  duration: string;
}

const cronJobs: CronJob[] = [
  {
    id: '1',
    name: 'Product Import',
    status: 'running',
    schedule: '*/30 * * * *',
    lastRun: '2024-06-17 11:00:00',
    nextRun: '2024-06-17 11:30:00',
    duration: '2m 15s'
  },
  {
    id: '2',
    name: 'Price Update',
    status: 'running',
    schedule: '0 */2 * * *',
    lastRun: '2024-06-17 10:00:00',
    nextRun: '2024-06-17 12:00:00',
    duration: '1m 45s'
  },
  {
    id: '3',
    name: 'Inventory Sync',
    status: 'error',
    schedule: '0 */4 * * *',
    lastRun: '2024-06-17 08:00:00',
    nextRun: '2024-06-17 12:00:00',
    duration: 'Failed'
  },
  {
    id: '4',
    name: 'Report Generation',
    status: 'stopped',
    schedule: '0 6 * * *',
    lastRun: '2024-06-17 06:00:00',
    nextRun: '2024-06-18 06:00:00',
    duration: '5m 20s'
  }
];

export const SystemStatus = () => {
  const getStatusBadge = (status: CronJob['status']) => {
    switch (status) {
      case 'running':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Running</Badge>;
      case 'stopped':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Stopped</Badge>;
      case 'error':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Error</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getStatusColor = (status: CronJob['status']) => {
    switch (status) {
      case 'running':
        return 'bg-green-500';
      case 'stopped':
        return 'bg-gray-400';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Clock className="h-5 w-5 text-blue-600" />
        <h2 className="text-xl font-semibold">Cron Job Status</h2>
      </div>
      
      <div className="grid gap-4">
        {cronJobs.map((job) => (
          <div key={job.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${getStatusColor(job.status)}`}></div>
              <div>
                <h3 className="font-medium text-gray-900">{job.name}</h3>
                <p className="text-sm text-gray-500">Schedule: {job.schedule}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-gray-600">Last Run</div>
                <div className="text-sm font-medium">{job.lastRun}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Next Run</div>
                <div className="text-sm font-medium">{job.nextRun}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Duration</div>
                <div className="text-sm font-medium">{job.duration}</div>
              </div>
              {getStatusBadge(job.status)}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Timer className="h-4 w-4 text-blue-600" />
          <span className="font-medium text-blue-900">System Health</span>
        </div>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-blue-600">Uptime:</span>
            <span className="ml-1 font-medium">99.8%</span>
          </div>
          <div>
            <span className="text-blue-600">Active Jobs:</span>
            <span className="ml-1 font-medium">2/4</span>
          </div>
          <div>
            <span className="text-blue-600">Last Check:</span>
            <span className="ml-1 font-medium">11:15 AM</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
