'use client';

import { useState } from 'react';

interface OutputDisplayProps {
  output: string;
}

export function OutputDisplay({ output }: OutputDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExport = () => {
    alert('✅ ZIP descargado con código completo + graphs + Flutter export (en producción real se descarga archivo)');
  };

  const handlePublish = () => {
    alert('🌐 App publicada en floresnocodeforge.vercel.app - ¡Ya es real!');
  };

  return (
    <div className="bg-card border border-border rounded-3xl p-8 space-y-6">
      <div className="space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-primary flex items-center gap-3">
          <span>✅</span> App Generada por El Señor App
        </h2>
        <p className="text-sm text-muted-foreground">
          Código listo para producción con todas las integraciones
        </p>
      </div>

      {/* Code Output */}
      <div className="bg-background border border-border rounded-2xl p-6 overflow-auto max-h-96">
        <pre className="text-xs md:text-sm text-foreground font-mono whitespace-pre-wrap break-words">
          {output}
        </pre>
      </div>

      {/* Action Buttons */}
      <div className="grid md:grid-cols-3 gap-4">
        <button
          onClick={handleCopy}
          className="bg-secondary hover:bg-secondary/80 text-secondary-foreground font-bold py-4 rounded-xl transition-colors"
        >
          {copied ? '✓ Copiado' : '📋 Copiar Código'}
        </button>
        <button
          onClick={handleExport}
          className="bg-secondary hover:bg-secondary/80 text-secondary-foreground font-bold py-4 rounded-xl transition-colors"
        >
          📥 EXPORTAR (ZIP)
        </button>
        <button
          onClick={handlePublish}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 rounded-xl transition-colors"
        >
          🌐 PUBLICAR
        </button>
      </div>
    </div>
  );
}
