import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const body = await request.json();
    const { password } = body;

    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

    if (password === ADMIN_PASSWORD) {
        const response = NextResponse.json({ success: true });

        // Set a cookie
        response.cookies.set('admin_session', password, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24, // 1 day
        });

        return response;
    }

    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
}
