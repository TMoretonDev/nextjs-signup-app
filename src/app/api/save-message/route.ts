import {createClient} from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
 process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL ?? '',
 process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
)

export async function POST(req: NextRequest, res: NextResponse) {

    const {name, email, message} = await req.json();

    console.log(name, email, message);

try {
    await supabase.from('form-practice-table').insert([{name, email, message}]);

    return NextResponse.json({message: 'Message saved!'});
}

catch(error) {
    return NextResponse.json({error});
}
}
 