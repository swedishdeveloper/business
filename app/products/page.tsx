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
import { Progress } from "@/components/ui/progress";
import { Briefcase, Plus } from "lucide-react";

const products = [
  {
    id: 1,
    name: "TechFlow Pro",
    category: "Software",
    status: "Active",
    revenue: 450000,
    development: 100,
  },
  {
    id: 2,
    name: "DataSync Enterprise",
    category: "Service",
    status: "Development",
    revenue: 0,
    development: 65,
  },
  {
    id: 3,
    name: "CloudGuard",
    category: "Security",
    status: "Active",
    revenue: 280000,
    development: 100,
  },
];

export default function Products() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Product Management</h1>
          <p className="text-muted-foreground">
            Manage your product portfolio and development pipeline
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New Product
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center space-x-2">
            <Briefcase className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-medium">Active Products</h3>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-bold">
              {products.filter((p) => p.status === "Active").length}
            </p>
          </div>
        </Card>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead>Development</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.status}</TableCell>
                <TableCell>${product.revenue.toLocaleString()}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Progress value={product.development} className="w-[60px]" />
                    <span className="text-sm">{product.development}%</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}