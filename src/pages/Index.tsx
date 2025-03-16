
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Check, 
  ChevronRight, 
  Users, 
  Clock, 
  DollarSign, 
  FileText, 
  UserPlus, 
  Shield, 
  BarChart, 
  Calendar, 
  Award 
} from "lucide-react";
import { Button } from "@/components/UI/button";

const features = [
  {
    icon: <Users className="h-5 w-5 text-primary" />,
    title: "Employee Management",
    description: "Complete employee lifecycle management from onboarding to offboarding with detailed profiles and document storage."
  },
  {
    icon: <Clock className="h-5 w-5 text-primary" />,
    title: "Attendance Tracking",
    description: "Track employee attendance, leaves, and time-off with automated calculations for working hours and overtime."
  },
  {
    icon: <DollarSign className="h-5 w-5 text-primary" />,
    title: "Payroll Processing",
    description: "Automated payroll calculations, tax deductions, and digital pay slips with historical records and reporting."
  },
  {
    icon: <UserPlus className="h-5 w-5 text-primary" />,
    title: "Recruitment Management",
    description: "Streamline the hiring process from job posting to candidate selection with applicant tracking and interview scheduling."
  },
  {
    icon: <Calendar className="h-5 w-5 text-primary" />,
    title: "Leave Management",
    description: "Comprehensive leave management system with approval workflows, balance tracking, and calendar integration."
  },
  {
    icon: <Shield className="h-5 w-5 text-primary" />,
    title: "Role-Based Access",
    description: "Secure role-based access control ensuring data privacy with different permission levels for various user roles."
  },
  {
    icon: <BarChart className="h-5 w-5 text-primary" />,
    title: "Analytics & Reporting",
    description: "Powerful analytics and custom reporting capabilities to gain insights into workforce metrics and performance."
  },
  {
    icon: <Award className="h-5 w-5 text-primary" />,
    title: "Performance Reviews",
    description: "Structured performance evaluation systems with goal setting, feedback collection, and performance metrics."
  }
];

const testimonials = [
  {
    quote: "Connect HR has transformed how we manage our workforce. The intuitive interface and powerful features have saved us countless hours of administrative work each month.",
    author: "Sarah Johnson",
    position: "HR Director, Acme Inc.",
    company: "Technology Sector, 250+ employees",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg"
  },
  {
    quote: "We've reduced administrative overhead by 40% since implementing Connect HR. The automation capabilities are outstanding, especially the payroll and attendance tracking.",
    author: "Michael Chen",
    position: "CEO, StartUp Technologies",
    company: "SaaS Provider, 75 employees",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg"
  },
  {
    quote: "The recruitment module has completely revolutionized our hiring process. We can now track candidates, schedule interviews, and onboard new employees seamlessly.",
    author: "Emma Rodriguez",
    position: "Talent Acquisition Manager",
    company: "Global Retail Chain, 1,200+ employees",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg"
  },
  {
    quote: "Connect HR's analytics have given us invaluable insights into employee performance and attendance patterns, helping us make data-driven decisions.",
    author: "David Thompson",
    position: "Operations Director",
    company: "Manufacturing Industry, 350 employees",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg"
  }
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2 font-semibold">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
              <Users className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-xl">Connect HR</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Testimonials
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
          </nav>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate("/login")}>
              Sign In
            </Button>
            <Button onClick={() => navigate("/login")}>
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent" />
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-lg space-y-6"
            >
              <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                Simplify HR Management
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl">
                The modern HR platform for growing companies
              </h1>
              <p className="text-lg text-muted-foreground">
                Connect HR streamlines employee management, attendance tracking, payroll processing, 
                and recruitment workflows in one elegant platform.
              </p>
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Button size="lg" onClick={() => navigate("/login")}>
                  Get Started
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Request Demo
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative"
            >
              <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-primary/50 to-primary/30 blur-lg opacity-50" />
              <div className="relative aspect-video overflow-hidden rounded-xl glass-card border p-1">
                <img
                  src="https://placehold.co/800x450/F8FAFC/1E293B?text=Connect+HR+Dashboard"
                  alt="Connect HR Dashboard"
                  className="h-full w-full rounded-lg object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-32 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Powerful HR features designed for modern workplaces
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Everything you need to manage your workforce efficiently in one platform
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-xl glass-card p-6 transition-all duration-300 hover:shadow-md hover:scale-105"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Trusted by HR professionals worldwide
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              See what our customers have to say about Connect HR
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-xl glass-card p-6 transition-all duration-300 hover:shadow-md"
              >
                <div className="flex items-center gap-4 mb-6">
                  {testimonial.avatar && (
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.author} 
                      className="w-14 h-14 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                  </div>
                </div>
                <div className="text-lg font-medium leading-relaxed">
                  "{testimonial.quote}"
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Button 
              size="lg" 
              onClick={() => navigate("/login")}
              className="mx-auto"
            >
              Join our growing community
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-16 sm:py-20">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Ready to streamline your HR operations?
              </h2>
              <p className="mt-2 text-primary-foreground/80">
                Join thousands of companies already using Connect HR
              </p>
            </div>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90"
                onClick={() => navigate("/login")}
              >
                Get Started
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 font-semibold">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                  <Users className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="text-xl">Connect HR</span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Modern HR management platform for growing companies
              </p>
            </div>
            
            <div>
              <h3 className="font-medium">Product</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Integrations
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Changelog
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium">Resources</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Support
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Community
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium">Company</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Team
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Connect HR. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
