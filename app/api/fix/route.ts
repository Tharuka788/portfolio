import { NextResponse } from 'next/server';
import dbConnect from "@/lib/db";
import Profile from "@/models/Profile";
import { revalidatePath } from "next/cache";

export async function GET() {
    await dbConnect();

    try {
        await Profile.findOneAndUpdate({}, {
            "socials.linkedin": "https://www.linkedin.com/in/tharuka-umayanga-89998a295",
            "socials.github": "https://github.com/Tharuka788"
        });

        revalidatePath("/");
        revalidatePath("/admin");

        return NextResponse.json({ success: true, message: "Links updated forcefully" });
    } catch (error) {
        return NextResponse.json({ error: "Fix failed" }, { status: 500 });
    }
}
