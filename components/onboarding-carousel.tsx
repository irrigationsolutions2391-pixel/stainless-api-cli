"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ChevronRight, ChevronLeft, User, MapPin, Briefcase } from "lucide-react"

interface OnboardingCarouselProps {
  onComplete: (answers: Record<string, string>) => void
}

export function OnboardingCarousel({ onComplete }: OnboardingCarouselProps) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const steps = [
    {
      title: "What brings you to GigFlow Pro?",
      icon: User,
      options: [
        { value: "find_work", label: "I'm looking for irrigation/landscaping gigs", badge: "Contractor" },
        { value: "hire", label: "I need to hire professionals", badge: "Client" },
        { value: "both", label: "Both - I hire and take jobs", badge: "Pro" },
      ],
      key: "user_type",
    },
    {
      title: "Where are you located?",
      icon: MapPin,
      options: [
        { value: "phoenix", label: "Phoenix Metro Area", badge: "AZ" },
        { value: "southwest", label: "Southwest US", badge: "Regional" },
        { value: "national", label: "Anywhere in the US", badge: "National" },
        { value: "remote", label: "I work remotely/travel", badge: "Mobile" },
      ],
      key: "location",
    },
    {
      title: "What type of work interests you most?",
      icon: Briefcase,
      options: [
        { value: "residential", label: "Residential yards and gardens", badge: "Home" },
        { value: "commercial", label: "Commercial properties", badge: "Business" },
        { value: "industrial", label: "Large-scale industrial", badge: "Enterprise" },
        { value: "all", label: "All types of projects", badge: "Versatile" },
      ],
      key: "work_type",
    },
  ]

  const currentStep = steps[step]

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [currentStep.key]: value }
    setAnswers(newAnswers)

    if (step < steps.length - 1) {
      setTimeout(() => setStep(step + 1), 300)
    } else {
      setTimeout(() => onComplete(newAnswers), 300)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <Badge variant="outline" className="text-sm">
          Step {step + 1} of {steps.length}
        </Badge>
        <div className="flex gap-2">
          {steps.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 rounded-full transition-all ${
                idx === step ? "w-8 bg-primary" : idx < step ? "w-2 bg-primary/50" : "w-2 bg-muted"
              }`}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-2">
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center gap-3">
                <currentStep.icon className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-bold">{currentStep.title}</h2>
              </div>

              <RadioGroup value={answers[currentStep.key] || ""} onValueChange={handleAnswer}>
                <div className="space-y-3">
                  {currentStep.options.map((option) => (
                    <motion.div
                      key={option.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative"
                    >
                      <Label
                        htmlFor={option.value}
                        className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-primary hover:bg-primary/5"
                      >
                        <RadioGroupItem value={option.value} id={option.value} />
                        <div className="flex-1">
                          <p className="font-medium">{option.label}</p>
                        </div>
                        <Badge variant="secondary">{option.badge}</Badge>
                      </Label>
                    </motion.div>
                  ))}
                </div>
              </RadioGroup>

              <div className="flex items-center justify-between pt-4">
                <Button variant="ghost" onClick={() => step > 0 && setStep(step - 1)} disabled={step === 0}>
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button
                  onClick={() => answers[currentStep.key] && handleAnswer(answers[currentStep.key])}
                  disabled={!answers[currentStep.key]}
                >
                  {step < steps.length - 1 ? "Next" : "Get Started"}
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
