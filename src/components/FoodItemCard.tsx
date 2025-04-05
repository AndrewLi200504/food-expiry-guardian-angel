
import { FoodItem } from "@/types";
import { cn } from "@/lib/utils";
import { formatDate, formatDaysRemaining, getExpiryStatus, getCategoryEmoji } from "@/utils/food-utils";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FoodItemCardProps {
  item: FoodItem;
  onDelete: (id: string) => void;
}

const FoodItemCard = ({ item, onDelete }: FoodItemCardProps) => {
  const expiryStatus = getExpiryStatus(item.expiryDate);
  
  return (
    <Card className={cn(
      "mb-3 overflow-hidden transition-all hover:shadow-md",
      `card-status-${expiryStatus}`
    )}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <span className="text-xl" role="img" aria-label={item.category}>
                {getCategoryEmoji(item.category)}
              </span>
              <h3 className="text-lg font-semibold">{item.name}</h3>
            </div>
            
            <div className="mt-1 text-sm text-muted-foreground">
              <p>Added: {formatDate(item.addedDate)}</p>
              <p>Expiry: {formatDate(item.expiryDate)}</p>
              <p className={cn("text-expiry-status", `text-expiry-${expiryStatus}`, "mt-1")}>
                {formatDaysRemaining(item.expiryDate)}
              </p>
            </div>
            
            {item.notes && (
              <p className="mt-2 text-sm italic">"{item.notes}"</p>
            )}
          </div>
          
          <div>
            <span className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full">
              {item.quantity} {item.unit}
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="ml-2 text-muted-foreground hover:text-destructive"
              onClick={() => onDelete(item.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FoodItemCard;
