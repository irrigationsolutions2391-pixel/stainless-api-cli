"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Bot, Mic, MicOff, Sparkles, Lock, Crown, Zap, TrendingUp } from "lucide-react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"

interface SuperAIChatProps {
  userPlan?: string
  userId?: string
  onUpgradePrompt?: () => void
}

export function SuperAIChatV2({ userPlan = "Free", userId, onUpgradePrompt }: SuperAIChatProps) {
  const [input, setInput] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [messageCount, setMessageCount] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Feature limits based on plan
  const planLimits = {
    Free: { messages: 50, canCreate: false, hasVoice: false, icon: Sparkles },
    Pro: { messages: 500, canCreate: true, hasVoice: false, icon: Zap },
    "Premium Contractor": { messages: -1, canCreate: true, hasVoice: true, icon: Crown },
    "Business Enterprise": { messages: -1, canCreate: true, hasVoice: true, icon: TrendingUp },
  }

  const currentPlan = planLimits[userPlan as keyof typeof planLimits] || planLimits.Free
  const PlanIcon = currentPlan.icon
  const isLimitReached = currentPlan.messages !== -1 && messageCount >= currentPlan.messages

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/ai/wealth-chat" }),
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        parts: [
          {
            type: "text",
            text: `Welcome to IrrigGig AI - Your Wealth Generation Assistant! I'm here to help you maximize earnings, find the best jobs, and grow your business. ${userPlan === "Free" ? "Upgrade to unlock AI job creation and voice features!" : ""}`,
          },
        ],
      },
    ],
  })

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleVoiceInput = () => {
    if (!currentPlan.hasVoice) {
      onUpgradePrompt?.()
      return
    }

    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      alert("Voice input not supported in your browser")
      return
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.continuous = false
    recognition.interimResults = false

    recognition.onstart = () => setIsListening(true)
    recognition.onend = () => setIsListening(false)

    recognition.onresult = (event: any) => {
      const voiceText = event.results[0][0].transcript
      setTranscript(voiceText)
      setInput(voiceText)
    }

    recognition.start()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || status !== "ready") return

    if (isLimitReached) {
      onUpgradePrompt?.()
      return
    }

    const userMessage = input
    setInput("")
    setMessageCount((prev) => prev + 1)

    sendMessage({ text: userMessage })
  }

  const canSend = !isLimitReached && status === "ready"

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-2xl border-2 border-primary/20">
      <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-blue-500/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-full">
              <Bot className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="flex items-center gap-2">
                SuperAI Wealth Assistant
                <PlanIcon className="w-5 h-5 text-primary" />
              </CardTitle>
              <CardDescription>
                {userPlan} Plan •{" "}
                {currentPlan.messages === -1 ? "Unlimited" : `${messageCount}/${currentPlan.messages}`} messages
              </CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="gap-1">
            <TrendingUp className="w-3 h-3" />
            Wealth Mode Active
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-4 mb-4 h-[400px] overflow-y-auto pr-2">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-5 py-3 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-gradient-to-br from-muted to-muted/50 border"
                  }`}
                >
                  {message.parts.map((part, index) => {
                    if (part.type === "text") {
                      return (
                        <p key={index} className="text-sm leading-relaxed whitespace-pre-wrap">
                          {part.text}
                        </p>
                      )
                    }
                    return null
                  })}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {status === "streaming" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="bg-muted rounded-2xl px-5 py-3 border">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100" />
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200" />
                  </div>
                  <p className="text-sm text-muted-foreground">AI is thinking...</p>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {isLimitReached && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-4 bg-primary/10 border border-primary/20 rounded-lg"
          >
            <div className="flex items-center gap-2 mb-2">
              <Lock className="w-5 h-5 text-primary" />
              <p className="font-semibold text-sm">Message Limit Reached</p>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Upgrade to Pro or Premium to continue using SuperAI and unlock advanced features like AI job creation and
              voice chat.
            </p>
            <Button size="sm" onClick={onUpgradePrompt}>
              <Crown className="w-4 h-4 mr-2" />
              Upgrade Now
            </Button>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                canSend
                  ? "Ask about jobs, pricing, wealth strategies..."
                  : isLimitReached
                    ? "Upgrade to continue chatting..."
                    : "AI is responding..."
              }
              className="flex-1"
              disabled={!canSend}
            />
            {currentPlan.hasVoice && (
              <Button
                type="button"
                size="icon"
                variant="outline"
                onClick={handleVoiceInput}
                disabled={isListening || !canSend}
              >
                {isListening ? <MicOff className="w-4 h-4 animate-pulse" /> : <Mic className="w-4 h-4" />}
              </Button>
            )}
            <Button type="submit" size="icon" disabled={!canSend || !input.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>

          {!currentPlan.canCreate && (
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Lock className="w-3 h-3" />
              Upgrade to Pro to unlock AI job creation and advanced features
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
