"use client";

import { Building2, Trophy, Users2, Briefcase, BarChart3, Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSession, signOut } from "next-auth/react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Building2 },
  { name: "Staff", href: "/staff", icon: Users2 },
  { name: "Products", href: "/products", icon: Briefcase },
  { name: "Finance", href: "/finance", icon: BarChart3 },
  { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
];

export function Navigation() {
  const pathname = usePathname();
  const { data: session } = useSession();

  if (!session && pathname !== "/") {
    return null;
  }

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Building2 className="h-6 w-6" />
              <span className="text-xl font-bold">Corporate Empire</span>
            </Link>
          </div>

          {session && (
            <>
              {/* Desktop Navigation */}
              <div className="hidden md:flex md:items-center md:space-x-4">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "inline-flex items-center px-3 py-2 text-sm font-medium rounded-md",
                        pathname === item.href
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      {item.name}
                    </Link>
                  );
                })}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="ml-4"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>

              {/* Mobile Navigation */}
              <div className="md:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    {navigation.map((item) => {
                      const Icon = item.icon;
                      return (
                        <DropdownMenuItem key={item.name} asChild>
                          <Link
                            href={item.href}
                            className="flex items-center"
                          >
                            <Icon className="mr-2 h-4 w-4" />
                            {item.name}
                          </Link>
                        </DropdownMenuItem>
                      );
                    })}
                    <DropdownMenuItem
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="text-red-500"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}