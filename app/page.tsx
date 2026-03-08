'use client';

import { GeneratorForm } from '@/components/generator-form';
import { OutputDisplay } from '@/components/output-display';
import { DemoChart } from '@/components/demo-chart';
import { LanguageSelector } from '@/components/language-selector';
import { TermsAgreement } from '@/components/terms-agreement';
import { SubscriptionModal } from '@/components/subscription-modal';
import { useState, useEffect } from 'react';
import { Language, t } from '@/lib/translations';

// Sci-Fi Avatar Component
function Avatar({ name, role, delay = 0, lang }: { name: string; role: string; delay?: number; lang: Language }) {
  const initials = name.split(' ').map(n => n[0]).join('');
  return (
    <div 
      className="flex flex-col items-center gap-3 animate-float"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl animate-glow-pulse" />
        <div className="relative w-20 h-20 rounded-full neon-border flex items-center justify-center bg-card text-2xl font-bold text-primary">
          {initials}
        </div>
      </div>
      <div className="text-center">
        <p className="font-semibold text-foreground">{name}</p>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
    </div>
  );
}

// Feature Card Component
function FeatureCard({ icon, titleKey, descKey, delay = 0, lang }: { icon: React.ReactNode; titleKey: string; descKey: string; delay?: number; lang: Language }) {
  return (
    <div 
      className="glass-card rounded-2xl p-6 hover:scale-105 transition-transform duration-300 animate-border-glow"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary mb-4">
        {icon}
      </div>
      <h3 className="font-bold text-lg text-foreground mb-2">{t(titleKey, lang)}</h3>
      <p className="text-sm text-muted-foreground">{t(descKey, lang)}</p>
    </div>
  );
}

export default function Home() {
  const [output, setOutput] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [lang, setLang] = useState<Language>('es');
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState<boolean | null>(null);
  const [showSubscription, setShowSubscription] = useState(false);

  // Check terms acceptance on mount
  useEffect(() => {
    const accepted = localStorage.getItem('termsAccepted') === 'true';
    setHasAcceptedTerms(accepted);
    
    // Load saved language preference
    const savedLang = localStorage.getItem('preferredLanguage') as Language;
    if (savedLang) {
      setLang(savedLang);
    }
  }, []);

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('preferredLanguage', newLang);
  };

  const handleTermsAccept = () => {
    setHasAcceptedTerms(true);
  };

  const handleGenerate = async (apiKey: string, prompt: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey, prompt }),
      });
      const data = await response.json();
      setOutput(data.content || 'Error generating app');
      setShowOutput(true);
    } catch (error) {
      setOutput('Error: ' + (error instanceof Error ? error.message : 'Unknown error'));
      setShowOutput(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading while checking terms
  if (hasAcceptedTerms === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-glow-pulse w-16 h-16 rounded-full bg-primary/50" />
      </div>
    );
  }

  // Show terms agreement if not accepted
  if (!hasAcceptedTerms) {
    return <TermsAgreement lang={lang} onAccept={handleTermsAccept} />;
  }

  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1500ms' }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-chart-3/10 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '3000ms' }} />
      </div>

      {/* Top Navigation Bar */}
      <nav className="relative z-20 border-b border-border/50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl neon-border flex items-center justify-center bg-card">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              </svg>
            </div>
            <span className="font-bold text-lg gradient-text hidden sm:block">Phoenix Forge AI</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowSubscription(true)}
              className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-semibold hover:scale-105 transition-transform text-sm"
            >
              {t('subscription', lang)}
            </button>
            <LanguageSelector currentLang={lang} onLanguageChange={handleLanguageChange} />
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12 md:py-16">
        {/* Company Attribution Section */}
        <div className="glass-card rounded-3xl p-8 mb-12 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            {/* Company Logo/Avatar */}
            <div className="relative">
              <div className="absolute inset-0 bg-primary/40 rounded-full blur-2xl animate-glow-pulse" />
              <div className="relative w-28 h-28 rounded-full neon-border flex items-center justify-center bg-card">
                <svg className="w-14 h-14 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            
            {/* Company Info */}
            <div className="text-center md:text-left">
              <p className="text-xs tracking-[0.3em] text-muted-foreground uppercase mb-2">{t('divisionOf', lang)}</p>
              <h2 className="text-2xl md:text-3xl font-bold mb-1">
                <span className="gradient-text">Flores</span>
                <span className="text-foreground"> Landscape</span>
              </h2>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                <span className="text-foreground">& Design </span>
                <span className="text-primary">LLC</span>
              </h2>
              <p className="text-muted-foreground">{t('phoenixAZ', lang)}</p>
            </div>
          </div>
        </div>

        {/* Main Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <span className="px-4 py-2 rounded-full glass-card text-xs tracking-widest text-primary uppercase">
              {t('floresNoCode', lang)}
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-text-glow">
            <span className="gradient-text">Phoenix</span>
            <br />
            <span className="text-foreground">Forge AI</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('tagline', lang)}
          </p>
          
          <a 
            href="https://phoenixforgeai.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:scale-105 transition-transform neon-border"
          >
            <span>phoenixforgeai.com</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h3 className="text-center text-sm tracking-widest text-muted-foreground uppercase mb-8">{t('leadership', lang)}</h3>
          <div className="flex flex-wrap justify-center gap-12">
            <Avatar name="Hugo Vazquez" role={t('ownerFounder', lang)} delay={0} lang={lang} />
            <Avatar name="Phoenix AI" role={t('aiEngine', lang)} delay={200} lang={lang} />
            <Avatar name="Forge Team" role={t('development', lang)} delay={400} lang={lang} />
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <FeatureCard 
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            }
            titleKey="superAI"
            descKey="superAIDesc"
            delay={0}
            lang={lang}
          />
          <FeatureCard 
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            }
            titleKey="sciFiGraphs"
            descKey="sciFiGraphsDesc"
            delay={100}
            lang={lang}
          />
          <FeatureCard 
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            }
            titleKey="stripe"
            descKey="stripeDesc"
            delay={200}
            lang={lang}
          />
          <FeatureCard 
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            }
            titleKey="ibkr"
            descKey="ibkrDesc"
            delay={300}
            lang={lang}
          />
        </div>

        {/* Generator Form */}
        <div className="mb-12">
          <GeneratorForm onGenerate={handleGenerate} isLoading={isLoading} lang={lang} />
        </div>

        {/* Output Section */}
        {showOutput && (
          <div className="space-y-8">
            <OutputDisplay output={output} lang={lang} />
            <div className="glass-card rounded-3xl p-8 neon-border">
              <h3 className="text-2xl font-bold mb-6 gradient-text">
                {t('previewGraphs', lang)}
              </h3>
              <div className="bg-background/50 border border-border p-6 rounded-2xl">
                <DemoChart />
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-border text-center">
          <div className="glass-card rounded-2xl p-6 inline-block">
            <p className="text-sm text-muted-foreground mb-2">
              {t('intellectualProperty', lang)}
            </p>
            <p className="font-bold text-lg">
              <span className="gradient-text">Flores Landscape & Design LLC</span>
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Hugo Vazquez, {t('owner', lang)} | Phoenix, AZ
            </p>
          </div>
        </footer>
      </div>

      {/* Subscription Modal */}
      <SubscriptionModal 
        lang={lang} 
        isOpen={showSubscription} 
        onClose={() => setShowSubscription(false)} 
      />
    </main>
  );
}
