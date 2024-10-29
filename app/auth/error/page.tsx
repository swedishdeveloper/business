import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default function AuthError() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md space-y-8 p-8">
        <div className="flex flex-col items-center justify-center text-center">
          <AlertCircle className="h-12 w-12 text-destructive" />
          <h2 className="mt-6 text-3xl font-bold tracking-tight">
            Authentication Error
          </h2>
          <p className="mt-2 text-muted-foreground">
            There was a problem signing you in. Please try again.
          </p>
        </div>
        <div className="flex justify-center">
          <Link href="/auth/login">
            <Button>Return to Login</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}