import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator = ({ currentStep, totalSteps }: StepIndicatorProps) => {
  const steps = ["Personal", "Business", "Security"];

  return (
    <div className="mb-8 flex items-center justify-center gap-2">
      {steps.slice(0, totalSteps).map((step, index) => (
        <div key={step} className="flex items-center">
          <motion.div
            className={`relative flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${
              index < currentStep
                ? "border-primary bg-primary text-primary-foreground"
                : index === currentStep
                  ? "border-primary bg-background text-primary"
                  : "border-muted-foreground/30 bg-background text-muted-foreground"
            }`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            {index < currentStep ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                <Check className="h-5 w-5" />
              </motion.div>
            ) : (
              <span className="text-sm font-semibold">{index + 1}</span>
            )}
            {index === currentStep && (
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary"
                initial={{ scale: 1 }}
                animate={{ scale: 1.2, opacity: 0 }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeOut",
                }}
              />
            )}
          </motion.div>
          {index < totalSteps - 1 && (
            <motion.div
              className={`mx-2 h-0.5 w-12 transition-colors ${
                index < currentStep ? "bg-primary" : "bg-muted-foreground/30"
              }`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: index * 0.1 + 0.2 }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
