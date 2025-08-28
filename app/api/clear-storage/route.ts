import { NextResponse } from "next/server";
export const runtime = 'edge';
export async function GET() {
  // Return a simple JSON response instead of HTML
  return NextResponse.json({ 
    success: true, 
    message: "To clear localStorage, please visit /clear-storage" 
  });
} 