
import { Check, Clock, CreditCard, DollarSign, FileText, User, Users } from "lucide-react";

export interface Employee {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  joinDate: string;
  salary: number;
  status: 'active' | 'on-leave' | 'terminated';
  avatar?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'hr' | 'manager' | 'employee';
  avatar?: string;
}

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@connect.hr",
    role: "admin",
  },
  {
    id: "2",
    name: "HR Manager",
    email: "hr@connect.hr",
    role: "hr",
  },
  {
    id: "3",
    name: "John Doe",
    email: "john@connect.hr",
    role: "employee",
  }
];

export const mockEmployees: Employee[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@connect.hr",
    position: "Senior Developer",
    department: "Engineering",
    joinDate: "2020-03-15",
    salary: 95000,
    status: "active",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@connect.hr",
    position: "Product Manager",
    department: "Product",
    joinDate: "2019-07-22",
    salary: 110000,
    status: "active",
  },
  {
    id: "3",
    name: "Michael Johnson",
    email: "michael@connect.hr",
    position: "UX Designer",
    department: "Design",
    joinDate: "2021-01-10",
    salary: 85000,
    status: "on-leave",
  },
  {
    id: "4",
    name: "Sarah Williams",
    email: "sarah@connect.hr",
    position: "Marketing Specialist",
    department: "Marketing",
    joinDate: "2020-09-05",
    salary: 78000,
    status: "active",
  },
  {
    id: "5",
    name: "Robert Brown",
    email: "robert@connect.hr",
    position: "HR Coordinator",
    department: "Human Resources",
    joinDate: "2018-11-18",
    salary: 72000,
    status: "active",
  },
  {
    id: "6",
    name: "Emily Davis",
    email: "emily@connect.hr",
    position: "Financial Analyst",
    department: "Finance",
    joinDate: "2019-04-30",
    salary: 88000,
    status: "active",
  },
  {
    id: "7",
    name: "David Wilson",
    email: "david@connect.hr",
    position: "DevOps Engineer",
    department: "Engineering",
    joinDate: "2020-06-12",
    salary: 92000,
    status: "terminated",
  },
  {
    id: "8",
    name: "Amanda Taylor",
    email: "amanda@connect.hr",
    position: "Customer Success",
    department: "Support",
    joinDate: "2021-03-22",
    salary: 75000,
    status: "active",
  }
];

export const dashboardCards = [
  {
    title: "Total Employees",
    value: "248",
    change: "+12% from last month",
    icon: <Users className="h-5 w-5" />,
    color: "blue"
  },
  {
    title: "Present Today",
    value: "217",
    change: "87.5% attendance rate",
    icon: <Check className="h-5 w-5" />,
    color: "green"
  },
  {
    title: "On Leave",
    value: "24",
    change: "9.7% of workforce",
    icon: <Clock className="h-5 w-5" />,
    color: "amber"
  },
  {
    title: "Open Positions",
    value: "12",
    change: "+3 new this week",
    icon: <User className="h-5 w-5" />,
    color: "purple"
  }
];

export const quickLinks = [
  {
    title: "Attendance",
    icon: <Clock className="h-4 w-4" />,
    path: "/attendance"
  },
  {
    title: "Payroll",
    icon: <DollarSign className="h-4 w-4" />,
    path: "/payroll"
  },
  {
    title: "Leave",
    icon: <FileText className="h-4 w-4" />,
    path: "/leave"
  },
  {
    title: "Payment",
    icon: <CreditCard className="h-4 w-4" />,
    path: "/payment"
  }
];

export const departments = [
  "Engineering",
  "Design",
  "Product",
  "Marketing",
  "Sales",
  "Finance",
  "Human Resources",
  "Support",
  "Operations",
  "Legal"
];

export const statusOptions = [
  { value: "active", label: "Active" },
  { value: "on-leave", label: "On Leave" },
  { value: "terminated", label: "Terminated" }
];
