"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, FileText, Calendar } from 'lucide-react';

// Fake data for past orders
const pastOrders =[
  {
    id: 'ORD-8810',
    date: 'Oct 24, 2025',
    store: 'Wellness Pharmacy',
    status: 'Delivered',
    total: '$32.00',
  },
  {
    id: 'ORD-8755',
    date: 'Oct 15, 2025',
    store: 'City Care Pharmacy',
    status: 'Cancelled',
    total: '$0.00',
  },
  {
    id: 'ORD-8622',
    date: 'Sep 28, 2025',
    store: 'HealthPlus Meds',
    status: 'Delivered',
    total: '$18.50',
  }
];

export default function OrderHistoryPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Order History</h1>
        <p className="text-muted-foreground">View your past orders and download receipts.</p>
      </div>

      <div className="space-y-4">
        {pastOrders.map((order) => (
          <Card key={order.id} className="overflow-hidden border-2 rounded-[1.5rem] shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 gap-6">
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-2xl ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {order.status === 'Delivered' ? <CheckCircle2 className="h-6 w-6" /> : <XCircle className="h-6 w-6" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{order.store}</h3>
                    <div className="flex items-center text-sm text-muted-foreground gap-3">
                      <span className="font-medium text-foreground">{order.id}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3"/> {order.date}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-4 sm:pt-0">
                  <div className="text-left sm:text-right">
                    <p className="font-black text-xl">{order.total}</p>
                    <p className={`text-sm font-bold uppercase tracking-wide ${
                      order.status === 'Delivered' ? 'text-green-600' : 'text-red-600'
                    }`}>{order.status}</p>
                  </div>
                  <Button variant="outline" size="icon" className="rounded-full w-10 h-10 border-2" title="View Receipt">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}