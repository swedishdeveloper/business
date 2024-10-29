import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import StaffPosition from "@/models/StaffPosition";

export async function GET() {
  try {
    await dbConnect();
    const positions = await StaffPosition.find({});
    return NextResponse.json(positions);
  } catch (error) {
    console.error("Failed to fetch staff positions:", error);
    return NextResponse.json(
      { error: "Failed to fetch staff positions" },
      { status: 500 }
    );
  }
}

// För att seeda initial data
export async function POST(request: Request) {
  try {
    await dbConnect();
    const data = await request.json();
    const position = await StaffPosition.create(data);
    return NextResponse.json(position);
  } catch (error) {
    console.error("Failed to create staff position:", error);
    return NextResponse.json(
      { error: "Failed to create staff position" },
      { status: 500 }
    );
  }
}
