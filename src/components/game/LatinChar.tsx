import { useRef } from "react";
import { useDrag } from "react-dnd";
import { motion } from "framer-motion";
import type { LatinCharacterProps } from "../../utils/gameType";

const LatinCharacter = ({ 
  char, 
  isMatched, 
  disabled, 
  isSelected, 
  onClick, 
  isMobile 
}: LatinCharacterProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: "LATIN",
    item: { latin: char },
    canDrag: !disabled && !isMatched && !isMobile,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  if (!isMobile) {
    drag(ref);
  }

  return (
    <motion.div
      ref={ref}
      className={`relative flex items-center justify-center h-16 sm:h-20 w-full rounded-lg border-2 transition-all ${
        isMatched
          ? "border-green-500 bg-green-500/20"
          : isSelected
          ? "border-yellow-500 bg-yellow-500/30"
          : "border-white/30 bg-white/10"
      } ${isDragging ? "opacity-50" : "opacity-100"} ${
        disabled || isMatched 
          ? "cursor-not-allowed" 
          : isMobile 
          ? "cursor-pointer" 
          : "cursor-move"
      }`}
      whileHover={!(disabled || isMatched) ? { scale: 1.03 } : {}}
      whileTap={!(disabled || isMatched) ? { scale: 0.97 } : {}}
      animate={{
        scale: isDragging ? 0.95 : 1
      }}
      onClick={isMobile && !disabled && !isMatched ? onClick : undefined}
    >
      <div className="text-xl sm:text-2xl text-white text-center font-bold">
        {char}
      </div>
      {isSelected && isMobile && (
        <motion.div 
          className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500 }}
        >
          <span className="text-white text-xs">✓</span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default LatinCharacter;