"use client";
import React from "react";
import { motion } from "motion/react";

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Array<{
    text: string;
    image: string;
    name: string;
    role: string;
  }>;
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-4 sm:gap-6 pb-4 sm:pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div
                  className="p-5 sm:p-6 rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl max-w-[280px] w-full group hover:border-white/20 transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] relative overflow-hidden"
                  key={i}
                >
                  <div className="text-white/80 text-xs leading-relaxed relative z-10">{text}</div>
                  <div className="flex items-center gap-2.5 mt-4 relative z-10">
                    <img
                      width={36}
                      height={36}
                      src={image}
                      alt={name}
                      className="h-9 w-9 rounded-full object-cover grayscale"
                    />
                    <div className="flex flex-col">
                      <div className="text-white font-medium tracking-tight leading-5 text-xs">
                        {name}
                      </div>
                      <div className="leading-5 text-white/50 tracking-tight text-[10px]">
                        {role}
                      </div>
                    </div>
                  </div>
                  
                  {/* Hover Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
                  
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 rounded-2xl" />
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};