
// Define the graph data structure
export interface Graph {
  nodes: string[];
  // edges: [node1, node2, distance, toll]
  edges: [string, string, number, number][];
}

// Create a predefined graph with 10 cities represented as nodes A-J
// Each edge has a distance (in miles) and toll cost (in dollars)
export const predefinedGraph: Graph = {
  nodes: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
  edges: [
    // [from, to, distance, toll]
    ["A", "B", 5, 1.5],
    ["A", "C", 10, 0.5],
    ["A", "D", 15, 2.0],
    ["B", "E", 12, 2.5],
    ["B", "F", 8, 1.0],
    ["C", "F", 3, 0.0],
    ["C", "G", 11, 1.5],
    ["D", "G", 7, 1.0],
    ["D", "H", 9, 0.5],
    ["E", "I", 18, 3.0],
    ["F", "I", 16, 2.5],
    ["F", "J", 14, 1.5],
    ["G", "J", 10, 2.0],
    ["H", "J", 6, 1.0],
    ["I", "J", 4, 0.0],
    // Additional edges to create more route options
    ["B", "C", 6, 1.0],
    ["E", "F", 2, 0.5],
    ["G", "H", 4, 0.5],
    ["H", "I", 13, 2.0],
  ],
};
