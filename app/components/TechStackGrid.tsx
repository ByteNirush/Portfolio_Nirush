"use client";

import { Skill } from "./portfolioData";

interface TechStackGridProps {
    skills: Skill[];
}

const DUPLICATE_COUNT = 4; // Number of times to duplicate items for seamless marquee
const BASE_ANIMATION_DURATION = 40; // Base duration in seconds
const DURATION_PER_ITEM = 6; // Additional seconds per item
const ODD_ROW_DELAY = 5; // Extra delay for reversed rows

export default function TechStackGrid({ skills }: TechStackGridProps) {
    return (
        <div className="w-full max-w-full mx-auto flex flex-col gap-6 overflow-hidden">
            {skills.map((category, idx) => (
                <div key={category.title} className="space-y-6">
                    <div className="flex items-center gap-3 mb-6 px-4 md:px-0 max-w-6xl mx-auto">
                        <h3 className="text-xl md:text-2xl font-semibold text-gray-200 tracking-wide">
                            {category.title}
                        </h3>
                        <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                    </div>

                    {/* Marquee Container */}
                    <div className="relative w-full overflow-hidden group">
                        {/* Gradient masks for smooth fade effect */}
                        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10 bg-gradient-to-r from-[var(--bg-body)] to-transparent pointer-events-none" />
                        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10 bg-gradient-to-l from-[var(--bg-body)] to-transparent pointer-events-none" />

                        <div
                            className={`flex gap-4 md:gap-6 w-max ${idx % 2 === 0 ? 'animate-marquee' : 'animate-marquee-reverse'}`}
                            style={{
                                animationDuration: `${Math.max(BASE_ANIMATION_DURATION, category.items.length * DURATION_PER_ITEM) + (idx % 2 * ODD_ROW_DELAY)}s`
                            }}
                        >
                            {/* Duplicate items for seamless scrolling effect */}
                            {[...Array(DUPLICATE_COUNT)].map((_, duplicateIndex) => (
                                <div key={duplicateIndex} className="flex gap-4 md:gap-6 shrink-0">
                                    {category.items.map((item, index) => (
                                        <div
                                            key={`${duplicateIndex}-${item.name}`}
                                            className="group/item relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:border-purple-500/30 hover:shadow-[0_0_15px_rgba(168,85,247,0.15)] shrink-0"
                                            role="img"
                                            aria-label={item.name}
                                        >
                                            {/* Icon rendering logic: Image or Font Icon */}
                                            {item.icon.startsWith("/") ? (
                                                <img
                                                    src={item.icon}
                                                    alt={`${item.name} icon`}
                                                    className="w-10 h-10 sm:w-12 sm:h-12 transition-transform duration-300 group-hover/item:scale-110 drop-shadow-lg object-contain"
                                                />
                                            ) : (
                                                <i
                                                    className={`${item.icon} text-3xl sm:text-4xl md:text-5xl transition-transform duration-300 group-hover/item:scale-110 drop-shadow-lg text-gray-100`}
                                                ></i>
                                            )}

                                            {/* Tooltip */}
                                            <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-900/90 text-white text-xs font-medium rounded-md opacity-0 translate-y-2 group-hover/item:opacity-100 group-hover/item:translate-y-0 group-focus/item:opacity-100 group-focus/item:translate-y-0 transition-all duration-300 pointer-events-none whitespace-nowrap border border-white/10 z-20 shadow-xl backdrop-blur-md">
                                                {item.name}
                                            </span>

                                            {/* Subtle shine effect on hover */}
                                            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover/item:opacity-100 pointer-events-none bg-gradient-to-tr from-white/5 to-transparent transition-opacity duration-300" />
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
