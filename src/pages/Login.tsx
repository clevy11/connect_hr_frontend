import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/UI/button";
import { Input } from "@/components/UI/input";
import { Label } from "@/components/UI/label";
import { toast } from "sonner";

const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, getDashboardPath } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast.error("Please enter both username and password");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await login(username, password);
      if (success) {
        const path = getDashboardPath();
        console.log('Navigating to:', path);
        navigate(path);
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* Left side - Form */}
      <div className="flex flex-col justify-center p-8 md:p-12">
        <div className="mx-auto w-full max-w-sm">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            custom={0}
            className="flex items-center gap-2 mb-8"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
              <Users className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold">Connect HR</h1>
          </motion.div>
          
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            custom={1}
            className="space-y-2 mb-8"
          >
            <h2 className="text-3xl font-bold tracking-tight">Welcome back</h2>
            <p className="text-muted-foreground">
              Enter your credentials to sign in to your account
            </p>
          </motion.div>
          
          <motion.form
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            custom={2}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter your username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Button variant="link" className="h-auto p-0 text-xs">
                  Forgot password?
                </Button>
              </div>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Button variant="link" className="p-0" onClick={() => navigate("/register")}>
                Create one
              </Button>
            </div>
          </motion.form>
        </div>
      </div>
      
      {/* Right side - Background */}
      <div className="hidden md:block bg-gradient-to-br from-primary/80 to-primary/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-white/10 to-transparent opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="glass-card p-8 max-w-md rounded-xl">
            <h3 className="text-2xl font-bold mb-4">Connect HR System</h3>
            <p className="mb-6 text-muted-foreground">
              A comprehensive HR management platform that streamlines employee management,
              attendance tracking, payroll processing, and recruitment workflows.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {["Employee Management", "Attendance Tracking", "Payroll Processing", "Recruitment"].map((feature, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
