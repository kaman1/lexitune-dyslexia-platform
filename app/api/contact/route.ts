import { NextResponse } from "next/server";

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, inquiryType, message } = body;

    // Basic validation
    if (!name || !email || !inquiryType || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // In a real application, you would process the form data here, e.g.:
    // - Send an email notification
    // - Save the data to a database
    // - Call a CRM API

    console.log("Form submission received:", { name, email, company, inquiryType, message });

    return NextResponse.json({ message: "Form submitted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error processing form submission:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
