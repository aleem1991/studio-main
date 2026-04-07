"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pill, Mail, Lock, User, Store, Bike, ArrowRight } from 'lucide-react';
import { registerUser } from '@/app/actions/auth'; // Add this import at the top

export default function SignUpPage() {
  const router = useRouter();
  const [role, setRole] = useState('USER');
  const[isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsLoading(true);
  
  const formData = new FormData(e.currentTarget);
  const result = await registerUser(formData, role);

  if (result.success) {
    const paths: any = {
      'USER': '/dashboard/user',
      'STORE': '/dashboard/store',
      'DELIVERY': '/dashboard/delivery',
    };
    router.push(paths[role]);
  } else {
    alert(result.error);
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-pattern flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-card border rounded-[2rem] shadow-2xl p-8 space-y-8">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="bg-primary p-2 rounded-lg">
              <Pill className="text-white w-6 h-6" />
            </div>
            <span className="font-headline font-bold text-2xl tracking-tight text-primary">PharmaSwift</span>
          </Link>
          <h2 className="text-3xl font-bold font-headline">Create Account</h2>
          <p className="text-muted-foreground">Join us for swift medical delivery</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'USER', label: 'User', icon: User },
              { id: 'STORE', label: 'Store', icon: Store },
              { id: 'DELIVERY', label: 'Rider', icon: Bike },
            ].map((r) => (
              <button
                type="button"
                key={r.id}
                onClick={() => setRole(r.id)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${
                  role === r.id ? 'border-primary bg-primary/5 text-primary' : 'border-muted hover:border-primary/50 text-muted-foreground'
                }`}
              >
                <r.icon className="w-6 h-6 mb-2" />
                <span className="text-xs font-bold uppercase">{r.label}</span>
              </button>
            ))}
          </div>

          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="name" name="name" type="text" placeholder="John Doe" className="pl-10 h-11" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="email" name="email" type="email" placeholder="name@example.com" className="pl-10 h-11" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="password" name="password" type="password" placeholder="••••••••" className="pl-10 h-11" required />
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full h-12 text-lg font-bold shadow-lg shadow-primary/20" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Sign Up'} <ArrowRight className="w-5 h-5 ml-2" />
          </Button>

          <p className="text-sm text-muted-foreground text-center pt-4">
            Already have an account?{' '}
            <Link href="/login" className="text-primary font-bold hover:underline">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}