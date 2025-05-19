import { useState, useEffect } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from "recharts";
import { formatDistanceToNow } from "date-fns";
import { 
  AlertCircle, 
  Clock, 
  UserCheck,
  FileText,
  Briefcase,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { 
  getCrimeStatistics, 
  getSuspectStatistics, 
  getInvestigationStatistics 
} from "@/services";
import { CrimeStatistics, SuspectStatistics, InvestigationStatistics, Crime, CrimeType } from "@/types";
import { Link } from "react-router-dom";

// Colors for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

// Status color mapping
const statusColors = {
  open: "bg-amber-500",
  closed: "bg-green-500",
  cold: "bg-blue-500",
  pending: "bg-purple-500",
  critical: "bg-red-500",
  high: "bg-orange-500",
  medium: "bg-yellow-500",
  low: "bg-green-500"
};

// Helper to format crime types for display
const formatCrimeType = (type: CrimeType): string => {
  return type.charAt(0).toUpperCase() + type.slice(1).replace(/([A-Z])/g, ' $1');
};

const Dashboard = () => {
  const [crimeStats, setCrimeStats] = useState<CrimeStatistics | null>(null);
  const [suspectStats, setSuspectStats] = useState<SuspectStatistics | null>(null);
  const [investigationStats, setInvestigationStats] = useState<InvestigationStatistics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const crimeData = await getCrimeStatistics();
        const suspectData = await getSuspectStatistics();
        const investigationData = await getInvestigationStatistics();
        
        setCrimeStats(crimeData);
        setSuspectStats(suspectData);
        setInvestigationStats(investigationData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="page-container flex justify-center items-center min-h-[80vh]">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (!crimeStats || !suspectStats || !investigationStats) {
    return (
      <div className="page-container">
        <div className="bg-destructive/10 border border-destructive rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="text-destructive shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-destructive">Error loading data</h3>
            <p className="text-sm text-muted-foreground">
              There was a problem loading the dashboard statistics. Please try again later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Prepare data for crime by type chart
  const crimeByTypeData = crimeStats ? Object.entries(crimeStats.crimesByType)
    .filter(([_, count]) => count > 0) // Only show types with data
    .map(([type, count]) => ({
      name: formatCrimeType(type as CrimeType),
      value: count
    })) : [];

  // Prepare data for crime status chart
  const crimeStatusData = crimeStats ? [
    { name: "Open", value: crimeStats.openCases },
    { name: "Closed", value: crimeStats.solvedCases },
    { name: "Other", value: crimeStats.totalCrimes - crimeStats.openCases - crimeStats.solvedCases }
  ].filter(item => item.value > 0) : []; // Only show statuses with data

  // Prepare data for investigation status chart
  const investigationStatusData = investigationStats ? Object.entries(investigationStats.byStatus)
    .filter(([_, count]) => count > 0) // Only show statuses with data
    .map(([status, count]) => ({
      name: status.charAt(0).toUpperCase() + status.slice(1),
      value: count
    })) : [];

  return (
    <div className="page-container">
      <h1 className="text-3xl font-bold mb-8">Criminal Records Dashboard</h1>
      
      {/* Summary statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="stat-card">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Crimes</p>
                <h3 className="text-2xl font-bold">{crimeStats.totalCrimes}</h3>
              </div>
              <div className="p-2 bg-primary/10 rounded-full">
                <FileText className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <div className="h-2 flex-1 rounded-full bg-muted overflow-hidden">
                <div 
                  className="h-full bg-primary" 
                  style={{ width: `${crimeStats.totalCrimes ? (crimeStats.openCases / crimeStats.totalCrimes) * 100 : 0}%` }}
                ></div>
              </div>
              <span className="text-xs text-muted-foreground">
                {crimeStats.totalCrimes ? Math.round((crimeStats.openCases / crimeStats.totalCrimes) * 100) : 0}% Open
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="stat-card">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Suspects</p>
                <h3 className="text-2xl font-bold">{suspectStats.totalSuspects}</h3>
              </div>
              <div className="p-2 bg-amber-500/10 rounded-full">
                <Users className="h-6 w-6 text-amber-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-muted-foreground">
              <Clock className="mr-1 h-3 w-3" />
              Most common status: {
                Object.entries(suspectStats.byStatus).sort((a, b) => b[1] - a[1])[0]?.[0] || "None"
              }
            </div>
          </CardContent>
        </Card>

        <Card className="stat-card">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Investigations</p>
                <h3 className="text-2xl font-bold">{investigationStats.totalInvestigations}</h3>
              </div>
              <div className="p-2 bg-blue-500/10 rounded-full">
                <Briefcase className="h-6 w-6 text-blue-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-muted-foreground">
              <UserCheck className="mr-1 h-3 w-3" />
              Active: {investigationStats.byStatus.active || 0} | Complete: {investigationStats.byStatus.complete || 0}
            </div>
          </CardContent>
        </Card>

        <Card className="stat-card">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Average Solve Time</p>
                <h3 className="text-2xl font-bold">{investigationStats.averageDaysToSolve} days</h3>
              </div>
              <div className="p-2 bg-green-500/10 rounded-full">
                <Clock className="h-6 w-6 text-green-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-muted-foreground">
              Based on {investigationStats.byStatus.complete || 0} completed investigations
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Crime charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Crimes by Type</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={crimeByTypeData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#1e40af" name="Number of Crimes" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Case Status Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
              <div className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={crimeStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {crimeStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={investigationStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {investigationStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent crimes */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Crimes</CardTitle>
            <Button variant="outline" size="sm" asChild>
              <Link to="/crimes">View All</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {crimeStats.recentCrimes.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="data-grid">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Severity</th>
                  </tr>
                </thead>
                <tbody>
                  {crimeStats.recentCrimes.map((crime: Crime) => (
                    <tr key={crime.id}>
                      <td>{formatCrimeType(crime.type)}</td>
                      <td>
                        <span className="block">{new Date(crime.date).toLocaleDateString()}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(crime.date), { addSuffix: true })}
                        </span>
                      </td>
                      <td>{crime.location}</td>
                      <td>
                        <Badge 
                          variant="secondary"
                          className={cn(
                            "capitalize",
                            statusColors[crime.status as keyof typeof statusColors],
                            "text-white"
                          )}
                        >
                          {crime.status}
                        </Badge>
                      </td>
                      <td>
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No crime records available
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
