import { NextResponse } from "next/server";

// Set Node.js runtime
export const runtime = 'edge';
export async function GET() {
  try {
    // Create a response that redirects to home page
    const response = NextResponse.redirect(
      new URL("/", process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000")
    );
    
    // Delete the session cookie on the response
    response.cookies.delete("session");
    
    return response;
  } catch (error) {
    console.error("Error during logout:", error);
    return NextResponse.json(
      { error: "Failed to log out" },
      { status: 500 }
    );
  }
} 