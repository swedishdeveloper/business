"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Users2, Plus, Trash2, RefreshCw } from "lucide-react";
import { useStore } from "@/store";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function Staff() {
  const employees = useStore((state) => state.employees);
  const staffPositions = useStore((state) => state.staffPositions);
  const addEmployee = useStore((state) => state.addEmployee);
  const removeEmployee = useStore((state) => state.removeEmployee);
  const fetchEmployees = useStore((state) => state.fetchEmployees);
  const fetchStaffPositions = useStore((state) => state.fetchStaffPositions);

  const [isHireDialogOpen, setIsHireDialogOpen] = useState(false);
  const [isReplaceDialogOpen, setIsReplaceDialogOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [employeeToReplace, setEmployeeToReplace] = useState<string | null>(
    null
  );
  const [employeeToDelete, setEmployeeToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchEmployees();
    fetchStaffPositions();
  }, [fetchEmployees, fetchStaffPositions]);

  const handleHire = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const position = staffPositions.find((p) => p._id === selectedPosition);
    if (!position) return;

    const newEmployee = {
      name: `Employee ${Math.floor(Math.random() * 1000)}`,
      role: position.role,
      department: position.department,
      salary: position.baseSalary,
      performance: "New",
      experience: 0,
      satisfaction: 100,
      productivity: 100,
      status: "Active",
      trainingCompleted: [],
      hiredAt: new Date(),
      lastPromoted: new Date(),
    };

    await addEmployee(newEmployee);
    setIsHireDialogOpen(false);
    setSelectedPosition(null);
  };

  const handleReplace = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const position = staffPositions.find((p) => p._id === selectedPosition);
    if (!position || !employeeToReplace) return;

    await removeEmployee(employeeToReplace);

    const completeEmployee = {
      name: `Employee ${Math.floor(Math.random() * 1000)}`,
      role: position.role,
      department: position.department,
      salary: position.baseSalary,
      performance: "New",
      experience: 0,
      satisfaction: 100,
      productivity: 100,
      status: "Active",
      trainingCompleted: [],
      hiredAt: new Date(),
      lastPromoted: new Date(),
    };

    await addEmployee(completeEmployee);
    setIsReplaceDialogOpen(false);
    setSelectedPosition(null);
    setEmployeeToReplace(null);
  };

  const handleDelete = async () => {
    if (employeeToDelete) {
      await removeEmployee(employeeToDelete);
      setEmployeeToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Staff Management
          </h1>
          <p className="text-muted-foreground">
            Manage your company's workforce and recruitment
          </p>
        </div>
        <Dialog open={isHireDialogOpen} onOpenChange={setIsHireDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Hire New Employee
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Select Position to Fill</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleHire} className="space-y-4">
              <div className="space-y-2">
                <div className="grid gap-4">
                  {staffPositions.map((position) => (
                    <Card
                      key={position._id}
                      className={cn(
                        "p-4 cursor-pointer hover:border-primary transition-colors",
                        selectedPosition === position._id && "border-primary"
                      )}
                      onClick={() => setSelectedPosition(position._id)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">{position.role}</h4>
                          <p className="text-sm text-muted-foreground">
                            {position.department}
                          </p>
                        </div>
                        <p className="font-medium">
                          ${position.baseSalary.toLocaleString()}
                        </p>
                      </div>
                      <p className="text-sm mt-2">{position.description}</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Requirements: {position.requirements}
                      </p>
                    </Card>
                  ))}
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsHireDialogOpen(false);
                    setSelectedPosition(null);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={!selectedPosition}>
                  Hire for Position
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
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
              <TableHead>Actions</TableHead>
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
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setEmployeeToReplace(employee.id);
                        setIsReplaceDialogOpen(true);
                      }}
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setEmployeeToDelete(employee.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Replace Employee Dialog */}
      <Dialog open={isReplaceDialogOpen} onOpenChange={setIsReplaceDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Replace Employee</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleReplace} className="space-y-4">
            <div className="space-y-2">
              <div className="grid gap-4">
                {staffPositions.map((position) => (
                  <Card
                    key={position._id}
                    className={cn(
                      "p-4 cursor-pointer hover:border-primary transition-colors",
                      selectedPosition === position._id && "border-primary"
                    )}
                    onClick={() => setSelectedPosition(position._id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{position.role}</h4>
                        <p className="text-sm text-muted-foreground">
                          {position.department}
                        </p>
                      </div>
                      <p className="font-medium">
                        ${position.baseSalary.toLocaleString()}
                      </p>
                    </div>
                    <p className="text-sm mt-2">{position.description}</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Requirements: {position.requirements}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsReplaceDialogOpen(false);
                  setSelectedPosition(null);
                  setEmployeeToReplace(null);
                }}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={!selectedPosition}>
                Replace Employee
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!employeeToDelete}
        onOpenChange={(open) => !open && setEmployeeToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove the
              employee from your company.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Remove Employee
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
