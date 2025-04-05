
import { useState } from "react";
import { FoodItem, ExpiryStatus } from "@/types";
import { filterByStatus, getExpiryStatus, sortByExpiry } from "@/utils/food-utils";
import FoodItemCard from "./FoodItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ExpiryDashboardProps {
  items: FoodItem[];
  onDeleteItem: (id: string) => void;
}

export default function ExpiryDashboard({ items, onDeleteItem }: ExpiryDashboardProps) {
  const [activeTab, setActiveTab] = useState<ExpiryStatus | 'all'>('all');
  const { toast } = useToast();

  // Count items by status
  const countByStatus = {
    all: items.length,
    expired: filterByStatus(items, 'expired').length,
    soon: filterByStatus(items, 'soon').length,
    fresh: filterByStatus(items, 'fresh').length,
  };

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value as ExpiryStatus | 'all');
  };

  // Show alerts for soon-to-expire items
  const showExpiryAlerts = () => {
    const soonItems = filterByStatus(items, 'soon');
    if (soonItems.length === 0) {
      toast({
        title: "No alerts",
        description: "You don't have any items expiring soon.",
      });
      return;
    }

    // Show toast for items expiring soon
    toast({
      title: `${soonItems.length} ${soonItems.length === 1 ? 'item' : 'items'} expiring soon!`,
      description: soonItems.map(item => `${item.name} (${new Date(item.expiryDate).toLocaleDateString()})`).join(', '),
      variant: "destructive",
    });
  };

  // Sort and filter items based on active tab
  const displayItems = sortByExpiry(
    activeTab === 'all' ? items : filterByStatus(items, activeTab)
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Your Food Items</h2>
        <button
          onClick={showExpiryAlerts}
          className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
          title="Check expiry alerts"
        >
          <Bell className="h-5 w-5" />
          {countByStatus.soon > 0 && (
            <span className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
              <Badge variant="destructive" className="h-5 w-5 flex items-center justify-center p-0 text-xs">
                {countByStatus.soon}
              </Badge>
            </span>
          )}
        </button>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-6">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="all">
            All
            <Badge variant="secondary" className="ml-2">{countByStatus.all}</Badge>
          </TabsTrigger>
          <TabsTrigger value="expired">
            Expired
            <Badge variant="destructive" className="ml-2">{countByStatus.expired}</Badge>
          </TabsTrigger>
          <TabsTrigger value="soon">
            Soon
            <Badge variant="warning" className="ml-2 bg-warning text-white">{countByStatus.soon}</Badge>
          </TabsTrigger>
          <TabsTrigger value="fresh">
            Fresh
            <Badge variant="outline" className="ml-2 border-fresh text-fresh">{countByStatus.fresh}</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          {displayItems.length > 0 ? (
            displayItems.map(item => (
              <FoodItemCard key={item.id} item={item} onDelete={onDeleteItem} />
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No items to display</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
