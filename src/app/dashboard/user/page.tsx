"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { UploadCloud, CheckCircle2, Search, Loader2, Pill } from 'lucide-react';
import { analyzePrescriptionImage } from '@/app/actions/ai'; // Import the AI function!

export default function UserDashboard() {
  const [file, setFile] = useState<File | null>(null);
  const[isAnalyzing, setIsAnalyzing] = useState(false);
  const [medicines, setMedicines] = useState<{name: string, dosage: string}[] | null>(null);

  // Function to convert image to Base64 and send to Groq
  const handleAnalyze = async () => {
    if (!file) return;
    setIsAnalyzing(true);
    
    try {
      // 1. Convert File to Base64 String
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64data = reader.result as string;
        
        // 2. Call our Groq Server Action
        const result = await analyzePrescriptionImage(base64data);
        
        // 3. Save the results to show on the screen
        if (result && result.medicines) {
           setMedicines(result.medicines);
        } else if (Array.isArray(result)) {
           setMedicines(result); // In case Groq returns the array directly
        }
        setIsAnalyzing(false);
      };
    } catch (error) {
      console.error("Error analyzing:", error);
      alert("Something went wrong while analyzing the prescription.");
      setIsAnalyzing(false);
    }
  };

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
            onChange={(e) => {
              setFile(e.target.files?.[0] || null);
              setMedicines(null); // Reset previous results if new file is chosen
            }}
          />
          <Button onClick={() => document.getElementById('prescription')?.click()} className="rounded-full px-8">
            Choose File
          </Button>
          {file && <p className="mt-4 text-sm font-bold text-primary flex items-center gap-2"><CheckCircle2 className="w-4 h-4"/> {file.name}</p>}
        </div>

        {/* AI Processing & Results Section */}
        <div className="bg-card border rounded-[2rem] p-8 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-secondary/20 text-secondary-foreground rounded-lg">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold">AI Extraction</h3>
            </div>
            
            {/* Show Results or Empty State */}
            {medicines ? (
              <div className="space-y-3">
                <p className="text-sm font-bold text-green-600 flex items-center gap-2 mb-4">
                  <CheckCircle2 className="w-4 h-4"/> Extraction Complete!
                </p>
                {medicines.map((med, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl border">
                    <Pill className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-bold text-sm">{med.name}</p>
                      <p className="text-xs text-muted-foreground">{med.dosage}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Once you upload a prescription, our Groq AI will read the medicines here.</p>
                <div className="animate-pulse space-y-3 pt-4 border-t">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                  <div className="h-4 bg-muted rounded w-5/6"></div>
                </div>
              </div>
            )}
          </div>

          <Button 
            className="w-full mt-6 bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold" 
            disabled={!file || isAnalyzing}
            onClick={handleAnalyze}
          >
            {isAnalyzing ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Analyzing Image...</>
            ) : medicines ? (
              'Find Nearby Pharmacies' // Changes text after successful scan
            ) : (
              'Analyze Prescription'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}