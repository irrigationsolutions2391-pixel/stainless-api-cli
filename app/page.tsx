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
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-3">
            FLORESNOCODE FORGE V2
          </h1>
          <p className="text-xl md:text-3xl text-accent mb-2">
            El AI que forja apps millonarias – Phoenix, AZ
          </p>
          <p className="text-sm text-muted-foreground mt-3">
            100% propiedad de FloresLandscapeDesignLlc • Hugo Vázquez Owner
          </p>
          <a 
            href="https://PhoenixForgeAI.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block mt-4 text-primary hover:underline font-semibold"
          >
            PhoenixForgeAI.com
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
