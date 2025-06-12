import { motion } from "framer-motion";

type Props = {
  input: string;
  onChange: (val: string) => void;
};

export default function InputArea({ input, onChange }: Props) {
  return (
    <motion.textarea
      className="w-full max-w-xl p-4 rounded-md text-black text-lg mb-6 shadow focus:outline-none focus:ring-2 focus:ring-indigo-400"
      rows={4}
      placeholder="Tulis teks latin di sini..."
      value={input}
      onChange={(e) => onChange(e.target.value)}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    />
  );
}
