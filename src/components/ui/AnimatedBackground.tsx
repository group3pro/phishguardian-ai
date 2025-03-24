
import React from "react";

interface AnimatedBackgroundProps {
  className?: string;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ className = "" }) => {
  return (
    <div
      className={`absolute inset-0 -z-10 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-50/20 to-blue-100/10 dark:from-blue-950/20 dark:to-blue-900/10" />
      
      <div className="absolute w-[50%] aspect-square rounded-full opacity-20 bg-gradient-to-r from-blue-200 to-blue-400 dark:from-blue-600 dark:to-blue-800 blur-3xl -top-[10%] -left-[10%] animate-float" style={{ animationDelay: "0s" }} />
      
      <div className="absolute w-[40%] aspect-square rounded-full opacity-10 bg-gradient-to-r from-blue-300 to-purple-400 dark:from-blue-500 dark:to-purple-600 blur-3xl top-[60%] right-[5%] animate-float" style={{ animationDelay: "1s" }} />
      
      <div className="absolute w-[35%] aspect-square rounded-full opacity-10 bg-gradient-to-r from-blue-400 to-teal-300 dark:from-blue-700 dark:to-teal-500 blur-3xl bottom-[10%] left-[20%] animate-float" style={{ animationDelay: "2s" }} />
      
      <svg className="absolute inset-0 h-full w-full opacity-10 dark:opacity-5" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="64" height="64" patternUnits="userSpaceOnUse">
            <path d="M 64 0 L 0 0 0 64" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
};

export default AnimatedBackground;
