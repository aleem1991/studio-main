"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, Clock, CheckCircle2, XCircle, MapPin } from 'lucide-react';

// Fake data for incoming store orders
const incomingOrders =[
  {
    id: 'ORD-8925',
    customer: 'John Doe',
    items: 'Amoxicillin 500mg, Ibuprofen',
    time: '2 mins ago',
    distance: '1.2 km away',
  },
  {
    id: 'ORD-8926',
    customer: 'Sarah Smith',
    items: 'Vitamin C, Cough Syrup',
    time: '5 mins ago',
    distance: '3.4 km away',
  }
];

export default function StoreDashboard() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Store Dashboard</h1>
        <p className="text-muted-foreground">Manage your incoming prescription orders.</p>
      </div>

      <div className="grid gap-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" /> Pending Orders
        </h2>
        
        {incomingOrders.map((order) => (
          <Card key={order.id} className="border-2 rounded-[2rem] shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between bg-muted/30 pb-4 border-b">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <div className="bg-primary/10 p-2 rounded-lg text-primary">
                  <Package className="h-5 w-5" />
                </div>
                {order.id}
              </CardTitle>
              <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-yellow-100 text-yellow-700">
                New Request
              </span>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Customer</p>
                  <p className="font-bold">{order.customer}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Requested Medicines</p>
                  <p className="font-medium">{order.items}</p>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mt-2">
                  <Clock className="w-4 h-4" /> {order.time}
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mt-2">
                  <MapPin className="w-4 h-4" /> {order.distance}
                </div>
              </div>
              
              <div className="flex gap-4 border-t pt-6">
                <Button className="flex-1 rounded-full shadow-lg shadow-primary/20 font-bold gap-2 bg-green-600 hover:bg-green-700 text-white">
                  <CheckCircle2 className="w-5 h-5" /> Accept Order
                </Button>
                <Button variant="outline" className="flex-1 rounded-full font-bold gap-2 text-red-600 border-red-200 hover:bg-red-50">
                  <XCircle className="w-5 h-5" /> Reject
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}