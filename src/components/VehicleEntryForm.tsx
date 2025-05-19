
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

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

// This would normally come from a database
const states = [
  "Andhra Pradesh",
  "Assam",
  "Bihar",
  "Goa",
  "Gujarat",
  "Karnataka",
  "Kerala",
  "Maharashtra",
  "Punjab",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
];

const vehicleTypes = [
  "Car",
  "Jeep",
  "Van",
  "LMV",
  "Three Wheeler",
  "Bus",
  "Truck",
  "Heavy Vehicle"
];

const planTypes = [
  "Single",
  "Return",
  "Monthly",
  "Quarterly",
  "Yearly"
];

interface VehicleEntryFormProps {
  onEntryAdded?: (entry: VehicleEntry) => void;
}

const VehicleEntryForm: React.FC<VehicleEntryFormProps> = ({ onEntryAdded }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    branchNo: "3",
    state: "Andhra Pradesh",
    nhNumber: "221",
    tollName: "Badava",
    tollKm: "35800",
    section: "Ibrahimpatnam to AP telangana Border",
    vehicleNumber: "",
    vehicleType: "Car",
    plan: "Single"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.vehicleNumber.trim()) {
      toast({
        title: "Error",
        description: "Please enter a vehicle number",
        variant: "destructive"
      });
      return;
    }

    const newEntry: VehicleEntry = {
      id: crypto.randomUUID(),
      ...formData,
      createdAt: new Date()
    };

    // This is where we would normally save to a database
    if (onEntryAdded) {
      onEntryAdded(newEntry);
    }

    toast({
      title: "Entry Added",
      description: `Vehicle ${formData.vehicleNumber} has been added successfully`,
    });

    // Reset vehicle number after submission
    setFormData(prev => ({ ...prev, vehicleNumber: "" }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Vehicle Entry Form</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="branchNo">Branch No</Label>
            <Input 
              id="branchNo"
              name="branchNo"
              value={formData.branchNo}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Select 
              value={formData.state} 
              onValueChange={(value) => handleSelectChange("state", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a state" />
              </SelectTrigger>
              <SelectContent>
                {states.map(state => (
                  <SelectItem key={state} value={state}>{state}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="nhNumber">NH Number</Label>
            <Input 
              id="nhNumber"
              name="nhNumber"
              value={formData.nhNumber}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tollName">Toll Name</Label>
            <Input 
              id="tollName"
              name="tollName"
              value={formData.tollName}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tollKm">Toll KM</Label>
            <Input 
              id="tollKm"
              name="tollKm"
              value={formData.tollKm}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="section">Section</Label>
            <Input 
              id="section"
              name="section"
              value={formData.section}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="vehicleNumber">Vehicle Number</Label>
            <Input 
              id="vehicleNumber"
              name="vehicleNumber"
              value={formData.vehicleNumber}
              onChange={handleChange}
              placeholder="Enter Vehicle Number"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="vehicleType">Select Vehicle Type</Label>
            <Select 
              value={formData.vehicleType} 
              onValueChange={(value) => handleSelectChange("vehicleType", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select vehicle type" />
              </SelectTrigger>
              <SelectContent>
                {vehicleTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="plan">Select Plan</Label>
            <Select 
              value={formData.plan} 
              onValueChange={(value) => handleSelectChange("plan", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select plan" />
              </SelectTrigger>
              <SelectContent>
                {planTypes.map(plan => (
                  <SelectItem key={plan} value={plan}>{plan}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="mt-6">
          <Button type="submit" className="w-full">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default VehicleEntryForm;
