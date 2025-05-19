
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import { Briefcase, FileText, Info } from "lucide-react";
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
import { Investigation } from "@/types";
import { statusColors } from "./CrimeResult";

// Component to show each investigation result
const InvestigationResult = ({ investigation }: { investigation: Investigation }) => {
  return (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg flex items-center gap-2">
            <Briefcase size={18} className="text-blue-500" />
            Investigation #{investigation.id}
          </CardTitle>
          <Badge 
            variant="secondary"
            className={cn(
              "capitalize",
              statusColors[investigation.status as keyof typeof statusColors],
              "text-white"
            )}
          >
            {investigation.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm mb-2">
          <span className="font-medium">Associated Crime:</span> #{investigation.crimeId}
        </div>
        <div className="text-sm mb-2">
          <span className="font-medium">Officer in Charge:</span> {investigation.officerInCharge}
        </div>
        <div className="text-sm mb-2">
          <span className="font-medium">Timeline:</span> Started {formatDistanceToNow(new Date(investigation.startDate), { addSuffix: true })}, 
          Last Updated {formatDistanceToNow(new Date(investigation.lastUpdated), { addSuffix: true })}
        </div>
        {investigation.notes && (
          <div className="text-sm border-t border-border mt-2 pt-2">
            <span className="font-medium">Notes:</span> {investigation.notes}
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-0 flex justify-between">
        <Button variant="ghost" size="sm" asChild>
          <Link to={`/investigations?id=${investigation.id}`}>
            <Info size={16} className="mr-1" />
            View Details
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link to={`/crimes?id=${investigation.crimeId}`}>
            <FileText size={16} className="mr-1" />
            View Case
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InvestigationResult;
