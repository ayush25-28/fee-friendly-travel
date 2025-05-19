
import React from 'react';
import { Link } from 'react-router-dom';
import { SidebarProvider } from "@/components/ui/sidebar";
import VehicleEntryForm from '@/components/VehicleEntryForm';
import { useNavigate } from 'react-router-dom';

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

const Index = () => {
  const navigate = useNavigate();
  
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
    
    // Navigate to all entries
    navigate('/all-entries', { state: { newEntry: true } });
  };
  
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-100 flex">
        {/* Sidebar */}
        <div className="w-64 bg-blue-500 text-white min-h-screen">
          <div className="p-6 text-xl font-bold text-center bg-blue-600">
            Online Toll Management System
          </div>
          <nav className="mt-6">
            <ul className="space-y-2">
              <li>
                <Link to="/" className="block py-3 px-6 hover:bg-blue-600 transition-colors">
                  HOME PAGE
                </Link>
              </li>
              <li>
                <Link to="/vehicle-entry" className="block py-3 px-6 hover:bg-blue-600 transition-colors">
                  USER ENTRY
                </Link>
              </li>
              <li>
                <Link to="/all-entries" className="block py-3 px-6 hover:bg-blue-600 transition-colors">
                  ALL ENTRIES
                </Link>
              </li>
              <li>
                <a href="#" className="block py-3 px-6 hover:bg-blue-600 transition-colors mt-32">
                  LOGOUT
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1">
          <header className="bg-white shadow-sm py-4">
            <div className="container mx-auto px-4">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Toll Route Optimizer</h1>
              <p className="text-gray-600">Find the most cost-effective route for your journey</p>
            </div>
          </header>
          
          <main className="container mx-auto px-4 py-8">
            <VehicleEntryForm onEntryAdded={handleEntryAdded} />
          </main>
          
          <footer className="bg-white border-t py-6 mt-12">
            <div className="container mx-auto px-4 text-center text-gray-600">
              <p>Built with Dijkstra's algorithm for optimal route planning</p>
            </div>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
