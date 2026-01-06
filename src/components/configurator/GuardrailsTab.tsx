import { useState } from 'react';
import { X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Agent } from '@/types/agent';

interface GuardrailsTabProps {
  agent: Agent;
  onUpdate: (updates: Partial<Agent>) => void;
}

export function GuardrailsTab({ agent, onUpdate }: GuardrailsTabProps) {
  const [wordInput, setWordInput] = useState('');

  const addForbiddenWord = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && wordInput.trim()) {
      e.preventDefault();
      if (!agent.forbiddenWords.includes(wordInput.trim().toLowerCase())) {
        onUpdate({ forbiddenWords: [...agent.forbiddenWords, wordInput.trim().toLowerCase()] });
      }
      setWordInput('');
    }
  };

  const removeForbiddenWord = (word: string) => {
    onUpdate({ forbiddenWords: agent.forbiddenWords.filter((w) => w !== word) });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-1">Guardrails & Segurança</h3>
        <p className="text-sm text-muted-foreground">Defina limites e regras de segurança para seu agente.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="forbiddenWords">Palavras Proibidas</Label>
          <Input
            id="forbiddenWords"
            value={wordInput}
            onChange={(e) => setWordInput(e.target.value)}
            onKeyDown={addForbiddenWord}
            placeholder="Digite uma palavra e pressione Enter"
          />
          {agent.forbiddenWords.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {agent.forbiddenWords.map((word) => (
                <Badge
                  key={word}
                  variant="secondary"
                  className="gap-1 pr-1 cursor-pointer hover:bg-destructive/20"
                  onClick={() => removeForbiddenWord(word)}
                >
                  {word}
                  <X className="h-3 w-3" />
                </Badge>
              ))}
            </div>
          )}
          <p className="text-xs text-muted-foreground">
            O agente nunca usará essas palavras em suas respostas.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="discountLimit">Limite de Desconto (%)</Label>
          <div className="flex items-center gap-2">
            <Input
              id="discountLimit"
              type="number"
              min={0}
              max={100}
              value={agent.discountLimit}
              onChange={(e) => onUpdate({ discountLimit: Number(e.target.value) })}
              className="w-24"
            />
            <span className="text-sm text-muted-foreground">% máximo permitido</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Desconto máximo que o agente pode oferecer autonomamente.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="handoffContact">Handoff Humano</Label>
          <Input
            id="handoffContact"
            value={agent.handoffContact}
            onChange={(e) => onUpdate({ handoffContact: e.target.value })}
            placeholder="email@empresa.com ou +55 11 99999-9999"
          />
          <p className="text-xs text-muted-foreground">
            Contato para encaminhar casos complexos que excedem a capacidade do agente.
          </p>
        </div>
      </div>
    </div>
  );
}
