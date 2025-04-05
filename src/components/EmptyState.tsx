
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onAddClick: () => void;
}

export default function EmptyState({ onAddClick }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-[50vh] text-center">
      <div className="bg-muted/50 p-6 rounded-full mb-4">
        <ShoppingCart className="h-12 w-12 text-primary" />
      </div>
      <h2 className="text-2xl font-bold mb-2">No food items yet</h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        Start tracking your food items to get expiry alerts and reduce food waste.
      </p>
      <Button onClick={onAddClick}>Add Your First Item</Button>
    </div>
  );
}
