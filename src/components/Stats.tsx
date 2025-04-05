
import { useMemo } from "react";
import { FoodItem, ExpiryStatus } from "@/types";
import { filterByStatus } from "@/utils/food-utils";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatProps {
  title: string;
  value: number;
  className?: string;
  total: number;
}

function Stat({ title, value, className, total }: StatProps) {
  // Calculate percentage for the progress bar
  const percentage = total > 0 ? (value / total) * 100 : 0;
  
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium">{title}</h3>
          <span className="font-bold">{value}</span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div 
            className={cn("h-full", className)} 
            style={{ width: `${percentage}%` }}
          />
        </div>
      </CardContent>
    </Card>
  );
}

interface StatsProps {
  items: FoodItem[];
}

export default function Stats({ items }: StatsProps) {
  const stats = useMemo(() => {
    return {
      total: items.length,
      fresh: filterByStatus(items, 'fresh').length,
      soon: filterByStatus(items, 'soon').length,
      expired: filterByStatus(items, 'expired').length,
    };
  }, [items]);

  if (items.length === 0) return null;

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <Stat
        title="Fresh"
        value={stats.fresh}
        className="bg-fresh"
        total={stats.total}
      />
      <Stat
        title="Expiring Soon"
        value={stats.soon}
        className="bg-warning"
        total={stats.total}
      />
      <Stat
        title="Expired"
        value={stats.expired}
        className="bg-expired"
        total={stats.total}
      />
    </div>
  );
}
