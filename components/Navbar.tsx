"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { GITHUB_USERNAME, NAV_LINKS } from '@/lib/constants';

export const Navbar = () => {
    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 w-full z-50 px-6 py-4 glass border-b border-white/5"
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <a href="#home" className="text-xl font-bold text-white hover:text-neon-purple transition-colors">
                    Tharuka Umayanga
                </a>

                <div className="hidden md:flex gap-8">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-neutral-400 hover:text-white transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full" />
                        </a>
                    ))}
                </div>

                <a
                    href="#contact"
                    className="md:hidden text-sm font-medium text-neon-purple"
                >
                    Contact
                </a>
            </div>
        </motion.nav>
    );
};
