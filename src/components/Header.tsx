
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useMemo } from "react";
import { FoodItem } from "@/types";
import { filterByStatus } from "@/utils/food-utils";
import { toast } from "@/hooks/use-toast";

interface HeaderProps {
  items: FoodItem[];
}

export default function Header({ items }: HeaderProps) {
  const [mounted, setMounted] = useState(false);

  // Count expiring soon items
  const expiringCount = useMemo(() => {
    return filterByStatus(items, 'soon').length;
  }, [items]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Show notifications for items expiring soon
  const showNotifications = () => {
    const soonItems = filterByStatus(items, 'soon');
    
    if (soonItems.length === 0) {
      toast({
        title: "No expiring items",
        description: "You don't have any items expiring soon."
      });
      return;
    }
    
    toast({
      title: `${soonItems.length} ${soonItems.length === 1 ? 'item' : 'items'} expiring soon!`,
      description: soonItems.map(item => `${item.name}`).join(', '),
      variant: "destructive",
    });
  };

  if (!mounted) return null;

  return (
    <header className="py-4 border-b">
      <div className="container flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl" role="img" aria-label="Food">
            🥗
          </span>
          <h1 className="text-xl font-bold bg-gradient-to-r from-fresh-dark to-fresh bg-clip-text text-transparent">
            Food Expiry Guardian
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={showNotifications}
            className="relative"
          >
            <Bell className="h-5 w-5" />
            {expiringCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0"
              >
                {expiringCount}
              </Badge>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
