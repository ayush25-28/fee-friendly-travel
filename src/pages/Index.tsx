
import RouteOptimizer from "@/components/RouteOptimizer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Toll Route Optimizer</h1>
          <p className="text-gray-600">Find the most cost-effective route for your journey</p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <RouteOptimizer />
      </main>
      
      <footer className="bg-white border-t py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>Built with Dijkstra's algorithm for optimal route planning</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
