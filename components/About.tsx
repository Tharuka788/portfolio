"use client";
import { motion } from "framer-motion";

interface AboutProps {
    profile: {
        bio: string;
    } | null;
}

export const About = ({ profile }: AboutProps) => {
    // If we want to split the bio from DB dynamically, we might need a richer structure or just display it.
    // For now, let's just show the DB bio if exists, else fallback.
    const bioText = profile?.bio || "I am a 3rd Year IT Undergraduate at SLIIT with a strong foundation in software engineering principles. My journey involves exploring diverse technologies, from building robust backends with Node.js and Java to crafting immersive frontends using React and Next.js.";

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

                    <p className="text-lg text-neutral-300 leading-relaxed mb-6">
                        {bioText}
                    </p>
                    <p className="text-lg text-neutral-300 leading-relaxed">
                        I thrive on solving complex problems and am constantly learning to stay ahead in the fast-evolving tech landscape. My goal is to contribute to impactful projects that make a difference.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};
