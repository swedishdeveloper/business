"use client";

import { Card } from "@/components/ui/card";
import {
  Building2,
  Users2,
  Briefcase,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Company Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your company's performance and key metrics
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center space-x-2">
            <Building2 className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-medium">Company Value</h3>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-bold">$1,234,567</p>
            <p className="text-xs text-muted-foreground">+12.5% from last week</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-2">
            <Users2 className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-medium">Employees</h3>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-bold">24</p>
            <p className="text-xs text-muted-foreground">+3 this month</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-2">
            <Briefcase className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-medium">Active Products</h3>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-bold">7</p>
            <p className="text-xs text-muted-foreground">2 in development</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-medium">Monthly Revenue</h3>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-bold">$89,432</p>
            <p className="text-xs text-muted-foreground">+8.3% from last month</p>
          </div>
        </Card>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Upcoming Events</AlertTitle>
        <AlertDescription>
          Market research shows increasing demand in the tech sector. Consider expanding your product line.
        </AlertDescription>
      </Alert>
    </div>
  );
}