
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, LogIn, UserPlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";

// A utility function to clean up auth state
const cleanupAuthState = () => {
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith("supabase.auth.") || key.includes("sb-")) {
      localStorage.removeItem(key);
    }
  });

  Object.keys(sessionStorage || {}).forEach((key) => {
    if (key.startsWith("supabase.auth.") || key.includes("sb-")) {
      sessionStorage.removeItem(key);
    }
  });
};

const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("officer");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      // Clean up existing auth state
      cleanupAuthState();
      
      // Try global sign out first
      try {
        await supabase.auth.signOut({ scope: "global" });
      } catch (err) {
        // Continue even if this fails
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      if (data.user) {
        toast({
          title: "Success",
          description: "You have been signed in",
        });
        // Force page reload to ensure clean state
        window.location.href = "/";
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error signing in",
        description: error.message || "An error occurred during sign in",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      // Clean up existing auth state
      cleanupAuthState();
      
      // Try global sign out first
      try {
        await supabase.auth.signOut({ scope: "global" });
      } catch (err) {
        // Continue even if this fails
      }

      // Sign up the user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role,
          },
        },
      });
      
      if (error) throw error;
      
      // Create profile for the user
      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            { id: data.user.id, name, role, email }
          ]);
        
        if (profileError) throw profileError;
        
        toast({
          title: "Account created",
          description: "Please check your email for verification instructions",
        });
        
        // For development, we'll auto-login
        window.location.href = "/";
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error signing up",
        description: error.message || "An error occurred during sign up",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <Shield className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl">Crime Records Management</CardTitle>
          <CardDescription>
            Sign in or create an account to access the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Create Account</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <span className="flex items-center">
                      <span className="mr-2">Signing In</span>
                      <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <LogIn className="mr-2 h-4 w-4" /> Sign In
                    </span>
                  )}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                  >
                    <option value="officer">Officer</option>
                    <option value="investigator">Investigator</option>
                    <option value="analyst">Analyst</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <span className="flex items-center">
                      <span className="mr-2">Creating Account</span>
                      <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <UserPlus className="mr-2 h-4 w-4" /> Create Account
                    </span>
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-muted-foreground">
            Criminal Records Management System
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Auth;
