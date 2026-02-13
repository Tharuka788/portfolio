"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaStar, FaCode } from "react-icons/fa";
import { GITHUB_USERNAME } from "@/lib/constants";

interface Project {
    id: string | number;
    name: string;
    description: string;
    html_url: string;
    stargazers_count?: number;
    language?: string;
    tags?: string[];
    isManual?: boolean;
}

export const Projects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. Fetch GitHub Starred
                const githubRes = await axios.get(`https://api.github.com/users/${GITHUB_USERNAME}/starred?sort=created&direction=desc`);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const githubProjects: Project[] = githubRes.data.slice(0, 3).map((repo: any) => ({
                    id: repo.id,
                    name: repo.name,
                    description: repo.description,
                    html_url: repo.html_url,
                    stargazers_count: repo.stargazers_count,
                    language: repo.language,
                }));

                // 2. Fetch Manual Projects from our API
                const dbRes = await axios.get('/api/projects');
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const dbProjects: Project[] = dbRes.data.map((proj: any) => ({
                    id: proj._id,
                    name: proj.title,
                    description: proj.description,
                    html_url: proj.links.repo, // Default to repo link for main click
                    language: proj.tags[0],
                    tags: proj.tags,
                    isManual: true
                }));

                // Combine: DB projects first, then GitHub
                setProjects([...dbProjects, ...githubProjects]);

            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <section id="projects" className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl md:text-4xl font-bold text-center text-white mb-16"
                >
                    Featured <span className="text-neon-purple">Projects</span>
                </motion.h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {loading ? (
                        Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="h-64 rounded-2xl bg-white/5 animate-pulse"></div>
                        ))
                    ) : (
                        projects.map((repo, idx) => (
                            <motion.div
                                key={repo.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1, duration: 0.5 }}
                                className={`glass p-8 rounded-2xl group hover:-translate-y-2 transition-transform duration-300 relative ${repo.isManual ? 'border-neon-purple/30' : ''}`}
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <FaCode size={80} />
                                </div>

                                <div className="flex justify-between items-start mb-6">
                                    <FaGithub size={30} className="text-neutral-400 group-hover:text-white transition-colors" />
                                    <a
                                        href={repo.html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-neutral-500 hover:text-neon-purple transition-colors"
                                    >
                                        <FaExternalLinkAlt size={20} />
                                    </a>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-neon-purple transition-colors">
                                    {repo.name.replace(/-/g, " ")}
                                </h3>

                                <p className="text-neutral-400 text-sm mb-6 line-clamp-3 h-16">
                                    {repo.description || "No description available."}
                                </p>

                                <a
                                    href={repo.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 mb-4 px-4 py-2 rounded-lg bg-neon-purple/10 border border-neon-purple/50 text-neon-purple hover:bg-neon-purple hover:text-black transition-all duration-300 font-bold w-full"
                                >
                                    <FaGithub /> Get Code
                                </a>

                                <div className="flex items-center justify-between mt-auto">
                                    <span className="text-xs font-semibold text-neon-purple bg-neon-purple/10 px-3 py-1 rounded-full">
                                        {repo.language || repo.tags?.[0] || "Code"}
                                    </span>
                                    {!repo.isManual && (
                                        <div className="flex items-center gap-1 text-neutral-400 text-xs">
                                            <FaStar className="text-yellow-500" />
                                            <span>{repo.stargazers_count}</span>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};
