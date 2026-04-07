import DashboardLayout from '@/components/dashboard-layout';
import { cookies } from 'next/headers';

export default async function UserDashboardLayout({ children }: { children: React.ReactNode }) {
  // Read the real name from the login cookie!
  const cookieStore = await cookies();
  const userName = cookieStore.get('userName')?.value || 'Guest User';

  return (
    <DashboardLayout role="USER" userName={userName}>
      {children}
    </DashboardLayout>
  );
}