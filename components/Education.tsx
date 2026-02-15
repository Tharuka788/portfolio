"use client";
import { motion } from "framer-motion";
import { FaGraduationCap, FaSchool } from "react-icons/fa";

const educationData = [
    {
        id: 1,
        title: "IT Undergraduate",
        institution: "Sri Lanka Institute of Information Technology (SLIIT)",
        period: "Present",
        description: "Pursuing a degree in Information Technology, focusing on software engineering and full-stack development.",
        icon: <FaGraduationCap className="text-neon-purple text-3xl" />,
    },
    {
        id: 2,
        title: "G.C.E Advanced Level",
        institution: "B/Dharmadutha National College",
        period: "Commerce Stream",
        description: "Completed G.C.E Advanced Level examination in the Commerce stream with successful results.",
        icon: <FaSchool className="text-teal-400 text-3xl" />,
    },
];

export const Education = () => {
    return (
        <section id="education" className="py-20 px-6 relative">
            <div className="max-w-6xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl md:text-4xl font-bold text-center text-white mb-16"
                >
                    My <span className="text-neon-purple">Education</span>
                </motion.h2>

                <div className="relative">
                    {/* Vertical Line for Desktop */}
                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-white/10 rounded-full"></div>

                    <div className="space-y-12">
                        {educationData.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2, duration: 0.5 }}
                                className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                    }`}
                            >
                                {/* Content Card */}
                                <div className="flex-1 w-full">
                                    <div className="bg-neutral-900/50 backdrop-blur-sm p-8 rounded-2xl border border-white/5 hover:border-neon-purple/30 transition-all group relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-24 h-24 bg-neon-purple/5 rounded-full blur-2xl -z-10 group-hover:bg-neon-purple/10 transition-colors"></div>

                                        <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                        <h4 className="text-neon-purple font-medium mb-1">{item.institution}</h4>
                                        <span className="text-sm text-neutral-400 block mb-4">{item.period}</span>
                                        <p className="text-neutral-300 leading-relaxed text-sm">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Timeline Dot */}
                                <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-neutral-900 border-4 border-neon-purple shadow-[0_0_15px_rgba(168,85,247,0.4)] shrink-0">
                                    {item.icon}
                                </div>

                                {/* Spacer for opposite side */}
                                <div className="flex-1 w-full hidden md:block"></div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
