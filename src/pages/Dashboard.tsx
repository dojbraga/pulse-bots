import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AgentCard } from '@/components/AgentCard';
import { mockAgents } from '@/data/mockAgents';
import { Agent } from '@/types/agent';
import { toast } from '@/hooks/use-toast';

export default function Dashboard() {
  const navigate = useNavigate();
  const [agents, setAgents] = useState<Agent[]>(mockAgents);

  const handleToggle = (id: string, isActive: boolean) => {
    setAgents((prev) =>
      prev.map((agent) =>
        agent.id === id ? { ...agent, isActive } : agent
      )
    );
    toast({
      title: isActive ? 'Agente ativado' : 'Agente pausado',
      description: `O agente foi ${isActive ? 'ativado' : 'pausado'} com sucesso.`,
    });
  };

  const handleEdit = (id: string) => {
    navigate(`/agent/${id}`);
  };

  const handleDelete = (id: string) => {
    setAgents((prev) => prev.filter((agent) => agent.id !== id));
    toast({
      title: 'Agente excluído',
      description: 'O agente foi removido com sucesso.',
      variant: 'destructive',
    });
  };

  const handleCreateAgent = () => {
    const newAgent: Agent = {
      id: Date.now().toString(),
      name: 'Novo Agente',
      isActive: false,
      persona: 'consultor',
      voiceTone: 'profissional',
      systemPrompt: '',
      conversationsToday: 0,
      whatsappConnected: false,
      products: [],
      objectionRules: [],
      forbiddenWords: [],
      discountLimit: 10,
      handoffContact: '',
      webhookUrl: '',
      integrationTriggers: [],
    };
    setAgents((prev) => [...prev, newAgent]);
    navigate(`/agent/${newAgent.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-card/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                <Bot className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">Meus Agentes de Vendas</h1>
                <p className="text-sm text-muted-foreground">{agents.length} agentes configurados</p>
              </div>
            </div>
            <Button onClick={handleCreateAgent} className="gap-2" variant="gradient" size="lg">
              <Plus className="h-4 w-4" />
              Criar Novo Agente
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {agents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Bot className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-lg font-semibold text-foreground mb-2">Nenhum agente criado</h2>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Crie seu primeiro agente de vendas para começar a automatizar suas conversas.
            </p>
            <Button onClick={handleCreateAgent} className="gap-2" variant="gradient">
              <Plus className="h-4 w-4" />
              Criar Primeiro Agente
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                onToggle={handleToggle}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
