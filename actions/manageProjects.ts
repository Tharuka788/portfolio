"use server";
import dbConnect from "@/lib/db";
import Project from "@/models/Project";
import { revalidatePath } from "next/cache";

export async function addProject(formData: FormData) {
    await dbConnect();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const repo = formData.get("repo") as string;
    const demo = formData.get("demo") as string;
    const tags = (formData.get("tags") as string).split(",").map(t => t.trim());

    try {
        await Project.create({
            title,
            description,
            tags,
            links: { repo, demo },
            featured: true
        });
        revalidatePath("/");
        revalidatePath("/admin");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to add project" };
    }
}

export async function deleteProject(id: string) {
    await dbConnect();
    try {
        await Project.findByIdAndDelete(id);
        revalidatePath("/");
        revalidatePath("/admin");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to delete project" };
    }
}
