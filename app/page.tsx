import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import dbConnect from "@/lib/db";

export const dynamic = "force-dynamic";
import Profile from "@/models/Profile";

async function getProfile() {
  await dbConnect();
  const profile = await Profile.findOne({});
  // Convert mongoose doc to plain object to pass as props (serialization)
  return profile ? JSON.parse(JSON.stringify(profile)) : null;
}

export default async function Home() {
  const profile = await getProfile();
  console.log("HOME PAGE PROFILE DATA:", JSON.stringify(profile?.socials, null, 2));

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-[128px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-400/10 rounded-full blur-[128px]"></div>
      </div>

      <Navbar />

      <div className="flex flex-col space-y-0">
        <Hero profile={profile} />
        <About profile={profile} />
        <Skills />
        <Projects />
        <Contact profile={profile} />
      </div>
    </main>
  );
}
