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
    const figma = formData.get("figma") as string;
    const image = formData.get("image") as string;
    const tags = (formData.get("tags") as string).split(",").map(t => t.trim());

    try {
        await Project.create({
            title,
            description,
            tags,
            image: image || '/project-placeholder.jpg',
            links: { repo, demo, figma },
            featured: true
        });
        revalidatePath("/");
        revalidatePath("/admin");
        return { success: true };
    } catch (error) {
        console.error("Add Project Error:", error);
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
        console.error("Delete Project Error:", error);
        return { success: false, error: "Failed to delete project" };
    }
}

export async function updateProject(id: string, formData: FormData) {
    await dbConnect();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const repo = formData.get("repo") as string;
    const demo = formData.get("demo") as string;
    const figma = formData.get("figma") as string;
    const image = formData.get("image") as string;
    const tags = (formData.get("tags") as string).split(",").map(t => t.trim());

    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const updateData: any = {
            title,
            description,
            tags,
            links: { repo, demo, figma }
        };

        if (image) {
            updateData.image = image;
        }

        await Project.findByIdAndUpdate(id, updateData);
        revalidatePath("/");
        revalidatePath("/admin");
        return { success: true };
    } catch (error) {
        console.error("Update Project Error:", error);
        return { success: false, error: "Failed to update project" };
    }
}
