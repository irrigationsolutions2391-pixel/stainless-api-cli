import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `Eres el AI Supremo de FloresNoCode Forge V2 (FloresLandscapeDesignLlc - Hugo Vázquez owner). 
Genera app COMPLETA desde prompt usuario. Responde con formato estructurado:

1. NOMBRE APP
2. UI COMPLETA (HTML + Tailwind listo para producción)
3. LÓGICA JS PRINCIPAL (funciones clave)
4. DB SCHEMA (Supabase/Xano para persistencia)
5. MONETIZACIÓN STRIPE (configuración básica)
6. INTEGRACIONES (IBKR si penny stocks, APIs relevantes)
7. GRAPHS CON CHART.JS (si aplica data/precios)

Genera código production-ready. Todo es propiedad intelectual exclusiva de FloresLandscapeDesignLlc.`;

export async function POST(request: NextRequest) {
  try {
    const { apiKey, prompt } = await request.json();

    if (!apiKey || !prompt) {
      return NextResponse.json(
        { error: 'API Key y prompt son requeridos' },
        { status: 400 }
      );
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: prompt },
        ],
        max_tokens: 6500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.error?.message || 'Error con OpenAI API' },
        { status: response.status }
      );
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || '';

    return NextResponse.json({
      content,
      model: 'gpt-4o-mini',
      tokens: data.usage?.total_tokens || 0,
    });
  } catch (error) {
    console.error('Generate API error:', error);
    return NextResponse.json(
      { error: 'Error procesando tu solicitud' },
      { status: 500 }
    );
  }
}
