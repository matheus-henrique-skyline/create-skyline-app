import React from "react";
import { motion } from "framer-motion";

const AnimatedText: React.FC<{ text: string, className?: string }> = ({ text, className }) => {
  return (
    <span className={className}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};

export default AnimatedText;
