"use server";
import dbConnect from "@/lib/db";
import Profile from "@/models/Profile";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData: FormData) {
    await dbConnect();

    const name = formData.get("name") as string;
    const bio = formData.get("bio") as string;
    const profileImage = formData.get("profileImage") as string;
    const role = (formData.get("role") as string)?.split(",").map(r => r.trim()); // Parse role
    const github = formData.get("github") as string;
    const linkedin = formData.get("linkedin") as string;
    const email = formData.get("email") as string;
    const mobile = formData.get("mobile") as string;
    const resumeLink = formData.get("resumeLink") as string;

    console.log("Update Profile Request:", { name, email, github, linkedin, role, mobile });

    try {
        // Find the first profile and update it
        // Note: We use upsert to create if not exists
        await Profile.findOneAndUpdate(
            {},
            {
                name,
                role: role.length > 0 && role[0] !== "" ? role : ["Full Stack Developer"],
                bio,
                profileImage,
                resumeLink,
                "socials.github": github,
                "socials.linkedin": linkedin,
                "socials.email": email,
                "socials.mobile": mobile
            },
            { upsert: true, new: true }
        );

        revalidatePath("/");     // Update Home Page
        revalidatePath("/admin"); // Update Admin Dashboard

        return { success: true };
    } catch (error) {
        console.error("Profile update error:", error);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const errorMessage = (error as any)?.message || "Failed to update profile";
        return { success: false, error: errorMessage };
    }
}
