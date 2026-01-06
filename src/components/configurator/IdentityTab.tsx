import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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

export function IdentityTab({ agent, onUpdate }: IdentityTabProps) {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-1">Identidade & Comportamento</h3>
        <p className="text-sm text-muted-foreground">Configure a personalidade e o comportamento do seu agente de vendas.</p>
      </div>

      <div className="space-y-4">
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
              <SelectItem value="consultor">Consultor - Focado em educar</SelectItem>
              <SelectItem value="agressivo">Agressivo - Focado em converter</SelectItem>
              <SelectItem value="suporte">Suporte - Focado em resolver</SelectItem>
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
            </SelectContent>
          </Select>
        </div>

        <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
          <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <ChevronDown 
              className={`h-4 w-4 transition-transform duration-200 ${isAdvancedOpen ? 'rotate-180' : ''}`} 
            />
            Configurações Avançadas
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4">
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
                Este prompt substituirá o prompt padrão gerado automaticamente.
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
