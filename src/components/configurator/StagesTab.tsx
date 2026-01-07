import { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  ChevronDown, 
  ChevronUp, 
  GripVertical,
  ArrowRight,
  Settings2,
  Zap,
  GitBranch,
  Lightbulb,
  Play,
  Pause,
  Copy,
  MoreVertical
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Agent, 
  ConversationStage, 
  StageCondition, 
  StageTransition,
  StageAction,
  StageConditionType
} from '@/types/agent';

interface StagesTabProps {
  agent: Agent;
  onUpdate: (updates: Partial<Agent>) => void;
}

const conditionTypes: { value: StageConditionType; label: string; description: string }[] = [
  { value: 'keyword', label: 'Palavra-chave', description: 'Contém palavra ou frase específica' },
  { value: 'intent', label: 'Intenção', description: 'Intenção detectada pelo modelo' },
  { value: 'variable_set', label: 'Variável capturada', description: 'Quando uma variável é preenchida' },
  { value: 'time_elapsed', label: 'Tempo decorrido', description: 'Minutos desde última mensagem' },
  { value: 'message_count', label: 'Nº de mensagens', description: 'Quantidade de mensagens no estágio' },
  { value: 'product_mentioned', label: 'Produto mencionado', description: 'Quando um produto é citado' },
  { value: 'sentiment', label: 'Sentimento', description: 'Análise de sentimento da mensagem' },
  { value: 'custom', label: 'Customizado', description: 'Condição personalizada' },
];

const actionTypes = [
  { value: 'send_file', label: 'Enviar Arquivo', icon: '📎' },
  { value: 'send_link', label: 'Enviar Link', icon: '🔗' },
  { value: 'capture_variable', label: 'Capturar Variável', icon: '📝' },
  { value: 'trigger_webhook', label: 'Disparar Webhook', icon: '⚡' },
  { value: 'schedule_followup', label: 'Agendar Follow-up', icon: '⏰' },
  { value: 'handoff', label: 'Passar para Humano', icon: '👤' },
  { value: 'tag_lead', label: 'Taguear Lead', icon: '🏷️' },
];

const stageIcons: Record<string, string> = {
  wave: '👋',
  search: '🔍',
  presentation: '📊',
  handshake: '🤝',
  shield: '🛡️',
  'check-circle': '✅',
  trophy: '🏆',
  clock: '⏰',
  user: '👤',
};

const stageColors = [
  '#4CAF50', '#2196F3', '#9C27B0', '#FF9800', '#F44336', 
  '#00BCD4', '#795548', '#607D8B', '#E91E63', '#3F51B5'
];

export function StagesTab({ agent, onUpdate }: StagesTabProps) {
  const [expandedStages, setExpandedStages] = useState<Set<string>>(new Set(['stage_welcome']));
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const stages = agent.conversationStages || [];

  const toggleStage = (stageId: string) => {
    const newExpanded = new Set(expandedStages);
    if (newExpanded.has(stageId)) {
      newExpanded.delete(stageId);
    } else {
      newExpanded.add(stageId);
    }
    setExpandedStages(newExpanded);
  };

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const updateStage = (stageId: string, updates: Partial<ConversationStage>) => {
    const updatedStages = stages.map(s => 
      s.id === stageId ? { ...s, ...updates } : s
    );
    onUpdate({ conversationStages: updatedStages });
  };

  const addStage = () => {
    const newStage: ConversationStage = {
      id: `stage_${Date.now()}`,
      name: 'Novo Estágio',
      description: 'Descrição do novo estágio',
      icon: 'wave',
      color: stageColors[stages.length % stageColors.length],
      isDefault: false,
      order: stages.length + 1,
      instructions: 'Instruções para este estágio...',
      entryConditions: [],
      conditionLogic: 'and',
      transitions: [],
      entryActions: [],
      settings: {
        allowHumanHandoff: false,
        maxMessagesInStage: 10,
        timeoutMinutes: 60,
        timeoutAction: 'stay'
      },
      isActive: true
    };
    onUpdate({ conversationStages: [...stages, newStage] });
    setExpandedStages(new Set([...expandedStages, newStage.id]));
  };

  const deleteStage = (stageId: string) => {
    const stage = stages.find(s => s.id === stageId);
    if (stage?.isDefault) return;
    onUpdate({ conversationStages: stages.filter(s => s.id !== stageId) });
  };

  const duplicateStage = (stageId: string) => {
    const stage = stages.find(s => s.id === stageId);
    if (!stage) return;
    const newStage: ConversationStage = {
      ...stage,
      id: `stage_${Date.now()}`,
      name: `${stage.name} (cópia)`,
      isDefault: false,
      order: stages.length + 1
    };
    onUpdate({ conversationStages: [...stages, newStage] });
  };

  const addCondition = (stageId: string) => {
    const stage = stages.find(s => s.id === stageId);
    if (!stage) return;
    const newCondition: StageCondition = {
      id: `cond_${Date.now()}`,
      type: 'keyword',
      operator: 'contains',
      value: ''
    };
    updateStage(stageId, { 
      entryConditions: [...stage.entryConditions, newCondition] 
    });
  };

  const updateCondition = (stageId: string, conditionId: string, updates: Partial<StageCondition>) => {
    const stage = stages.find(s => s.id === stageId);
    if (!stage) return;
    const updatedConditions = stage.entryConditions.map(c =>
      c.id === conditionId ? { ...c, ...updates } : c
    );
    updateStage(stageId, { entryConditions: updatedConditions });
  };

  const deleteCondition = (stageId: string, conditionId: string) => {
    const stage = stages.find(s => s.id === stageId);
    if (!stage) return;
    updateStage(stageId, { 
      entryConditions: stage.entryConditions.filter(c => c.id !== conditionId) 
    });
  };

  const addTransition = (stageId: string) => {
    const stage = stages.find(s => s.id === stageId);
    if (!stage) return;
    const newTransition: StageTransition = {
      id: `trans_${Date.now()}`,
      targetStageId: '',
      conditions: [],
      conditionLogic: 'and',
      priority: stage.transitions.length + 1
    };
    updateStage(stageId, { 
      transitions: [...stage.transitions, newTransition] 
    });
  };

  const updateTransition = (stageId: string, transitionId: string, updates: Partial<StageTransition>) => {
    const stage = stages.find(s => s.id === stageId);
    if (!stage) return;
    const updatedTransitions = stage.transitions.map(t =>
      t.id === transitionId ? { ...t, ...updates } : t
    );
    updateStage(stageId, { transitions: updatedTransitions });
  };

  const deleteTransition = (stageId: string, transitionId: string) => {
    const stage = stages.find(s => s.id === stageId);
    if (!stage) return;
    updateStage(stageId, { 
      transitions: stage.transitions.filter(t => t.id !== transitionId) 
    });
  };

  const addAction = (stageId: string) => {
    const stage = stages.find(s => s.id === stageId);
    if (!stage) return;
    const newAction: StageAction = {
      id: `action_${Date.now()}`,
      type: 'tag_lead',
      config: {}
    };
    updateStage(stageId, { 
      entryActions: [...stage.entryActions, newAction] 
    });
  };

  const updateAction = (stageId: string, actionId: string, updates: Partial<StageAction>) => {
    const stage = stages.find(s => s.id === stageId);
    if (!stage) return;
    const updatedActions = stage.entryActions.map(a =>
      a.id === actionId ? { ...a, ...updates } : a
    );
    updateStage(stageId, { entryActions: updatedActions });
  };

  const deleteAction = (stageId: string, actionId: string) => {
    const stage = stages.find(s => s.id === stageId);
    if (!stage) return;
    updateStage(stageId, { 
      entryActions: stage.entryActions.filter(a => a.id !== actionId) 
    });
  };

  const getOtherStages = (currentStageId: string) => {
    return stages.filter(s => s.id !== currentStageId);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Estágios de Conversa</h1>
        <p className="text-muted-foreground mt-1">
          Configure estágios condicionais para guiar o fluxo da conversa automaticamente
        </p>
      </div>

      {/* Info Card */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-4">
          <div className="flex gap-3">
            <Lightbulb className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="space-y-2 text-sm">
              <p className="font-medium text-foreground">Como funcionam os estágios?</p>
              <ul className="text-muted-foreground space-y-1">
                <li>• Cada estágio tem <strong>instruções específicas</strong> para o agente</li>
                <li>• <strong>Condições de entrada</strong> determinam quando ativar o estágio</li>
                <li>• <strong>Transições</strong> movem automaticamente entre estágios</li>
                <li>• <strong>Ações</strong> são executadas ao entrar em um estágio</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Flow Visualization */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <GitBranch className="h-4 w-4" />
            Fluxo de Estágios
          </CardTitle>
          <CardDescription>Visualização do funil de conversação</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 items-center">
            {stages.filter(s => s.isActive).sort((a, b) => a.order - b.order).map((stage, index) => (
              <div key={stage.id} className="flex items-center gap-2">
                <div 
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border text-sm"
                  style={{ borderColor: stage.color, backgroundColor: `${stage.color}15` }}
                >
                  <span>{stageIcons[stage.icon] || '📌'}</span>
                  <span className="font-medium">{stage.name}</span>
                </div>
                {index < stages.filter(s => s.isActive).length - 1 && (
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stages List */}
      <div className="space-y-3">
        {stages.sort((a, b) => a.order - b.order).map((stage) => (
          <Collapsible 
            key={stage.id} 
            open={expandedStages.has(stage.id)}
            onOpenChange={() => toggleStage(stage.id)}
          >
            <Card className={!stage.isActive ? 'opacity-60' : ''}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-accent/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                          style={{ backgroundColor: `${stage.color}20` }}
                        >
                          {stageIcons[stage.icon] || '📌'}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-base">{stage.name}</CardTitle>
                          {stage.isDefault && (
                            <Badge variant="secondary" className="text-xs">Padrão</Badge>
                          )}
                          {!stage.isActive && (
                            <Badge variant="outline" className="text-xs">Inativo</Badge>
                          )}
                        </div>
                        <CardDescription className="text-sm">{stage.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-3 mr-4">
                        <Badge variant="outline" className="text-xs">
                          {stage.entryConditions.length} condições
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {stage.transitions.length} transições
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {stage.entryActions.length} ações
                        </Badge>
                      </div>
                      <Switch
                        checked={stage.isActive}
                        onCheckedChange={(checked) => updateStage(stage.id, { isActive: checked })}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => duplicateStage(stage.id)}>
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicar
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => deleteStage(stage.id)}
                            disabled={stage.isDefault}
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      {expandedStages.has(stage.id) ? (
                        <ChevronUp className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <CardContent className="pt-0 space-y-6">
                  {/* Basic Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Nome do Estágio</Label>
                      <Input
                        value={stage.name}
                        onChange={(e) => updateStage(stage.id, { name: e.target.value })}
                        placeholder="Ex: Qualificação"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Ordem</Label>
                      <Input
                        type="number"
                        value={stage.order}
                        onChange={(e) => updateStage(stage.id, { order: parseInt(e.target.value) || 1 })}
                        min={1}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Descrição</Label>
                    <Input
                      value={stage.description}
                      onChange={(e) => updateStage(stage.id, { description: e.target.value })}
                      placeholder="Breve descrição do objetivo deste estágio"
                    />
                  </div>

                  {/* Instructions */}
                  <div className="space-y-2">
                    <Label>Instruções Específicas</Label>
                    <Textarea
                      value={stage.instructions}
                      onChange={(e) => updateStage(stage.id, { instructions: e.target.value })}
                      placeholder="Instruções detalhadas para o agente neste estágio..."
                      rows={6}
                      className="font-mono text-sm"
                    />
                    <p className="text-xs text-muted-foreground">
                      Estas instruções serão adicionadas ao prompt quando o lead estiver neste estágio
                    </p>
                  </div>

                  <Separator />

                  {/* Entry Conditions */}
                  <Collapsible 
                    open={expandedSections.has(`${stage.id}-conditions`)}
                    onOpenChange={() => toggleSection(`${stage.id}-conditions`)}
                  >
                    <CollapsibleTrigger className="flex items-center justify-between w-full py-2 hover:bg-accent/30 rounded px-2 -mx-2">
                      <div className="flex items-center gap-2">
                        <Settings2 className="h-4 w-4 text-primary" />
                        <span className="font-medium">Condições de Entrada</span>
                        <Badge variant="secondary" className="text-xs">{stage.entryConditions.length}</Badge>
                      </div>
                      {expandedSections.has(`${stage.id}-conditions`) ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pt-4 space-y-4">
                      {stage.entryConditions.length > 1 && (
                        <div className="flex items-center gap-2">
                          <Label className="text-sm">Lógica:</Label>
                          <Select
                            value={stage.conditionLogic}
                            onValueChange={(value: 'and' | 'or') => updateStage(stage.id, { conditionLogic: value })}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="and">Todas (E)</SelectItem>
                              <SelectItem value="or">Qualquer (OU)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      {stage.entryConditions.map((condition, index) => (
                        <div key={condition.id} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                          <div className="flex-1 grid grid-cols-3 gap-3">
                            <Select
                              value={condition.type}
                              onValueChange={(value: StageConditionType) => 
                                updateCondition(stage.id, condition.id, { type: value })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Tipo" />
                              </SelectTrigger>
                              <SelectContent>
                                {conditionTypes.map((type) => (
                                  <SelectItem key={type.value} value={type.value}>
                                    {type.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            
                            <Select
                              value={condition.operator}
                              onValueChange={(value) => 
                                updateCondition(stage.id, condition.id, { operator: value as StageCondition['operator'] })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Operador" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="equals">Igual a</SelectItem>
                                <SelectItem value="contains">Contém</SelectItem>
                                <SelectItem value="not_equals">Diferente de</SelectItem>
                                <SelectItem value="greater_than">Maior que</SelectItem>
                                <SelectItem value="less_than">Menor que</SelectItem>
                              </SelectContent>
                            </Select>
                            
                            <Input
                              value={condition.value}
                              onChange={(e) => 
                                updateCondition(stage.id, condition.id, { value: e.target.value })
                              }
                              placeholder="Valor"
                            />
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={() => deleteCondition(stage.id, condition.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addCondition(stage.id)}
                        className="gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Adicionar Condição
                      </Button>
                    </CollapsibleContent>
                  </Collapsible>

                  <Separator />

                  {/* Transitions */}
                  <Collapsible 
                    open={expandedSections.has(`${stage.id}-transitions`)}
                    onOpenChange={() => toggleSection(`${stage.id}-transitions`)}
                  >
                    <CollapsibleTrigger className="flex items-center justify-between w-full py-2 hover:bg-accent/30 rounded px-2 -mx-2">
                      <div className="flex items-center gap-2">
                        <GitBranch className="h-4 w-4 text-primary" />
                        <span className="font-medium">Transições</span>
                        <Badge variant="secondary" className="text-xs">{stage.transitions.length}</Badge>
                      </div>
                      {expandedSections.has(`${stage.id}-transitions`) ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pt-4 space-y-4">
                      {stage.transitions.map((transition) => {
                        const targetStage = stages.find(s => s.id === transition.targetStageId);
                        return (
                          <div key={transition.id} className="p-4 border rounded-lg space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium">Ir para:</span>
                                <Select
                                  value={transition.targetStageId}
                                  onValueChange={(value) => 
                                    updateTransition(stage.id, transition.id, { targetStageId: value })
                                  }
                                >
                                  <SelectTrigger className="w-48">
                                    <SelectValue placeholder="Selecionar estágio" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {getOtherStages(stage.id).map((s) => (
                                      <SelectItem key={s.id} value={s.id}>
                                        {stageIcons[s.icon]} {s.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive"
                                onClick={() => deleteTransition(stage.id, transition.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>

                            <div className="text-xs text-muted-foreground">
                              Prioridade: {transition.priority} | Lógica: {transition.conditionLogic === 'and' ? 'Todas' : 'Qualquer'}
                            </div>
                          </div>
                        );
                      })}

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addTransition(stage.id)}
                        className="gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Adicionar Transição
                      </Button>
                    </CollapsibleContent>
                  </Collapsible>

                  <Separator />

                  {/* Entry Actions */}
                  <Collapsible 
                    open={expandedSections.has(`${stage.id}-actions`)}
                    onOpenChange={() => toggleSection(`${stage.id}-actions`)}
                  >
                    <CollapsibleTrigger className="flex items-center justify-between w-full py-2 hover:bg-accent/30 rounded px-2 -mx-2">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-primary" />
                        <span className="font-medium">Ações de Entrada</span>
                        <Badge variant="secondary" className="text-xs">{stage.entryActions.length}</Badge>
                      </div>
                      {expandedSections.has(`${stage.id}-actions`) ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pt-4 space-y-4">
                      {stage.entryActions.map((action) => {
                        const actionType = actionTypes.find(a => a.value === action.type);
                        return (
                          <div key={action.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                            <span className="text-xl">{actionType?.icon || '⚡'}</span>
                            <Select
                              value={action.type}
                              onValueChange={(value: StageAction['type']) => 
                                updateAction(stage.id, action.id, { type: value, config: {} })
                              }
                            >
                              <SelectTrigger className="w-48">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {actionTypes.map((type) => (
                                  <SelectItem key={type.value} value={type.value}>
                                    {type.icon} {type.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Input
                              placeholder="Configuração (JSON ou valor)"
                              value={JSON.stringify(action.config)}
                              onChange={(e) => {
                                try {
                                  const config = JSON.parse(e.target.value);
                                  updateAction(stage.id, action.id, { config });
                                } catch {
                                  // Keep as string if not valid JSON
                                }
                              }}
                              className="flex-1"
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive"
                              onClick={() => deleteAction(stage.id, action.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        );
                      })}

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addAction(stage.id)}
                        className="gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Adicionar Ação
                      </Button>
                    </CollapsibleContent>
                  </Collapsible>

                  <Separator />

                  {/* Settings */}
                  <Collapsible 
                    open={expandedSections.has(`${stage.id}-settings`)}
                    onOpenChange={() => toggleSection(`${stage.id}-settings`)}
                  >
                    <CollapsibleTrigger className="flex items-center justify-between w-full py-2 hover:bg-accent/30 rounded px-2 -mx-2">
                      <div className="flex items-center gap-2">
                        <Settings2 className="h-4 w-4 text-primary" />
                        <span className="font-medium">Configurações do Estágio</span>
                      </div>
                      {expandedSections.has(`${stage.id}-settings`) ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pt-4 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Máx. mensagens no estágio</Label>
                          <Input
                            type="number"
                            value={stage.settings.maxMessagesInStage}
                            onChange={(e) => updateStage(stage.id, { 
                              settings: { ...stage.settings, maxMessagesInStage: parseInt(e.target.value) || 10 }
                            })}
                            min={1}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Timeout (minutos)</Label>
                          <Input
                            type="number"
                            value={stage.settings.timeoutMinutes}
                            onChange={(e) => updateStage(stage.id, { 
                              settings: { ...stage.settings, timeoutMinutes: parseInt(e.target.value) || 60 }
                            })}
                            min={1}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Ação no timeout</Label>
                        <Select
                          value={stage.settings.timeoutAction}
                          onValueChange={(value: 'stay' | 'transition' | 'handoff') => 
                            updateStage(stage.id, { 
                              settings: { ...stage.settings, timeoutAction: value }
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="stay">Manter no estágio</SelectItem>
                            <SelectItem value="transition">Transicionar para outro estágio</SelectItem>
                            <SelectItem value="handoff">Passar para humano</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {stage.settings.timeoutAction === 'transition' && (
                        <div className="space-y-2">
                          <Label>Estágio de destino no timeout</Label>
                          <Select
                            value={stage.settings.timeoutTargetStageId || ''}
                            onValueChange={(value) => 
                              updateStage(stage.id, { 
                                settings: { ...stage.settings, timeoutTargetStageId: value }
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecionar estágio" />
                            </SelectTrigger>
                            <SelectContent>
                              {getOtherStages(stage.id).map((s) => (
                                <SelectItem key={s.id} value={s.id}>
                                  {stageIcons[s.icon]} {s.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      <div className="flex items-center justify-between py-2">
                        <div>
                          <Label>Permitir handoff para humano</Label>
                          <p className="text-xs text-muted-foreground">
                            Lead pode solicitar atendimento humano neste estágio
                          </p>
                        </div>
                        <Switch
                          checked={stage.settings.allowHumanHandoff}
                          onCheckedChange={(checked) => 
                            updateStage(stage.id, { 
                              settings: { ...stage.settings, allowHumanHandoff: checked }
                            })
                          }
                        />
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        ))}
      </div>

      {/* Add Stage Button */}
      <Button onClick={addStage} className="w-full gap-2" variant="outline">
        <Plus className="h-4 w-4" />
        Adicionar Novo Estágio
      </Button>
    </div>
  );
}