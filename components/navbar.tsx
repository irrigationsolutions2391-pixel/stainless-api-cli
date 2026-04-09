"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { User, LogOut, LayoutDashboard, Droplet, Truck, Radio, Settings, Sparkles, Store, Zap } from "lucide-react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export function Navbar() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="relative">
            <Droplet className="h-7 w-7 text-primary group-hover:scale-110 transition-transform" />
            <div className="absolute inset-0 bg-primary/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="text-xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display, inherit)" }}>
            GigFlow Pro
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/jobs">
            <Button variant="ghost" className="hidden sm:inline-flex">
              <Sparkles className="h-4 w-4 mr-2" />
              Gig Galaxy
            </Button>
          </Link>
          <Link href="/equipment">
            <Button variant="ghost" className="hidden md:inline-flex">
              <Truck className="h-4 w-4 mr-2" />
              Equipment
            </Button>
          </Link>
          <Link href="/feed">
            <Button variant="ghost" className="hidden md:inline-flex">
              <Radio className="h-4 w-4 mr-2" />
              Feed
            </Button>
          </Link>
          <Link href="/store/flores-services">
            <Button variant="ghost" className="hidden lg:inline-flex">
              <Store className="h-4 w-4 mr-2" />
              Store
            </Button>
          </Link>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full bg-transparent">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/jobs")}>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Gig Galaxy
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/wallet/reload")}>
                  <Zap className="mr-2 h-4 w-4 text-yellow-500" />
                  Reload Wallet
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/equipment")}>
                  <Truck className="mr-2 h-4 w-4" />
                  Rent Equipment
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/feed")}>
                  <Radio className="mr-2 h-4 w-4" />
                  Social Feed
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/store/flores-services")}>
                  <Store className="mr-2 h-4 w-4" />
                  Flores Services
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/auth/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/auth/sign-up">
                <Button>Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  )
}
