"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Users2, Plus } from "lucide-react";

const employees = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Software Engineer",
    department: "Engineering",
    performance: "High",
    salary: 85000,
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Product Manager",
    department: "Product",
    performance: "Medium",
    salary: 95000,
  },
  {
    id: 3,
    name: "Michael Brown",
    role: "Marketing Specialist",
    department: "Marketing",
    performance: "High",
    salary: 65000,
  },
];

export default function Staff() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Staff Management</h1>
          <p className="text-muted-foreground">
            Manage your company's workforce and recruitment
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Hire New Employee
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center space-x-2">
            <Users2 className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-medium">Total Employees</h3>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-bold">{employees.length}</p>
          </div>
        </Card>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Performance</TableHead>
              <TableHead>Salary</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell className="font-medium">{employee.name}</TableCell>
                <TableCell>{employee.role}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.performance}</TableCell>
                <TableCell>${employee.salary.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}