"use client";
import { motion } from "framer-motion";
import { FaPlay } from 'react-icons/fa';

interface HeroProps {
    profile: {
        name: string;
        role: string[];
        bio: string;
        profileImage: string;
        resumeLink: string;
    } | null;
}

export const Hero = ({ profile }: HeroProps) => {
    const name = profile?.name || "Tharuka Umayanga";
    const bio = profile?.bio || "A passionate Full Stack Developer and IT Undergraduate.";
    const profileImage = profile?.profileImage || "/profile.jpg"; // Placeholder if empty
    const resumeLink = profile?.resumeLink || "/cv.pdf";

    return (
        <section id="home" className="h-[100vh] w-full grid md:grid-cols-[40%_60%] bg-[#050505] overflow-hidden">
            {/* Left Side: Full Height Image */}
            <div className="relative h-full w-full hidden md:block">
                {profile?.profileImage ? (
                    <img
                        src={profileImage}
                        alt={name}
                        className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
                    />
                ) : (
                    <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
                        <span className="text-neutral-700 font-bold text-2xl">No Image</span>
                    </div>
                )}
                {/* Overlay for text readability if needed, though split screen usually keeps them separate. 
                    Let's add a subtle vignette. */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/0 to-[#050505]/10 pointer-events-none"></div>
            </div>

            {/* Right Side: Content */}
            <div className="flex flex-col justify-center px-8 md:px-24 text-white relative z-10 pt-20 md:pt-0">
                {/* Mobile Image (Visible only on small screens) */}
                <div className="md:hidden w-32 h-32 rounded-full overflow-hidden mb-8 border-2 border-white/20 mx-auto">
                    <img src={profileImage} className="w-full h-full object-cover" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h3 className="text-lg md:text-xl font-medium tracking-widest text-neutral-400 mb-4 uppercase">
                        {name}
                    </h3>

                    <h1 className="text-5xl md:text-8xl font-bold leading-tight mb-8">
                        My <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">
                            Portfolio
                        </span>
                    </h1>

                    <div className="w-24 h-1 bg-white mb-10"></div>

                    <p className="text-lg text-neutral-400 max-w-md mb-12 leading-relaxed">
                        {bio}
                    </p>

                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <a
                            href="#projects"
                            className="bg-white text-black px-10 py-4 font-bold text-lg hover:bg-neutral-200 transition-colors w-full md:w-auto text-center"
                        >
                            Explore Now
                        </a>

                        <a
                            href={resumeLink}
                            target="_blank"
                            className="flex items-center gap-4 group cursor-pointer"
                        >
                            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white transition-colors">
                                <FaPlay className="ml-1 text-white group-hover:scale-110 transition-transform" size={14} />
                            </div>
                            <span className="font-medium text-neutral-300 group-hover:text-white transition-colors">
                                View Resume
                            </span>
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
