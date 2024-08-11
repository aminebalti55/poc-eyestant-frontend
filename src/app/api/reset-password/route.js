import { NextResponse } from 'next/server';

export async function POST(request) {
  const { code, password } = await request.json();

  console.log('Password reset request:', { code, password });

  try {
    const strapiRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code,
        password,
        passwordConfirmation: password, 
      }),
    });

    const data = await strapiRes.json();

    console.log('Strapi response:', data);

    if (strapiRes.ok) {
      return NextResponse.json(data);
    } else {
      return NextResponse.json({ error: data.error?.message || 'Password reset failed' }, { status: strapiRes.status });
    }
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Something went wrong. Please try again later.' }, { status: 500 });
  }
}