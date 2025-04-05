
import { useState, useEffect } from "react";
import { FoodItem } from "@/types";
import { useToast } from "@/hooks/use-toast";
import AddFoodForm from "@/components/AddFoodForm";
import ExpiryDashboard from "@/components/ExpiryDashboard";
import EmptyState from "@/components/EmptyState";
import Header from "@/components/Header";
import Stats from "@/components/Stats";
import { filterByStatus } from "@/utils/food-utils";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

// Sample data for testing
const sampleData: FoodItem[] = [
  {
    id: "1",
    name: "Milk",
    category: "dairy",
    expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    addedDate: new Date(),
    quantity: 1,
    unit: "carton",
    notes: "Organic whole milk"
  },
  {
    id: "2",
    name: "Chicken Breast",
    category: "meat",
    expiryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
    addedDate: new Date(),
    quantity: 500,
    unit: "g",
    notes: "In freezer"
  },
  {
    id: "3",
    name: "Spinach",
    category: "vegetables",
    expiryDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago (expired)
    addedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    quantity: 1,
    unit: "bag",
    notes: ""
  },
  {
    id: "4",
    name: "Apples",
    category: "fruits",
    expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    addedDate: new Date(),
    quantity: 6,
    unit: "item",
    notes: "Honeycrisp"
  }
];

const Index = () => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>(sampleData);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  // Check for expiring items on page load
  useEffect(() => {
    const expiringItems = filterByStatus(foodItems, 'soon');
    if (expiringItems.length > 0) {
      toast({
        title: "Items Expiring Soon!",
        description: `You have ${expiringItems.length} ${expiringItems.length === 1 ? 'item' : 'items'} that will expire soon.`,
        variant: "warning",
      });
    }
  }, []);

  // Add a new food item
  const handleAddFood = (newItem: FoodItem) => {
    setFoodItems([...foodItems, newItem]);
    toast({
      title: "Food item added",
      description: `${newItem.name} has been added to your tracker.`,
    });
  };

  // Delete a food item
  const handleDeleteFood = (id: string) => {
    setFoodItems(foodItems.filter(item => item.id !== id));
    toast({
      title: "Food item removed",
      description: "The item has been removed from your tracker.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header items={foodItems} />
      
      <main className="container py-6 flex-grow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Food Expiry Tracker</h1>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <AddFoodForm onAddFood={handleAddFood} />
            </DialogTrigger>
          </Dialog>
        </div>
        
        <Stats items={foodItems} />
        
        {foodItems.length > 0 ? (
          <ExpiryDashboard items={foodItems} onDeleteItem={handleDeleteFood} />
        ) : (
          <EmptyState onAddClick={() => setDialogOpen(true)} />
        )}
      </main>
      
      <footer className="py-4 text-center text-sm text-muted-foreground border-t">
        <p>Food Expiry Guardian Angel &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default Index;
