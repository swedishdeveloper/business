"use client";

import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react";

const data = [
  { month: "Jan", revenue: 65000, expenses: 45000 },
  { month: "Feb", revenue: 72000, expenses: 48000 },
  { month: "Mar", revenue: 85000, expenses: 52000 },
  { month: "Apr", revenue: 89000, expenses: 54000 },
  { month: "May", revenue: 95000, expenses: 57000 },
  { month: "Jun", revenue: 102000, expenses: 60000 },
];

const transactions = [
  {
    id: 1,
    description: "Product Sales - TechFlow Pro",
    type: "Income",
    amount: 45000,
    date: "2024-03-15",
  },
  {
    id: 2,
    description: "Employee Salaries",
    type: "Expense",
    amount: 32000,
    date: "2024-03-14",
  },
  {
    id: 3,
    description: "Marketing Campaign",
    type: "Expense",
    amount: 8500,
    date: "2024-03-13",
  },
];

export default function Finance() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Financial Overview</h1>
        <p className="text-muted-foreground">
          Track your company's financial performance and transactions
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-medium">Monthly Revenue</h3>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-bold">$102,000</p>
            <p className="text-xs text-emerald-500 flex items-center">
              <ArrowUpRight className="h-4 w-4 mr-1" /> +7.4% from last month
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-medium">Monthly Expenses</h3>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-bold">$60,000</p>
            <p className="text-xs text-red-500 flex items-center">
              <ArrowDownRight className="h-4 w-4 mr-1" /> +5.3% from last month
            </p>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Revenue vs Expenses</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="expenses"
                stroke="hsl(var(--destructive))"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">
                  {transaction.description}
                </TableCell>
                <TableCell>{transaction.type}</TableCell>
                <TableCell>
                  <span
                    className={
                      transaction.type === "Income"
                        ? "text-emerald-500"
                        : "text-red-500"
                    }
                  >
                    ${transaction.amount.toLocaleString()}
                  </span>
                </TableCell>
                <TableCell>{transaction.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}