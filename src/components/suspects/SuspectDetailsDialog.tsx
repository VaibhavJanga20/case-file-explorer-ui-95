
import { Link } from "react-router-dom";
import { Info, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Suspect, Crime } from "@/types";

// Status color mapping
export const statusColors = {
  'suspect': "bg-amber-500",
  'person of interest': "bg-blue-500",
  'charged': "bg-purple-500",
  'cleared': "bg-green-500",
  'convicted': "bg-red-500",
  'acquitted': "bg-teal-500"
};

interface SuspectWithCrime extends Suspect {
  crime?: Crime;
}

const SuspectDetailsDialog = ({ suspect }: { suspect: SuspectWithCrime }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost">
          <Info size={16} className="mr-1" />
          Details
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Suspect Details</DialogTitle>
          <DialogDescription>
            Personal information and case association
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <div className="space-y-1">
            <Label className="text-sm font-medium text-muted-foreground">Name</Label>
            <div className="font-medium">{suspect.name}</div>
          </div>
          
          <div className="space-y-1">
            <Label className="text-sm font-medium text-muted-foreground">Status</Label>
            <div>
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
          </div>
          
          {suspect.dateOfBirth && (
            <div className="space-y-1">
              <Label className="text-sm font-medium text-muted-foreground">Date of Birth</Label>
              <div>{suspect.dateOfBirth}</div>
            </div>
          )}
          
          {suspect.gender && (
            <div className="space-y-1">
              <Label className="text-sm font-medium text-muted-foreground">Gender</Label>
              <div>{suspect.gender}</div>
            </div>
          )}
          
          {suspect.address && (
            <div className="space-y-1 md:col-span-2">
              <Label className="text-sm font-medium text-muted-foreground">Address</Label>
              <div>{suspect.address}</div>
            </div>
          )}
          
          {suspect.contactInfo && (
            <div className="space-y-1">
              <Label className="text-sm font-medium text-muted-foreground">Contact Info</Label>
              <div>{suspect.contactInfo}</div>
            </div>
          )}
          
          <div className="space-y-1 md:col-span-2">
            <Label className="text-sm font-medium text-muted-foreground">Associated Crime</Label>
            <div className="flex items-center gap-2">
              <span>Case #{suspect.crimeId}</span>
              {suspect.crime && (
                <Badge variant="outline">
                  {suspect.crime.type.charAt(0).toUpperCase() + suspect.crime.type.slice(1).replace(/([A-Z])/g, ' $1')}
                </Badge>
              )}
              <Button variant="ghost" size="sm" asChild>
                <Link to={`/crimes?id=${suspect.crimeId}`}>
                  <LinkIcon size={14} className="mr-1" />
                  View Case
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline">Edit</Button>
          <Button variant="destructive">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SuspectDetailsDialog;
