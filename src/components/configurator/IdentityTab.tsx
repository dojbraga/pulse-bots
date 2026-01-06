import { useState } from 'react';
import { 
  ChevronDown, 
  Building2, 
  MessageSquare, 
  Clock, 
  Zap, 
  Sparkles,
  Globe,
  Users,
  Smile,
  Timer,
  Send,
  Ban,
  Target,
  Brain,
  Lightbulb,
  TrendingUp,
  Heart,
  Volume2,
  Gauge,
  Star,
  Info,
  RefreshCw,
  MessageCircle,
  ShoppingCart,
  DollarSign,
  AlertCircle,
  HelpCircle,
  Pause,
  Plus,
  Trash2,
  Edit3,
  Moon,
  Pencil,
  Copy,
  Check,
  FileText
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Agent, FollowUpStage, FollowUpTemplate } from '@/types/agent';

interface IdentityTabProps {
  agent: Agent;
  onUpdate: (updates: Partial<Agent>) => void;
}

const DAYS_OF_WEEK = [
  { key: 'monday', label: 'Segunda' },
  { key: 'tuesday', label: 'Terça' },
  { key: 'wednesday', label: 'Quarta' },
  { key: 'thursday', label: 'Quinta' },
  { key: 'friday', label: 'Sexta' },
  { key: 'saturday', label: 'Sábado' },
  { key: 'sunday', label: 'Domingo' },
];

const INDUSTRIES = [
  'Educação',
  'Tecnologia',
  'Saúde',
  'Finanças',
  'E-commerce',
  'Imobiliário',
  'Consultoria',
  'Marketing',
  'Varejo',
  'Serviços',
  'Outro',
];

const PERSONA_DETAILS = {
  consultor: { icon: '🎓', color: 'bg-blue-500/10 border-blue-500/30 text-blue-400', description: 'Educa e orienta o lead durante toda jornada' },
  agressivo: { icon: '🔥', color: 'bg-orange-500/10 border-orange-500/30 text-orange-400', description: 'Foco total em conversão e fechamento rápido' },
  suporte: { icon: '🤝', color: 'bg-green-500/10 border-green-500/30 text-green-400', description: 'Resolve problemas e cria relacionamento' },
  closer: { icon: '🎯', color: 'bg-purple-500/10 border-purple-500/30 text-purple-400', description: 'Especialista em fechar negócios' },
  qualificador: { icon: '🔍', color: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400', description: 'Identifica leads com alto potencial' },
};

const VOICE_TONE_DETAILS = {
  empatico: { icon: '💙', description: 'Compreensivo e acolhedor' },
  direto: { icon: '⚡', description: 'Objetivo e sem rodeios' },
  amigavel: { icon: '😊', description: 'Descontraído e próximo' },
  profissional: { icon: '👔', description: 'Formal e corporativo' },
  entusiasmado: { icon: '🚀', description: 'Energético e motivador' },
};

const FOLLOW_UP_STAGES: { key: FollowUpStage; label: string; icon: React.ReactNode; description: string; color: string }[] = [
  { key: 'initial_contact', label: 'Contato Inicial', icon: <MessageCircle className="h-4 w-4" />, description: 'Lead iniciou mas não engajou', color: 'bg-slate-500/10 border-slate-500/30 text-slate-400' },
  { key: 'product_aware', label: 'Conheceu Produto', icon: <Star className="h-4 w-4" />, description: 'Viu produto mas não perguntou preço', color: 'bg-blue-500/10 border-blue-500/30 text-blue-400' },
  { key: 'price_aware', label: 'Conheceu Preço', icon: <DollarSign className="h-4 w-4" />, description: 'Sabe o preço mas não comprou', color: 'bg-green-500/10 border-green-500/30 text-green-400' },
  { key: 'objection_raised', label: 'Fez Objeção', icon: <AlertCircle className="h-4 w-4" />, description: 'Levantou objeção e saiu', color: 'bg-orange-500/10 border-orange-500/30 text-orange-400' },
  { key: 'cart_abandoned', label: 'Carrinho Abandonado', icon: <ShoppingCart className="h-4 w-4" />, description: 'Iniciou checkout mas não finalizou', color: 'bg-red-500/10 border-red-500/30 text-red-400' },
  { key: 'negotiation', label: 'Em Negociação', icon: <RefreshCw className="h-4 w-4" />, description: 'Pedindo desconto ou condição especial', color: 'bg-purple-500/10 border-purple-500/30 text-purple-400' },
  { key: 'waiting_decision', label: 'Vai Pensar', icon: <Pause className="h-4 w-4" />, description: 'Disse que vai pensar/analisar', color: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400' },
];

export function IdentityTab({ agent, onUpdate }: IdentityTabProps) {
  const [openSections, setOpenSections] = useState({
    personality: true,
    company: true,
    goals: false,
    communication: true,
    messages: false,
    behavior: false,
    followUp: false,
    availability: false,
    advanced: false,
  });
  
  const [editingTemplate, setEditingTemplate] = useState<string | null>(null);
  const [selectedStage, setSelectedStage] = useState<FollowUpStage>('initial_contact');

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const updateBusinessHours = (day: string, field: 'start' | 'end' | 'active', value: string | boolean) => {
    const newSchedule = { ...agent.businessHours.schedule };
    newSchedule[day] = { ...newSchedule[day], [field]: value };
    onUpdate({
      businessHours: { ...agent.businessHours, schedule: newSchedule },
    });
  };

  const updatePersonalityTrait = (trait: string, value: number) => {
    onUpdate({
      personalityTraits: { ...agent.personalityTraits, [trait]: value },
    });
  };

  const getPersonalityLabel = (value: number) => {
    if (value <= 25) return 'Baixo';
    if (value <= 50) return 'Moderado';
    if (value <= 75) return 'Alto';
    return 'Muito Alto';
  };

  const formatDelay = (minutes: number) => {
    if (minutes < 60) return `${minutes}min`;
    if (minutes < 1440) return `${Math.round(minutes / 60)}h`;
    return `${Math.round(minutes / 1440)}d`;
  };

  const getTemplatesForStage = (stage: FollowUpStage) => {
    return agent.followUpStrategy?.templates.filter(t => t.stage === stage) || [];
  };

  const updateFollowUpStrategy = (updates: Partial<typeof agent.followUpStrategy>) => {
    onUpdate({
      followUpStrategy: { ...agent.followUpStrategy!, ...updates },
    });
  };

  const updateTemplate = (templateId: string, updates: Partial<FollowUpTemplate>) => {
    const newTemplates = agent.followUpStrategy!.templates.map(t =>
      t.id === templateId ? { ...t, ...updates } : t
    );
    updateFollowUpStrategy({ templates: newTemplates });
  };

  const addTemplate = (stage: FollowUpStage) => {
    const existingForStage = getTemplatesForStage(stage);
    const newAttempt = existingForStage.length + 1;
    const newTemplate: FollowUpTemplate = {
      id: `fup_${stage}_${Date.now()}`,
      stage,
      attempt: newAttempt,
      delayMinutes: newAttempt === 1 ? 30 : 1440 * newAttempt,
      message: '',
      isActive: true,
    };
    updateFollowUpStrategy({
      templates: [...agent.followUpStrategy!.templates, newTemplate],
    });
    setEditingTemplate(newTemplate.id);
  };

  const deleteTemplate = (templateId: string) => {
    updateFollowUpStrategy({
      templates: agent.followUpStrategy!.templates.filter(t => t.id !== templateId),
    });
  };

  const [copied, setCopied] = useState(false);

  const generateSystemPrompt = () => {
    const persona = PERSONA_DETAILS[agent.persona];
    const tone = VOICE_TONE_DETAILS[agent.voiceTone];
    const traits = agent.personalityTraits;
    
    const responseLengthMap = {
      conciso: 'curtas e diretas (máximo 2-3 frases)',
      equilibrado: 'de tamanho moderado (3-5 frases)',
      detalhado: 'completas e detalhadas quando necessário'
    };

    const formalityMap = {
      informal: 'informal e descontraída, como se estivesse conversando com um amigo',
      neutro: 'equilibrada, nem muito formal nem muito informal',
      formal: 'formal e profissional, adequada para ambiente corporativo'
    };

    const proactivityMap = {
      baixo: 'Seja reativo - responda apenas quando perguntado, evite insistir.',
      medio: 'Seja moderadamente proativo - faça perguntas relevantes e sugira próximos passos quando apropriado.',
      alto: 'Seja altamente proativo - conduza ativamente a conversa, faça perguntas de qualificação e guie o lead para a conversão.'
    };

    const goalMap: Record<string, string> = {
      conversion: 'converter o lead em cliente',
      qualification: 'qualificar o lead e identificar oportunidades',
      support: 'resolver dúvidas e dar suporte',
      relationship: 'construir relacionamento e confiança',
      build_relationship: 'construir relacionamento e confiança',
      scheduling: 'agendar reuniões ou demonstrações',
      information: 'fornecer informações sobre produtos/serviços'
    };

    let prompt = `# Identidade do Agente

Você é ${agent.name}, um agente de vendas ${persona?.description?.toLowerCase() || 'especializado'}.

## Perfil
- **Persona**: ${agent.persona.charAt(0).toUpperCase() + agent.persona.slice(1)} ${persona?.icon || ''}
- **Tom de voz**: ${tone?.description || agent.voiceTone} ${tone?.icon || ''}
- **Idioma**: ${agent.language === 'pt-BR' ? 'Português (Brasil)' : agent.language}

## Traços de Personalidade (escala 0-100)
- Empatia: ${traits?.empathy ?? 50}/100 ${(traits?.empathy ?? 50) >= 70 ? '- Demonstre compreensão genuína pelos desafios do cliente' : ''}
- Assertividade: ${traits?.assertiveness ?? 50}/100 ${(traits?.assertiveness ?? 50) >= 70 ? '- Seja direto e conduza para a ação' : ''}
- Paciência: ${traits?.patience ?? 50}/100 ${(traits?.patience ?? 50) >= 70 ? '- Não apresse o cliente, responda com calma' : ''}
- Entusiasmo: ${traits?.enthusiasm ?? 50}/100 ${(traits?.enthusiasm ?? 50) >= 70 ? '- Mostre energia e paixão pelo que oferece' : ''}
- Urgência: ${traits?.urgency ?? 50}/100 ${(traits?.urgency ?? 50) >= 70 ? '- Crie senso de escassez e oportunidade' : ''}

# Contexto da Empresa

${agent.companyName ? `**Empresa**: ${agent.companyName}` : ''}
${agent.industry ? `**Segmento**: ${agent.industry}` : ''}
${agent.companyDescription ? `**Sobre**: ${agent.companyDescription}` : ''}
${agent.targetAudience ? `**Público-alvo**: ${agent.targetAudience}` : ''}
${agent.uniqueSellingPoints ? `**Diferenciais**: ${agent.uniqueSellingPoints}` : ''}

# Objetivos

- **Objetivo principal**: ${goalMap[agent.primaryGoal || 'conversion'] || agent.primaryGoal}
${agent.secondaryGoal ? `- **Objetivo secundário**: ${goalMap[agent.secondaryGoal] || agent.secondaryGoal}` : ''}
${agent.successMetric ? `- **Métrica de sucesso**: ${agent.successMetric}` : ''}

# Estilo de Comunicação

- Use respostas ${responseLengthMap[agent.responseLength]}
- Mantenha uma linguagem ${formalityMap[agent.formalityLevel]}
${agent.useEmojis ? '- Use emojis moderadamente para tornar a conversa mais humanizada' : '- NÃO use emojis nas mensagens'}

# Comportamento

${proactivityMap[agent.proactivityLevel]}

## Mensagens Padrão
- **Boas-vindas**: "${agent.greetingMessage}"
- **Despedida**: "${agent.farewellMessage}"
${agent.awayMessage ? `- **Ausência**: "${agent.awayMessage}"` : ''}

# Regras de Negócio
`;

    if (agent.forbiddenWords?.length > 0) {
      prompt += `\n## Palavras Proibidas\nNUNCA use estas palavras: ${agent.forbiddenWords.join(', ')}\n`;
    }

    if (agent.discountLimit > 0) {
      prompt += `\n## Limite de Desconto\nVocê pode oferecer no máximo ${agent.discountLimit}% de desconto.\n`;
    }

    if (agent.handoffContact) {
      prompt += `\n## Handoff\nQuando necessário transferir para humano, encaminhe para: ${agent.handoffContact}\n`;
    }

    if (agent.products?.length > 0) {
      prompt += `\n# Catálogo de Produtos\n\n`;
      agent.products.forEach((product, i) => {
        prompt += `## ${i + 1}. ${product.name}\n`;
        prompt += `- **Preço**: R$ ${product.price.toLocaleString('pt-BR')}\n`;
        prompt += `- **Descrição**: ${product.description}\n`;
        if (product.faq?.length > 0) {
          prompt += `- **FAQ**:\n`;
          product.faq.forEach(faq => {
            prompt += `  - P: ${faq.question}\n    R: ${faq.answer}\n`;
          });
        }
        prompt += '\n';
      });
    }

    if (agent.objectionRules?.length > 0) {
      prompt += `\n# Tratamento de Objeções\n\n`;
      agent.objectionRules.forEach((rule, i) => {
        prompt += `${i + 1}. **Quando**: ${rule.trigger}\n   **Ação**: ${rule.action}\n\n`;
      });
    }

    if (agent.followUpStrategy?.enabled && agent.followUpStrategy.templates?.length > 0) {
      prompt += `\n# Estratégia de Follow-up\n\n`;
      prompt += `- Máximo de ${agent.followUpStrategy.maxDailyMessages} mensagens por dia\n`;
      prompt += `- ${agent.followUpStrategy.respectQuietHours ? `Respeitar horário silencioso (${agent.followUpStrategy.quietHoursStart} - ${agent.followUpStrategy.quietHoursEnd})` : 'Pode enviar a qualquer hora'}\n`;
      prompt += `- ${agent.followUpStrategy.stopOnNegativeResponse ? 'Parar se o lead responder negativamente' : 'Continuar mesmo com respostas negativas'}\n\n`;
      
      const stageLabels: Record<string, string> = {
        initial_contact: 'Contato Inicial',
        product_aware: 'Conheceu Produto',
        price_aware: 'Conheceu Preço',
        objection_raised: 'Fez Objeção',
        cart_abandoned: 'Carrinho Abandonado',
        negotiation: 'Em Negociação',
        waiting_decision: 'Vai Pensar'
      };

      const activeTemplates = agent.followUpStrategy.templates.filter(t => t.isActive);
      const groupedByStage = activeTemplates.reduce((acc, t) => {
        if (!acc[t.stage]) acc[t.stage] = [];
        acc[t.stage].push(t);
        return acc;
      }, {} as Record<string, FollowUpTemplate[]>);

      Object.entries(groupedByStage).forEach(([stage, templates]) => {
        prompt += `## ${stageLabels[stage] || stage}\n`;
        templates.sort((a, b) => a.attempt - b.attempt).forEach(t => {
          prompt += `- #${t.attempt} (após ${formatDelay(t.delayMinutes)}): "${t.message}"\n`;
        });
        prompt += '\n';
      });
    }

    if (agent.businessHours?.enabled) {
      prompt += `\n# Horário de Atendimento\n\n`;
      prompt += `Fuso: ${agent.businessHours.timezone}\n`;
      Object.entries(agent.businessHours.schedule).forEach(([day, hours]) => {
        if (hours.active) {
          const dayLabels: Record<string, string> = {
            monday: 'Segunda', tuesday: 'Terça', wednesday: 'Quarta',
            thursday: 'Quinta', friday: 'Sexta', saturday: 'Sábado', sunday: 'Domingo'
          };
          prompt += `- ${dayLabels[day]}: ${hours.start} - ${hours.end}\n`;
        }
      });
      prompt += `\nFora do horário, use a mensagem de ausência.\n`;
    }

    return prompt.trim();
  };

  const copyToClipboard = async () => {
    const prompt = agent.systemPrompt || generateSystemPrompt();
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const personaDetail = PERSONA_DETAILS[agent.persona] || PERSONA_DETAILS.consultor;
  const toneDetail = VOICE_TONE_DETAILS[agent.voiceTone] || VOICE_TONE_DETAILS.profissional;

  return (
    <TooltipProvider>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-1">Identidade & Comportamento</h3>
          <p className="text-sm text-muted-foreground">Configure a personalidade, contexto e comportamento do seu agente de vendas.</p>
        </div>

        {/* Persona Preview Card */}
        <div className="p-4 rounded-xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="flex items-start gap-4">
            <div className="text-4xl">{personaDetail.icon}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-foreground">{agent.name || 'Novo Agente'}</h4>
                <Badge className={`${personaDetail.color} border`}>
                  {agent.persona.charAt(0).toUpperCase() + agent.persona.slice(1)}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {toneDetail.icon} {agent.voiceTone.charAt(0).toUpperCase() + agent.voiceTone.slice(1)}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{personaDetail.description}</p>
              <div className="flex flex-wrap gap-2 text-xs">
                {agent.companyName && (
                  <span className="px-2 py-1 rounded-full bg-muted text-muted-foreground">
                    🏢 {agent.companyName}
                  </span>
                )}
                {agent.industry && (
                  <span className="px-2 py-1 rounded-full bg-muted text-muted-foreground">
                    📊 {agent.industry}
                  </span>
                )}
                <span className="px-2 py-1 rounded-full bg-muted text-muted-foreground">
                  📝 {agent.responseLength === 'conciso' ? 'Respostas curtas' : agent.responseLength === 'detalhado' ? 'Respostas detalhadas' : 'Respostas equilibradas'}
                </span>
                {agent.useEmojis && (
                  <span className="px-2 py-1 rounded-full bg-muted text-muted-foreground">
                    😊 Usa emojis
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Basic Identity */}
        <div className="space-y-4 p-4 rounded-lg border border-border bg-card/50">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="font-medium text-foreground">Identidade Básica</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Agente</Label>
              <Input
                id="name"
                value={agent.name}
                onChange={(e) => onUpdate({ name: e.target.value })}
                placeholder="Ex: Vendedor Hunter"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Idioma</Label>
              <Select
                value={agent.language}
                onValueChange={(value) => onUpdate({ language: value })}
              >
                <SelectTrigger id="language">
                  <SelectValue placeholder="Selecione o idioma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pt-BR">🇧🇷 Português (Brasil)</SelectItem>
                  <SelectItem value="pt-PT">🇵🇹 Português (Portugal)</SelectItem>
                  <SelectItem value="en-US">🇺🇸 English (US)</SelectItem>
                  <SelectItem value="es">🇪🇸 Español</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Persona do Agente</Label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {(Object.keys(PERSONA_DETAILS) as Agent['persona'][]).map((persona) => {
                const detail = PERSONA_DETAILS[persona];
                const isSelected = agent.persona === persona;
                return (
                  <button
                    key={persona}
                    onClick={() => onUpdate({ persona })}
                    className={`p-3 rounded-lg border-2 transition-all text-center ${
                      isSelected
                        ? detail.color + ' border-current'
                        : 'border-border hover:border-muted-foreground/50 bg-card/50'
                    }`}
                  >
                    <div className="text-2xl mb-1">{detail.icon}</div>
                    <div className="text-xs font-medium">{persona.charAt(0).toUpperCase() + persona.slice(1)}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            <Label>Tom de Voz</Label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {(Object.keys(VOICE_TONE_DETAILS) as Agent['voiceTone'][]).map((tone) => {
                const detail = VOICE_TONE_DETAILS[tone];
                const isSelected = agent.voiceTone === tone;
                return (
                  <button
                    key={tone}
                    onClick={() => onUpdate({ voiceTone: tone })}
                    className={`p-3 rounded-lg border-2 transition-all text-center ${
                      isSelected
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-muted-foreground/50 bg-card/50'
                    }`}
                  >
                    <div className="text-xl mb-1">{detail.icon}</div>
                    <div className="text-xs font-medium">{tone.charAt(0).toUpperCase() + tone.slice(1)}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Personality Traits */}
        <Collapsible open={openSections.personality} onOpenChange={() => toggleSection('personality')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors">
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-primary" />
              <span className="font-medium text-foreground">Traços de Personalidade</span>
              <Badge variant="secondary" className="text-xs">Novo</Badge>
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${openSections.personality ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 p-4 rounded-lg border border-border bg-card/30 space-y-6">
            <p className="text-sm text-muted-foreground">
              Ajuste os traços de personalidade para criar um agente único. Esses valores influenciam como o agente se comporta em diferentes situações.
            </p>

            <div className="space-y-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-pink-400" />
                    <Label>Empatia</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-3 w-3 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Quanto o agente demonstra compreensão e se conecta emocionalmente com o lead</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <span className="text-sm text-muted-foreground">{getPersonalityLabel(agent.personalityTraits?.empathy ?? 50)}</span>
                </div>
                <Slider
                  value={[agent.personalityTraits?.empathy ?? 50]}
                  onValueChange={([value]) => updatePersonalityTrait('empathy', value)}
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-orange-400" />
                    <Label>Assertividade</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-3 w-3 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">O quão direto e persuasivo o agente é ao conduzir para a venda</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <span className="text-sm text-muted-foreground">{getPersonalityLabel(agent.personalityTraits?.assertiveness ?? 50)}</span>
                </div>
                <Slider
                  value={[agent.personalityTraits?.assertiveness ?? 50]}
                  onValueChange={([value]) => updatePersonalityTrait('assertiveness', value)}
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Gauge className="h-4 w-4 text-blue-400" />
                    <Label>Paciência</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-3 w-3 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Tolerância para explicações longas e leads indecisos</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <span className="text-sm text-muted-foreground">{getPersonalityLabel(agent.personalityTraits?.patience ?? 50)}</span>
                </div>
                <Slider
                  value={[agent.personalityTraits?.patience ?? 50]}
                  onValueChange={([value]) => updatePersonalityTrait('patience', value)}
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <Label>Entusiasmo</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-3 w-3 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Nível de energia e animação nas respostas</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <span className="text-sm text-muted-foreground">{getPersonalityLabel(agent.personalityTraits?.enthusiasm ?? 50)}</span>
                </div>
                <Slider
                  value={[agent.personalityTraits?.enthusiasm ?? 50]}
                  onValueChange={([value]) => updatePersonalityTrait('enthusiasm', value)}
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Volume2 className="h-4 w-4 text-purple-400" />
                    <Label>Urgência</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-3 w-3 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Intensidade ao criar senso de urgência e escassez</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <span className="text-sm text-muted-foreground">{getPersonalityLabel(agent.personalityTraits?.urgency ?? 50)}</span>
                </div>
                <Slider
                  value={[agent.personalityTraits?.urgency ?? 50]}
                  onValueChange={([value]) => updatePersonalityTrait('urgency', value)}
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>
            </div>

            <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
              <div className="flex items-start gap-2">
                <Lightbulb className="h-4 w-4 text-primary mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Dica:</strong> Para vendas B2B, aumente Paciência e reduza Urgência. 
                  Para promoções e ofertas limitadas, aumente Urgência e Assertividade.
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Conversation Goals */}
        <Collapsible open={openSections.goals} onOpenChange={() => toggleSection('goals')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              <span className="font-medium text-foreground">Objetivos da Conversa</span>
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${openSections.goals ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 p-4 rounded-lg border border-border bg-card/30 space-y-4">
            <p className="text-sm text-muted-foreground">
              Defina os objetivos que o agente deve priorizar durante as conversas.
            </p>

            <div className="space-y-2">
              <Label htmlFor="primaryGoal">Objetivo Principal</Label>
              <Select
                value={agent.primaryGoal || 'conversion'}
                onValueChange={(value) => onUpdate({ primaryGoal: value })}
              >
                <SelectTrigger id="primaryGoal">
                  <SelectValue placeholder="Selecione o objetivo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conversion">🎯 Converter em Venda</SelectItem>
                  <SelectItem value="qualification">🔍 Qualificar Lead</SelectItem>
                  <SelectItem value="scheduling">📅 Agendar Reunião/Demo</SelectItem>
                  <SelectItem value="support">🤝 Resolver Dúvidas</SelectItem>
                  <SelectItem value="retention">💎 Reter Cliente</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="secondaryGoal">Objetivo Secundário</Label>
              <Select
                value={agent.secondaryGoal || 'qualification'}
                onValueChange={(value) => onUpdate({ secondaryGoal: value })}
              >
                <SelectTrigger id="secondaryGoal">
                  <SelectValue placeholder="Selecione o objetivo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="collect_info">📋 Coletar Informações</SelectItem>
                  <SelectItem value="build_relationship">🤝 Construir Relacionamento</SelectItem>
                  <SelectItem value="educate">📚 Educar sobre Produto</SelectItem>
                  <SelectItem value="upsell">📈 Fazer Upsell</SelectItem>
                  <SelectItem value="referral">🗣️ Pedir Indicações</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="successMetric">Métrica de Sucesso</Label>
              <Input
                id="successMetric"
                value={agent.successMetric || ''}
                onChange={(e) => onUpdate({ successMetric: e.target.value })}
                placeholder="Ex: Taxa de conversão > 15%, NPS > 8"
              />
              <p className="text-xs text-muted-foreground">Como você mede o sucesso deste agente</p>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Company Context */}
        <Collapsible open={openSections.company} onOpenChange={() => toggleSection('company')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-primary" />
              <span className="font-medium text-foreground">Contexto da Empresa</span>
              <Badge variant="secondary" className="text-xs">Importante</Badge>
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${openSections.company ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 p-4 rounded-lg border border-border bg-card/30 space-y-4">
            <p className="text-sm text-muted-foreground">
              Essas informações ajudam o agente a entender o contexto do seu negócio para conversas mais naturais.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Nome da Empresa</Label>
                <Input
                  id="companyName"
                  value={agent.companyName}
                  onChange={(e) => onUpdate({ companyName: e.target.value })}
                  placeholder="Ex: Escola Premium de Vendas"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry">Segmento/Indústria</Label>
                <Select
                  value={agent.industry}
                  onValueChange={(value) => onUpdate({ industry: value })}
                >
                  <SelectTrigger id="industry">
                    <SelectValue placeholder="Selecione o segmento" />
                  </SelectTrigger>
                  <SelectContent>
                    {INDUSTRIES.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyDescription">Descrição da Empresa</Label>
              <Textarea
                id="companyDescription"
                value={agent.companyDescription}
                onChange={(e) => onUpdate({ companyDescription: e.target.value })}
                placeholder="Descreva brevemente o que sua empresa faz, seus diferenciais e proposta de valor..."
                className="min-h-[80px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetAudience" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Público-Alvo
              </Label>
              <Input
                id="targetAudience"
                value={agent.targetAudience}
                onChange={(e) => onUpdate({ targetAudience: e.target.value })}
                placeholder="Ex: Empreendedores, gestores comerciais, profissionais de vendas"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="uniqueSellingPoints">Diferenciais Competitivos</Label>
              <Textarea
                id="uniqueSellingPoints"
                value={agent.uniqueSellingPoints || ''}
                onChange={(e) => onUpdate({ uniqueSellingPoints: e.target.value })}
                placeholder="Liste os principais diferenciais do seu produto/serviço que o agente deve destacar..."
                className="min-h-[60px]"
              />
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Communication Style */}
        <Collapsible open={openSections.communication} onOpenChange={() => toggleSection('communication')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-primary" />
              <span className="font-medium text-foreground">Estilo de Comunicação</span>
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${openSections.communication ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 p-4 rounded-lg border border-border bg-card/30 space-y-4">
            <div className="space-y-4">
              <div className="space-y-3">
                <Label>Tamanho das Respostas</Label>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground w-20">Conciso</span>
                  <div className="flex-1 flex gap-2">
                    {(['conciso', 'equilibrado', 'detalhado'] as const).map((level) => (
                      <button
                        key={level}
                        onClick={() => onUpdate({ responseLength: level })}
                        className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                          agent.responseLength === level
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted hover:bg-muted/80 text-foreground'
                        }`}
                      >
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </button>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground w-20 text-right">Detalhado</span>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Nível de Formalidade</Label>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground w-20">Informal</span>
                  <div className="flex-1 flex gap-2">
                    {(['informal', 'neutro', 'formal'] as const).map((level) => (
                      <button
                        key={level}
                        onClick={() => onUpdate({ formalityLevel: level })}
                        className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                          agent.formalityLevel === level
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted hover:bg-muted/80 text-foreground'
                        }`}
                      >
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </button>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground w-20 text-right">Formal</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2">
                  <Smile className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <Label htmlFor="useEmojis" className="cursor-pointer">Usar Emojis</Label>
                    <p className="text-xs text-muted-foreground">Incluir emojis nas mensagens para torná-las mais expressivas</p>
                  </div>
                </div>
                <Switch
                  id="useEmojis"
                  checked={agent.useEmojis}
                  onCheckedChange={(checked) => onUpdate({ useEmojis: checked })}
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Messages */}
        <Collapsible open={openSections.messages} onOpenChange={() => toggleSection('messages')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors">
            <div className="flex items-center gap-2">
              <Send className="h-4 w-4 text-primary" />
              <span className="font-medium text-foreground">Mensagens Padrão</span>
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${openSections.messages ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 p-4 rounded-lg border border-border bg-card/30 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="greetingMessage">Mensagem de Boas-vindas</Label>
              <Textarea
                id="greetingMessage"
                value={agent.greetingMessage}
                onChange={(e) => onUpdate({ greetingMessage: e.target.value })}
                placeholder="Olá! 👋 Como posso ajudar você hoje?"
                className="min-h-[60px]"
              />
              <p className="text-xs text-muted-foreground">Primeira mensagem enviada ao iniciar uma conversa</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="farewellMessage">Mensagem de Despedida</Label>
              <Textarea
                id="farewellMessage"
                value={agent.farewellMessage}
                onChange={(e) => onUpdate({ farewellMessage: e.target.value })}
                placeholder="Obrigado pelo contato! Estou à disposição."
                className="min-h-[60px]"
              />
              <p className="text-xs text-muted-foreground">Mensagem enviada ao encerrar uma conversa</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="awayMessage" className="flex items-center gap-2">
                <Ban className="h-4 w-4" />
                Mensagem de Ausência
              </Label>
              <Textarea
                id="awayMessage"
                value={agent.awayMessage}
                onChange={(e) => onUpdate({ awayMessage: e.target.value })}
                placeholder="Estamos fora do horário de atendimento. Retornaremos em breve!"
                className="min-h-[60px]"
              />
              <p className="text-xs text-muted-foreground">Enviada quando o agente está fora do horário de atendimento</p>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Behavior */}
        <Collapsible open={openSections.behavior} onOpenChange={() => toggleSection('behavior')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              <span className="font-medium text-foreground">Comportamento & Follow-up</span>
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${openSections.behavior ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 p-4 rounded-lg border border-border bg-card/30 space-y-4">
            <div className="space-y-3">
              <Label>Nível de Proatividade</Label>
              <p className="text-xs text-muted-foreground">O quão proativo o agente deve ser em retomar conversas e fazer follow-ups</p>
              <div className="flex gap-2">
                {(['baixo', 'medio', 'alto'] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => onUpdate({ proactivityLevel: level })}
                    className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                      agent.proactivityLevel === level
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted hover:bg-muted/80 text-foreground'
                    }`}
                  >
                    {level === 'baixo' ? 'Baixo' : level === 'medio' ? 'Médio' : 'Alto'}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="followUpDelay" className="flex items-center gap-2">
                  <Timer className="h-4 w-4" />
                  Intervalo de Follow-up (minutos)
                </Label>
                <Input
                  id="followUpDelay"
                  type="number"
                  min={5}
                  max={1440}
                  value={agent.followUpDelay}
                  onChange={(e) => onUpdate({ followUpDelay: parseInt(e.target.value) || 30 })}
                />
                <p className="text-xs text-muted-foreground">Tempo de espera antes de enviar um follow-up</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxFollowUps">Máximo de Follow-ups</Label>
                <Input
                  id="maxFollowUps"
                  type="number"
                  min={0}
                  max={10}
                  value={agent.maxFollowUps}
                  onChange={(e) => onUpdate({ maxFollowUps: parseInt(e.target.value) || 3 })}
                />
                <p className="text-xs text-muted-foreground">Quantas vezes o agente pode fazer follow-up</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div>
                <Label htmlFor="typingSimulation" className="cursor-pointer">Simular Digitação</Label>
                <p className="text-xs text-muted-foreground">Adiciona um pequeno delay antes de enviar mensagens, como se estivesse digitando</p>
              </div>
              <Switch
                id="typingSimulation"
                checked={agent.typingSimulation}
                onCheckedChange={(checked) => onUpdate({ typingSimulation: checked })}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Follow-up Strategy by Stage */}
        <Collapsible open={openSections.followUp} onOpenChange={() => toggleSection('followUp')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 rounded-lg border border-border bg-gradient-to-r from-primary/5 to-transparent hover:bg-card transition-colors">
            <div className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4 text-primary" />
              <span className="font-medium text-foreground">Estratégia de Follow-up</span>
              <Badge variant="secondary" className="text-xs">Avançado</Badge>
              {agent.followUpStrategy?.enabled && (
                <Badge className="bg-green-500/10 text-green-400 border-green-500/30">Ativo</Badge>
              )}
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${openSections.followUp ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 p-4 rounded-lg border border-border bg-card/30 space-y-6">
            <p className="text-sm text-muted-foreground">
              Configure mensagens de follow-up específicas para cada estágio do funil. Mensagens personalizadas aumentam em até 3x a taxa de recuperação de leads.
            </p>

            {/* Global Settings */}
            <div className="p-4 rounded-lg bg-muted/30 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="cursor-pointer">Ativar Follow-up Inteligente</Label>
                  <p className="text-xs text-muted-foreground">Envia mensagens automaticamente baseado no estágio do lead</p>
                </div>
                <Switch
                  checked={agent.followUpStrategy?.enabled ?? true}
                  onCheckedChange={(checked) => updateFollowUpStrategy({ enabled: checked })}
                />
              </div>

              {agent.followUpStrategy?.enabled && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                      <div className="flex items-center gap-2">
                        <Brain className="h-4 w-4 text-purple-400" />
                        <div>
                          <Label className="text-sm">Timing Inteligente</Label>
                          <p className="text-xs text-muted-foreground">Envia quando lead estava ativo</p>
                        </div>
                      </div>
                      <Switch
                        checked={agent.followUpStrategy?.useSmartTiming ?? true}
                        onCheckedChange={(checked) => updateFollowUpStrategy({ useSmartTiming: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                      <div className="flex items-center gap-2">
                        <Moon className="h-4 w-4 text-blue-400" />
                        <div>
                          <Label className="text-sm">Respeitar Horário Silencioso</Label>
                          <p className="text-xs text-muted-foreground">{agent.followUpStrategy?.quietHoursStart} - {agent.followUpStrategy?.quietHoursEnd}</p>
                        </div>
                      </div>
                      <Switch
                        checked={agent.followUpStrategy?.respectQuietHours ?? true}
                        onCheckedChange={(checked) => updateFollowUpStrategy({ respectQuietHours: checked })}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex-1 space-y-2">
                      <Label className="text-sm">Máx. mensagens/dia por lead</Label>
                      <Input
                        type="number"
                        min={1}
                        max={10}
                        value={agent.followUpStrategy?.maxDailyMessages ?? 3}
                        onChange={(e) => updateFollowUpStrategy({ maxDailyMessages: parseInt(e.target.value) || 3 })}
                        className="w-24"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={agent.followUpStrategy?.stopOnNegativeResponse ?? true}
                        onCheckedChange={(checked) => updateFollowUpStrategy({ stopOnNegativeResponse: checked })}
                      />
                      <Label className="text-sm">Parar se lead responder negativamente</Label>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Stage Selector */}
            {agent.followUpStrategy?.enabled && (
              <>
                <div className="space-y-3">
                  <Label>Selecione o Estágio do Funil</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {FOLLOW_UP_STAGES.map((stage) => {
                      const templates = getTemplatesForStage(stage.key);
                      const activeCount = templates.filter(t => t.isActive).length;
                      return (
                        <button
                          key={stage.key}
                          onClick={() => setSelectedStage(stage.key)}
                          className={`p-3 rounded-lg border-2 transition-all text-left ${
                            selectedStage === stage.key
                              ? `${stage.color} border-current`
                              : 'border-border hover:border-muted-foreground/50 bg-card/50'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            {stage.icon}
                            <span className="text-xs font-medium">{stage.label}</span>
                          </div>
                          <p className="text-[10px] text-muted-foreground line-clamp-1">{stage.description}</p>
                          {activeCount > 0 && (
                            <Badge variant="outline" className="mt-2 text-[10px]">
                              {activeCount} msg{activeCount > 1 ? 's' : ''}
                            </Badge>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Templates for Selected Stage */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Mensagens para: {FOLLOW_UP_STAGES.find(s => s.key === selectedStage)?.label}</Label>
                    <button
                      onClick={() => addTemplate(selectedStage)}
                      className="flex items-center gap-1 text-xs text-primary hover:underline"
                    >
                      <Plus className="h-3 w-3" /> Adicionar mensagem
                    </button>
                  </div>

                  <div className="space-y-2">
                    {getTemplatesForStage(selectedStage).sort((a, b) => a.attempt - b.attempt).map((template) => (
                      <div
                        key={template.id}
                        className={`p-3 rounded-lg border transition-all ${
                          template.isActive ? 'border-border bg-card/50' : 'border-border/50 bg-muted/20 opacity-60'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                #{template.attempt}
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                Após {formatDelay(template.delayMinutes)}
                              </Badge>
                              <Switch
                                checked={template.isActive}
                                onCheckedChange={(checked) => updateTemplate(template.id, { isActive: checked })}
                              />
                            </div>
                            
                            {editingTemplate === template.id ? (
                              <div className="space-y-2">
                                <Textarea
                                  value={template.message}
                                  onChange={(e) => updateTemplate(template.id, { message: e.target.value })}
                                  placeholder="Digite a mensagem de follow-up... Use {produto} para inserir o nome do produto."
                                  className="min-h-[80px] text-sm"
                                />
                                <div className="flex items-center gap-2">
                                  <Input
                                    type="number"
                                    value={template.delayMinutes}
                                    onChange={(e) => updateTemplate(template.id, { delayMinutes: parseInt(e.target.value) || 30 })}
                                    className="w-24"
                                  />
                                  <span className="text-xs text-muted-foreground">minutos</span>
                                  <button
                                    onClick={() => setEditingTemplate(null)}
                                    className="ml-auto text-xs text-primary hover:underline"
                                  >
                                    Salvar
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <p className="text-sm text-muted-foreground">
                                {template.message || <em className="text-muted-foreground/50">Clique para editar...</em>}
                              </p>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => setEditingTemplate(editingTemplate === template.id ? null : template.id)}
                              className="p-1.5 rounded hover:bg-muted"
                            >
                              <Pencil className="h-3 w-3 text-muted-foreground" />
                            </button>
                            <button
                              onClick={() => deleteTemplate(template.id)}
                              className="p-1.5 rounded hover:bg-destructive/10"
                            >
                              <Trash2 className="h-3 w-3 text-destructive" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {getTemplatesForStage(selectedStage).length === 0 && (
                      <div className="text-center py-6 text-muted-foreground">
                        <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Nenhuma mensagem configurada para este estágio</p>
                        <button
                          onClick={() => addTemplate(selectedStage)}
                          className="text-primary text-sm hover:underline mt-1"
                        >
                          Adicionar primeira mensagem
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="h-4 w-4 text-primary mt-0.5" />
                    <div className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Dica:</strong> Use <code className="bg-muted px-1 rounded">{'{produto}'}</code> para inserir dinamicamente o nome do produto. 
                      Leads que abandonam carrinho respondem melhor a mensagens enviadas em até 1 hora.
                    </div>
                  </div>
                </div>
              </>
            )}
          </CollapsibleContent>
        </Collapsible>

        {/* Availability */}
        <Collapsible open={openSections.availability} onOpenChange={() => toggleSection('availability')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span className="font-medium text-foreground">Horário de Atendimento</span>
              {agent.businessHours.enabled && (
                <Badge variant="outline" className="text-xs">Ativo</Badge>
              )}
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${openSections.availability ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 p-4 rounded-lg border border-border bg-card/30 space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div>
                <Label htmlFor="businessHoursEnabled" className="cursor-pointer">Restringir Horário de Atendimento</Label>
                <p className="text-xs text-muted-foreground">Quando desativado, o agente responde 24/7</p>
              </div>
              <Switch
                id="businessHoursEnabled"
                checked={agent.businessHours.enabled}
                onCheckedChange={(checked) => 
                  onUpdate({ businessHours: { ...agent.businessHours, enabled: checked } })
                }
              />
            </div>

            {agent.businessHours.enabled && (
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="timezone" className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Fuso Horário
                  </Label>
                  <Select
                    value={agent.businessHours.timezone}
                    onValueChange={(value) => 
                      onUpdate({ businessHours: { ...agent.businessHours, timezone: value } })
                    }
                  >
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Selecione o fuso horário" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/Sao_Paulo">São Paulo (GMT-3)</SelectItem>
                      <SelectItem value="America/Manaus">Manaus (GMT-4)</SelectItem>
                      <SelectItem value="America/Bahia">Bahia (GMT-3)</SelectItem>
                      <SelectItem value="America/Fortaleza">Fortaleza (GMT-3)</SelectItem>
                      <SelectItem value="Europe/Lisbon">Lisboa (GMT+0)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  {DAYS_OF_WEEK.map((day) => (
                    <div key={day.key} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                      <Switch
                        checked={agent.businessHours.schedule[day.key]?.active ?? false}
                        onCheckedChange={(checked) => updateBusinessHours(day.key, 'active', checked)}
                      />
                      <span className="w-20 text-sm font-medium">{day.label}</span>
                      <Input
                        type="time"
                        value={agent.businessHours.schedule[day.key]?.start ?? '09:00'}
                        onChange={(e) => updateBusinessHours(day.key, 'start', e.target.value)}
                        disabled={!agent.businessHours.schedule[day.key]?.active}
                        className="w-28"
                      />
                      <span className="text-muted-foreground">até</span>
                      <Input
                        type="time"
                        value={agent.businessHours.schedule[day.key]?.end ?? '18:00'}
                        onChange={(e) => updateBusinessHours(day.key, 'end', e.target.value)}
                        disabled={!agent.businessHours.schedule[day.key]?.active}
                        className="w-28"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>

        {/* Advanced */}
        <Collapsible open={openSections.advanced} onOpenChange={() => toggleSection('advanced')}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium text-foreground">Configurações Avançadas</span>
              <Badge variant="outline" className="text-xs">Técnico</Badge>
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${openSections.advanced ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 p-4 rounded-lg border border-border bg-card/30 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="systemPrompt">Prompt do Sistema (Override)</Label>
              <Textarea
                id="systemPrompt"
                value={agent.systemPrompt}
                onChange={(e) => onUpdate({ systemPrompt: e.target.value })}
                placeholder="Digite o prompt do sistema personalizado..."
                className="min-h-[150px] font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Este prompt substituirá o prompt padrão gerado automaticamente com base nas configurações acima.
                Use apenas se você souber o que está fazendo.
              </p>
            </div>

            {/* Generated Prompt Preview */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <Label>Prompt Gerado Automaticamente</Label>
                  <Badge className="bg-primary/10 text-primary border-primary/30 text-xs">Preview</Badge>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-muted hover:bg-muted/80 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3 text-green-500" />
                      <span className="text-green-500">Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>
              
              <div className="relative">
                <div className="absolute top-2 right-2 flex items-center gap-1">
                  {agent.systemPrompt && (
                    <Badge variant="destructive" className="text-[10px]">Override ativo</Badge>
                  )}
                </div>
                <div 
                  className={`p-4 rounded-lg border bg-background/50 font-mono text-xs leading-relaxed max-h-[400px] overflow-auto whitespace-pre-wrap ${
                    agent.systemPrompt ? 'opacity-50 border-destructive/30' : 'border-border'
                  }`}
                >
                  {agent.systemPrompt || generateSystemPrompt()}
                </div>
              </div>

              {agent.systemPrompt && (
                <div className="p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-destructive mt-0.5" />
                    <div className="text-sm text-muted-foreground">
                      <strong className="text-destructive">Atenção:</strong> Você tem um prompt customizado ativo. 
                      O prompt gerado automaticamente (mostrado acima em opacidade reduzida) será ignorado.
                      <button 
                        onClick={() => onUpdate({ systemPrompt: '' })}
                        className="ml-2 text-primary hover:underline"
                      >
                        Limpar override
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {!agent.systemPrompt && (
                <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="h-4 w-4 text-primary mt-0.5" />
                    <div className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Este é o prompt final</strong> que será enviado para o modelo de IA. 
                      Ele é gerado automaticamente com base em todas as configurações acima. 
                      Você pode copiar e ajustar no campo de override se necessário.
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </TooltipProvider>
  );
}
