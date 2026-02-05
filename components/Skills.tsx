"use client";
import { motion } from "framer-motion";
import {
    SiMongodb, SiPhp, SiMysql, SiReact,
    SiNodedotjs, SiExpress, SiPython, SiHtml5, SiTailwindcss, SiGit
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

const skillsData = [
    {
        category: "Languages & Core",
        items: [
            { name: "Java", icon: <FaJava className="text-red-500" /> },
            { name: "Python", icon: <SiPython className="text-yellow-400" /> },
            { name: "PHP", icon: <SiPhp className="text-indigo-400" /> },
            { name: "HTML5", icon: <SiHtml5 className="text-orange-500" /> },
        ]
    },
    {
        category: "Frameworks & Libraries",
        items: [
            { name: "React", icon: <SiReact className="text-cyan-400" /> },
            { name: "Next.js", icon: <div className="dark:text-white text-black font-bold text-xs">NEXT</div> }, // Placeholder icon or use SiNextdotjs if available
            { name: "Node.js", icon: <SiNodedotjs className="text-green-600" /> },
            { name: "Express.js", icon: <SiExpress className="text-white" /> },
            { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-300" /> },
        ]
    },
    {
        category: "Databases & Tools",
        items: [
            { name: "MongoDB", icon: <SiMongodb className="text-green-500" /> },
            { name: "MySQL", icon: <SiMysql className="text-blue-500" /> },
            { name: "Git", icon: <SiGit className="text-orange-600" /> },
        ]
    }
];

export const Skills = () => {
    return (
        <section id="skills" className="py-20 px-6">
            <div className="max-w-6xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl md:text-4xl font-bold text-center text-white mb-16"
                >
                    My <span className="text-neon-purple">Skills</span>
                </motion.h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {skillsData.map((category, catIdx) => (
                        <motion.div
                            key={category.category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: catIdx * 0.1, duration: 0.5 }}
                            className="bg-neutral-900/50 backdrop-blur-sm p-6 rounded-2xl border border-white/5 hover:border-neon-purple/30 transition-colors"
                        >
                            <h3 className="text-xl font-semibold text-white mb-6 border-b border-white/10 pb-2">
                                {category.category}
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                {category.items.map((skill, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                                        <div className="text-2xl">{skill.icon}</div>
                                        <span className="text-neutral-400 text-sm font-medium">{skill.name}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
