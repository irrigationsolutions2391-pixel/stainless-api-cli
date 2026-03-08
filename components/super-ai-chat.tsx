"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Bot } from "lucide-react"

export function SuperAIChat() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<{ role: "user" | "ai"; content: string }[]>([
    {
      role: "ai",
      content:
        "Hi! I'm your IrrigGig AI assistant. Ask me anything about irrigation jobs, pricing, or finding workers!",
    },
  ])
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = input
    setInput("")
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setIsLoading(true)

    // Simulate AI response (replace with actual OpenAI API call)
    setTimeout(() => {
      const responses = [
        "Great question! For irrigation installation, typical rates range from $50-$100/hour depending on complexity and location.",
        "I can help you find qualified irrigation professionals in your area. What type of project do you have?",
        "Based on current market rates, a drip system installation for residential properties typically costs between $1,200-$3,500.",
        "Would you like me to recommend some top-rated irrigation workers in your area? I can match you based on your specific needs.",
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      setMessages((prev) => [...prev, { role: "ai", content: randomResponse }])
      setIsLoading(false)
    }, 1500)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="w-6 h-6 text-primary" />
          SuperAI Assistant
        </CardTitle>
        <CardDescription>Ask me anything about irrigation gigs and pricing</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mb-4 h-[300px] overflow-y-auto">
          <AnimatePresence>
            {messages.map((message, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="bg-muted rounded-lg px-4 py-2">
                <p className="text-sm">Thinking...</p>
              </div>
            </motion.div>
          )}
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about gigs, pricing, or workers..."
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
