'use client';

import { useState } from 'react';
import { Language, t } from '@/lib/translations';

interface OutputDisplayProps {
  output: string;
  lang: Language;
}

export function OutputDisplay({ output, lang }: OutputDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExport = () => {
    alert(t('exportCode', lang) + ' - ' + (lang === 'es' ? 'En produccion real se descarga archivo' : 'In production, file will download'));
  };

  const handlePublish = () => {
    alert(t('publishDomain', lang) + ' - phoenixforgeai.com');
  };

  return (
    <div className="relative">
      {/* Background glow */}
      <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl" />
      
      <div className="relative glass-card neon-border rounded-3xl p-8 space-y-6">
        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center shrink-0">
            <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold gradient-text">
              {t('appGenerated', lang)}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {lang === 'es' ? 'Codigo listo para produccion con todas las integraciones' : 'Production-ready code with all integrations'}
            </p>
          </div>
        </div>

        {/* Code Output */}
        <div className="relative">
          <div className="absolute top-3 right-3 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive/80" />
            <div className="w-3 h-3 rounded-full bg-chart-4/80" />
            <div className="w-3 h-3 rounded-full bg-primary/80" />
          </div>
          <div className="bg-background/80 border border-border rounded-2xl p-6 pt-10 overflow-auto max-h-96">
            <pre className="text-xs md:text-sm text-foreground font-mono whitespace-pre-wrap break-words leading-relaxed">
              {output}
            </pre>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="glass-card rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-primary">{output.split('\n').length}</p>
            <p className="text-xs text-muted-foreground">{lang === 'es' ? 'Lineas' : 'Lines'}</p>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-accent">{output.length}</p>
            <p className="text-xs text-muted-foreground">{lang === 'es' ? 'Caracteres' : 'Characters'}</p>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-chart-3">{lang === 'es' ? 'Listo' : 'Ready'}</p>
            <p className="text-xs text-muted-foreground">Status</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-3 gap-4">
          <button
            onClick={handleCopy}
            className="glass-card hover:bg-secondary/30 text-foreground font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            {copied ? (
              <>
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {t('copied', lang)}
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                {t('copyCode', lang)}
              </>
            )}
          </button>
          <button
            onClick={handleExport}
            className="glass-card hover:bg-secondary/30 text-foreground font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            {lang === 'es' ? 'Exportar ZIP' : 'Export ZIP'}
          </button>
          <button
            onClick={handlePublish}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-primary/50 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {lang === 'es' ? 'Publicar' : 'Publish'}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
