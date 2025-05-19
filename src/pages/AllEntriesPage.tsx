
import React, { useEffect, useState } from 'react';
import AllEntries from '@/components/AllEntries';
import { useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface VehicleEntry {
  id: string;
  branchNo: string;
  state: string;
  nhNumber: string;
  tollName: string;
  tollKm: string;
  section: string;
  vehicleNumber: string;
  vehicleType: string;
  plan: string;
  createdAt: Date;
}

const AllEntriesPage: React.FC = () => {
  const [entries, setEntries] = useState<VehicleEntry[]>([]);
  const location = useLocation();
  const { toast } = useToast();
  
  useEffect(() => {
    // Load entries from localStorage
    const loadEntries = () => {
      const entriesJson = localStorage.getItem('vehicleEntries');
      if (entriesJson) {
        const loadedEntries = JSON.parse(entriesJson);
        // Convert string dates back to Date objects
        const formattedEntries = loadedEntries.map((entry: any) => ({
          ...entry,
          createdAt: new Date(entry.createdAt)
        }));
        setEntries(formattedEntries);
      }
    };
    
    loadEntries();
    
    // Show toast if navigated from entry form
    if (location.state?.newEntry) {
      toast({
        title: "Entry Added",
        description: "New vehicle entry has been added to the list",
      });
      
      // Clean up the state to prevent toast on page refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state, toast]);

  return (
    <div className="p-6">
      <AllEntries entries={entries} />
    </div>
  );
};

export default AllEntriesPage;
