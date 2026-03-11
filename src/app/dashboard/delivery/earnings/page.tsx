"use client";

import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, TrendingUp, Calendar, Bike } from 'lucide-react';

export default function EarningsPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Your Earnings</h1>
        <p className="text-muted-foreground">Track your deliveries and revenue.</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-6">
        {[
          { title: "Today's Earnings", amount: "$84.50", icon: DollarSign, color: "text-green-500", bg: "bg-green-100" },
          { title: "Total Deliveries", amount: "12", icon: Bike, color: "text-primary", bg: "bg-primary/10" },
          { title: "This Week", amount: "$420.00", icon: TrendingUp, color: "text-secondary", bg: "bg-secondary/20" }
        ].map((stat, i) => (
          <Card key={i} className="border-2 rounded-[2rem] shadow-sm">
            <CardContent className="p-6 flex items-center gap-4">
              <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm font-bold text-muted-foreground">{stat.title}</p>
                <h2 className="text-3xl font-black">{stat.amount}</h2>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-2 rounded-[2rem] shadow-sm mt-8">
        <CardContent className="p-6">
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" /> Recent Payouts
          </h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between items-center p-4 rounded-xl border bg-muted/10">
                <div>
                  <p className="font-bold">Direct Deposit</p>
                  <p className="text-sm text-muted-foreground">March {12 - i}, 2026</p>
                </div>
                <p className="font-black text-lg text-green-600">+$140.00</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}