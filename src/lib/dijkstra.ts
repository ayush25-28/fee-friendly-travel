
import { Graph } from "./graph-data";

// Priority queue implementation for Dijkstra's algorithm
class PriorityQueue<T> {
  private items: { element: T; priority: number }[] = [];

  enqueue(element: T, priority: number): void {
    const queueItem = { element, priority };
    let added = false;

    for (let i = 0; i < this.items.length; i++) {
      if (queueItem.priority < this.items[i].priority) {
        this.items.splice(i, 0, queueItem);
        added = true;
        break;
      }
    }

    if (!added) {
      this.items.push(queueItem);
    }
  }

  dequeue(): T | undefined {
    return this.items.shift()?.element;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

// Function to find shortest path (prioritizing distance)
export function findShortestPath(
  graph: Graph,
  start: string,
  end: string
): { path: string[]; distance: number; toll: number } {
  if (!graph.nodes.includes(start)) {
    throw new Error(`Start node "${start}" not found in graph`);
  }
  
  if (!graph.nodes.includes(end)) {
    throw new Error(`End node "${end}" not found in graph`);
  }

  // Initialize data structures
  const distances: { [key: string]: number } = {};
  const previous: { [key: string]: string | null } = {};
  const tolls: { [key: string]: number } = {};
  const pq = new PriorityQueue<string>();
  
  // Set initial values
  graph.nodes.forEach(node => {
    distances[node] = node === start ? 0 : Infinity;
    tolls[node] = 0;
    previous[node] = null;
    pq.enqueue(node, distances[node]);
  });

  // Main algorithm loop
  while (!pq.isEmpty()) {
    const current = pq.dequeue();
    if (!current) continue;
    
    // Found destination
    if (current === end) break;
    
    // Find all neighbors of current node
    const neighbors = graph.edges
      .filter(edge => edge[0] === current || edge[1] === current)
      .map(edge => {
        const neighbor = edge[0] === current ? edge[1] : edge[0];
        const distance = edge[2]; // Distance is at index 2
        const toll = edge[3]; // Toll is at index 3
        return { neighbor, distance, toll };
      });
    
    // Update distances for neighbors
    neighbors.forEach(({ neighbor, distance, toll }) => {
      const newDistance = distances[current] + distance;
      if (newDistance < distances[neighbor]) {
        distances[neighbor] = newDistance;
        previous[neighbor] = current;
        tolls[neighbor] = tolls[current] + toll;
        pq.enqueue(neighbor, newDistance);
      }
    });
  }

  // Build path
  if (previous[end] === null) {
    throw new Error(`No path exists from ${start} to ${end}`);
  }
  
  const path: string[] = [];
  let current: string | null = end;
  
  while (current !== null) {
    path.unshift(current);
    current = previous[current];
  }

  return {
    path,
    distance: distances[end],
    toll: tolls[end],
  };
}

// Function to find cheapest path (prioritizing toll cost)
export function findCheapestPath(
  graph: Graph,
  start: string,
  end: string
): { path: string[]; distance: number; toll: number } {
  if (!graph.nodes.includes(start)) {
    throw new Error(`Start node "${start}" not found in graph`);
  }
  
  if (!graph.nodes.includes(end)) {
    throw new Error(`End node "${end}" not found in graph`);
  }

  // Initialize data structures
  const tolls: { [key: string]: number } = {};
  const distances: { [key: string]: number } = {};
  const previous: { [key: string]: string | null } = {};
  const pq = new PriorityQueue<string>();
  
  // Set initial values
  graph.nodes.forEach(node => {
    tolls[node] = node === start ? 0 : Infinity;
    distances[node] = 0;
    previous[node] = null;
    pq.enqueue(node, tolls[node]);
  });

  // Main algorithm loop
  while (!pq.isEmpty()) {
    const current = pq.dequeue();
    if (!current) continue;
    
    // Found destination
    if (current === end) break;
    
    // Find all neighbors of current node
    const neighbors = graph.edges
      .filter(edge => edge[0] === current || edge[1] === current)
      .map(edge => {
        const neighbor = edge[0] === current ? edge[1] : edge[0];
        const distance = edge[2]; // Distance is at index 2
        const toll = edge[3]; // Toll is at index 3
        return { neighbor, distance, toll };
      });
    
    // Update tolls for neighbors (prioritizing toll cost)
    neighbors.forEach(({ neighbor, distance, toll }) => {
      const newToll = tolls[current] + toll;
      if (newToll < tolls[neighbor]) {
        tolls[neighbor] = newToll;
        distances[neighbor] = distances[current] + distance;
        previous[neighbor] = current;
        pq.enqueue(neighbor, newToll);
      }
    });
  }

  // Build path
  if (previous[end] === null) {
    throw new Error(`No path exists from ${start} to ${end}`);
  }
  
  const path: string[] = [];
  let current: string | null = end;
  
  while (current !== null) {
    path.unshift(current);
    current = previous[current];
  }

  return {
    path,
    distance: distances[end],
    toll: tolls[end],
  };
}
