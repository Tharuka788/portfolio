"use client";
import { updateProfile } from "@/actions/updateProfile";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface ProfileFormProps {
    profile: any; // We can be loose with types here for admin convenience
}

export default function ProfileForm({ profile }: ProfileFormProps) {
    const [msg, setMsg] = useState("");
    const router = useRouter();

    const handleUpdate = async (formData: FormData) => {
        setMsg("Saving...");
        const res = await updateProfile(formData);
        if (res.success) {
            setMsg("Profile Updated Successfully! ✅");
            router.refresh(); // Force UI update to show new values in fields
        } else {
            setMsg(`Error: ${res.error || "Failed"} ❌`);
        }
        setTimeout(() => setMsg(""), 5000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-8 rounded-2xl"
        >
            <h2 className="text-2xl font-bold text-white mb-6">Edit Profile</h2>
            <form action={handleUpdate} className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-neutral-400 mb-2">Name</label>
                    <input name="name" defaultValue={profile?.name} className="w-full bg-black/40 border border-white/10 p-3 rounded text-white" />
                </div>
                <div>
                    <label className="block text-neutral-400 mb-2">Role (Comma separated)</label>
                    <input name="role" defaultValue={profile?.role?.join(", ")} className="w-full bg-black/40 border border-white/10 p-3 rounded text-white" />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-neutral-400 mb-2">Profile Image (URL)</label>
                    <input name="profileImage" defaultValue={profile?.profileImage} placeholder="https://..." className="w-full bg-black/40 border border-white/10 p-3 rounded text-white" />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-neutral-400 mb-2">Bio</label>
                    <textarea name="bio" rows={4} defaultValue={profile?.bio} className="w-full bg-black/40 border border-white/10 p-3 rounded text-white" />
                </div>
                <div>
                    <label className="block text-neutral-400 mb-2">Resume Link (URL/Path)</label>
                    <input name="resumeLink" defaultValue={profile?.resumeLink} className="w-full bg-black/40 border border-white/10 p-3 rounded text-white" />
                </div>
                <div>
                    <label className="block text-neutral-400 mb-2">Email</label>
                    <input name="email" defaultValue={profile?.socials?.email} className="w-full bg-black/40 border border-white/10 p-3 rounded text-white" />
                </div>
                <div>
                    <label className="block text-neutral-400 mb-2">GitHub URL</label>
                    <input name="github" defaultValue={profile?.socials?.github} className="w-full bg-black/40 border border-white/10 p-3 rounded text-white" />
                </div>
                <div>
                    <label className="block text-neutral-400 mb-2">LinkedIn URL</label>
                    <input name="linkedin" defaultValue={profile?.socials?.linkedin} className="w-full bg-black/40 border border-white/10 p-3 rounded text-white" />
                </div>

                <div className="md:col-span-2 mt-4">
                    <button type="submit" className="bg-neon-purple text-black font-bold py-3 px-8 rounded-lg hover:bg-purple-400 transition-colors w-full md:w-auto">
                        Save Changes
                    </button>
                    {msg && <span className={`ml-4 font-medium ${msg.includes("Error") ? "text-red-500" : "text-green-500"}`}>{msg}</span>}
                </div>
            </form>
        </motion.div>
    );
}
