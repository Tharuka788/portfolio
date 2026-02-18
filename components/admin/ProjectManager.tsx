"use client";
import { addProject, deleteProject, updateProject } from "@/actions/manageProjects";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FaTrash, FaPlus, FaEdit, FaTimes } from "react-icons/fa";

interface ProjectManagerProps {
    projects: any[];
}

export default function ProjectManager({ projects }: ProjectManagerProps) {
    // Optimistic UI updates could be added here, but for simplicity relying on server revalidate
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [editingProject, setEditingProject] = useState<any>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (formData: FormData) => {
        if (editingProject) {
            const res = await updateProject(editingProject._id, formData);
            if (res.success) {
                setEditingProject(null);
                formRef.current?.reset();
            } else {
                alert("Failed to update project");
            }
        } else {
            const res = await addProject(formData);
            if (res.success) {
                formRef.current?.reset();
            } else {
                alert("Failed to add project");
            }
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleEdit = (project: any) => {
        setEditingProject(project);
        if (formRef.current) {
            const form = formRef.current;
            (form.elements.namedItem('title') as HTMLInputElement).value = project.title;
            (form.elements.namedItem('tags') as HTMLInputElement).value = project.tags.join(', ');
            (form.elements.namedItem('repo') as HTMLInputElement).value = project.links.repo;
            (form.elements.namedItem('demo') as HTMLInputElement).value = project.links.demo || '';
            (form.elements.namedItem('figma') as HTMLInputElement).value = project.links.figma || '';
            (form.elements.namedItem('image') as HTMLInputElement).value = project.image || '';
            (form.elements.namedItem('description') as HTMLTextAreaElement).value = project.description;
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancel = () => {
        setEditingProject(null);
        formRef.current?.reset();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass p-8 rounded-2xl"
        >
            <h2 className="text-2xl font-bold text-white mb-6">Manage Projects</h2>

            {/* Add/Edit Project Form */}
            <form ref={formRef} action={handleSubmit} className="mb-12 bg-white/5 p-6 rounded-xl border border-white/10">
                <h3 className="text-lg font-semibold text-neon-purple mb-4 flex items-center gap-2">
                    {editingProject ? <><FaEdit /> Edit Project</> : <><FaPlus /> Add New</>}
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                    <input name="title" placeholder="Project Title" required className="w-full bg-black/40 border border-white/10 p-3 rounded text-white" />
                    <input name="tags" placeholder="Tags (comma separated: React, Node)" required className="w-full bg-black/40 border border-white/10 p-3 rounded text-white" />
                    <input name="repo" placeholder="GitHub Repo URL" required className="w-full bg-black/40 border border-white/10 p-3 rounded text-white" />
                    <input name="demo" placeholder="Live Demo URL (Optional)" className="w-full bg-black/40 border border-white/10 p-3 rounded text-white" />
                    <input name="figma" placeholder="Figma Design URL (Optional)" className="w-full bg-black/40 border border-white/10 p-3 rounded text-white" />
                    <input name="image" placeholder="Image Path (e.g. /camping_store.png)" className="w-full bg-black/40 border border-white/10 p-3 rounded text-white" />
                    <textarea name="description" placeholder="Description" rows={2} required className="md:col-span-2 w-full bg-black/40 border border-white/10 p-3 rounded text-white" />
                </div>
                <div className="flex gap-4 mt-4">
                    <button type="submit" className={`font-bold py-2 px-6 rounded transition-colors ${editingProject ? 'bg-yellow-500 text-black hover:bg-yellow-400' : 'bg-teal-500 text-black hover:bg-teal-400'}`}>
                        {editingProject ? 'Update Project' : 'Add Project'}
                    </button>
                    {editingProject && (
                        <button type="button" onClick={handleCancel} className="bg-neutral-600 text-white font-bold py-2 px-6 rounded hover:bg-neutral-500 transition-colors flex items-center gap-2">
                            <FaTimes /> Cancel
                        </button>
                    )}
                </div>
            </form>

            {/* List Existing Projects */}
            <div className="space-y-4">
                {projects.map((project: any) => (
                    <div key={project._id} className="flex items-center justify-between bg-black/40 p-4 rounded-xl border border-white/5">
                        <div>
                            <h4 className="font-bold text-white">{project.title}</h4>
                            <p className="text-xs text-neutral-400">{project.description?.substring(0, 50)}...</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleEdit(project)}
                                className="bg-yellow-500/20 text-yellow-500 p-2 rounded hover:bg-yellow-500 hover:text-black transition-colors"
                            >
                                <FaEdit />
                            </button>
                            <button
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                onClick={async () => await deleteProject(project._id as any)}
                                className="bg-red-500/20 text-red-500 p-2 rounded hover:bg-red-500 hover:text-white transition-colors"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}
                {projects.length === 0 && <p className="text-neutral-500 italic">No manual projects added yet.</p>}
            </div>
        </motion.div >
    );
}
