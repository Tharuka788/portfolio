import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Profile from '@/models/Profile';
import Project from '@/models/Project';

export async function GET() {
    await dbConnect();

    try {
        // 1. Seed Profile
        await Profile.deleteMany({});
        await Profile.create({
            name: "Tharuka Umayanga",
            role: ["Full Stack Developer", "IT Undergraduate"],
            bio: "A passionate Full Stack Developer and IT Undergraduate crafting high-end digital experiences with modern technologies.",
            profileImage: "", // Leave empty for placeholder logic or update later
            resumeLink: "/cv.pdf",
            socials: {
                github: "https://github.com/Tharuka788",
                linkedin: "https://www.linkedin.com/in/tharuka-umayanga-89998a295",
                email: "tharuka@example.com",
            }
        });

        // 2. Seed Projects (Optional manual projects to complement GitHub API)
        await Project.deleteMany({});
        await Project.create([
            {
                title: "Portfolio V1",
                description: "My first portfolio website built with HTML and CSS.",
                image: "",
                tags: ["HTML", "CSS", "JavaScript"],
                links: {
                    repo: "https://github.com/Tharuka788/portfolio-v1"
                },
                featured: false
            }
        ]);

        return NextResponse.json({ message: "Database seeded successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Seeding failed", details: error }, { status: 500 });
    }
}
