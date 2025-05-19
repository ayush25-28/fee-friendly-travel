
import { useEffect, useRef } from "react";
import { Graph } from "@/lib/graph-data";

interface GraphVisualizerProps {
  graph: Graph;
  path: string[];
  startNode?: string;
  endNode?: string;
}

const GraphVisualizer = ({ graph, path, startNode, endNode }: GraphVisualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Node positioning function - map nodes to x,y coordinates
  const getNodePosition = (node: string, totalNodes: number, canvasWidth: number, canvasHeight: number) => {
    const index = graph.nodes.indexOf(node);
    const radius = Math.min(canvasWidth, canvasHeight) * 0.35;
    const angleStep = (2 * Math.PI) / totalNodes;
    const angle = angleStep * index - Math.PI / 2; // Start from top (negative PI/2)
    
    const x = canvasWidth / 2 + radius * Math.cos(angle);
    const y = canvasHeight / 2 + radius * Math.sin(angle);
    
    return { x, y };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Make canvas responsive
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      
      // Set canvas size based on parent dimensions
      canvas.width = parent.clientWidth;
      canvas.height = 320; // Fixed height
      
      drawGraph();
    };

    const drawGraph = () => {
      const { width, height } = canvas;
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Draw edges first (so they appear behind nodes)
      graph.edges.forEach(edge => {
        const [node1, node2, distance, toll] = edge;
        const pos1 = getNodePosition(node1, graph.nodes.length, width, height);
        const pos2 = getNodePosition(node2, graph.nodes.length, width, height);
        
        // Determine if this edge is part of the path
        const isInPath = path.length >= 2 && 
          path.some((p, i) => i < path.length - 1 && 
            ((p === node1 && path[i + 1] === node2) || 
             (p === node2 && path[i + 1] === node1)));
        
        // Draw edge line
        ctx.beginPath();
        ctx.moveTo(pos1.x, pos1.y);
        ctx.lineTo(pos2.x, pos2.y);
        
        if (isInPath) {
          ctx.strokeStyle = "#3498db"; // Highlight path edges
          ctx.lineWidth = 3;
        } else {
          ctx.strokeStyle = "#bdc3c7";
          ctx.lineWidth = 1;
        }
        
        ctx.stroke();
        
        // Draw edge weight (distance/toll)
        const midX = (pos1.x + pos2.x) / 2;
        const midY = (pos1.y + pos2.y) / 2;
        
        // Small offset to avoid drawing on the line
        const dx = pos2.x - pos1.x;
        const dy = pos2.y - pos1.y;
        const norm = Math.sqrt(dx*dx + dy*dy);
        const offsetX = -dy / norm * 15;
        const offsetY = dx / norm * 15;
        
        ctx.fillStyle = "#7f8c8d";
        ctx.font = "10px Arial";
        ctx.textAlign = "center";
        ctx.fillText(`${distance}mi / $${toll.toFixed(1)}`, midX + offsetX, midY + offsetY);
      });
      
      // Draw nodes
      graph.nodes.forEach(node => {
        const pos = getNodePosition(node, graph.nodes.length, width, height);
        
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 20, 0, 2 * Math.PI);
        
        if (node === startNode) {
          ctx.fillStyle = "#2ecc71"; // Green for start
        } else if (node === endNode) {
          ctx.fillStyle = "#e74c3c"; // Red for destination
        } else if (path.includes(node)) {
          ctx.fillStyle = "#3498db"; // Blue for path
        } else {
          ctx.fillStyle = "#ecf0f1"; // Light gray for other nodes
        }
        
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#2c3e50";
        ctx.stroke();
        
        // Draw node label
        ctx.fillStyle = "#000";
        ctx.font = "bold 14px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(node, pos.x, pos.y);
      });
    };

    // Initial draw and resize event
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [graph, path, startNode, endNode]);

  return (
    <div className="w-full h-80 bg-white border rounded-md overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full"></canvas>
    </div>
  );
};

export default GraphVisualizer;
