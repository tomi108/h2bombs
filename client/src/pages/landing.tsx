import { motion } from "framer-motion";
import { Sparkles, Shield, Zap, Heart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { insertWaitlistEntrySchema, type InsertWaitlistEntry } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const FloatingBubbles = () => {
  const bubbles = [
    { size: 120, x: "15%", y: "20%", delay: 0, duration: 25 },
    { size: 80, x: "75%", y: "30%", delay: 2, duration: 20 },
    { size: 100, x: "85%", y: "70%", delay: 4, duration: 30 },
    { size: 60, x: "25%", y: "75%", delay: 1, duration: 22 },
    { size: 90, x: "50%", y: "15%", delay: 3, duration: 28 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bubbles.map((bubble, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-20"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: bubble.x,
            top: bubble.y,
            background: "radial-gradient(circle, rgba(230, 224, 255, 0.8) 0%, rgba(195, 221, 253, 0.4) 50%, transparent 70%)",
            filter: "blur(2px)",
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const HeroSection = () => {
  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Ice-blue to white gradient background */}
      <div 
        className="absolute inset-0" 
        style={{
          background: "linear-gradient(to bottom, rgb(195, 221, 253) 0%, rgb(230, 240, 255) 30%, rgb(255, 255, 255) 70%)"
        }}
      />
      
      {/* Floating Bubbles */}
      <FloatingBubbles />
      
      {/* Content */}
      <motion.div 
        className="relative z-10 container mx-auto px-6 py-24 text-center"
        initial="initial"
        animate="animate"
        variants={staggerChildren}
      >
        <motion.h1 
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-5xl mx-auto leading-[1.1]"
          variants={fadeInUp}
          data-testid="text-hero-headline"
        >
          The Most Powerful Hydrogen Bath Bombs on Earth
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed"
          variants={fadeInUp}
          data-testid="text-hero-subheadline"
        >
          Up to 10,000+ ppb molecular hydrogen • Natural lavender • EU GMP • Coming Q1 2026
        </motion.p>
        
        <motion.div variants={fadeInUp}>
          <Button 
            size="lg"
            onClick={scrollToWaitlist}
            className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-shadow"
            data-testid="button-hero-cta"
          >
            Join Waitlist
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

const ScienceSection = () => {
  const benefits = [
    {
      icon: Shield,
      title: "Reduces Oxidative Stress",
      description: "Neutralizes harmful free radicals and reduces inflammation at the cellular level"
    },
    {
      icon: Zap,
      title: "Faster Recovery & Energy",
      description: "Enhances athletic performance and accelerates post-workout muscle recovery"
    },
    {
      icon: Sparkles,
      title: "Skin Hydration & Anti-Aging",
      description: "Deep moisture penetration and visible reduction in fine lines and wrinkles"
    },
    {
      icon: Heart,
      title: "Selective Antioxidant",
      description: "Targets only harmful radicals while preserving beneficial cellular functions"
    },
  ];

  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-semibold text-center mb-16" data-testid="text-science-headline">
            Why Molecular Hydrogen?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-8 h-full hover-elevate" data-testid={`card-benefit-${index}`}>
                <benefit.icon className="w-12 h-12 text-primary mb-4" data-testid={`icon-benefit-${index}`} />
                <h3 className="text-xl font-semibold mb-3" data-testid={`text-benefit-title-${index}`}>{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed" data-testid={`text-benefit-description-${index}`}>{benefit.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Badge variant="secondary" className="text-sm px-4 py-2" data-testid="badge-studies">
            Backed by 2000+ clinical studies
          </Badge>
        </motion.div>
      </div>
    </section>
  );
};

const ProductSection = () => {
  const features = [
    "200 g premium bath bomb",
    "Up to 10,000+ ppb H₂",
    "100% natural lavender essential oil",
    "EU GMP manufactured",
    "12+ months barrier-packaged stability"
  ];

  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-background via-accent/20 to-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-semibold mb-8" data-testid="text-product-headline">
            Lavender Hydrogen Bath Bomb
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex justify-center mb-16"
        >
          <div 
            className="relative w-64 h-64 md:w-80 md:h-80 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(230, 224, 255, 0.9) 0%, rgba(195, 221, 253, 0.6) 40%, rgba(230, 224, 255, 0.3) 70%, transparent 100%)",
              boxShadow: "0 0 80px rgba(230, 224, 255, 0.6), 0 0 120px rgba(195, 221, 253, 0.4)",
            }}
            data-testid="product-sphere"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="space-y-4 mb-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="flex items-start gap-3"
                data-testid={`feature-${index}`}
              >
                <Check className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-lg">{feature}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-muted-foreground uppercase tracking-wider text-sm font-medium" data-testid="text-product-launch">
            Launching Q1 2026 – be the first
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const MissionSection = () => {
  return (
    <section className="py-32 md:py-40">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-semibold mb-10" data-testid="text-mission-headline">Our Mission</h2>
          <p className="text-xl md:text-2xl leading-relaxed text-foreground/90" data-testid="text-mission-content">
            We're building the <strong>strongest, cleanest</strong> hydrogen wellness experience in the world. 
            Made in EU. <strong>Science-first.</strong> <strong>No compromises.</strong>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const WaitlistSection = () => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<InsertWaitlistEntry>({
    resolver: zodResolver(insertWaitlistEntrySchema),
    defaultValues: {
      email: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertWaitlistEntry) => {
      return await apiRequest("POST", "/api/waitlist", data);
    },
    onSuccess: () => {
      setIsSubmitted(true);
      form.reset();
      toast({
        title: "You're on the list!",
        description: "We'll notify you when H2 Bombs launches in Q1 2026.",
      });
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message ?? error?.message ?? "Please try again later.";
      toast({
        title: "Something went wrong",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertWaitlistEntry) => {
    mutation.mutate(data);
  };

  return (
    <section id="waitlist" className="py-24 md:py-32 bg-gradient-to-b from-background to-accent/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-semibold mb-4" data-testid="text-waitlist-headline">Be the First</h2>
          <p className="text-muted-foreground mb-8" data-testid="text-waitlist-subheadline">
            Limited early-bird batch • Exclusive launch pricing
          </p>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 rounded-lg bg-primary/10 border border-primary/20"
              data-testid="status-success"
            >
              <Check className="w-12 h-12 text-primary mx-auto mb-4" />
              <p className="text-lg font-medium" data-testid="text-success-title">Thank you for joining our waitlist!</p>
              <p className="text-muted-foreground mt-2" data-testid="text-success-message">We'll be in touch soon.</p>
            </motion.div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter your email"
                          type="email"
                          className="h-12 text-base"
                          disabled={mutation.isPending}
                          data-testid="input-email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full text-lg py-6 rounded-full"
                  disabled={mutation.isPending}
                  data-testid="button-submit-waitlist"
                >
                  {mutation.isPending ? "Joining..." : "Join Waitlist"}
                </Button>
              </form>
            </Form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-16 md:py-20 border-t">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-6">
          <p className="text-sm text-muted-foreground" data-testid="text-footer-copyright">
            © 2025 H2 Bombs™ – Made with ♥ in EU
          </p>
          <div className="flex items-center justify-center gap-6 text-sm">
            <a 
              href="mailto:hello@h2bombs.com" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-email"
            >
              hello@h2bombs.com
            </a>
            <span className="text-muted-foreground">•</span>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-privacy"
            >
              Privacy
            </a>
            <span className="text-muted-foreground">•</span>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-terms"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function Landing() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ScienceSection />
      <ProductSection />
      <MissionSection />
      <WaitlistSection />
      <Footer />
    </div>
  );
}
