-- Criar tabela de artefatos conhecidos
CREATE TABLE public.known_artifacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  material TEXT NOT NULL,
  period TEXT NOT NULL,
  description TEXT NOT NULL,
  location_found TEXT,
  characteristics JSONB,
  image_features JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de análises de artefatos
CREATE TABLE public.artifact_analyses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  image_url TEXT,
  identification TEXT NOT NULL,
  confidence DECIMAL(3,2) NOT NULL,
  period TEXT,
  material TEXT,
  technical_analysis JSONB,
  similar_artifacts JSONB,
  location TEXT,
  form_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.known_artifacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artifact_analyses ENABLE ROW LEVEL SECURITY;

-- Políticas para artefatos conhecidos (público para leitura)
CREATE POLICY "Artefatos conhecidos são visíveis para todos" 
ON public.known_artifacts 
FOR SELECT 
USING (true);

-- Políticas para análises (usuários veem apenas suas próprias)
CREATE POLICY "Usuários podem ver suas próprias análises" 
ON public.artifact_analyses 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem criar suas próprias análises" 
ON public.artifact_analyses 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Inserir artefatos conhecidos
INSERT INTO public.known_artifacts (name, type, material, period, description, location_found, characteristics, image_features) VALUES
(
  'Ponta de Flecha de Quartzo',
  'Ponta de Projétil',
  'Quartzo leitoso',
  'Período Arcaico (8000-1000 a.C.)',
  'Ponta de flecha trabalhada em quartzo com técnica de lascamento. Apresenta forma triangular com base côncava.',
  'Brasil - Região Sul',
  '{"forma": "triangular", "base": "côncava", "retoque": "bifacial", "tamanho_medio": "2.5-4cm"}',
  '{"cor": "branco leitoso", "textura": "lisa", "brilho": "vítreo", "translucidez": "opaca a translúcida"}'
),
(
  'Machado de Pedra Polida',
  'Ferramenta de Corte',
  'Rocha basáltica',
  'Período Neolítico (3000-1000 a.C.)',
  'Machado confeccionado através da técnica de polimento. Apresenta gume afiado e sulco para encabamento.',
  'Brasil - Litoral',
  '{"forma": "oval alongada", "gume": "afiado", "sulco": "presente", "tamanho_medio": "8-15cm"}',
  '{"cor": "cinza escuro a preto", "textura": "polida", "brilho": "fosco a semibrillhante", "peso": "pesado"}'
),
(
  'Cerâmica Marajoara',
  'Vasilha Cerimonial',
  'Argila com decoração pintada',
  'Fase Marajoara (400-1400 d.C.)',
  'Cerâmica característica da cultura Marajoara com decorações geométricas e zoomorfas.',
  'Ilha de Marajó - PA',
  '{"forma": "globular", "decoracao": "pintada e incisa", "motivos": "geométricos e zoomorfos", "tamanho_medio": "20-40cm"}',
  '{"cor": "vermelho, preto, branco", "textura": "lisa", "decoracao": "complexa", "espessura": "média a grossa"}'
);
