import dbConnect from "@/lib/db";
import Profile from "@/models/Profile";
import Project from "@/models/Project";
import ProfileForm from "@/components/admin/ProfileForm";
import ProjectManager from "@/components/admin/ProjectManager";

export const dynamic = "force-dynamic";

async function getData() {
    await dbConnect();
    const profile = await Profile.findOne({});
    const projects = await Project.find({}).sort({ createdAt: -1 });

    return {
        profile: profile ? JSON.parse(JSON.stringify(profile)) : {},
        projects: projects ? JSON.parse(JSON.stringify(projects)) : []
    };
}

export default async function AdminDashboard() {
    const { profile, projects } = await getData();

    return (
        <div className="min-h-screen pt-20 px-6 bg-deep-dark pb-20">
            <div className="max-w-6xl mx-auto space-y-12">
                <div className="flex justify-between items-center">
                    <h1 className="text-4xl font-bold text-white">Admin <span className="text-neon-purple">Dashboard</span></h1>
                    <a href="/" target="_blank" className="text-neutral-400 hover:text-white underline">View Site</a>
                </div>

                {/* Profile Editor */}
                <ProfileForm profile={profile} />

                {/* Project Manager */}
                <ProjectManager projects={projects} />
            </div>
        </div>
    );
}
