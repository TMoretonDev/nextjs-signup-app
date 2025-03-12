import {createClient} from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY ?? '')

export async function POST(req: NextRequest, res: NextResponse) {

    const {name, email, message} = await req.json();

try {
    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Message received',
        text: `Hi ${name}, we have received your message: ${message}`
    })

    return NextResponse.json({message: 'Email sent'});
}

catch(error) {
    return NextResponse.json({error});
}
}
 