"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { UploadCloud, Pill, CheckCircle2, Search } from 'lucide-react';

export default function UserDashboard() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Place a New Order</h1>
        <p className="text-muted-foreground">Upload your prescription and let AI extract the details.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="border-2 border-dashed border-primary/30 bg-primary/5 rounded-[2rem] p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
            <UploadCloud className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold mb-2">Upload Prescription</h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-[250px]">
            Drag and drop your image here, or click to browse files.
          </p>
          <input 
            type="file" 
            id="prescription" 
            className="hidden" 
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          <Button onClick={() => document.getElementById('prescription')?.click()} className="rounded-full px-8">
            Choose File
          </Button>
          {file && <p className="mt-4 text-sm font-bold text-primary flex items-center gap-2"><CheckCircle2 className="w-4 h-4"/> {file.name}</p>}
        </div>

        {/* AI Processing Preview (Empty State) */}
        <div className="bg-card border rounded-[2rem] p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-secondary/20 text-secondary-foreground rounded-lg">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold">AI Extraction</h3>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Once you upload a prescription, our Groq AI will read the medicines here.</p>
            
            {/* Mock Skeleton for UI */}
            <div className="animate-pulse space-y-3 pt-4 border-t">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
            </div>

            <Button className="w-full mt-6 bg-secondary text-secondary-foreground hover:bg-secondary/90" disabled={!file}>
              Analyze Prescription
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}