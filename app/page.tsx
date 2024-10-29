import { Button } from "@/components/ui/button";
import { Building2, TrendingUp, Users, Briefcase } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <div className="flex justify-center">
          <Building2 className="h-16 w-16 text-primary" />
        </div>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Corporate Empire
        </h1>
        <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
          Build and manage your own corporate empire in this engaging business simulation game.
          Make strategic decisions, lead your team, and compete to become a market leader.
        </p>
        <div className="mt-12">
          <Link href="/dashboard">
            <Button size="lg" className="text-lg px-8">
              Start Your Empire
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-24 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-lg">
          <Users className="h-12 w-12 text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-2">Staff Management</h3>
          <p className="text-center text-muted-foreground">
            Hire, train, and manage your workforce to build a productive team.
          </p>
        </div>

        <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-lg">
          <Briefcase className="h-12 w-12 text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-2">Product Development</h3>
          <p className="text-center text-muted-foreground">
            Research and develop innovative products to capture market share.
          </p>
        </div>

        <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-lg">
          <TrendingUp className="h-12 w-12 text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-2">Financial Growth</h3>
          <p className="text-center text-muted-foreground">
            Manage budgets, investments, and revenue streams effectively.
          </p>
        </div>
      </div>
    </div>
  );
}