
import { Badge } from "@/components/ui/badge";
import { Suspect, Crime } from "@/types";
import { cn } from "@/lib/utils";
import { statusColors } from "./SuspectDetailsDialog";
import SuspectDetailsDialog from "./SuspectDetailsDialog";

interface SuspectWithCrime extends Suspect {
  crime?: Crime;
}

interface SuspectsListProps {
  suspects: SuspectWithCrime[];
}

const SuspectsList = ({ suspects }: SuspectsListProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="data-grid">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Associated Crime</th>
            <th>Contact Info</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {suspects.length > 0 ? (
            suspects.map((suspect) => (
              <tr key={suspect.id}>
                <td>#{suspect.id}</td>
                <td>
                  <div className="font-medium">{suspect.name}</div>
                  {suspect.gender && suspect.dateOfBirth && (
                    <div className="text-xs text-muted-foreground">
                      {suspect.gender}, DOB: {suspect.dateOfBirth}
                    </div>
                  )}
                </td>
                <td>
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
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <span>#{suspect.crimeId}</span>
                    {suspect.crime && (
                      <Badge variant="outline" className="capitalize">
                        {suspect.crime.type.replace(/([A-Z])/g, ' $1')}
                      </Badge>
                    )}
                  </div>
                </td>
                <td>
                  {suspect.contactInfo || (
                    <span className="text-muted-foreground italic text-sm">Not available</span>
                  )}
                </td>
                <td>
                  <SuspectDetailsDialog suspect={suspect} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center py-6 text-muted-foreground">
                No suspects/persons of interest found matching your criteria
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SuspectsList;
