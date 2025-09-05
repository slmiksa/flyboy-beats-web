import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Create Supabase client with service role key for admin operations
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { username, password } = await req.json()

    if (!username || !password) {
      return new Response(
        JSON.stringify({ success: false, error: 'اسم المستخدم وكلمة المرور مطلوبان' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    console.log(`Login attempt for username: ${username}`)

    // Get admin user from database
    const { data: adminUser, error: fetchError } = await supabaseAdmin
      .from('admin_users')
      .select('*')
      .eq('username', username)
      .single()

    if (fetchError || !adminUser) {
      console.log(`User not found: ${username}`)
      return new Response(
        JSON.stringify({ success: false, error: 'اسم المستخدم غير موجود' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      )
    }

    // Verify password using the database function
    const { data: isValidPassword, error: verifyError } = await supabaseAdmin
      .rpc('verify_password', {
        password: password,
        hash: adminUser.password
      })

    if (verifyError) {
      console.error('Password verification error:', verifyError)
      return new Response(
        JSON.stringify({ success: false, error: 'حدث خطأ في التحقق من كلمة المرور' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    if (!isValidPassword) {
      console.log(`Invalid password for user: ${username}`)
      return new Response(
        JSON.stringify({ success: false, error: 'كلمة المرور غير صحيحة' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      )
    }

    // Generate a simple session token
    const sessionToken = crypto.randomUUID()
    
    console.log(`Login successful for user: ${username}`)

    return new Response(
      JSON.stringify({
        success: true,
        sessionToken: sessionToken,
        isSuperAdmin: adminUser.is_super_admin || false
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Login function error:', error)
    return new Response(
      JSON.stringify({ success: false, error: 'حدث خطأ غير متوقع' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})