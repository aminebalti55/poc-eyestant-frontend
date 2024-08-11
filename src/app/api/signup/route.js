import { NextResponse } from 'next/server';

export async function POST(request) {
  const { username, email, password } = await request.json();

  console.log('Signup attempt for:', email);
  console.log('Strapi URL:', `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local/register`);

  try {
    const strapiRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    console.log('Strapi response status:', strapiRes.status);
    console.log('Strapi response headers:', Object.fromEntries(strapiRes.headers.entries()));

    const contentType = strapiRes.headers.get("content-type");
    console.log('Content-Type:', contentType);

    if (contentType && contentType.indexOf("application/json") !== -1) {
      const data = await strapiRes.json();
      console.log('Strapi response data:', data);

      if (strapiRes.ok) {
        return NextResponse.json(data);
      } else {
        return NextResponse.json({ error: data.error || 'Registration failed' }, { status: strapiRes.status });
      }
    } else {
      const text = await strapiRes.text();
      console.error('Non-JSON response:', text);
      return NextResponse.json({ error: 'Invalid server response' }, { status: 500 });
    }
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Something went wrong. Please try again later.' }, { status: 500 });
  }
}
