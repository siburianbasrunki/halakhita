import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { motion } from "framer-motion";
import type { BatakCharacterProps } from "../../utils/gameType";

const BatakCharacter = ({ 
  char, 
  matchedLatin, 
  onDrop, 
  disabled,
  isHighlighted,
  onClick,
  isMobile
}: BatakCharacterProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: "BATAK",
    item: { batak: char },
    canDrag: !disabled && !isMobile,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: "LATIN",
    drop: (item: { latin: string }) => onDrop(char, item.latin),
    canDrop: () => !disabled && !isMobile,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  if (!isMobile) {
    drag(drop(ref));
  }

  return (
    <motion.div
      ref={ref}
      className={`relative flex items-center justify-center h-16 sm:h-20 w-full rounded-lg border-2 transition-all ${
        matchedLatin
          ? "border-green-500 bg-green-500/20"
          : isOver || isHighlighted
          ? "border-yellow-500 bg-yellow-500/20"
          : "border-white/30 bg-white/10"
      } ${isDragging ? "opacity-50" : "opacity-100"} ${
        disabled 
          ? "cursor-not-allowed" 
          : isMobile 
          ? "cursor-pointer" 
          : "cursor-move"
      }`}
      whileHover={!disabled ? { scale: 1.03 } : {}}
      whileTap={!disabled ? { scale: 0.97 } : {}}
      animate={{
        scale: isDragging ? 0.95 : 1,
        boxShadow: (isOver || isHighlighted) ? "0 0 10px rgba(234, 179, 8, 0.5)" : "none"
      }}
      onClick={isMobile && !disabled ? onClick : undefined}
    >
      <div
        className="text-3xl sm:text-4xl text-white text-center"
        style={{ fontFamily: "Noto Sans Batak, serif" }}
      >
        {char}
      </div>
      {matchedLatin && (
        <motion.div 
          className="absolute bottom-1 right-1 text-xs bg-green-500 rounded px-1.5 py-0.5 text-white"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500 }}
        >
          {matchedLatin}
        </motion.div>
      )}
    </motion.div>
  );
};

export default BatakCharacter;