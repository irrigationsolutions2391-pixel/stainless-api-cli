'use client';

import { GeneratorForm } from '@/components/generator-form';
import { OutputDisplay } from '@/components/output-display';
import { DemoChart } from '@/components/demo-chart';
import { useState } from 'react';

export default function Home() {
  const [output, setOutput] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [showOutput, setShowOutput] = useState(false);

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

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-5xl mx-auto px-4 py-8 md:p-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-3">
            <p className="text-sm text-muted-foreground font-semibold tracking-widest uppercase mb-2">
              FloresNoCode Forge V2 by FloresLandscapeDesignLlc
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-primary mb-2">
              Phoenix Forge AI
            </h1>
          </div>
          <p className="text-xl md:text-3xl text-accent mb-4">
            El AI que forja apps millonarias
          </p>
          <p className="text-lg text-muted-foreground mb-6">
            Phoenix, AZ • Propiedad de Hugo Vázquez
          </p>
          <a 
            href="https://phoenixforgeai.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            phoenixforgeai.com
          </a>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: '🤖', label: 'Super AI', desc: 'gpt-4o-mini más chingón' },
            { icon: '📊', label: 'Graphs', desc: 'Chart.js completo' },
            { icon: '💳', label: 'Stripe', desc: 'Monetización integrada' },
            { icon: '📈', label: 'IBKR', desc: 'Penny stocks tracker' },
          ].map((feature, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-6 text-center">
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="font-bold text-primary mb-1">{feature.label}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Generator Form */}
        <div className="mb-12">
          <GeneratorForm onGenerate={handleGenerate} isLoading={isLoading} />
        </div>

        {/* Output Section */}
        {showOutput && (
          <div className="space-y-8">
            <OutputDisplay output={output} />
            <div className="bg-card border border-border rounded-3xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-primary">
                Preview con Graphs (Chart.js)
              </h3>
              <div className="bg-background border border-border p-6 rounded-2xl">
                <DemoChart />
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
