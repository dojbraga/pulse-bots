import { Plus, Trash2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Agent, ObjectionRule } from '@/types/agent';

interface ObjectionsTabProps {
  agent: Agent;
  onUpdate: (updates: Partial<Agent>) => void;
}

export function ObjectionsTab({ agent, onUpdate }: ObjectionsTabProps) {
  const addRule = () => {
    const newRule: ObjectionRule = {
      id: Date.now().toString(),
      trigger: '',
      action: '',
    };
    onUpdate({ objectionRules: [...agent.objectionRules, newRule] });
  };

  const updateRule = (id: string, updates: Partial<ObjectionRule>) => {
    const updatedRules = agent.objectionRules.map((r) =>
      r.id === id ? { ...r, ...updates } : r
    );
    onUpdate({ objectionRules: updatedRules });
  };

  const deleteRule = (id: string) => {
    onUpdate({ objectionRules: agent.objectionRules.filter((r) => r.id !== id) });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-1">Matriz de Objeções</h3>
          <p className="text-sm text-muted-foreground">Defina regras "Se Isso, Então Aquilo" para guiar as respostas do agente.</p>
        </div>
        <Button onClick={addRule} className="gap-2">
          <Plus className="h-4 w-4" />
          Nova Regra
        </Button>
      </div>

      <div className="space-y-4">
        {agent.objectionRules.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">Nenhuma regra de objeção cadastrada.</p>
              <Button onClick={addRule} variant="outline" className="gap-2">
                <Plus className="h-4 w-4" />
                Criar Primeira Regra
              </Button>
            </CardContent>
          </Card>
        ) : (
          agent.objectionRules.map((rule, index) => (
            <Card key={rule.id} className="group animate-slide-up overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">
                    {index + 1}
                  </div>
                  
                  <div className="flex-1 grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                        Gatilho do Cliente
                      </Label>
                      <Textarea
                        value={rule.trigger}
                        onChange={(e) => updateRule(rule.id, { trigger: e.target.value })}
                        placeholder="Ex: O cliente disse que está caro"
                        className="min-h-[80px] resize-none"
                      />
                    </div>
                    
                    <div className="space-y-2 relative">
                      <ArrowRight className="hidden md:block absolute -left-6 top-8 h-4 w-4 text-muted-foreground" />
                      <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                        Diretriz de Resposta
                      </Label>
                      <Textarea
                        value={rule.action}
                        onChange={(e) => updateRule(rule.id, { action: e.target.value })}
                        placeholder="Ex: Oferecer desconto de 5%"
                        className="min-h-[80px] resize-none"
                      />
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteRule(rule.id)}
                    className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
