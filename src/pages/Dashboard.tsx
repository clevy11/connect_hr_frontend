import { Link } from "react-router-dom";
import { ArrowRight, CalendarRange, ChevronRight, ClipboardList, Users } from "lucide-react";
import { motion } from "framer-motion";
import MainLayout from "@/components/Layout/MainLayout";
import PageHeader from "@/components/UI/PageHeader";
import DashboardCard from "@/components/Dashboard/DashboardCard";
import { Button } from "@/components/UI/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/UI/card";
import { dashboardCards, mockEmployees, quickLinks } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";
import Transition from "@/components/UI/Transition";

type CardColor = 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'pink' | 'orange' | 'indigo' | 'amber';

const containerAnimation = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemAnimation = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const Dashboard = () => {
  const { user } = useAuth();
  
  // Current date
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-US', options);
  
  // Calculate time of day for greeting
  const hours = today.getHours();
  let greeting = "Good evening";
  if (hours < 12) greeting = "Good morning";
  else if (hours < 18) greeting = "Good afternoon";

  return (
    <MainLayout>
      <Transition>
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="pb-2">
            <p className="text-muted-foreground">{formattedDate}</p>
            <h1 className="text-3xl font-bold tracking-tight mt-1">
              {greeting}, {user?.username}
            </h1>
          </div>

          {/* KPI Cards */}
          <motion.div 
            variants={containerAnimation}
            initial="hidden"
            animate="show"
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
          >
            {dashboardCards.map((card, index) => (
              <motion.div key={index} variants={itemAnimation}>
                <DashboardCard
                  title={card.title}
                  value={card.value}
                  icon={card.icon}
                  change={card.change}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Quick Links */}
          <div className="grid gap-4 md:grid-cols-4">
            {quickLinks.map((link, index) => (
              <Link key={index} to={link.path}>
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer h-full">
                  <CardHeader className="p-5 pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        {link.icon}
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <CardTitle className="mt-3 text-base">{link.title}</CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>

          {/* Recent Activity & Upcoming */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* Recent Employees */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Employees</CardTitle>
                  <CardDescription>Latest employees added to the system</CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/employees">
                    View all
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockEmployees.slice(0, 5).map((employee) => (
                    <div key={employee.id} className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        {employee.name.charAt(0)}
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">{employee.name}</p>
                        <p className="text-xs text-muted-foreground">{employee.position}</p>
                      </div>
                      <div className={`rounded-full px-2 py-1 text-xs font-medium ${
                        employee.status === "active" ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400" :
                        employee.status === "on-leave" ? "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400" :
                        "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                      }`}>
                        {employee.status === "active" ? "Active" :
                         employee.status === "on-leave" ? "On Leave" :
                         "Terminated"}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>Calendar events for the next 7 days</CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/calendar">
                    <CalendarRange className="mr-2 h-4 w-4" />
                    Calendar
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((_, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="flex h-12 w-12 flex-col items-center justify-center rounded-md border bg-muted/50">
                        <span className="text-xs font-medium">
                          {new Date(Date.now() + i * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short' })}
                        </span>
                        <span className="text-lg font-bold">
                          {new Date(Date.now() + i * 24 * 60 * 60 * 1000).getDate()}
                        </span>
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {i === 0 ? "Monthly Review Meeting" :
                           i === 1 ? "Team Building Activity" :
                           i === 2 ? "New Employee Orientation" :
                           "Quarterly Planning"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(Date.now() + i * 24 * 60 * 60 * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                          {i === 0 ? " • Conference Room A" :
                           i === 1 ? " • Offsite" :
                           i === 2 ? " • Training Room" :
                           " • Zoom Meeting"}
                        </p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ClipboardList className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Transition>
    </MainLayout>
  );
};

export default Dashboard;
