"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function UserSettingsPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Account Settings</h1>
        <p className="text-muted-foreground">Manage your profile and delivery details.</p>
      </div>

      <div className="bg-card border-2 rounded-[2rem] p-8 shadow-sm space-y-6">
        <h3 className="text-xl font-bold border-b pb-4">Personal Information</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" defaultValue="John Doe" className="h-11 rounded-xl" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" defaultValue="john@example.com" disabled className="h-11 rounded-xl bg-muted" />
          </div>
        </div>

        <div className="space-y-2 pt-4 border-t">
          <Label htmlFor="address">Delivery Address</Label>
          <Input id="address" placeholder="123 Main St, Apt 4B, City, State, Zip" className="h-11 rounded-xl" />
        </div>

        <div className="pt-6 flex justify-end">
          <Button size="lg" className="rounded-full px-8 shadow-lg shadow-primary/20 font-bold">Save Changes</Button>
        </div>
      </div>
    </div>
  );
}