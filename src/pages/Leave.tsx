
import { Calendar, PlusCircle, Clock, Filter, AlertCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/UI/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/UI/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/tabs";
import PageHeader from "@/components/UI/PageHeader";
import MainLayout from "@/components/Layout/MainLayout";
import Transition from "@/components/UI/Transition";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/UI/dialog";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/UI/label";
import { RadioGroup, RadioGroupItem } from "@/components/UI/radio-group";
import { Textarea } from "@/components/UI/textarea";
import { Badge } from "@/components/UI/badge";
import { cn } from "@/lib/utils";

type LeaveType = "sick" | "vacation" | "personal" | "bereavement" | "other";
type LeaveStatus = "pending" | "approved" | "rejected";

interface LeaveRequest {
  id: string;
  type: LeaveType;
  startDate: Date;
  endDate: Date;
  reason: string;
  status: LeaveStatus;
  appliedOn: Date;
}

const leaveRequests: LeaveRequest[] = [
  {
    id: "leave-1",
    type: "vacation",
    startDate: new Date(2023, 6, 15),
    endDate: new Date(2023, 6, 22),
    reason: "Family vacation",
    status: "approved",
    appliedOn: new Date(2023, 5, 1),
  },
  {
    id: "leave-2",
    type: "sick",
    startDate: new Date(2023, 4, 10),
    endDate: new Date(2023, 4, 11),
    reason: "Not feeling well, fever and cold",
    status: "approved",
    appliedOn: new Date(2023, 4, 9),
  },
  {
    id: "leave-3",
    type: "personal",
    startDate: new Date(2023, 8, 5),
    endDate: new Date(2023, 8, 5),
    reason: "Personal appointment",
    status: "pending",
    appliedOn: new Date(2023, 7, 29),
  },
];

const getLeaveTypeLabel = (type: LeaveType) => {
  const labels: Record<LeaveType, string> = {
    sick: "Sick Leave",
    vacation: "Vacation",
    personal: "Personal Leave",
    bereavement: "Bereavement",
    other: "Other",
  };
  return labels[type];
};

const getStatusBadge = (status: LeaveStatus) => {
  const variants: Record<LeaveStatus, string> = {
    pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    approved: "bg-green-100 text-green-800 hover:bg-green-100",
    rejected: "bg-red-100 text-red-800 hover:bg-red-100",
  };
  
  return (
    <Badge className={variants[status]} variant="outline">
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

const calculateDuration = (start: Date, end: Date) => {
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  return diffDays === 1 ? "1 day" : `${diffDays} days`;
};

const LeaveRequestCard = ({ request }: { request: LeaveRequest }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-base">{getLeaveTypeLabel(request.type)}</CardTitle>
            <CardDescription>
              {request.startDate.toLocaleDateString()} - {request.endDate.toLocaleDateString()}
            </CardDescription>
          </div>
          {getStatusBadge(request.status)}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground mb-2">{request.reason}</div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Applied: {request.appliedOn.toLocaleDateString()}</span>
          <span>{calculateDuration(request.startDate, request.endDate)}</span>
        </div>
      </CardContent>
    </Card>
  );
};

const Leave = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [leaveType, setLeaveType] = useState<LeaveType>("vacation");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [reason, setReason] = useState<string>("");

  const handleSubmitLeave = () => {
    if (!startDate || !endDate || !reason) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please fill all required fields",
      });
      return;
    }
    
    // Here you would normally submit to an API
    toast({
      title: "Leave request submitted",
      description: "Your request has been submitted for approval",
    });
    
    setOpen(false);
    // Reset form
    setLeaveType("vacation");
    setStartDate("");
    setEndDate("");
    setReason("");
  };

  return (
    <MainLayout>
      <Transition>
        <PageHeader
          title="Leave Management"
          subtitle="Request time off and manage your leave balance"
          icon={<Calendar className="h-6 w-6 text-primary" />}
        >
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Request Leave
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Request Leave</DialogTitle>
                <DialogDescription>
                  Fill in the details below to submit your leave request.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label>Leave Type</Label>
                  <RadioGroup 
                    defaultValue={leaveType}
                    onValueChange={(value) => setLeaveType(value as LeaveType)}
                    className="flex flex-wrap gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="vacation" id="vacation" />
                      <Label htmlFor="vacation">Vacation</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sick" id="sick" />
                      <Label htmlFor="sick">Sick Leave</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="personal" id="personal" />
                      <Label htmlFor="personal">Personal</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="bereavement" id="bereavement" />
                      <Label htmlFor="bereavement">Bereavement</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other">Other</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <input
                      id="startDate"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <input
                      id="endDate"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reason">Reason</Label>
                  <Textarea
                    id="reason"
                    placeholder="Please provide details about your leave request"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmitLeave}>Submit Request</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </PageHeader>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Leave Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground">Vacation Days</div>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-semibold">15</div>
                    <div className="text-sm text-muted-foreground">of 20 days</div>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-secondary">
                    <div className={cn("h-full rounded-full bg-primary")} style={{ width: "75%" }} />
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground">Sick Leave</div>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-semibold">7</div>
                    <div className="text-sm text-muted-foreground">of 10 days</div>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-secondary">
                    <div className={cn("h-full rounded-full bg-primary")} style={{ width: "70%" }} />
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground">Personal Days</div>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-semibold">2</div>
                    <div className="text-sm text-muted-foreground">of 3 days</div>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-secondary">
                    <div className={cn("h-full rounded-full bg-primary")} style={{ width: "66.7%" }} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Upcoming Leave</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaveRequests
                  .filter(req => new Date() < req.startDate && req.status !== "rejected")
                  .slice(0, 2)
                  .map((leave, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{getLeaveTypeLabel(leave.type)}</p>
                        <p className="text-sm text-muted-foreground">
                          {leave.startDate.toLocaleDateString()} - {leave.endDate.toLocaleDateString()}
                        </p>
                        <div className="mt-1">
                          {getStatusBadge(leave.status)}
                        </div>
                      </div>
                    </div>
                  ))}
                {leaveRequests.filter(req => new Date() < req.startDate && req.status !== "rejected").length === 0 && (
                  <div className="flex items-center justify-center h-24 text-center text-muted-foreground">
                    No upcoming leave scheduled
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Team Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <div className="text-sm text-muted-foreground mb-2">People on leave today</div>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-medium">JD</div>
                    <div>
                      <div className="text-sm font-medium">John Doe</div>
                      <div className="text-xs text-muted-foreground">Vacation (5 days)</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">AS</div>
                    <div>
                      <div className="text-sm font-medium">Alice Smith</div>
                      <div className="text-xs text-muted-foreground">Sick Leave (1 day)</div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <div className="text-sm text-muted-foreground mb-2">Upcoming team absences</div>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-white font-medium">RJ</div>
                      <div>
                        <div className="text-sm font-medium">Robert Johnson</div>
                        <div className="text-xs text-muted-foreground">Jul 20 - Jul 25 (Vacation)</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-medium">EW</div>
                      <div>
                        <div className="text-sm font-medium">Emily Wilson</div>
                        <div className="text-xs text-muted-foreground">Jul 18 (Personal Day)</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Requests</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {leaveRequests.map((request, i) => (
                  <LeaveRequestCard key={i} request={request} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="pending" className="mt-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {leaveRequests.filter(r => r.status === "pending").map((request, i) => (
                  <LeaveRequestCard key={i} request={request} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="approved" className="mt-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {leaveRequests.filter(r => r.status === "approved").map((request, i) => (
                  <LeaveRequestCard key={i} request={request} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="rejected" className="mt-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {leaveRequests.filter(r => r.status === "rejected").length > 0 ? (
                  leaveRequests.filter(r => r.status === "rejected").map((request, i) => (
                    <LeaveRequestCard key={i} request={request} />
                  ))
                ) : (
                  <div className="col-span-full flex items-center justify-center p-8 text-muted-foreground">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    No rejected leave requests
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Transition>
    </MainLayout>
  );
};

export default Leave;
