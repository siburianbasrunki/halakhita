import { useRef } from "react";
import { useDrag } from "react-dnd";
import { motion } from "framer-motion";
import type { LatinCharacterProps } from "../../utils/gameType";

const LatinCharacter = ({ char, isMatched, disabled }: LatinCharacterProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: "LATIN",
    item: { latin: char },
    canDrag: !disabled && !isMatched,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  drag(ref);

  return (
    <motion.div
      ref={ref}
      className={`flex items-center justify-center h-16 sm:h-20 w-full rounded-lg border-2 transition-all ${
        isMatched
          ? "border-green-500 bg-green-500/20"
          : "border-white/30 bg-white/10"
      } ${isDragging ? "opacity-50" : "opacity-100"} ${
        disabled || isMatched ? "cursor-not-allowed" : "cursor-move"
      }`}
      whileHover={!(disabled || isMatched) ? { scale: 1.03 } : {}}
      whileTap={!(disabled || isMatched) ? { scale: 0.97 } : {}}
      animate={{
        scale: isDragging ? 0.95 : 1
      }}
    >
      <div className="text-xl sm:text-2xl text-white text-center font-bold">
        {char}
      </div>
    </motion.div>
  );
};

export default LatinCharacter;