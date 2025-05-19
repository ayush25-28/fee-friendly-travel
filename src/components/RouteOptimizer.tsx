
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import GraphVisualizer from "./GraphVisualizer";
import { findShortestPath, findCheapestPath } from "@/lib/dijkstra";
import { predefinedGraph } from "@/lib/graph-data";

const RouteOptimizer = () => {
  const { toast } = useToast();
  const [startPoint, setStartPoint] = useState<string>("");
  const [endPoint, setEndPoint] = useState<string>("");
  const [prioritizeCost, setPrioritizeCost] = useState<boolean>(true);
  const [path, setPath] = useState<string[]>([]);
  const [totalDistance, setTotalDistance] = useState<number>(0);
  const [totalToll, setTotalToll] = useState<number>(0);
  const [hasCalculated, setHasCalculated] = useState<boolean>(false);

  const calculateRoute = () => {
    if (!startPoint.trim() || !endPoint.trim()) {
      toast({
        title: "Input required",
        description: "Please enter both start and destination points",
        variant: "destructive",
      });
      return;
    }

    // Validate the points exist in our graph
    if (!predefinedGraph.nodes.includes(startPoint.toUpperCase())) {
      toast({
        title: "Invalid start point",
        description: `Start point must be one of: ${predefinedGraph.nodes.join(", ")}`,
        variant: "destructive",
      });
      return;
    }

    if (!predefinedGraph.nodes.includes(endPoint.toUpperCase())) {
      toast({
        title: "Invalid destination",
        description: `Destination must be one of: ${predefinedGraph.nodes.join(", ")}`,
        variant: "destructive",
      });
      return;
    }

    try {
      const result = prioritizeCost 
        ? findCheapestPath(predefinedGraph, startPoint.toUpperCase(), endPoint.toUpperCase()) 
        : findShortestPath(predefinedGraph, startPoint.toUpperCase(), endPoint.toUpperCase());
      
      setPath(result.path);
      setTotalDistance(result.distance);
      setTotalToll(result.toll);
      setHasCalculated(true);
      
      toast({
        title: "Route calculated",
        description: `We found the ${prioritizeCost ? "cheapest" : "shortest"} route for your journey`,
      });
    } catch (error) {
      let message = "An unknown error occurred";
      if (error instanceof Error) {
        message = error.message;
      }
      
      toast({
        title: "Cannot find route",
        description: message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Route Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="startPoint">Starting Point (A-J)</Label>
            <Input 
              id="startPoint" 
              placeholder="e.g. A" 
              value={startPoint} 
              onChange={(e) => setStartPoint(e.target.value)}
              className="uppercase"
              maxLength={1}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="endPoint">Destination (A-J)</Label>
            <Input 
              id="endPoint" 
              placeholder="e.g. J" 
              value={endPoint} 
              onChange={(e) => setEndPoint(e.target.value)}
              className="uppercase"
              maxLength={1}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="prioritize"
              checked={prioritizeCost}
              onCheckedChange={setPrioritizeCost}
            />
            <Label htmlFor="prioritize" className="cursor-pointer">
              {prioritizeCost ? "Prioritize lowest toll cost" : "Prioritize shortest distance"}
            </Label>
          </div>
          
          <Button 
            onClick={calculateRoute}
            className="w-full"
          >
            Calculate Optimal Route
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Route Map</CardTitle>
        </CardHeader>
        <CardContent>
          <GraphVisualizer 
            graph={predefinedGraph} 
            path={path} 
            startNode={startPoint.toUpperCase()} 
            endNode={endPoint.toUpperCase()}
          />
          
          {hasCalculated && (
            <div className="mt-4 p-3 border rounded-md bg-blue-50">
              <h3 className="font-medium mb-2">Route Summary</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-sm text-gray-500">Total Distance:</p>
                  <p className="font-semibold">{totalDistance} miles</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Toll Cost:</p>
                  <p className="font-semibold">${totalToll.toFixed(2)}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">Route:</p>
                  <p className="font-semibold">{path.join(" → ")}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RouteOptimizer;
