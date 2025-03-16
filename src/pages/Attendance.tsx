
import { useState } from "react";
import { Clock, Filter, Download } from "lucide-react";
import { Button } from "@/components/UI/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/UI/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/tabs";
import { Calendar } from "@/components/UI/calendar";
import PageHeader from "@/components/UI/PageHeader";
import MainLayout from "@/components/Layout/MainLayout";
import Transition from "@/components/UI/Transition";
import { useToast } from "@/hooks/use-toast";

const Attendance = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [clockedIn, setClockedIn] = useState(false);

  const handleClockIn = () => {
    const now = new Date();
    toast({
      title: "Clocked In",
      description: `You clocked in at ${now.toLocaleTimeString()}`,
    });
    setClockedIn(true);
  };

  const handleClockOut = () => {
    const now = new Date();
    toast({
      title: "Clocked Out",
      description: `You clocked out at ${now.toLocaleTimeString()}`,
    });
    setClockedIn(false);
  };

  return (
    <MainLayout>
      <Transition>
        <PageHeader
          title="Attendance Management"
          subtitle="Track time, manage attendance and view reports"
          icon={<Clock className="h-6 w-6 text-primary" />}
        >
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </PageHeader>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Time Clock</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-6">
                <div className="text-4xl font-bold mb-6">
                  {new Date().toLocaleTimeString()}
                </div>
                <div className="flex gap-4">
                  <Button
                    variant={clockedIn ? "outline" : "default"}
                    onClick={handleClockIn}
                    disabled={clockedIn}
                  >
                    Clock In
                  </Button>
                  <Button
                    variant={!clockedIn ? "outline" : "default"}
                    onClick={handleClockOut}
                    disabled={!clockedIn}
                  >
                    Clock Out
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Status Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Arrival</span>
                  <span className="font-medium">09:32 AM</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Departure</span>
                  <span className="font-medium">--:-- --</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Total Hours</span>
                  <span className="font-medium">7h 28m</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <span className="font-medium text-green-500">Present</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Tabs defaultValue="daily">
            <TabsList>
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
            <TabsContent value="daily" className="space-y-4 mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Daily Attendance Log</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-5 gap-4 font-medium text-muted-foreground text-sm">
                      <div>Date</div>
                      <div>Clock In</div>
                      <div>Clock Out</div>
                      <div>Total Hours</div>
                      <div>Status</div>
                    </div>
                    {[...Array(5)].map((_, i) => {
                      const date = new Date();
                      date.setDate(date.getDate() - i);
                      return (
                        <div key={i} className="grid grid-cols-5 gap-4 py-3 border-t">
                          <div>{date.toLocaleDateString()}</div>
                          <div>09:32 AM</div>
                          <div>06:12 PM</div>
                          <div>8h 40m</div>
                          <div className="text-green-500">Present</div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="weekly" className="space-y-4 mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Weekly Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    Weekly attendance chart would be displayed here
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="monthly" className="space-y-4 mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Monthly Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    Monthly attendance overview would be displayed here
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </Transition>
    </MainLayout>
  );
};

export default Attendance;
