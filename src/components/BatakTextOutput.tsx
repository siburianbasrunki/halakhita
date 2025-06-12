import { motion } from "framer-motion";

type Props = {
  result: string;
};

export default function BatakTextOutput({ result }: Props) {
  return (
    <motion.div
      className="bg-white/10 p-5 rounded-lg shadow text-2xl text-white font-batak backdrop-blur-md"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
    >
      <p className="text-sm text-indigo-200 uppercase tracking-wide mb-2">
        Hasil Aksara Batak:
      </p>
      <p className="break-words">{result}</p>
    </motion.div>
  );
}
