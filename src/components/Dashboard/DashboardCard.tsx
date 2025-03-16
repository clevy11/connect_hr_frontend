
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  change?: string;
  color?: "blue" | "green" | "amber" | "red" | "purple" | "pink";
  className?: string;
}

const DashboardCard = ({
  title,
  value,
  icon,
  change,
  color = "blue",
  className,
}: DashboardCardProps) => {
  const colorStyles = {
    blue: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
    green: "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400",
    amber: "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400",
    red: "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400",
    purple: "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
    pink: "bg-pink-50 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400",
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg p-6 glass-card transition-all duration-300 hover:shadow-md group",
        className
      )}
    >
      <div className="absolute -right-1 -top-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="relative h-24 w-24 rotate-12 transform bg-shine animate-shine rounded-md" />
      </div>
      
      <div className="flex justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold tracking-tighter">{value}</p>
          {change && (
            <p className="text-xs text-muted-foreground">{change}</p>
          )}
        </div>
        <div className={cn("p-2 rounded-full h-fit", colorStyles[color])}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
