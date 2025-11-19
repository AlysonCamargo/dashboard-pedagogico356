import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageBase64, formData } = await req.json();
    console.log('Analisando artefato...');

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY não configurada');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Buscar artefatos conhecidos para contexto
    const { data: knownArtifacts } = await supabase
      .from('known_artifacts')
      .select('*');

    console.log(`Encontrados ${knownArtifacts?.length || 0} artefatos no banco`);

    // Criar contexto com artefatos conhecidos
    const artifactsContext = knownArtifacts?.map(a => 
      `- ${a.name} (${a.type}): ${a.material}, ${a.period}. ${a.description}`
    ).join('\n') || '';

    // Analisar imagem usando Lovable AI
    const analysisPrompt = `Você é um arqueólogo especialista em artefatos latino-americanos. Analise esta imagem de artefato arqueológico.

Artefatos conhecidos no banco de dados:
${artifactsContext}

Dados fornecidos pelo usuário:
- Localização: ${formData.location || 'Não informada'}
- Material observado: ${formData.material || 'Não informado'}
- Tamanho: ${formData.size || 'Não informado'}
- Cor: ${formData.color || 'Não informada'}
- Contexto de descoberta: ${formData.context || 'Não informado'}

Por favor, forneça:
1. Identificação precisa do artefato (tipo e nome)
2. Material provável
3. Período histórico estimado
4. Confiança na identificação (0 a 1)
5. Análise técnica detalhada (forma, técnica de fabricação, estado de conservação, dimensões estimadas)
6. Comparação com os 3 artefatos conhecidos mais similares do banco (com score de similaridade 0-1)

Responda em formato JSON com esta estrutura:
{
  "identification": "nome do artefato",
  "material": "material",
  "period": "período",
  "confidence": 0.85,
  "technicalAnalysis": {
    "shape": "descrição da forma",
    "workmanship": "técnica de fabricação",
    "preservation": "estado",
    "dimensions": "dimensões estimadas"
  },
  "similarArtifacts": [
    {
      "name": "nome",
      "similarity": 0.92,
      "location": "local",
      "period": "período"
    }
  ]
}`;

    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: analysisPrompt },
              { type: 'image_url', image_url: { url: imageBase64 } }
            ]
          }
        ],
        temperature: 0.7,
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('Erro na API de IA:', aiResponse.status, errorText);
      throw new Error(`Erro na análise: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    console.log('Resposta da IA recebida');
    
    const content = aiData.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error('Resposta da IA inválida');
    }

    // Extrair JSON da resposta
    let analysisResult;
    try {
      // Tentar encontrar JSON na resposta
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysisResult = JSON.parse(jsonMatch[0]);
      } else {
        analysisResult = JSON.parse(content);
      }
    } catch (e) {
      console.error('Erro ao parsear JSON:', e);
      // Fallback: criar estrutura básica
      analysisResult = {
        identification: "Artefato não identificado",
        material: "Indeterminado",
        period: "Período indefinido",
        confidence: 0.5,
        technicalAnalysis: {
          shape: "Análise pendente",
          workmanship: "Análise pendente",
          preservation: "Análise pendente",
          dimensions: "Análise pendente"
        },
        similarArtifacts: []
      };
    }

    // Salvar análise no banco de dados
    const authHeader = req.headers.get('authorization');
    let userId = null;
    
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      const { data: { user } } = await supabase.auth.getUser(token);
      userId = user?.id;
    }

    if (userId) {
      await supabase.from('artifact_analyses').insert({
        user_id: userId,
        identification: analysisResult.identification,
        confidence: analysisResult.confidence,
        period: analysisResult.period,
        material: analysisResult.material,
        technical_analysis: analysisResult.technicalAnalysis,
        similar_artifacts: analysisResult.similarArtifacts,
        location: formData.location,
        form_data: formData
      });
    }

    console.log('Análise concluída com sucesso');

    return new Response(JSON.stringify(analysisResult), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Erro na função:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Erro desconhecido',
        details: 'Falha na análise do artefato'
      }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
