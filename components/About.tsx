"use client";
import { motion } from "framer-motion";

interface AboutProps {
    profile: {
        bio: string;
    } | null;
}

export const About = ({ profile }: AboutProps) => {


    return (
        <section id="about" className="py-20 px-6 bg-dark-gray/30">
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl md:text-4xl font-bold text-white mb-8"
                >
                    About <span className="text-neon-purple">Me</span>
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="glass p-8 rounded-2xl md:p-12 relative overflow-hidden"
                >
                    {/* Decorative Blob */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-neon-purple/10 rounded-full blur-3xl -z-10"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-400/10 rounded-full blur-3xl -z-10"></div>

                    <div className="space-y-6 text-lg text-neutral-300 leading-relaxed text-left">
                        <p>
                            Hi, I’m Tharuka Umayanga — a passionate IT undergraduate and aspiring Full-Stack MERN Developer who enjoys turning ideas into interactive digital experiences.
                        </p>
                        <p>
                            I love building applications from the ground up — from designing clean user interfaces in Figma to developing powerful backend systems using MongoDB, Express, React, and Node.js. For me, coding is not just about writing functions; it’s about solving problems, creating smooth user experiences, and building technology that people actually enjoy using.
                        </p>
                        <p>
                            My journey in software development has allowed me to explore multiple technologies including Java, Android development, PHP, MySQL, JavaScript, HTML, and Tailwind CSS, helping me understand both the technical and creative sides of development.
                        </p>
                        <p>
                            I’m constantly learning, experimenting, and improving my skills with the goal of becoming a developer who builds efficient, scalable, and meaningful software solutions. Every project I work on is another step toward transforming creativity into real-world impact.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
