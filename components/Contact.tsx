"use client";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";
import { sendEmail } from "@/actions/sendEmail";
import { useState, useRef } from "react";

interface ContactProps {
    profile: {
        socials: {
            email: string;
            linkedin: string;
            github: string;
            mobile?: string;
        }
    } | null;
}

export const Contact = ({ profile }: ContactProps) => {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const formRef = useRef<HTMLFormElement>(null);

    const email = profile?.socials?.email || "tharuka@example.com";
    const linkedin = profile?.socials?.linkedin || "https://www.linkedin.com/in/tharuka-umayanga-89998a295";
    const github = profile?.socials?.github || "https://github.com/Tharuka788";
    const mobile = profile?.socials?.mobile;

    const handleSubmit = async (formData: FormData) => {
        setStatus("loading");
        const res = await sendEmail(formData);

        if (res.success) {
            setStatus("success");
            formRef.current?.reset();
        } else {
            setStatus("error");
        }

        setTimeout(() => setStatus("idle"), 3000);
    };

    return (
        <section id="contact" className="py-20 px-6 bg-gradient-to-b from-transparent to-black">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">

                {/* Contact Info */}
                <div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-4xl font-bold text-white mb-6"
                    >
                        Let&apos;s <span className="text-neon-purple">Connect</span>
                    </motion.h2>
                    <p className="text-neutral-400 mb-12 text-lg">
                        I&apos;m currently looking for new opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4 text-neutral-300">
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-neon-purple">
                                <FaEnvelope size={20} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-white">Email</h4>
                                <a href={`mailto:${email}`} className="hover:text-neon-purple transition-colors">{email}</a>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-neutral-300">
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-neon-purple">
                                <FaLinkedin size={20} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-white">LinkedIn</h4>
                                <a href={linkedin} target="_blank" className="hover:text-neon-purple transition-colors">Tharuka Umayanga</a>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-neutral-300">
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-neon-purple">
                                <FaGithub size={20} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-white">GitHub</h4>
                                <a href={github} target="_blank" className="hover:text-neon-purple transition-colors">Tharuka788</a>
                            </div>
                        </div>
                        {mobile && (
                            <div className="flex items-center gap-4 text-neutral-300">
                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-neon-purple">
                                    <FaPhone size={20} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-white">Phone</h4>
                                    <a href={`tel:${mobile}`} className="hover:text-neon-purple transition-colors">{mobile}</a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Contact Form */}
                <motion.form
                    action={handleSubmit}
                    ref={formRef}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="glass p-8 rounded-2xl space-y-6"
                >
                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2">Name</label>
                        <input name="name" type="text" required className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-neon-purple transition-colors" placeholder="name" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2">Email</label>
                        <input name="email" type="email" required className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-neon-purple transition-colors" placeholder="name@gmail.com" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2">Message</label>
                        <textarea name="message" rows={4} required className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-neon-purple transition-colors" placeholder="Your message..."></textarea>
                    </div>
                    <button
                        type="submit"
                        disabled={status === "loading"}
                        className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-neon-purple transition-colors disabled:opacity-50"
                    >
                        {status === "loading" ? "Sending..." : status === "success" ? "Message Sent!" : status === "error" ? "Failed to Send" : "Send Message"}
                    </button>
                </motion.form>
            </div>

            <footer className="mt-20 text-center text-neutral-600 text-sm border-t border-white/5 pt-8">
                <p>© {new Date().getFullYear()} Tharuka Umayanga. Built with Next.js & Tailwind CSS.</p>
            </footer>
        </section>
    );
};
