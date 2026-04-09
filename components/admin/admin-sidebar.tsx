"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  Briefcase,
  CreditCard,
  BarChart3,
  Settings,
  Shield,
  MessageSquare,
  Truck,
  Bell,
  LogOut,
  Droplet,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const adminNavItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/users", icon: Users, label: "Users" },
  { href: "/admin/jobs", icon: Briefcase, label: "Jobs" },
  { href: "/admin/revenue", icon: CreditCard, label: "Revenue" },
  { href: "/admin/analytics", icon: BarChart3, label: "Analytics" },
  { href: "/admin/messages", icon: MessageSquare, label: "Messages" },
  { href: "/admin/equipment", icon: Truck, label: "Equipment" },
  { href: "/admin/moderation", icon: Shield, label: "Moderation" },
  { href: "/admin/notifications", icon: Bell, label: "Notifications" },
  { href: "/admin/settings", icon: Settings, label: "Settings" },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r bg-card flex flex-col">
      <div className="p-6 border-b">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="relative">
            <Droplet className="h-8 w-8 text-primary" />
            <div className="absolute inset-0 bg-primary/20 blur-lg" />
          </div>
          <div>
            <h1 className="font-bold text-lg" style={{ fontFamily: "var(--font-display, inherit)" }}>
              GigFlow Pro
            </h1>
            <p className="text-xs text-muted-foreground">Admin Control</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {adminNavItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== "/admin" && pathname.startsWith(item.href))
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t">
        <Button variant="ghost" className="w-full justify-start gap-3" asChild>
          <Link href="/">
            <LogOut className="h-4 w-4" />
            Exit Admin
          </Link>
        </Button>
      </div>
    </aside>
  )
}
