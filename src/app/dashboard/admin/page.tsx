"use client";

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  Store, 
  ShoppingBag, 
  TrendingUp, 
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';

const data = [
  { name: 'Mon', orders: 40 },
  { name: 'Tue', orders: 30 },
  { name: 'Wed', orders: 60 },
  { name: 'Thu', orders: 45 },
  { name: 'Fri', orders: 70 },
  { name: 'Sat', orders: 90 },
  { name: 'Sun', orders: 50 },
];

export default function AdminDashboard() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <DashboardLayout role="ADMIN" userName="System Administrator">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Platform Overview</h1>
          <p className="text-muted-foreground">Monitoring system activity and global performance metrics.</p>
        </div>

        {/* Global Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Users', value: '1,284', icon: Users, delta: '+12%', color: 'text-blue-600', bg: 'bg-blue-100' },
            { label: 'Active Stores', value: '42', icon: Store, delta: '+2', color: 'text-purple-600', bg: 'bg-purple-100' },
            { label: 'Daily Orders', value: '156', icon: ShoppingBag, delta: '+24%', color: 'text-green-600', bg: 'bg-green-100' },
            { label: 'Gross Volume', value: '$8.4k', icon: TrendingUp, delta: '+18%', color: 'text-orange-600', bg: 'bg-orange-100' },
          ].map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-green-600">{stat.delta}</span>
                </div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Chart */}
          <Card className="p-6">
             <CardHeader className="px-0 pt-0">
               <CardTitle className="text-lg flex items-center gap-2">
                 <Activity className="w-5 h-5 text-primary" />
                 Order Volume
               </CardTitle>
             </CardHeader>
             <div className="h-72 mt-4">
                {isMounted ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      />
                      <Bar dataKey="orders" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="w-full h-full bg-muted animate-pulse rounded-lg" />
                )}
             </div>
          </Card>

          {/* Activity Feed */}
          <Card className="p-6">
             <CardHeader className="px-0 pt-0">
               <CardTitle className="text-lg">Real-time Activity</CardTitle>
             </CardHeader>
             <div className="space-y-6 mt-4">
                {[
                  { user: 'Wellness Meds', action: 'Accepted a new order', time: '2 mins ago', icon: CheckCircle2, color: 'text-green-500' },
                  { user: 'Delivery R32', action: 'Pickup delayed in traffic', time: '12 mins ago', icon: AlertTriangle, color: 'text-amber-500' },
                  { user: 'System', action: 'New store application received', time: '45 mins ago', icon: Store, color: 'text-blue-500' },
                  { user: 'John Smith', action: 'Account verification pending', time: '1 hour ago', icon: Clock, color: 'text-muted-foreground' },
                ].map((log, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                     <div className={`mt-1 p-1.5 rounded-full bg-muted ${log.color}`}>
                       <log.icon className="w-3.5 h-3.5" />
                     </div>
                     <div className="flex-grow pb-4 border-b last:border-0">
                        <p className="text-sm font-medium"><span className="font-bold">{log.user}</span> {log.action}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{log.time}</p>
                     </div>
                  </div>
                ))}
             </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
