'use client';

import { useState } from 'react';
import { Language, t } from '@/lib/translations';

interface GeneratorFormProps {
  onGenerate: (apiKey: string, prompt: string) => void;
  isLoading: boolean;
  lang: Language;
}

export function GeneratorForm({ onGenerate, isLoading, lang }: GeneratorFormProps) {
  const [apiKey, setApiKey] = useState('');
  const [prompt, setPrompt] = useState('');
  const [showKey, setShowKey] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim() || !prompt.trim()) {
      alert(lang === 'es' ? 'Pon tu API Key y el prompt' : 'Please enter your API Key and prompt');
      return;
    }
    onGenerate(apiKey, prompt);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative"
    >
      {/* Background glow */}
      <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl" />
      
      <div className="relative glass-card neon-border rounded-3xl p-8 md:p-10 space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold gradient-text mb-2">Forge Your App</h2>
          <p className="text-sm text-muted-foreground">Transform your idea into a complete application</p>
        </div>

        {/* API Key Input */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-medium text-foreground">
            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
            OpenAI API Key
          </label>
          <div className="relative flex gap-3">
            <input
              type={showKey ? 'text' : 'password'}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder={t('apiKeyPlaceholder', lang)}
              className="flex-1 bg-input border border-border rounded-xl px-5 py-4 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              className="px-5 py-4 glass-card text-foreground rounded-xl font-medium hover:bg-secondary/50 transition-all flex items-center gap-2"
              disabled={isLoading}
            >
              {showKey ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                  <span className="hidden sm:inline">{t('hideApiKey', lang)}</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span className="hidden sm:inline">{t('showApiKey', lang)}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Prompt Textarea */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-medium text-foreground">
            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            {lang === 'es' ? 'Tu Idea de App' : 'Your App Idea'}
          </label>
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={5}
              placeholder={t('promptPlaceholder', lang)}
              className="w-full bg-input border border-border rounded-xl px-5 py-4 text-base text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all"
              disabled={isLoading}
            />
            <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
              {prompt.length} chars
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="relative w-full group"
        >
          <div className="absolute -inset-1 bg-primary/50 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity" />
          <div className="relative w-full bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-primary-foreground font-bold py-6 md:py-8 rounded-2xl text-lg md:text-2xl transition-all duration-200 flex items-center justify-center gap-3">
            {isLoading ? (
              <>
                <div className="w-6 h-6 border-3 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                <span>{t('generating', lang)}</span>
              </>
            ) : (
              <>
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>{t('generateButton', lang)}</span>
              </>
            )}
          </div>
        </button>

        {/* Powered by */}
        <p className="text-center text-xs text-muted-foreground">
          Powered by GPT-4o-mini | Phoenix Forge AI Engine
        </p>
      </div>
    </form>
  );
}
