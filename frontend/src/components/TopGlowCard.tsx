import React from "react";

type GlowGlassCardProps = {
  children: React.ReactNode;
  className?: string;
};

const GlowGlassCard: React.FC<GlowGlassCardProps> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`relative rounded-xl border border-white/10 text-white overflow-hidden 
        bg-white/5 backdrop-blur-md p-6 
        shadow-[inset_1px_1px_2px_rgba(255,255,255,0.05),_8px_8px_30px_rgba(0,0,0,0.4)]
        transition-all duration-300
        ${className}`}
      style={{ boxShadow: "0 0 12px rgba(255, 255, 255, 0.1)" }}
    >
      {/* Subtle top white glow */}
      <div className="absolute top-0 left-0 w-full h-[35%] bg-gradient-to-b from-white/15 via-white/5 to-transparent z-0 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default GlowGlassCard;
