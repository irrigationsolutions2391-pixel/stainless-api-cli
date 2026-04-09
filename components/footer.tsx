import { Mail, FileText, Shield, Scale } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-muted/50 mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-xl mb-2" style={{ fontFamily: "var(--font-display, inherit)" }}>GigFlow Pro</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The elite AI-powered marketplace where irrigation and landscaping professionals connect, earn, and build wealth.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/jobs" className="hover:text-primary transition-colors">
                  Find Jobs
                </Link>
              </li>
              <li>
                <Link href="/post-job" className="hover:text-primary transition-colors">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-primary transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Legal
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/legal/terms" className="hover:text-primary transition-colors flex items-center gap-1">
                  <FileText className="w-3 h-3" />
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="hover:text-primary transition-colors flex items-center gap-1">
                  <Scale className="w-3 h-3" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/disclaimer" className="hover:text-primary transition-colors flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  Platform Disclaimer
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Contact</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:irrigationsolutions2391@gmail.com" className="hover:text-primary transition-colors">
                  irrigationsolutions2391@gmail.com
                </a>
              </div>
              <p className="text-xs mt-4 text-muted-foreground/80">
                © 2025-2026 FloresLandscapeDesignLlc
                <br />
                Hugo Vazquez - All Rights Reserved
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t">
          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            <strong>Platform Disclaimer:</strong> GigFlow Pro is a platform connecting users. We are not
            responsible for job quality, disputes, injuries, damages, taxes, insurance, or legal compliance. Users are
            fully responsible for their actions. Please review our Terms of Service for complete details.
          </p>
        </div>
      </div>
    </footer>
  )
}
