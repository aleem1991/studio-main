"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, Clock, MapPin, Activity } from 'lucide-react';

// Fake data for active orders
const activeOrders =[
  {
    id: 'ORD-8923',
    store: 'City Care Pharmacy',
    status: 'Out for Delivery',
    items: 'Paracetamol, Cough Syrup',
    total: '$14.50',
    time: '10 mins away',
  },
  {
    id: 'ORD-8924',
    store: 'HealthPlus Meds',
    status: 'Preparing Order',
    items: 'Prescription Uploaded',
    total: 'Pending',
    time: 'Awaiting confirmation',
  }
];

export default function MyOrdersPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Active Orders</h1>
        <p className="text-muted-foreground">Track your ongoing medicine deliveries.</p>
      </div>

      <div className="grid gap-6">
        {activeOrders.map((order) => (
          <Card key={order.id} className="border-2 rounded-[2rem] overflow-hidden shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between bg-muted/30 pb-4 border-b">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <div className="bg-primary/10 p-2 rounded-lg text-primary">
                  <Package className="h-5 w-5" />
                </div>
                {order.id}
              </CardTitle>
              <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                order.status === 'Out for Delivery' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                {order.status}
              </span>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center text-sm font-medium">
                    <MapPin className="mr-3 h-5 w-5 text-muted-foreground" /> 
                    <span className="text-muted-foreground mr-1">From:</span> {order.store}
                  </div>
                  <div className="flex items-center text-sm font-medium">
                    <Activity className="mr-3 h-5 w-5 text-muted-foreground" /> 
                    <span className="text-muted-foreground mr-1">Items:</span> {order.items}
                  </div>
                </div>
                <div className="space-y-3 sm:text-right flex flex-col sm:items-end justify-center">
                  <div className="text-2xl font-black">{order.total}</div>
                  <div className="flex items-center text-sm text-primary font-bold">
                    <Clock className="mr-1.5 h-4 w-4" /> {order.time}
                  </div>
                </div>
              </div>
              <div className="mt-8 flex gap-4">
                <Button className="w-full sm:w-auto rounded-full px-8 shadow-lg shadow-primary/20 font-bold">Track Order</Button>
                <Button variant="outline" className="w-full sm:w-auto rounded-full px-8 font-bold">Contact Support</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}