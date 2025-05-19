
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  BarChart3, 
  FileText, 
  Users, 
  Search, 
  Menu, 
  X, 
  Briefcase,
  Shield 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}

const NavItem = ({ to, icon, label, isActive, onClick }: NavItemProps) => (
  <Link 
    to={to} 
    className={cn(
      "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
      isActive 
        ? "bg-primary text-primary-foreground" 
        : "text-foreground hover:bg-secondary"
    )}
    onClick={onClick}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const routes = [
    { path: "/", label: "Dashboard", icon: <BarChart3 size={20} /> },
    { path: "/crimes", label: "Crime Records", icon: <FileText size={20} /> },
    { path: "/suspects", label: "Suspects/Accused", icon: <Users size={20} /> },
    { path: "/investigations", label: "Investigations", icon: <Briefcase size={20} /> },
    { path: "/search", label: "Search", icon: <Search size={20} /> },
  ];

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Mobile header */}
      {isMobile && (
        <header className="bg-card border-b p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="text-primary" size={24} />
            <h1 className="text-xl font-bold">CRMS</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </header>
      )}

      {/* Sidebar */}
      <nav 
        className={cn(
          "bg-card border-r",
          isMobile 
            ? "fixed inset-0 z-50 transform transition-transform duration-200 w-64"
            : "md:static md:translate-x-0 md:w-64 md:flex md:flex-col md:min-h-screen",
          isMobileMenuOpen && isMobile
            ? "translate-x-0" 
            : isMobile ? "-translate-x-full" : ""
        )}
      >
        {/* Sidebar header */}
        <div className="p-4 border-b flex items-center gap-2">
          <Shield className="text-primary" size={24} />
          <h1 className="text-xl font-bold">CRMS</h1>
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto"
              onClick={closeMobileMenu}
            >
              <X size={20} />
            </Button>
          )}
        </div>

        {/* Navigation links */}
        <div className="flex-1 p-4 space-y-2">
          {routes.map((route) => (
            <NavItem
              key={route.path}
              to={route.path}
              icon={route.icon}
              label={route.label}
              isActive={location.pathname === route.path}
              onClick={isMobile ? closeMobileMenu : undefined}
            />
          ))}
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1 md:overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;
