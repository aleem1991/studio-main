"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Pill, Truck, ShieldCheck, Activity, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-2 rounded-lg">
              <Pill className="text-white w-6 h-6" />
            </div>
            <span className="font-headline font-bold text-xl tracking-tight text-primary">PharmaSwift</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
            <Link href="#how-it-works" className="hover:text-primary transition-colors">How it Works</Link>
            <Link href="#about" className="hover:text-primary transition-colors">About</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">Log In</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-pattern py-20 lg:py-32">
          <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-up">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 text-secondary-foreground text-xs font-semibold uppercase tracking-wider">
                <Activity className="w-3 h-3" />
                Healthcare simplified
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold font-headline leading-tight">
                Your Medicines, <br />
                <span className="text-primary">Delivered Swiftly</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                PharmaSwift connects you with local pharmacies for lightning-fast medicine delivery. Upload your prescription and let our AI handle the rest.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup">
                  <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg font-semibold gap-2 shadow-lg shadow-primary/20">
                    Order Now <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link href="#how-it-works">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg font-semibold">
                    See How it Works
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-background overflow-hidden bg-muted">
                      <Image 
                        src={`https://picsum.photos/seed/${i + 10}/100/100`} 
                        alt="User" 
                        width={40} 
                        height={40}
                        data-ai-hint="user avatar"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-bold text-foreground">2,000+</span> happy customers this week
                </p>
              </div>
            </div>
            <div className="relative hidden lg:block animate-fade-in">
              <div className="absolute -inset-4 bg-primary/10 rounded-[2rem] blur-3xl" />
              <div className="relative bg-card border rounded-[2rem] shadow-2xl overflow-hidden aspect-[4/3]">
                <Image 
                  src="https://images.unsplash.com/photo-1586015555751-63bb77f4322a?q=80&w=2000&auto=format&fit=crop" 
                  alt="Pharmacy App" 
                  fill 
                  className="object-cover"
                  data-ai-hint="pharmacy store"
                />
                <div className="absolute bottom-6 left-6 right-6 p-6 bg-background/90 backdrop-blur-md rounded-xl border shadow-xl flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center text-secondary-foreground">
                      <Truck className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold">Order in transit</p>
                      <p className="text-sm text-muted-foreground">Arriving in 12 mins</p>
                    </div>
                  </div>
                  <div className="h-2 w-24 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-secondary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-24 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl font-bold font-headline">Why Choose PharmaSwift?</h2>
              <p className="text-muted-foreground">Built for reliability, speed, and your well-being.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'AI Analysis',
                  desc: 'Our AI instantly extracts medicine names and dosages from your prescription photos.',
                  icon: ShieldCheck,
                  color: 'text-primary'
                },
                {
                  title: 'Verified Pharmacies',
                  desc: 'We only partner with certified medical stores to ensure authentic medications.',
                  icon: Activity,
                  color: 'text-secondary'
                },
                {
                  title: 'Express Delivery',
                  desc: 'Get your medicines delivered to your doorstep in under 60 minutes.',
                  icon: Truck,
                  color: 'text-primary'
                }
              ].map((feature, idx) => (
                <div key={idx} className="p-8 rounded-2xl border bg-background hover:shadow-xl transition-shadow group">
                  <div className={`w-14 h-14 rounded-xl bg-muted flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <feature.icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section id="how-it-works" className="py-24">
          <div className="container mx-auto px-4">
            <div className="bg-primary rounded-[3rem] p-12 lg:p-20 text-white relative overflow-hidden">
              <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-12">
                  <h2 className="text-4xl font-bold font-headline leading-tight">Simple Steps to Better Health</h2>
                  <div className="space-y-8">
                    {[
                      { step: '01', title: 'Upload Prescription', desc: 'Snap a photo of your prescription and upload it to our secure platform.' },
                      { step: '02', title: 'Pharmacy Verification', desc: 'AI analyzes the image and a pharmacist confirms the order details.' },
                      { step: '03', title: 'Fast Delivery', desc: 'A delivery partner picks up your medicine and brings it straight to you.' }
                    ].map((item, idx) => (
                      <div key={idx} className="flex gap-6">
                        <span className="text-5xl font-black text-white/20 italic select-none leading-none">{item.step}</span>
                        <div className="space-y-2">
                          <h4 className="text-xl font-bold">{item.title}</h4>
                          <p className="text-white/70 max-w-sm">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="hidden lg:block relative">
                   <div className="aspect-square bg-white/10 rounded-full blur-3xl absolute -top-20 -right-20" />
                   <div className="relative rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl">
                     <Image 
                       src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop" 
                       alt="Mockup" 
                       width={600} 
                       height={600}
                       className="object-cover"
                       data-ai-hint="medical analysis"
                     />
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24">
          <div className="container mx-auto px-4 text-center space-y-8">
             <h2 className="text-4xl font-bold font-headline">Ready to experience Swift Healthcare?</h2>
             <p className="text-muted-foreground max-w-xl mx-auto text-lg">Join thousands of users who trust PharmaSwift for their daily medical needs.</p>
             <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link href="/signup">
                  <Button size="lg" className="h-16 px-12 text-xl font-bold rounded-full">Sign Up Free</Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline" className="h-16 px-12 text-xl font-bold rounded-full">Explore as Guest</Button>
                </Link>
             </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-12">
          <div className="space-y-4">
             <div className="flex items-center gap-2">
                <div className="bg-primary p-2 rounded-lg">
                  <Pill className="text-white w-5 h-5" />
                </div>
                <span className="font-headline font-bold text-lg tracking-tight text-primary">PharmaSwift</span>
              </div>
              <p className="text-sm text-muted-foreground">Revolutionizing medical delivery through technology and care.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">How it works</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Mobile App</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Feedback</Link></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          © {isMounted ? new Date().getFullYear() : '2025'} PharmaSwift. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
