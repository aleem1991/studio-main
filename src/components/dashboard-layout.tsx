"use client";

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { 
  Pill, 
  LayoutDashboard, 
  ShoppingBag, 
  Settings, 
  LogOut, 
  Bell, 
  Search,
  History,
  Store,
  Bike,
  ShieldCheck,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserRole } from '@/types';

interface SidebarItem {
  name: string;
  href: string;
  icon: any;
}

const SIDEBAR_ITEMS: Record<UserRole, SidebarItem[]> = {
  'USER': [
    { name: 'Dashboard', href: '/dashboard/user', icon: LayoutDashboard },
    { name: 'My Orders', href: '/dashboard/user/orders', icon: ShoppingBag },
    { name: 'History', href: '/dashboard/user/history', icon: History },
    { name: 'Settings', href: '/dashboard/user/settings', icon: Settings },
  ],
  'STORE': [
    { name: 'Dashboard', href: '/dashboard/store', icon: LayoutDashboard },
    { name: 'Incoming Orders', href: '/dashboard/store/orders', icon: Bell },
    { name: 'Inventory', href: '/dashboard/store/inventory', icon: Pill },
    { name: 'Settings', href: '/dashboard/store/settings', icon: Settings },
  ],
  'DELIVERY': [
    { name: 'Active Deliveries', href: '/dashboard/delivery', icon: Bike },
    { name: 'Earnings', href: '/dashboard/delivery/earnings', icon: ShieldCheck },
    { name: 'Settings', href: '/dashboard/delivery/settings', icon: Settings },
  ],
  'ADMIN': [
    { name: 'Overview', href: '/dashboard/admin', icon: LayoutDashboard },
    { name: 'Users', href: '/dashboard/admin/users', icon: ShieldCheck },
    { name: 'Stores', href: '/dashboard/admin/stores', icon: Store },
    { name: 'All Orders', href: '/dashboard/admin/orders', icon: ShoppingBag },
  ]
};

export default function DashboardLayout({ 
  children, 
  role, 
  userName 
}: { 
  children: ReactNode; 
  role: UserRole; 
  userName: string;
}) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const items = SIDEBAR_ITEMS[role] || [];

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex flex-col w-72 bg-card border-r fixed h-full z-30">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary p-2 rounded-lg">
              <Pill className="text-white w-6 h-6" />
            </div>
            <span className="font-headline font-bold text-xl tracking-tight text-primary">PharmaSwift</span>
          </Link>
        </div>
        
        <nav className="flex-grow px-4 space-y-2 pt-4">
          {items.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <Button 
                  variant={isActive ? "secondary" : "ghost"} 
                  className={`w-full justify-start gap-3 h-12 text-sm font-medium ${isActive ? 'bg-secondary/20 text-secondary-foreground' : 'text-muted-foreground'}`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-secondary-foreground' : ''}`} />
                  {item.name}
                </Button>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t">
          <Link href="/login">
            <Button variant="ghost" className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10">
              <LogOut className="w-5 h-5" />
              Sign Out
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow lg:pl-72 flex flex-col">
        {/* Top Navbar */}
        <header className="h-16 bg-card border-b flex items-center justify-between px-4 lg:px-8 sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
            <div className="hidden sm:flex items-center bg-muted px-3 py-1.5 rounded-full border">
               <Search className="w-4 h-4 text-muted-foreground mr-2" />
               <input 
                type="text" 
                placeholder="Search orders, medicines..." 
                className="bg-transparent border-none text-sm focus:outline-none w-48 lg:w-64"
               />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full border-2 border-card" />
            </Button>
            <div className="flex items-center gap-3 border-l pl-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold leading-none">{userName}</p>
                <p className="text-xs text-muted-foreground mt-1 capitalize">{role.toLowerCase()} Account</p>
              </div>
              <Avatar className="h-9 w-9 border">
                <AvatarImage src={`https://picsum.photos/seed/${userName}/100/100`} />
                <AvatarFallback>{userName[0]}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="p-4 lg:p-8 animate-fade-in">
          {children}
        </div>
      </main>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="w-72 bg-card h-full p-6 animate-in slide-in-from-left" onClick={e => e.stopPropagation()}>
             <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-2">
                  <div className="bg-primary p-2 rounded-lg">
                    <Pill className="text-white w-5 h-5" />
                  </div>
                  <span className="font-headline font-bold text-lg tracking-tight text-primary">PharmaSwift</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}><X /></Button>
             </div>
             <nav className="space-y-4">
                {items.map((item) => (
                  <Link key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start gap-4 h-12 text-md font-medium">
                      <item.icon className="w-6 h-6" />
                      {item.name}
                    </Button>
                  </Link>
                ))}
                <Link href="/login" className="block pt-8">
                  <Button variant="outline" className="w-full justify-start gap-4 text-destructive border-destructive/20 h-12">
                    <LogOut className="w-6 h-6" />
                    Sign Out
                  </Button>
                </Link>
             </nav>
          </div>
        </div>
      )}
    </div>
  );
}