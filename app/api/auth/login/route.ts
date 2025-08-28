import { NextResponse } from "next/server";
import { cookies } from "next/headers";



// Set Node.js runtime
export const runtime = 'edge';
export async function GET() {
  // Redirect to the login page
  return NextResponse.redirect(new URL("/login", process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"));
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    
    // Here you would validate the credentials against your database
    // For now, we'll use a simple check
    if (email && password) {
      // Create a response with the user info
      const response = NextResponse.json({
        id: "user-1",
        email,
        name: email.split("@")[0],
      });
      
      // Set the session cookie on the response
      response.cookies.set({
        name: "session",
        value: "demo-session-token",
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });
      
      return response;
    }
    
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { error: "Login failed" },
      { status: 500 }
    );
  }
} 