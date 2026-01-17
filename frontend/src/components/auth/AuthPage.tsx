"use client";

import { useState } from "react";
import {useDispatch} from "react-redux"
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

import {login as authlogin} from "../../contextapi/authSlice.js"

// --- ICONS ---
import {
  User,
  Mail,
  Lock,
  Building2,
  Globe,
  Phone,
  Briefcase,
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
  Sparkles,
  KeyRound,
  Loader2,
} from "lucide-react";

// --- CUSTOM UI COMPONENTS ---
import CursorGlow from "./CursorGlow";
import FloatingParticles from "./FloatingParticles";
import StepIndicator from "./StepIndicator";
import AnimatedInput from "./AnimatedInput";

// --- SERVICES (The file from the previous step) ---
// Adjust this path if your file is in a different folder
import { register, login, verifyOTP, resendOTP } from "../../services/user.api.js"; 

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  website: string;
  industry: string;
  phone: string;
  password: string;
  confirmPassword: string;
  otp: string;
}

const AuthPage = () => {
  const router = useRouter();
  const { toast } = useToast();

  // --- STATE ---
  const [isLogin, setIsLogin] = useState(true);
  const [showOTP, setShowOTP] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    website: "",
    industry: "",
    phone: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // --- NAVIGATION HANDLERS ---
  const handleNext = () => {
    if (currentStep < 2) setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  // --- API ACTIONS ---
const dispatch=useDispatch()
  // 1. LOGIN
  const handleLogin = async () => {
    setIsLoading(true);
    try {
      // Call Service
      const response = await login({
        email: formData.email,
        password: formData.password,
      });

      toast({
        title: "Welcome back!",
        description: "Login successful.",
      });

      console.log("Logged in user:", response.data);
      
      // Redirect to dashboard
      dispatch(authlogin(response.data.data))
      router.push("/admindashboard");

    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.response?.data?.message || "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 2. REGISTER
  const handleRegister = async () => {
    // Basic Client-side validation
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Error",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Call Service
      await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        companyName: formData.companyName,
        website: formData.website,
        industry: formData.industry,
        phone: formData.phone,
      });

      toast({
        title: "Account Created",
        description: "Please check your email for the verification code.",
      });

      // Switch UI to OTP mode
      setShowOTP(true);

    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.response?.data?.message || "Could not create account.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 3. VERIFY OTP
  const handleVerifyOTP = async () => {
    setIsLoading(true);
    try {
      // Call Service
      await verifyOTP({
        email: formData.email,
        otp: formData.otp,
      });

      toast({
        title: "Verified!",
        description: "Your account is active. Logging you in...",
      });

      // Redirect to dashboard
      router.push("/dashboard");

    } catch (error: any) {
      toast({
        title: "Verification Failed",
        description: error.response?.data?.message || "Invalid OTP code.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 4. RESEND OTP
  const handleResendOTP = async () => {
    try {
      await resendOTP({ email: formData.email });
      toast({
        title: "Code Sent",
        description: "A new verification code has been sent to your email.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Could not resend code.",
        variant: "destructive",
      });
    }
  };

  // --- FORM SUBMISSION ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (showOTP) {
      handleVerifyOTP();
    } else if (isLogin) {
      handleLogin();
    } else {
      handleRegister();
    }
  };

  // --- ANIMATION VARIANTS ---
  const slideVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction < 0 ? 300 : -300, opacity: 0 }),
  };

  // --- RENDER HELPERS ---

  const renderLoginForm = () => (
    <motion.div
      key="login"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <AnimatedInput
        id="email"
        label="Email"
        type="email"
        placeholder="Enter your email"
        icon={Mail}
        value={formData.email}
        onChange={(v) => updateField("email", v)}
        delay={0.1}
        required
      />
      <div className="space-y-2">
        <AnimatedInput
          id="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          icon={Lock}
          value={formData.password}
          onChange={(v) => updateField("password", v)}
          delay={0.2}
          required
        />
        <motion.button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {showPassword ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
          {showPassword ? "Hide" : "Show"} password
        </motion.button>
      </div>
    </motion.div>
  );

  const renderOTPForm = () => (
    <motion.div
      key="otp"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="space-y-6 text-center"
    >
      <div className="mb-4 text-sm text-muted-foreground">
        We sent a 6-digit code to <span className="font-bold text-primary">{formData.email}</span>
      </div>
      
      <AnimatedInput
        id="otp"
        label="Verification Code"
        placeholder="123456"
        icon={KeyRound}
        value={formData.otp}
        onChange={(v) => updateField("otp", v)}
        delay={0.1}
        required
      />

      <div className="text-sm">
        Didn&apos;t receive code?{" "}
        <button type="button" onClick={handleResendOTP} className="text-primary hover:underline">
          Resend
        </button>
      </div>
    </motion.div>
  );

  const renderRegisterStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div
            key="step-0"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            custom={1}
            className="space-y-4"
          >
            <AnimatedInput
              id="firstName"
              label="First Name"
              placeholder="John"
              icon={User}
              value={formData.firstName}
              onChange={(v) => updateField("firstName", v)}
              delay={0.1}
              required
            />
            <AnimatedInput
              id="lastName"
              label="Last Name"
              placeholder="Doe"
              icon={User}
              value={formData.lastName}
              onChange={(v) => updateField("lastName", v)}
              delay={0.2}
            />
            <AnimatedInput
              id="email"
              label="Email"
              type="email"
              placeholder="john@example.com"
              icon={Mail}
              value={formData.email}
              onChange={(v) => updateField("email", v)}
              delay={0.3}
              required
            />
          </motion.div>
        );
      case 1:
        return (
          <motion.div
            key="step-1"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            custom={1}
            className="space-y-4"
          >
            <AnimatedInput
              id="companyName"
              label="Company Name"
              placeholder="Acme Inc."
              icon={Building2}
              value={formData.companyName}
              onChange={(v) => updateField("companyName", v)}
              delay={0.1}
            />
            <AnimatedInput
              id="website"
              label="Website"
              placeholder="https://example.com"
              icon={Globe}
              value={formData.website}
              onChange={(v) => updateField("website", v)}
              delay={0.2}
            />
            <AnimatedInput
              id="industry"
              label="Industry"
              placeholder="Technology, Fashion..."
              icon={Briefcase}
              value={formData.industry}
              onChange={(v) => updateField("industry", v)}
              delay={0.3}
            />
            <AnimatedInput
              id="phone"
              label="Phone"
              type="tel"
              placeholder="+1 234 567 890"
              icon={Phone}
              value={formData.phone}
              onChange={(v) => updateField("phone", v)}
              delay={0.4}
            />
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            key="step-2"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            custom={1}
            className="space-y-4"
          >
            <AnimatedInput
              id="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Min 6 characters"
              icon={Lock}
              value={formData.password}
              onChange={(v) => updateField("password", v)}
              delay={0.1}
              required
            />
            <AnimatedInput
              id="confirmPassword"
              label="Confirm Password"
              type={showPassword ? "text" : "password"}
              placeholder="Re-enter password"
              icon={Lock}
              value={formData.confirmPassword}
              onChange={(v) => updateField("confirmPassword", v)}
              delay={0.2}
              required
            />
            <motion.button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showPassword ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
              {showPassword ? "Hide" : "Show"} password
            </motion.button>
          </motion.div>
        );
      default:
        return null;
    }
  };

  // --- MAIN RENDER ---
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-secondary/20 p-4">
      <CursorGlow />
      <FloatingParticles />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        <Card className="overflow-hidden border-border/50 bg-card/80 p-8 shadow-2xl backdrop-blur-xl">
          {/* Header */}
          <motion.div
            className="mb-8 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10"
              whileHover={{ scale: 1.1, rotate: 180 }}
              transition={{ duration: 0.5 }}
            >
              <Sparkles className="h-8 w-8 text-primary" />
            </motion.div>
            <h1 className="text-2xl font-bold text-foreground">
              {showOTP 
                ? "Verify Account" 
                : isLogin 
                  ? "Welcome Back" 
                  : "Create Account"}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {showOTP
                ? "Enter the code sent to your email"
                : isLogin
                ? "Enter your credentials to continue"
                : "Sign up to get started with your journey"}
            </p>
          </motion.div>

          {/* Step Indicator (Only for Signup flow, hidden in Login and OTP) */}
          {!isLogin && !showOTP && <StepIndicator currentStep={currentStep} totalSteps={3} />}

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {showOTP 
                ? renderOTPForm() 
                : isLogin 
                  ? renderLoginForm() 
                  : renderRegisterStep()}
            </AnimatePresence>

            {/* Navigation / Action Buttons */}
            <div className="flex gap-3">
              {/* BACK BUTTON: Logic for Steps OR OTP view */}
              {((!isLogin && !showOTP && currentStep > 0) || showOTP) && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex-1"
                >
                  <Button
                    type="button"
                    variant="outline"
                    onClick={showOTP ? () => setShowOTP(false) : handleBack}
                    className="w-full"
                    disabled={isLoading}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                </motion.div>
              )}

              {/* ACTION BUTTON: Submit, Next, Verify */}
              <motion.div
                className="flex-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Show Submit if:
                  1. Login Mode
                  2. OTP Mode
                  3. Signup Mode AND Last Step
                */}
                {isLogin || showOTP || currentStep === 2 ? (
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {showOTP 
                      ? "Verify & Login" 
                      : isLogin 
                        ? "Sign In" 
                        : "Create Account"}
                    {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                ) : (
                  // Show Next Button (Intermediate Steps)
                  <Button type="button" onClick={handleNext} className="w-full">
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </motion.div>
            </div>
          </form>

          {/* Social Auth & Login Toggle (Hide during OTP) */}
          {!showOTP && (
            <>
              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Google Auth Placeholder */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => toast({ title: "Google Auth", description: "Not implemented yet" })}
                  className="w-full gap-2"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </Button>
              </motion.div>

              {/* Toggle Login / Register */}
              <motion.p
                className="mt-6 text-center text-sm text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <motion.button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setCurrentStep(0);
                  }}
                  className="font-semibold text-primary hover:underline"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </motion.button>
              </motion.p>
            </>
          )}
        </Card>
      </motion.div>
    </div>
  );
};

export default AuthPage;