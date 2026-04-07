import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getUserProfile, updateProfile } from '@/app/actions/user';
import { redirect } from 'next/navigation';

export default async function UserSettingsPage() {
  // 1. Fetch real user data from the database
  const user = await getUserProfile();
  
  // If they aren't logged in, kick them back to login page
  if (!user) {
    redirect('/login');
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Account Settings</h1>
        <p className="text-muted-foreground">Manage your profile and delivery details.</p>
      </div>

      <div className="bg-card border-2 rounded-[2rem] p-8 shadow-sm space-y-6">
        <h3 className="text-xl font-bold border-b pb-4">Personal Information</h3>
        
        {/* 2. Form that calls our updateProfile Server Action */}
        <form action={updateProfile}>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              {/* Added name="" attribute and defaultValue from Database */}
              <Input id="name" name="name" defaultValue={user.name} className="h-11 rounded-xl" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" defaultValue={user.email} disabled className="h-11 rounded-xl bg-muted" />
            </div>
          </div>

          <div className="space-y-2 pt-6 border-t mt-6">
            <Label htmlFor="address">Delivery Address</Label>
            <Input id="address" name="address" defaultValue={user.address || ""} placeholder="123 Main St, Apt 4B, City, State, Zip" className="h-11 rounded-xl" />
          </div>

          <div className="pt-6 flex justify-end">
            <Button type="submit" size="lg" className="rounded-full px-8 shadow-lg shadow-primary/20 font-bold">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}