
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

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
    
    // Fixed API key - hardcoded from config
    const apiKey = "re_EwjDpEYx_2CU8Ezj8VRNgwSxRLiXxs8f3";
    
    if (!apiKey) {
      console.error("API key is missing");
      return new Response(
        JSON.stringify({ error: "Email service configuration error - API key missing" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
    
    console.log("Initializing Resend client with API key");
    const resend = new Resend(apiKey);
    
    // Parse request body
    const requestData = await req.json() as EmailRequest;
    const { emails, subject, html } = requestData;
    
    console.log(`Request data: ${emails?.length || 0} recipients, subject: ${subject}`);

    if (!emails || emails.length === 0) {
      return new Response(
        JSON.stringify({ error: "No recipient emails provided" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (!subject) {
      return new Response(
        JSON.stringify({ error: "Subject is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (!html) {
      return new Response(
        JSON.stringify({ error: "Email content (html) is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Send to each email in batches of 25 to prevent timeouts
    const batchSize = 25;
    const results = [];
    const errors = [];

    for (let i = 0; i < emails.length; i += batchSize) {
      const batch = emails.slice(i, i + batchSize);
      
      console.log(`Sending batch ${i / batchSize + 1} to ${batch.length} recipients`);
      
      try {
        console.log("About to send email with Resend");
        const emailResponse = await resend.emails.send({
          from: "FLY BOY <onboarding@resend.dev>", // Using Resend's default domain for now
          bcc: batch,
          subject,
          html,
        });
        
        results.push(emailResponse);
        console.log(`Sent batch ${i / batchSize + 1} successfully, response:`, emailResponse);
      } catch (error) {
        console.error(`Error sending batch ${i / batchSize + 1}:`, error);
        errors.push({
          batch: i / batchSize + 1, 
          error: error instanceof Error ? error.message : String(error)
        });
      }
    }

    if (errors.length > 0 && results.length === 0) {
      // All batches failed
      return new Response(
        JSON.stringify({ error: "Failed to send all emails", details: errors }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    return new Response(
      JSON.stringify({ 
        message: `Emails sent successfully: ${results.length * batchSize} of ${emails.length}`,
        results,
        errors: errors.length > 0 ? errors : undefined
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error in send-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Unknown error occurred" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
