
import AbandonedCarts from "@/components/AbandonedCarts";

const AbandonedCartsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex">
            <a className="flex items-center space-x-2" href="/">
              <span className="font-medium">CartTracker</span>
            </a>
          </div>
        </div>
      </header>
      
      <main className="container py-10">
        <AbandonedCarts />
      </main>
    </div>
  );
};

export default AbandonedCartsPage;
