'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface GeneratorFormProps {
  onGenerate: (apiKey: string, prompt: string) => void;
  isLoading: boolean;
}

export function GeneratorForm({ onGenerate, isLoading }: GeneratorFormProps) {
  const [apiKey, setApiKey] = useState('');
  const [prompt, setPrompt] = useState('');
  const [showKey, setShowKey] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim() || !prompt.trim()) {
      alert('Pon tu API Key y el prompt');
      return;
    }
    onGenerate(apiKey, prompt);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card border border-border rounded-3xl p-8 md:p-10 space-y-6"
    >
      {/* API Key Input */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">
          OpenAI API Key (gpt-4o-mini)
        </label>
        <div className="relative flex gap-2">
          <input
            type={showKey ? 'text' : 'password'}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-..."
            className="flex-1 bg-input border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowKey(!showKey)}
            className="px-4 py-3 bg-secondary text-secondary-foreground rounded-xl font-medium hover:bg-secondary/80 transition-colors"
            disabled={isLoading}
          >
            {showKey ? 'Ocultar' : 'Mostrar'}
          </button>
        </div>
      </div>

      {/* Prompt Textarea */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">
          Tu Idea de App
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={5}
          placeholder="Ej: Crea app tracker penny stocks TMRC con alerts, IBKR, Stripe y graphs de precio"
          className="w-full bg-input border border-border rounded-xl px-6 py-4 text-base text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          disabled={isLoading}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-primary-foreground font-bold py-6 md:py-8 rounded-2xl text-lg md:text-2xl transition-all duration-200"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="inline-block w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
            Generando...
          </span>
        ) : (
          '🚀 GENERAR APP CON SUPER AI'
        )}
      </button>
    </form>
  );
}
