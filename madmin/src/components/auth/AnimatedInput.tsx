"use client";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LucideIcon } from "lucide-react";
import { useState } from "react";


interface AnimatedInputProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  icon: LucideIcon;
  value: string;
  onChange: (value: string) => void;
  delay?: number;
  required?: boolean;
}

const AnimatedInput = ({
  id,
  label,
  type = "text",
  placeholder,
  icon: Icon,
  value,
  onChange,
  delay = 0,
  required = false,
}: AnimatedInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      className="space-y-2"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
    >
      <Label
        htmlFor={id}
        className="flex items-center gap-2 text-sm font-medium text-foreground"
      >
        <Icon className="h-4 w-4 text-muted-foreground" />
        {label}
        {required && <span className="text-destructive">*</span>}
      </Label>
      <motion.div
        className="relative"
        animate={{
          scale: isFocused ? 1.02 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`transition-all duration-300 ${
            isFocused
              ? "border-primary ring-2 ring-primary/20"
              : "border-input"
          }`}
          required={required}
        />
        {isFocused && (
          <motion.div
            className="absolute inset-0 -z-10 rounded-md bg-primary/5"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

export default AnimatedInput;
