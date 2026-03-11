"use client";

import DashboardLayout from '@/components/dashboard-layout';

export default function DeliveryDashboardLayout({ children }: { children: React.ReactNode }) {
  // We pass 'DELIVERY' so the sidebar shows rider links!
  return (
    <DashboardLayout role="DELIVERY" userName="Alex Rider">
      {children}
    </DashboardLayout>
  );
}