"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Pill, Mail, Lock, User, Store, Bike, ShieldCheck, Loader2 } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { loginUser } from '@/app/actions/auth'; // 🟢 Added real authentication

export default function LoginPage() {
  const router = useRouter();
  const[role, setRole] = useState('USER');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const result = await loginUser(formData, role);

    if (result.success) {
      const paths: any = {
        'USER': '/dashboard/user',
        'STORE': '/dashboard/store',
        'DELIVERY': '/dashboard/delivery',
        'ADMIN': '/dashboard/admin',
      };
      router.push(paths[role]);
    } else {
      alert(result.error); // Show error if wrong password
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pattern flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="bg-primary p-2 rounded-lg">
              <Pill className="text-white w-6 h-6" />
            </div>
            <span className="font-headline font-bold text-2xl tracking-tight text-primary">PharmaSwift</span>
          </Link>
          <h2 className="text-3xl font-bold">Welcome back</h2>
          <p className="text-muted-foreground">Sign in to your account to continue</p>
        </div>

        <Card className="border-2">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle className="text-lg">Identify Your Role</CardTitle>
              <CardDescription>Select how you want to use PharmaSwift</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup 
                value={role} 
                onValueChange={(val) => setRole(val)}
                className="grid grid-cols-2 gap-4"
              >
                {[
                  { id: 'USER', label: 'User', icon: User },
                  { id: 'STORE', label: 'Store', icon: Store },
                  { id: 'DELIVERY', label: 'Rider', icon: Bike },
                  { id: 'ADMIN', label: 'Admin', icon: ShieldCheck },
                ].map((r) => (
                  <Label
                    key={r.id}
                    htmlFor={r.id}
                    className={`flex flex-col items-center justify-between rounded-xl border-2 bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-all ${
                      role === r.id ? 'border-primary' : 'border-muted'
                    }`}
                  >
                    <RadioGroupItem value={r.id} id={r.id} className="sr-only" />
                    <r.icon className={`mb-3 h-6 w-6 ${role === r.id ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span className="text-xs font-semibold uppercase">{r.label}</span>
                  </Label>
                ))}
              </RadioGroup>

              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="email" name="email" type="email" placeholder="name@example.com" className="pl-10" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link href="#" className="text-xs text-primary hover:underline">Forgot password?</Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="password" name="password" type="password" placeholder="••••••••" className="pl-10" required />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full h-11 text-lg font-semibold" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Sign In'}
              </Button>
              <p className="text-sm text-muted-foreground text-center">
                Don't have an account?{' '}
                <Link href="/signup" className="text-primary font-semibold hover:underline">Sign up</Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}