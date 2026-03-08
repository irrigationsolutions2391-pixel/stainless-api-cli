"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Flame, Gift, Trophy } from "lucide-react"

interface DailyStreakCardProps {
  currentStreak: number
  maxStreak: number
  creditsEarned: number
}

export function DailyStreakCard({ currentStreak, maxStreak, creditsEarned }: DailyStreakCardProps) {
  const milestones = [
    { day: 1, reward: "$5", unlocked: currentStreak >= 1 },
    { day: 3, reward: "$15", unlocked: currentStreak >= 3 },
    { day: 7, reward: "$50 + Badge", unlocked: currentStreak >= 7 },
    { day: 14, reward: "$100 + Pro Trial", unlocked: currentStreak >= 14 },
    { day: 30, reward: "$250 + Elite Trial", unlocked: currentStreak >= 30 },
  ]

  return (
    <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 border-2 border-orange-200 dark:border-orange-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flame className="w-6 h-6 text-orange-500 animate-pulse" />
          Daily Login Streak
          <Badge className="bg-orange-500 text-white glow-badge">
            {currentStreak} {currentStreak === 1 ? "Day" : "Days"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Current Streak</p>
            <p className="text-3xl font-bold text-orange-600">{currentStreak} days</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Max Streak</p>
            <p className="text-2xl font-bold">{maxStreak} days</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Credits Earned</p>
            <p className="text-2xl font-bold text-green-600">${creditsEarned}</p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold">Milestone Rewards:</p>
          {milestones.map((milestone) => (
            <div
              key={milestone.day}
              className={`flex items-center justify-between p-2 rounded-lg ${
                milestone.unlocked
                  ? "bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700"
                  : "bg-muted/50"
              }`}
            >
              <div className="flex items-center gap-2">
                {milestone.unlocked ? (
                  <Trophy className="w-4 h-4 text-green-600" />
                ) : (
                  <Gift className="w-4 h-4 text-muted-foreground" />
                )}
                <span className={milestone.unlocked ? "font-semibold" : "text-muted-foreground"}>
                  Day {milestone.day}
                </span>
              </div>
              <Badge variant={milestone.unlocked ? "default" : "outline"}>{milestone.reward}</Badge>
            </div>
          ))}
        </div>

        <Button className="w-full ripple-button" disabled={currentStreak === 0}>
          <Flame className="w-4 h-4 mr-2" />
          Claim Today's Bonus
        </Button>
      </CardContent>
    </Card>
  )
}
