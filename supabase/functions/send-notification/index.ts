
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  emails: string[];
  subject: string;
  html: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Received request to send-notification function");
    const { emails, subject, html } = await req.json() as EmailRequest;
    
    console.log(`Request data: ${emails.length} recipients, subject: ${subject}`);

    if (!emails || emails.length === 0) {
      return new Response(
        JSON.stringify({ error: "No recipient emails provided" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Verify Resend API key is loaded
    const apiKey = Deno.env.get("RESEND_API_KEY");
    if (!apiKey) {
      console.error("RESEND_API_KEY environment variable is not set");
      return new Response(
        JSON.stringify({ error: "Email service configuration error" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
    
    console.log(`Using Resend API key: ${apiKey.substring(0, 5)}...`);

    // Send to each email in batches of 50 to prevent timeouts
    const batchSize = 50;
    const results = [];

    for (let i = 0; i < emails.length; i += batchSize) {
      const batch = emails.slice(i, i + batchSize);
      
      console.log(`Sending batch ${i / batchSize + 1} to ${batch.length} recipients`);
      
      // Use BCC to hide other recipients' emails
      try {
        const emailResponse = await resend.emails.send({
          from: "FLY BOY <info@flyboy.com>", // Update with your verified domain
          bcc: batch,
          subject,
          html,
        });
        
        results.push(emailResponse);
        console.log(`Sent batch ${i / batchSize + 1} successfully, response:`, emailResponse);
      } catch (error) {
        console.error(`Error sending batch ${i / batchSize + 1}:`, error);
        throw error;
      }
    }

    return new Response(
      JSON.stringify({ message: "Emails sent successfully", results }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error in send-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
