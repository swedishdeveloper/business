import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
});

export async function POST(req: Request) {
  console.log("Starting registration process");
  
  try {
    console.log("Connecting to database...");
    await dbConnect();
    console.log("Database connected successfully");
    
    console.log("Parsing request body...");
    const body = await req.json();
    console.log("Request body parsed:", { ...body, password: '[REDACTED]' });
    
    console.log("Validating input data...");
    const validation = registerSchema.safeParse(body);

    if (!validation.success) {
      console.log("Validation failed:", validation.error.errors);
      return NextResponse.json(
        { message: "Invalid input", errors: validation.error.errors },
        { status: 400 }
      );
    }

    const { name, email, password, companyName } = validation.data;
    console.log("Input validation successful");

    // Check if user already exists
    console.log("Checking for existing user...");
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists with email:", email);
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 400 }
      );
    }

    // Hash password
    console.log("Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log("Password hashed successfully");

    // Create user with company data
    console.log("Creating new user...");
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      company: {
        name: companyName,
        value: 1000000,
        cash: 500000,
      }
    });
    console.log("User created successfully:", user._id);

    return NextResponse.json(
      { message: "Registration successful" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { 
        message: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}