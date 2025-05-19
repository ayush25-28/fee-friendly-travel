
import React from 'react';
import VehicleEntryForm from '@/components/VehicleEntryForm';
import { useLocation, useNavigate } from 'react-router-dom';

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

const VehicleEntryPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleEntryAdded = (entry: VehicleEntry) => {
    // Get existing entries from localStorage
    const existingEntriesJson = localStorage.getItem('vehicleEntries');
    const existingEntries = existingEntriesJson ? JSON.parse(existingEntriesJson) : [];
    
    // Add new entry
    const updatedEntries = [...existingEntries, {
      ...entry,
      createdAt: entry.createdAt.toString() // Convert Date to string for localStorage
    }];
    
    // Save back to localStorage
    localStorage.setItem('vehicleEntries', JSON.stringify(updatedEntries));
    
    // Optionally navigate to all entries
    navigate('/all-entries', { state: { newEntry: true } });
  };

  return (
    <div className="p-6">
      <VehicleEntryForm onEntryAdded={handleEntryAdded} />
    </div>
  );
};

export default VehicleEntryPage;
