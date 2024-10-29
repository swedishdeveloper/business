"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Building2 } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export default function Register() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    toast({ title: "Starting registration process..." });

    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      companyName: formData.get("companyName") as string,
    };

    try {
      toast({ title: "Sending registration request..." });
      
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      toast({ title: "Received response from server" });
      
      let result;
      try {
        result = await res.json();
        toast({ title: "Parsed server response" });
      } catch (parseError) {
        toast({
          variant: "destructive",
          title: "Failed to parse server response",
          description: "The server returned an invalid response",
        });
        console.error("Response parse error:", parseError);
        return;
      }

      if (res.ok) {
        toast({
          title: "Registration successful",
          description: "Please sign in with your new account",
        });
        router.push("/auth/login");
      } else {
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: result.message || "Something went wrong",
        });
        console.error("Server error response:", result);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Network Error",
        description: "Failed to connect to the server",
      });
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md space-y-8 p-8">
        <div className="flex flex-col items-center justify-center text-center">
          <Building2 className="h-12 w-12 text-primary" />
          <h2 className="mt-6 text-3xl font-bold tracking-tight">
            Create your account
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                className="mt-1"
                disabled={isLoading}
              />
            </div>

            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1"
                disabled={isLoading}
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="mt-1"
                disabled={isLoading}
                minLength={6}
              />
            </div>

            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                name="companyName"
                type="text"
                required
                className="mt-1"
                disabled={isLoading}
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>

          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-medium text-primary hover:text-primary/90"
            >
              Sign in
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}