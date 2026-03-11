"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, Phone, CheckCircle2, Package } from 'lucide-react';

export default function ActiveDeliveryMapPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Active Delivery</h1>
        <p className="text-muted-foreground">Follow the map to deliver the order.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Map Section */}
        <div className="lg:col-span-2 bg-card border-2 rounded-[2rem] overflow-hidden shadow-sm relative min-h-[400px] flex items-center justify-center bg-muted/20">
          {/* Decorative Fake Map Background */}
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at center, #cbd5e1 2px, transparent 2px)', backgroundSize: '24px 24px' }}></div>
          
          {/* Route Line & Markers */}
          <div className="relative z-10 w-full h-full p-12 flex flex-col justify-between items-center">
            <div className="bg-primary text-white p-3 rounded-full shadow-lg animate-bounce">
              <Package className="w-6 h-6" />
            </div>
            <div className="w-1 h-32 bg-primary/30 border-dashed border-l-4 border-primary"></div>
            <div className="bg-secondary text-secondary-foreground p-3 rounded-full shadow-lg">
              <MapPin className="w-6 h-6" />
            </div>
          </div>

          <div className="absolute top-4 left-4 bg-background/90 backdrop-blur px-4 py-2 rounded-full border shadow-sm font-bold text-sm flex items-center gap-2">
            <Navigation className="w-4 h-4 text-primary" /> 12 mins away
          </div>
        </div>

        {/* Order Details */}
        <div className="space-y-6">
          <Card className="border-2 rounded-[2rem] shadow-sm">
            <CardContent className="p-6 space-y-6">
              <div>
                <p className="text-sm font-bold text-primary uppercase tracking-wider mb-2">Pickup From</p>
                <h3 className="font-bold text-lg">City Care Pharmacy</h3>
                <p className="text-muted-foreground text-sm">123 Health Ave, Medical District</p>
              </div>
              
              <div className="pt-4 border-t">
                <p className="text-sm font-bold text-secondary uppercase tracking-wider mb-2">Deliver To</p>
                <h3 className="font-bold text-lg">John Doe</h3>
                <p className="text-muted-foreground text-sm">456 Park Street, Apartment 4B</p>
              </div>

              <div className="pt-6 flex gap-3">
                <Button size="lg" className="flex-1 rounded-full shadow-lg shadow-primary/20 gap-2">
                  <CheckCircle2 className="w-5 h-5" /> Arrived
                </Button>
                <Button size="icon" variant="outline" className="h-11 w-11 rounded-full border-2">
                  <Phone className="w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}