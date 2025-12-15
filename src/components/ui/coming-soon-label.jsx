import React from 'react';
import { cn } from "@/lib/utils";

const ComingSoonLabel = ({ 
  position = "-top-3 -right-3", 
  className,
  text = "Coming Soon",
  ...props 
}) => {
  return (
    <span 
      className={cn(
        "absolute bg-yellow-500 text-white text-xs px-2 py-0.5 rounded-full", 
        position,
        className
      )}
      {...props}
    >
      {text}
    </span>
  );
};

export default ComingSoonLabel; 