"use client";

import DashboardLayout from '@/components/dashboard-layout'; // Adjust this import path based on where you saved dashboard-layout.tsx

export default function UserDashboardLayout({ children }: { children: React.ReactNode }) {
  // We pass 'USER' so the sidebar knows to show the user links!
  return (
    <DashboardLayout role="USER" userName="John Doe">
      {children}
    </DashboardLayout>
  );
}