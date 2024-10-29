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
import { Trophy, Medal } from "lucide-react";

const leaderboardData = [
  {
    rank: 1,
    company: "TechVision Industries",
    ceo: "Emma Thompson",
    value: 5234567,
    employees: 45,
    products: 12,
  },
  {
    rank: 2,
    company: "Global Innovations Corp",
    ceo: "James Wilson",
    value: 4123890,
    employees: 38,
    products: 8,
  },
  {
    rank: 3,
    company: "Future Systems Ltd",
    ceo: "David Chen",
    value: 3876543,
    employees: 32,
    products: 10,
  },
  {
    rank: 4,
    company: "Digital Solutions Inc",
    ceo: "Sarah Parker",
    value: 2987654,
    employees: 28,
    products: 7,
  },
  {
    rank: 5,
    company: "Smart Enterprise Co",
    ceo: "Michael Brown",
    value: 2654321,
    employees: 25,
    products: 6,
  },
];

export default function Leaderboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Global Leaderboard</h1>
        <p className="text-muted-foreground">
          Compare your company's performance with other players
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {leaderboardData.slice(0, 3).map((company, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary/10 rounded-full">
                {index === 0 ? (
                  <Trophy className="h-6 w-6 text-yellow-500" />
                ) : (
                  <Medal
                    className={`h-6 w-6 ${
                      index === 1 ? "text-gray-400" : "text-orange-500"
                    }`}
                  />
                )}
              </div>
              <div>
                <h3 className="font-medium">{company.company}</h3>
                <p className="text-sm text-muted-foreground">{company.ceo}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold">
                ${company.value.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">Company Value</p>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rank</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>CEO</TableHead>
              <TableHead>Company Value</TableHead>
              <TableHead>Employees</TableHead>
              <TableHead>Products</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboardData.map((company) => (
              <TableRow key={company.rank}>
                <TableCell className="font-medium">#{company.rank}</TableCell>
                <TableCell>{company.company}</TableCell>
                <TableCell>{company.ceo}</TableCell>
                <TableCell>${company.value.toLocaleString()}</TableCell>
                <TableCell>{company.employees}</TableCell>
                <TableCell>{company.products}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}