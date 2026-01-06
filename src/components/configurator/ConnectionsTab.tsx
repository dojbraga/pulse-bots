import { Copy, Check, Smartphone, Link2 } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Agent } from '@/types/agent';

interface ConnectionsTabProps {
  agent: Agent;
  onUpdate: (updates: Partial<Agent>) => void;
}

export function ConnectionsTab({ agent, onUpdate }: ConnectionsTabProps) {
  const [copied, setCopied] = useState(false);

  const copyWebhook = () => {
    navigator.clipboard.writeText(agent.webhookUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-1">Conexões</h3>
        <p className="text-sm text-muted-foreground">Gerencie as integrações e conexões do seu agente.</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <Smartphone className="h-5 w-5 text-success" />
                </div>
                <div>
                  <CardTitle className="text-lg">WhatsApp Business</CardTitle>
                  <CardDescription>Conecte seu número de WhatsApp</CardDescription>
                </div>
              </div>
              <Badge variant={agent.whatsappConnected ? 'success' : 'muted'}>
                {agent.whatsappConnected ? 'Conectado' : 'Desconectado'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {agent.whatsappConnected ? (
              <div className="flex items-center gap-4 p-4 bg-success/5 rounded-lg border border-success/20">
                <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
                  <Check className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Conexão ativa</p>
                  <p className="text-sm text-muted-foreground">Seu agente está pronto para responder mensagens.</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center p-6 bg-muted/50 rounded-lg">
                <div className="w-32 h-32 bg-foreground/10 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-xs text-muted-foreground text-center px-4">
                    QR Code aparecerá aqui
                  </span>
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  Escaneie o QR Code com seu WhatsApp para conectar
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Link2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">Webhook URL (n8n)</CardTitle>
                <CardDescription>URL para receber dados de conversas</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="webhookUrl">Endpoint URL</Label>
              <div className="flex gap-2">
                <Input
                  id="webhookUrl"
                  value={agent.webhookUrl}
                  onChange={(e) => onUpdate({ webhookUrl: e.target.value })}
                  placeholder="https://n8n.empresa.com/webhook/..."
                  className="font-mono text-sm"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={copyWebhook}
                  className="flex-shrink-0"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-success" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Esta URL receberá os dados de cada conversa via POST request.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
