"use client";

import { useState } from 'react';
import DashboardLayout from '@/components/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Zap, Pill, ClipboardList, CheckCircle, XCircle } from 'lucide-react';
import { MOCK_ORDERS } from '@/lib/mock-data';
import { analyzePrescription, AnalyzePrescriptionOutput } from '@/ai/flows/medical-store-prescription-analysis';
import Image from 'next/image';

export default function StoreDashboard() {
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [analyzingOrderId, setAnalyzingOrderId] = useState<string | null>(null);
  const [analysisResults, setAnalysisResults] = useState<Record<string, AnalyzePrescriptionOutput>>({});

  const handleAnalyze = async (orderId: string, imageUri: string) => {
    setAnalyzingOrderId(orderId);
    try {
      // In a real app, you'd fetch the base64 from the URL if needed or pass the stored one
      // For demo, we trigger the flow
      const result = await analyzePrescription({ prescriptionImageDataUri: imageUri });
      setAnalysisResults(prev => ({ ...prev, [orderId]: result }));
    } catch (error) {
      console.error("AI Analysis failed", error);
    } finally {
      setAnalyzingOrderId(null);
    }
  };

  return (
    <DashboardLayout role="STORE" userName="Wellness Meds Manager">
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Store Command Center</h1>
            <p className="text-muted-foreground">Manage incoming prescriptions and fulfill orders.</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-200">Store Open</Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Queue */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-primary" />
              Incoming Requests
            </h2>
            
            {orders.filter(o => o.status === 'PENDING').map((order) => (
              <Card key={order.id} className="overflow-hidden border-2 hover:border-primary/30 transition-all">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-48 relative h-48 md:h-auto bg-muted">
                    <Image src={order.prescriptionUrl} alt="Prescription" fill className="object-cover" />
                  </div>
                  <div className="flex-grow p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wider">Order #{order.id}</p>
                        <h3 className="font-bold text-lg">{order.userName}</h3>
                      </div>
                      <Badge variant="secondary">{order.status}</Badge>
                    </div>

                    {analysisResults[order.id] ? (
                      <div className="bg-secondary/5 rounded-xl p-4 border border-secondary/20 space-y-3">
                        <p className="text-xs font-bold text-secondary uppercase flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          AI Analysis Complete
                        </p>
                        <div className="space-y-2">
                          {analysisResults[order.id].medicineItems.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center text-sm">
                              <span className="font-medium">{item.name}</span>
                              <span className="text-muted-foreground text-xs">{item.dosage}</span>
                            </div>
                          ))}
                        </div>
                        {analysisResults[order.id].notes && (
                           <p className="text-xs text-muted-foreground italic border-t pt-2">{analysisResults[order.id].notes}</p>
                        )}
                      </div>
                    ) : (
                      <div className="p-4 rounded-xl border-dashed border-2 flex flex-col items-center justify-center text-center space-y-2 text-muted-foreground">
                        <Zap className="w-6 h-6 opacity-20" />
                        <p className="text-sm">No analysis performed yet</p>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 pt-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="gap-2"
                        disabled={analyzingOrderId === order.id}
                        onClick={() => handleAnalyze(order.id, order.prescriptionUrl)}
                      >
                        {analyzingOrderId === order.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4 text-secondary" />}
                        Run AI Analysis
                      </Button>
                      <Button size="sm" className="gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Fulfill Order
                      </Button>
                      <Button size="sm" variant="ghost" className="text-destructive hover:bg-destructive/10">
                        <XCircle className="w-4 h-4" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Side Panels */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Daily Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 {[
                   { label: 'Completed', value: '14', icon: CheckCircle, color: 'text-green-500' },
                   { label: 'Pending', value: '03', icon: Clock, color: 'text-amber-500' },
                   { label: 'Cancelled', value: '01', icon: XCircle, color: 'text-red-500' },
                 ].map((stat) => (
                   <div key={stat.label} className="flex items-center justify-between border-b last:border-0 pb-3 last:pb-0">
                      <div className="flex items-center gap-3">
                        <stat.icon className={`w-4 h-4 ${stat.color}`} />
                        <span className="text-sm">{stat.label}</span>
                      </div>
                      <span className="font-bold">{stat.value}</span>
                   </div>
                 ))}
              </CardContent>
            </Card>

            <Card className="bg-primary text-primary-foreground">
              <CardHeader>
                <CardTitle className="text-lg">Inventory Low</CardTitle>
                <CardDescription className="text-primary-foreground/70">Restock these soon</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                 {['Amoxicillin', 'Paracetamol', 'Ventolin'].map((med) => (
                   <div key={med} className="flex items-center justify-between text-sm">
                      <span>{med}</span>
                      <Badge variant="outline" className="text-white border-white/20">5 Left</Badge>
                   </div>
                 ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}