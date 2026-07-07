import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Standard server-side check
    const { name, company, email, phone, projectType, budget, timeline, details } = body;
    if (!name || !email || !phone || !projectType || !budget || !timeline || !details) {
      return NextResponse.json(
        { message: "Missing required fields." },
        { status: 400 }
      );
    }

    const emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #1a1a1a;">
        <h2 style="font-size: 20px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #eaeaea; padding-bottom: 20px; margin-bottom: 30px;">
          VISTARA STUDIOS — NEW INQUIRY
        </h2>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
          <tbody>
            <tr>
              <td style="padding: 10px 0; font-size: 12px; font-weight: 600; text-transform: uppercase; color: #666; width: 160px; border-bottom: 1px solid #f9f9f9;">Name</td>
              <td style="padding: 10px 0; font-size: 14px; color: #1a1a1a; border-bottom: 1px solid #f9f9f9;">${name}</td>
            </tr>
            ${company ? `
            <tr>
              <td style="padding: 10px 0; font-size: 12px; font-weight: 600; text-transform: uppercase; color: #666; border-bottom: 1px solid #f9f9f9;">Company</td>
              <td style="padding: 10px 0; font-size: 14px; color: #1a1a1a; border-bottom: 1px solid #f9f9f9;">${company}</td>
            </tr>
            ` : ""}
            <tr>
              <td style="padding: 10px 0; font-size: 12px; font-weight: 600; text-transform: uppercase; color: #666; border-bottom: 1px solid #f9f9f9;">Email</td>
              <td style="padding: 10px 0; font-size: 14px; color: #1a1a1a; border-bottom: 1px solid #f9f9f9;">
                <a href="mailto:${email}" style="color: #1a1a1a; text-decoration: underline;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-size: 12px; font-weight: 600; text-transform: uppercase; color: #666; border-bottom: 1px solid #f9f9f9;">Phone</td>
              <td style="padding: 10px 0; font-size: 14px; color: #1a1a1a; border-bottom: 1px solid #f9f9f9;">
                <a href="tel:${phone}" style="color: #1a1a1a; text-decoration: underline;">${phone}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-size: 12px; font-weight: 600; text-transform: uppercase; color: #666; border-bottom: 1px solid #f9f9f9;">Project Type</td>
              <td style="padding: 10px 0; font-size: 14px; color: #1a1a1a; border-bottom: 1px solid #f9f9f9;">${projectType}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-size: 12px; font-weight: 600; text-transform: uppercase; color: #666; border-bottom: 1px solid #f9f9f9;">Budget Range</td>
              <td style="padding: 10px 0; font-size: 14px; color: #1a1a1a; border-bottom: 1px solid #f9f9f9;">${budget}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-size: 12px; font-weight: 600; text-transform: uppercase; color: #666; border-bottom: 1px solid #f9f9f9;">Timeline</td>
              <td style="padding: 10px 0; font-size: 14px; color: #1a1a1a; border-bottom: 1px solid #f9f9f9;">${timeline}</td>
            </tr>
          </tbody>
        </table>
        
        <div style="background-color: #fcfcfc; border: 1px solid #f0f0f0; border-radius: 8px; padding: 24px; margin-top: 20px;">
          <h4 style="margin: 0 0 12px 0; font-size: 12px; font-weight: 600; text-transform: uppercase; color: #666;">Project Scope & Goals</h4>
          <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #333; white-space: pre-wrap;">${details}</p>
        </div>
        
        <p style="font-size: 10px; color: #999; margin-top: 60px; border-top: 1px solid #eaeaea; padding-top: 20px; text-align: center; letter-spacing: 0.05em; text-transform: uppercase;">
          Sent automatically from VISTARA STUDIOS inquiry engine
        </p>
      </div>
    `;

    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.log("------------------- MOCK INQUIRY SUBMITTED -------------------");
      console.log(`To: ${process.env.RESEND_TO_EMAIL || "production@vistarastudios.com"}`);
      console.log(`Subject: New Project Inquiry: ${name} [${projectType}]`);
      console.log(`Email Body details:\n`, body);
      console.log("--------------------------------------------------------------");
      
      return NextResponse.json({
        success: true,
        message: "Mock inquiry submission logged to console (No Resend key set).",
      });
    }

    const resend = new Resend(resendApiKey);
    const toEmail = process.env.RESEND_TO_EMAIL || "production@vistarastudios.com";

    const { data, error } = await resend.emails.send({
      from: "Vistara Studios Inquiries <onboarding@resend.dev>",
      to: toEmail,
      subject: `New Project Inquiry: ${name} [${projectType}]`,
      html: emailHtml,
      replyTo: email,
    });

    if (error) {
      console.error("Resend API Failure Error details:", error);
      return NextResponse.json(
        { message: error.message || "Resend service failed to transmit email." },
        { status: 520 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Inquiry successfully submitted to Resend.",
      data,
    });
  } catch (err) {
    const error = err as Error;
    console.error("Booking API route error:", error);
    return NextResponse.json(
      { message: error.message || "Internal server error." },
      { status: 500 }
    );
  }
}
