
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
    const { emails, subject, html } = await req.json() as EmailRequest;

    if (!emails || emails.length === 0) {
      return new Response(
        JSON.stringify({ error: "No recipient emails provided" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Send to each email in batches of 50 to prevent timeouts
    const batchSize = 50;
    const results = [];

    for (let i = 0; i < emails.length; i += batchSize) {
      const batch = emails.slice(i, i + batchSize);
      
      // Use BCC to hide other recipients' emails
      const emailResponse = await resend.emails.send({
        from: "FLY BOY <info@flyboy.com>", // Update with your verified domain
        bcc: batch,
        subject,
        html,
      });
      
      results.push(emailResponse);
      console.log(`Sent batch ${i / batchSize + 1} to ${batch.length} recipients`);
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
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

serve(handler);
