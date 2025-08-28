import { NextResponse } from "next/server"

// Set Node.js runtime
export const runtime = 'edge'

export async function POST(request: Request) {
  try {
    // Get API key from environment
    const apiKey = process.env.RESEND_API_KEY
    
    // Check if API key is configured
    if (!apiKey || apiKey === "re_123456789") {
      console.error("Resend API key is missing or using default placeholder")
      return NextResponse.json({ 
        error: "Email service not properly configured", 
        detail: "API key missing or invalid" 
      }, { status: 500 })
    }

    // Parse request body
    const body = await request.json()
    const { name, email, company, investmentFocus, message } = body

    // Validate required fields
    if (!name || !email || !company || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    console.log("Attempting to send email to christian@tekimax.com from:", email)

    // Prepare email content
    const emailHtml = `
<h2>New Investor Inquiry</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Company:</strong> ${company}</p>
<p><strong>Investment Focus:</strong> ${investmentFocus || "Not specified"}</p>
<p><strong>Message:</strong></p>
<p>${message.replace(/\n/g, "<br>")}</p>
    `

    const emailText = `
Name: ${name}
Email: ${email}
Company: ${company}
Investment Focus: ${investmentFocus || "Not specified"}

Message:
${message}
    `

    // Use Resend API directly with fetch
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "Tekimax <onboarding@resend.dev>",
        to: ["christian@tekimax.com"],
        subject: `Investor Inquiry from ${name} at ${company}`,
        text: emailText,
        html: emailHtml
      })
    })

    const data = await resendResponse.json()
    
    if (!resendResponse.ok) {
      throw new Error(data.message || "Failed to send email")
    }

    console.log("Email sent successfully:", data)
    return NextResponse.json(data)
  } catch (error: unknown) {
    console.error("Error sending email:", error)
    
    // Provide more detailed error for debugging
    const errorResponse = {
      error: "Failed to send email",
      message: error instanceof Error ? error.message : "Unknown error"
    }
    
    return NextResponse.json(errorResponse, { status: 500 })
  }
}
