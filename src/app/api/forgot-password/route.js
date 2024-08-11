import { NextResponse } from 'next/server';

export async function POST(request) {
    const { email } = await request.json();

    console.log('Password reset request for:', email);
    console.log('Strapi URL:', `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/forgot-password`);

    try {
        const strapiRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        console.log('Strapi response status:', strapiRes.status);

        const data = await strapiRes.json();
        console.log('Strapi response data:', data);

        if (strapiRes.ok) {
            return NextResponse.json({ message: 'Password reset email sent.' });
        } else {
            return NextResponse.json({ error: data.error || 'Password reset failed' }, { status: strapiRes.status });
        }
    } catch (error) {
        console.error('Server error:', error);
        return NextResponse.json({ error: 'Something went wrong. Please try again later.' }, { status: 500 });
    }
}
