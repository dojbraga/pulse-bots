import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ConfiguratorSidebar } from '@/components/configurator/ConfiguratorSidebar';
import { IdentityTab } from '@/components/configurator/IdentityTab';
import { ProductCatalogTab } from '@/components/configurator/ProductCatalogTab';
import { ObjectionsTab } from '@/components/configurator/ObjectionsTab';
import { GuardrailsTab } from '@/components/configurator/GuardrailsTab';
import { TriggersTab } from '@/components/configurator/TriggersTab';
import { ConnectionsTab } from '@/components/configurator/ConnectionsTab';
import { mockAgents } from '@/data/mockAgents';
import { Agent, TabType } from '@/types/agent';
import { toast } from '@/hooks/use-toast';

export default function AgentConfigurator() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('identity');
  const [agent, setAgent] = useState<Agent | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const foundAgent = mockAgents.find((a) => a.id === id);
    if (foundAgent) {
      setAgent({ ...foundAgent });
    } else if (id) {
      // New agent
      setAgent({
        id: id,
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
      });
    }
  }, [id]);

  const handleUpdate = (updates: Partial<Agent>) => {
    if (agent) {
      setAgent({ ...agent, ...updates });
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    toast({
      title: 'Alterações salvas',
      description: 'As configurações do agente foram atualizadas com sucesso.',
    });
  };

  if (!agent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  const renderTab = () => {
    switch (activeTab) {
      case 'identity':
        return <IdentityTab agent={agent} onUpdate={handleUpdate} />;
      case 'catalog':
        return <ProductCatalogTab agent={agent} onUpdate={handleUpdate} />;
      case 'objections':
        return <ObjectionsTab agent={agent} onUpdate={handleUpdate} />;
      case 'guardrails':
        return <GuardrailsTab agent={agent} onUpdate={handleUpdate} />;
      case 'triggers':
        return <TriggersTab agent={agent} onUpdate={handleUpdate} />;
      case 'connections':
        return <ConnectionsTab agent={agent} onUpdate={handleUpdate} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <ConfiguratorSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        agentName={agent.name}
      />
      
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-4xl">
            {renderTab()}
          </div>
        </main>
        
        <footer className="sticky bottom-0 bg-card border-t border-border p-4">
          <div className="max-w-4xl flex justify-end">
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="gap-2"
              variant="gradient"
              size="lg"
            >
              <Save className="h-4 w-4" />
              {isSaving ? 'Salvando...' : 'Salvar e Publicar'}
            </Button>
          </div>
        </footer>
      </div>
    </div>
  );
}
