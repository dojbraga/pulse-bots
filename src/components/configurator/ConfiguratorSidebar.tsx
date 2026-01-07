import { ArrowLeft, User, Package, Brain, Shield, Zap, Plug, GitBranch } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TabType } from '@/types/agent';
import { cn } from '@/lib/utils';

interface ConfiguratorSidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  agentName: string;
}

const tabs = [
  { id: 'identity' as TabType, label: 'Identidade & Comportamento', icon: User },
  { id: 'stages' as TabType, label: 'Estágios de Conversa', icon: GitBranch },
  { id: 'catalog' as TabType, label: 'Catálogo de Produtos', icon: Package },
  { id: 'objections' as TabType, label: 'Matriz de Objeções', icon: Brain },
  { id: 'guardrails' as TabType, label: 'Guardrails & Segurança', icon: Shield },
  { id: 'triggers' as TabType, label: 'Gatilhos & Integrações', icon: Zap },
  { id: 'connections' as TabType, label: 'Conexões', icon: Plug },
];

export function ConfiguratorSidebar({ activeTab, onTabChange, agentName }: ConfiguratorSidebarProps) {
  return (
    <aside className="w-72 bg-card border-r border-border flex flex-col h-screen sticky top-0">
      <div className="p-4 border-b border-border">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar ao Dashboard
        </Link>
        <h2 className="mt-4 font-semibold text-foreground text-lg truncate">{agentName}</h2>
      </div>
      
      <nav className="flex-1 p-3 space-y-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              )}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
