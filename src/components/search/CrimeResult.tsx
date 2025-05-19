
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import { FileText, Info } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Crime } from "@/types";

// Status colors for badges
export const statusColors = {
  // Crime statuses
  open: "bg-amber-500",
  closed: "bg-green-500",
  cold: "bg-blue-500",
  pending: "bg-purple-500",
  
  // Crime severities 
  critical: "bg-red-500",
  high: "bg-orange-500",
  medium: "bg-yellow-500",
  low: "bg-green-500",
  
  // Suspect statuses
  'suspect': "bg-amber-500",
  'person of interest': "bg-blue-500",
  'charged': "bg-purple-500",
  'cleared': "bg-green-500",
  'convicted': "bg-red-500",
  'acquitted': "bg-teal-500",
  
  // Investigation statuses
  'active': "bg-blue-500",
  'complete': "bg-green-500",
  'suspended': "bg-red-500"
};

// Format crime type for display
export const formatCrimeType = (type: string): string => {
  return type.charAt(0).toUpperCase() + type.slice(1).replace(/([A-Z])/g, ' $1');
};

// Component to show each crime result
const CrimeResult = ({ crime }: { crime: Crime }) => {
  return (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText size={18} className="text-primary" />
            {formatCrimeType(crime.type)}
            <Badge 
              variant="secondary"
              className={cn(
                "capitalize ml-2",
                statusColors[crime.status as keyof typeof statusColors],
                "text-white"
              )}
            >
              {crime.status}
            </Badge>
          </CardTitle>
          <Badge 
            variant="outline"
            className={cn(
              "capitalize",
              statusColors[crime.severity as keyof typeof statusColors],
              "bg-transparent border-current"
            )}
          >
            {crime.severity}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm mb-2">
          <span className="font-medium">Location:</span> {crime.location}
        </div>
        <div className="text-sm mb-2">
          <span className="font-medium">Date:</span> {new Date(crime.date).toLocaleDateString()} ({formatDistanceToNow(new Date(crime.date), { addSuffix: true })})
        </div>
        <p className="text-sm text-muted-foreground">{crime.description}</p>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between">
        <Button variant="ghost" size="sm" asChild>
          <Link to={`/crimes?id=${crime.id}`}>
            <Info size={16} className="mr-1" />
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CrimeResult;
