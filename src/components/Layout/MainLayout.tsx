import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  BarChart3,
  Bell,
  Calendar,
  CreditCard,
  FileText,
  Home,
  Laptop,
  LogOut,
  Menu,
  Search,
  Settings,
  User,
  Users,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/UI/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/UI/dropdown-menu";
import { Input } from "@/components/UI/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/avatar";
import { useAuth } from "@/context/AuthContext";
import { AnimatePresence, motion } from "framer-motion";

interface MainLayoutProps {
  children: ReactNode;
}

interface NavigationItem {
  name: string;
  href: string;
  icon: ReactNode;
  roles: Array<"admin" | "hr" | "manager" | "employee">;
}

const navigationItems: NavigationItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <Home className="h-5 w-5" />,
    roles: ["admin", "hr", "manager", "employee"],
  },
  {
    name: "Employees",
    href: "/employees",
    icon: <Users className="h-5 w-5" />,
    roles: ["admin", "hr", "manager"],
  },
  {
    name: "Attendance",
    href: "/attendance",
    icon: <Calendar className="h-5 w-5" />,
    roles: ["admin", "hr", "manager", "employee"],
  },
  {
    name: "Payroll",
    href: "/payroll",
    icon: <CreditCard className="h-5 w-5" />,
    roles: ["admin", "hr"],
  },
  {
    name: "Leaves",
    href: "/leaves",
    icon: <FileText className="h-5 w-5" />,
    roles: ["admin", "hr", "manager", "employee"],
  },
  {
    name: "Recruitment",
    href: "/recruitment",
    icon: <Laptop className="h-5 w-5" />,
    roles: ["admin", "hr"],
  },
  {
    name: "Reports",
    href: "/reports",
    icon: <BarChart3 className="h-5 w-5" />,
    roles: ["admin", "hr", "manager"],
  },
  {
    name: "Settings",
    href: "/settings",
    icon: <Settings className="h-5 w-5" />,
    roles: ["admin"],
  },
];

const MainLayout = ({ children }: MainLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logout, isAdmin, isManager } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Filter navigation items based on user role
  const filteredNavigation = navigationItems.filter((item) => {
    if (isAdmin) return true;
    if (isManager && item.roles.includes("manager")) return true;
    return item.roles.includes("employee");
  });

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar for larger screens */}
      <aside
        className={cn(
          "fixed inset-y-0 z-50 hidden w-64 flex-col border-r bg-card transition-transform duration-300 sm:flex",
        )}
      >
        <div className="p-6">
          <Link to="/dashboard" className="flex items-center gap-2 font-semibold">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
              <Users className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-xl">Connect HR</span>
          </Link>
        </div>
        
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium">
            {filteredNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors",
                  location.pathname === item.href && "bg-accent text-accent-foreground"
                )}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="border-t p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarFallback>
                  {user?.name.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground capitalize">
                  {user?.roles}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              title="Log out"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm sm:hidden"
            />
            
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ ease: "easeInOut", duration: 0.3 }}
              className="fixed inset-y-0 left-0 z-50 w-full flex flex-col border-r bg-card sm:hidden"
              style={{ maxWidth: "280px" }}
            >
              <div className="flex items-center justify-between p-6">
                <Link to="/dashboard" className="flex items-center gap-2 font-semibold">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                    <Users className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <span className="text-xl">Connect HR</span>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="flex-1 overflow-auto py-2">
                <nav className="grid items-start px-2 text-sm font-medium">
                  {filteredNavigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors",
                        location.pathname === item.href && "bg-accent text-accent-foreground"
                      )}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
              
              <div className="border-t p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarFallback>
                        {user?.name.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {user?.roles}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleLogout}
                    title="Log out"
                  >
                    <LogOut className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex flex-1 flex-col sm:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur-sm sm:px-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(true)}
            className="sm:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="relative w-full max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full bg-background pl-8 placeholder:text-muted-foreground/70 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
          
          <div className="flex flex-1 items-center justify-end gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative"
                  aria-label="Notifications"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute right-1 top-1.5 h-2 w-2 rounded-full bg-primary" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[320px]">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="flex flex-col gap-2 p-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-4 rounded-md p-2 hover:bg-accent">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          New leave request
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Jane Smith requested 3 days off
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        2h ago
                      </p>
                    </div>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative rounded-full"
                  aria-label="User menu"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {user?.name.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        
        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
