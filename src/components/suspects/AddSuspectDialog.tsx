
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";
import { SuspectStatus } from "@/types";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

// All possible suspect statuses for the filter
const suspectStatuses: SuspectStatus[] = [
  'suspect',
  'person of interest',
  'charged',
  'cleared',
  'convicted',
  'acquitted'
];

const AddSuspectDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusCircle size={18} />
          Add Person
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Person</DialogTitle>
          <DialogDescription>
            Enter the suspect or person of interest details.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="suspect-name">Name</Label>
            <Input id="suspect-name" placeholder="Full name" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="suspect-status">Status</Label>
            <Select>
              <SelectTrigger id="suspect-status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  {suspectStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      <span className="capitalize">{status}</span>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="suspect-dob">Date of Birth</Label>
            <Input id="suspect-dob" type="date" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="suspect-gender">Gender</Label>
            <Select>
              <SelectTrigger id="suspect-gender">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="suspect-address">Address</Label>
            <Input id="suspect-address" placeholder="Current address (if known)" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="suspect-contact">Contact Info</Label>
            <Input id="suspect-contact" placeholder="Phone, email, etc." />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="suspect-crime">Associated Crime ID</Label>
            <Input id="suspect-crime" placeholder="Enter Crime ID" />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddSuspectDialog;
