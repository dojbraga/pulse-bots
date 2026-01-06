import { useState } from 'react';
import { Plus, Trash2, Zap, Send, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Agent, IntegrationTrigger } from '@/types/agent';

interface TriggersTabProps {
  agent: Agent;
  onUpdate: (updates: Partial<Agent>) => void;
}

const eventOptions = [
  { value: 'lead_captured', label: 'Lead Capturado', description: 'Quando dados básicos do lead são coletados (nome, email, telefone)' },
  { value: 'interest_identified', label: 'Interesse Identificado', description: 'Quando o lead demonstra interesse em um produto/serviço específico' },
  { value: 'objection_handled', label: 'Objeção Tratada', description: 'Quando uma objeção do cliente é identificada e respondida' },
  { value: 'sale_completed', label: 'Venda Concluída', description: 'Quando o lead confirma a compra ou acessa o checkout' },
  { value: 'handoff_requested', label: 'Handoff Solicitado', description: 'Quando o caso é escalado para atendimento humano' },
  { value: 'custom', label: 'Evento Personalizado', description: 'Defina seu próprio gatilho' },
];

const commonDataFields = [
  'nome',
  'email',
  'telefone',
  'curso_interesse',
  'produto_interesse',
  'valor_orcamento',
  'objecao_principal',
  'nivel_interesse',
  'origem_lead',
  'data_contato',
];

export function TriggersTab({ agent, onUpdate }: TriggersTabProps) {
  const [expandedTriggers, setExpandedTriggers] = useState<Set<string>>(new Set());
  const [newFieldInput, setNewFieldInput] = useState<Record<string, string>>({});

  const toggleExpanded = (id: string) => {
    setExpandedTriggers((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const addTrigger = () => {
    const newTrigger: IntegrationTrigger = {
      id: Date.now().toString(),
      name: 'Novo Gatilho',
      event: 'lead_captured',
      dataFields: ['nome', 'email'],
      webhookUrl: '',
      isActive: false,
    };
    onUpdate({
      integrationTriggers: [...agent.integrationTriggers, newTrigger],
    });
    setExpandedTriggers((prev) => new Set([...prev, newTrigger.id]));
  };

  const updateTrigger = (id: string, updates: Partial<IntegrationTrigger>) => {
    onUpdate({
      integrationTriggers: agent.integrationTriggers.map((trigger) =>
        trigger.id === id ? { ...trigger, ...updates } : trigger
      ),
    });
  };

  const deleteTrigger = (id: string) => {
    onUpdate({
      integrationTriggers: agent.integrationTriggers.filter((trigger) => trigger.id !== id),
    });
  };

  const addDataField = (triggerId: string, field: string) => {
    const trigger = agent.integrationTriggers.find((t) => t.id === triggerId);
    if (trigger && field && !trigger.dataFields.includes(field)) {
      updateTrigger(triggerId, {
        dataFields: [...trigger.dataFields, field],
      });
    }
    setNewFieldInput((prev) => ({ ...prev, [triggerId]: '' }));
  };

  const removeDataField = (triggerId: string, field: string) => {
    const trigger = agent.integrationTriggers.find((t) => t.id === triggerId);
    if (trigger) {
      updateTrigger(triggerId, {
        dataFields: trigger.dataFields.filter((f) => f !== field),
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Gatilhos & Integrações</h2>
        <p className="text-muted-foreground mt-1">
          Configure ações automáticas para enviar dados ao seu CRM ou outros sistemas quando eventos específicos ocorrerem na conversa.
        </p>
      </div>

      <Card className="border-dashed border-2 border-primary/30 bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-foreground">Como funciona?</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Quando um evento é detectado durante a conversa (ex: lead informa curso de interesse), 
                o agente automaticamente envia os dados configurados para a URL do webhook. 
                Ideal para integrar com CRMs como HubSpot, Pipedrive, ou ferramentas como n8n e Zapier.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {agent.integrationTriggers.map((trigger) => {
          const isExpanded = expandedTriggers.has(trigger.id);
          const eventInfo = eventOptions.find((e) => e.value === trigger.event);
          
          return (
            <Card key={trigger.id} className={trigger.isActive ? 'border-primary/50' : ''}>
              <Collapsible open={isExpanded} onOpenChange={() => toggleExpanded(trigger.id)}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Switch
                        checked={trigger.isActive}
                        onCheckedChange={(checked) => updateTrigger(trigger.id, { isActive: checked })}
                      />
                      <div>
                        <CardTitle className="text-base">{trigger.name}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <Badge variant={trigger.isActive ? 'success' : 'secondary'} className="text-xs">
                            {eventInfo?.label || trigger.event}
                          </Badge>
                          <span className="text-xs">•</span>
                          <span className="text-xs">{trigger.dataFields.length} campos</span>
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm">
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                      </CollapsibleTrigger>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteTrigger(trigger.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CollapsibleContent>
                  <CardContent className="space-y-4 pt-0">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Nome do Gatilho</Label>
                        <Input
                          value={trigger.name}
                          onChange={(e) => updateTrigger(trigger.id, { name: e.target.value })}
                          placeholder="Ex: Enviar interesse para CRM"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Evento Disparador</Label>
                        <Select
                          value={trigger.event}
                          onValueChange={(value) => updateTrigger(trigger.id, { event: value as IntegrationTrigger['event'] })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {eventOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">{eventInfo?.description}</p>
                      </div>
                    </div>

                    {trigger.event === 'custom' && (
                      <div className="space-y-2">
                        <Label>Descrição do Evento Personalizado</Label>
                        <Input
                          value={trigger.customEvent || ''}
                          onChange={(e) => updateTrigger(trigger.id, { customEvent: e.target.value })}
                          placeholder="Ex: Cliente mencionou orçamento acima de R$5.000"
                        />
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label>Campos de Dados a Enviar</Label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {trigger.dataFields.map((field) => (
                          <Badge key={field} variant="outline" className="gap-1 py-1">
                            {field}
                            <button
                              onClick={() => removeDataField(trigger.id, field)}
                              className="ml-1 hover:text-destructive"
                            >
                              ×
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Select
                          value=""
                          onValueChange={(value) => addDataField(trigger.id, value)}
                        >
                          <SelectTrigger className="w-48">
                            <SelectValue placeholder="Adicionar campo..." />
                          </SelectTrigger>
                          <SelectContent>
                            {commonDataFields
                              .filter((f) => !trigger.dataFields.includes(f))
                              .map((field) => (
                                <SelectItem key={field} value={field}>
                                  {field}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        <div className="flex gap-2 flex-1">
                          <Input
                            value={newFieldInput[trigger.id] || ''}
                            onChange={(e) => setNewFieldInput((prev) => ({ ...prev, [trigger.id]: e.target.value }))}
                            placeholder="Campo personalizado..."
                            className="flex-1"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                addDataField(trigger.id, newFieldInput[trigger.id] || '');
                              }
                            }}
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => addDataField(trigger.id, newFieldInput[trigger.id] || '')}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>URL do Webhook (CRM/n8n/Zapier)</Label>
                      <div className="flex gap-2">
                        <Input
                          value={trigger.webhookUrl}
                          onChange={(e) => updateTrigger(trigger.id, { webhookUrl: e.target.value })}
                          placeholder="https://hooks.zapier.com/... ou https://n8n.empresa.com/webhook/..."
                          className="flex-1"
                        />
                        <Button variant="outline" size="icon" title="Testar webhook">
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Os dados serão enviados via POST em formato JSON quando o evento for detectado.
                      </p>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          );
        })}

        <Button onClick={addTrigger} variant="outline" className="w-full gap-2 border-dashed">
          <Plus className="h-4 w-4" />
          Novo Gatilho de Integração
        </Button>
      </div>
    </div>
  );
}
