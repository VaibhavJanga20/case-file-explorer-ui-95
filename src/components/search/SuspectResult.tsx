
import { Link } from "react-router-dom";
import { FileText, Info, Users } from "lucide-react";
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
import { Suspect } from "@/types";
import { statusColors } from "./CrimeResult";

// Component to show each suspect result
const SuspectResult = ({ suspect }: { suspect: Suspect }) => {
  return (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg flex items-center gap-2">
            <Users size={18} className="text-amber-500" />
            {suspect.name}
          </CardTitle>
          <Badge 
            variant="secondary"
            className={cn(
              "capitalize",
              statusColors[suspect.status as keyof typeof statusColors],
              "text-white"
            )}
          >
            {suspect.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm mb-2">
          <span className="font-medium">Associated Crime:</span> #{suspect.crimeId}
        </div>
        {suspect.gender && suspect.dateOfBirth && (
          <div className="text-sm mb-2">
            <span className="font-medium">Personal:</span> {suspect.gender}, DOB: {suspect.dateOfBirth}
          </div>
        )}
        {suspect.address && (
          <div className="text-sm mb-2">
            <span className="font-medium">Address:</span> {suspect.address}
          </div>
        )}
        {suspect.contactInfo && (
          <div className="text-sm mb-2">
            <span className="font-medium">Contact:</span> {suspect.contactInfo}
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-0 flex justify-between">
        <Button variant="ghost" size="sm" asChild>
          <Link to={`/suspects?id=${suspect.id}`}>
            <Info size={16} className="mr-1" />
            View Details
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link to={`/crimes?id=${suspect.crimeId}`}>
            <FileText size={16} className="mr-1" />
            View Case
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SuspectResult;
