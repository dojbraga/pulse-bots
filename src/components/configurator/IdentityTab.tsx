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
  Ban
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
import { Agent } from '@/types/agent';

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

export function IdentityTab({ agent, onUpdate }: IdentityTabProps) {
  const [openSections, setOpenSections] = useState({
    company: true,
    communication: true,
    messages: false,
    behavior: false,
    availability: false,
    advanced: false,
  });

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

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-1">Identidade & Comportamento</h3>
        <p className="text-sm text-muted-foreground">Configure a personalidade, contexto e comportamento do seu agente de vendas.</p>
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
            <Label htmlFor="persona">Persona</Label>
            <Select
              value={agent.persona}
              onValueChange={(value: Agent['persona']) => onUpdate({ persona: value })}
            >
              <SelectTrigger id="persona">
                <SelectValue placeholder="Selecione uma persona" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="consultor">
                  <div className="flex flex-col">
                    <span>Consultor</span>
                    <span className="text-xs text-muted-foreground">Focado em educar e orientar</span>
                  </div>
                </SelectItem>
                <SelectItem value="agressivo">
                  <div className="flex flex-col">
                    <span>Agressivo</span>
                    <span className="text-xs text-muted-foreground">Focado em conversão rápida</span>
                  </div>
                </SelectItem>
                <SelectItem value="suporte">
                  <div className="flex flex-col">
                    <span>Suporte</span>
                    <span className="text-xs text-muted-foreground">Focado em resolver problemas</span>
                  </div>
                </SelectItem>
                <SelectItem value="closer">
                  <div className="flex flex-col">
                    <span>Closer</span>
                    <span className="text-xs text-muted-foreground">Especialista em fechar vendas</span>
                  </div>
                </SelectItem>
                <SelectItem value="qualificador">
                  <div className="flex flex-col">
                    <span>Qualificador</span>
                    <span className="text-xs text-muted-foreground">Focado em qualificar leads</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="voiceTone">Tom de Voz</Label>
            <Select
              value={agent.voiceTone}
              onValueChange={(value: Agent['voiceTone']) => onUpdate({ voiceTone: value })}
            >
              <SelectTrigger id="voiceTone">
                <SelectValue placeholder="Selecione um tom" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="empatico">Empático</SelectItem>
                <SelectItem value="direto">Direto</SelectItem>
                <SelectItem value="amigavel">Amigável</SelectItem>
                <SelectItem value="profissional">Profissional</SelectItem>
                <SelectItem value="entusiasmado">Entusiasmado</SelectItem>
              </SelectContent>
            </Select>
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
                <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                <SelectItem value="pt-PT">Português (Portugal)</SelectItem>
                <SelectItem value="en-US">English (US)</SelectItem>
                <SelectItem value="es">Español</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

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
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium text-foreground">Configurações Avançadas</span>
            <Badge variant="outline" className="text-xs">Técnico</Badge>
          </div>
          <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${openSections.advanced ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 p-4 rounded-lg border border-border bg-card/30">
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
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
