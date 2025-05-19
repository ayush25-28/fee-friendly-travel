
import React from 'react';
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

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

interface AllEntriesProps {
  entries: VehicleEntry[];
}

const AllEntries: React.FC<AllEntriesProps> = ({ entries }) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">All Vehicle Entries</h1>
      
      {entries.length > 0 ? (
        <Table>
          <TableCaption>A list of all vehicle entries.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Vehicle Number</TableHead>
              <TableHead>Vehicle Type</TableHead>
              <TableHead>Toll Name</TableHead>
              <TableHead>State</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell>
                  <HoverCard>
                    <HoverCardTrigger>{entry.vehicleNumber}</HoverCardTrigger>
                    <HoverCardContent>
                      <div className="space-y-1">
                        <p><span className="font-semibold">Branch:</span> {entry.branchNo}</p>
                        <p><span className="font-semibold">NH Number:</span> {entry.nhNumber}</p>
                        <p><span className="font-semibold">Section:</span> {entry.section}</p>
                        <p><span className="font-semibold">Toll KM:</span> {entry.tollKm}</p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </TableCell>
                <TableCell>{entry.vehicleType}</TableCell>
                <TableCell>{entry.tollName}</TableCell>
                <TableCell>{entry.state}</TableCell>
                <TableCell>{entry.plan}</TableCell>
                <TableCell>{formatDate(entry.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No entries found. Add a new vehicle entry to see it here.
        </div>
      )}
    </div>
  );
};

export default AllEntries;
