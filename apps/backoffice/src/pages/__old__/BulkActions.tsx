import React from "react";

import { motion } from "framer-motion";

import { ArrowRight, Lightbulb, Sparkles, Star, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

const Index = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-12 mt-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Rollergrind360 dashboard
        </h1>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
      >
        {features.map((feature, index) => (
          <motion.div key={index} variants={item}>
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg h-full">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {feature.points.map((point, i) => (
                    <li key={i} className="flex items-start">
                      <div className="mr-2 mt-0.5 text-primary">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  className="group w-full justify-between"
                >
                  Learn more
                  <ArrowRight
                    size={16}
                    className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 text-center mb-12"
      >
        <h2 className="text-2xl font-semibold mb-4">Ready to get started?</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
          Explore the sidebar navigation to discover all the features available
          in this application.
        </p>
        <Button className="font-medium">Explore Features</Button>
      </motion.div>
    </div>
  );
};

const features = [
  {
    title: "Elegant Sidebar",
    description: "A beautiful, responsive sidebar with nested menus",
    icon: <Zap size={24} className="text-primary" />,
    points: [
      "Smooth animations and transitions",
      "Collapsible for more screen space",
      "Responsive on all devices",
      "Hierarchical nested menus",
    ],
  },
  {
    title: "Intuitive Navigation",
    description: "Simple and intuitive user interface",
    icon: <Sparkles size={24} className="text-primary" />,
    points: [
      "Clear visual hierarchy",
      "Context-aware menu items",
      "Streamlined user flows",
      "Optimized for productivity",
    ],
  },
  {
    title: "Minimalist Design",
    description: "Clean aesthetics inspired by modern principles",
    icon: <Lightbulb size={24} className="text-primary" />,
    points: [
      "Thoughtful use of white space",
      "Subtle animations enhance usability",
      "High contrast for accessibility",
      "Pixel-perfect implementation",
    ],
  },
  {
    title: "Customizable Interface",
    description: "Adapt the interface to your needs",
    icon: <Star size={24} className="text-primary" />,
    points: [
      "Collapsible sidebar for focus",
      "Mobile-friendly responsive design",
      "Smooth state transitions",
      "Intuitive interaction patterns",
    ],
  },
];

export default Index;
