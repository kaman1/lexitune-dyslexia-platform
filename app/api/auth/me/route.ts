import { NextResponse } from "next/server";

// Set Node.js runtime
export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    // Get the session cookie from the request
    const sessionCookie = request.headers.get('cookie')?.match(/session=([^;]+)/)?.[1];
    
    // If no session exists, user is not authenticated
    if (!sessionCookie) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }
    
    // In a real app, you would validate the session token
    // and fetch the user data from your database
    // For now, return a placeholder user
    return NextResponse.json({
      id: "user-1",
      email: "user@example.com",
      name: "Example User"
    });
  } catch (error) {
    console.error("Error fetching session:", error);
    return NextResponse.json(
      { error: "Failed to get user session" },
      { status: 500 }
    );
  }
} 