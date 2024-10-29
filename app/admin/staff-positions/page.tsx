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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useStore } from "@/store";
import { Textarea } from "@/components/ui/textarea";

export default function StaffPositionsAdmin() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const staffPositions = useStore((state) => state.staffPositions);
  const fetchStaffPositions = useStore((state) => state.fetchStaffPositions);

  useEffect(() => {
    fetchStaffPositions();
  }, [fetchStaffPositions]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const newPosition = {
      name: formData.get("role") as string,
      role: formData.get("role") as string,
      department: formData.get("department") as string,
      baseSalary: Number(formData.get("baseSalary")),
      salary: Number(formData.get("baseSalary")),
      requirements: formData.get("requirements") as string,
      description: formData.get("description") as string,
      requiredExperience: Number(formData.get("requiredExperience")),
      performance: "New",
      experience: 0,
      satisfaction: Number(formData.get("expectedSatisfaction")),
      productivity: Number(formData.get("expectedProductivity")),
      status: "Active",
      trainingCompleted: [],
    };

    try {
      const response = await fetch("/api/staff-positions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPosition),
      });

      if (!response.ok) {
        throw new Error("Failed to create position");
      }

      setIsDialogOpen(false);
      fetchStaffPositions();
    } catch (error) {
      console.error("Error creating position:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Staff Positions</h1>
          <p className="text-muted-foreground">
            Manage available positions in your company
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Position
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Position</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Role Title</Label>
                  <Input id="role" name="role" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" name="department" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="baseSalary">Base Salary</Label>
                  <Input
                    id="baseSalary"
                    name="baseSalary"
                    type="number"
                    required
                    min="0"
                    step="1000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requiredExperience">
                    Required Experience (Years)
                  </Label>
                  <Input
                    id="requiredExperience"
                    name="requiredExperience"
                    type="number"
                    required
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expectedProductivity">
                    Expected Productivity (%)
                  </Label>
                  <Input
                    id="expectedProductivity"
                    name="expectedProductivity"
                    type="number"
                    required
                    min="0"
                    max="100"
                    defaultValue="100"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expectedSatisfaction">
                    Expected Satisfaction (%)
                  </Label>
                  <Input
                    id="expectedSatisfaction"
                    name="expectedSatisfaction"
                    type="number"
                    required
                    min="0"
                    max="100"
                    defaultValue="100"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="requirements">Requirements</Label>
                <Textarea id="requirements" name="requirements" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="trainingProgram">Training Program</Label>
                <Textarea
                  id="trainingProgram"
                  name="trainingProgram"
                  placeholder="Describe the required training program for this position"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" required />
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Add Position</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Role</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Base Salary</TableHead>
              <TableHead>Required Experience</TableHead>
              <TableHead>Performance Metrics</TableHead>
              <TableHead>Requirements</TableHead>
              <TableHead>Training Program</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staffPositions.map((position) => (
              <TableRow key={position._id}>
                <TableCell className="font-medium">{position.role}</TableCell>
                <TableCell>{position.department}</TableCell>
                <TableCell>${position.baseSalary.toLocaleString()}</TableCell>
                <TableCell>{position.requiredExperience} years</TableCell>
                <TableCell>
                  <div>
                    Productivity:{" "}
                    {position.performanceMetrics?.expectedProductivity}%
                  </div>
                  <div>
                    Satisfaction:{" "}
                    {position.performanceMetrics?.expectedSatisfaction}%
                  </div>
                </TableCell>
                <TableCell>{position.requirements}</TableCell>
                <TableCell>{position.trainingProgram}</TableCell>
                <TableCell>{position.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
