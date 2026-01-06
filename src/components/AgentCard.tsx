import { useState } from 'react';
import { MessageSquare, Settings, Trash2, Smartphone, SmartphoneNfc } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Agent } from '@/types/agent';

interface AgentCardProps {
  agent: Agent;
  onToggle: (id: string, isActive: boolean) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function AgentCard({ agent, onToggle, onEdit, onDelete }: AgentCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onDelete(agent.id);
    }, 200);
  };

  return (
    <Card 
      className={`group relative overflow-hidden transition-all duration-300 hover:shadow-card-hover animate-fade-in ${
        isDeleting ? 'scale-95 opacity-0' : ''
      }`}
    >
      <div className={`absolute inset-x-0 top-0 h-1 ${agent.isActive ? 'gradient-success' : 'bg-muted'}`} />
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold text-foreground text-lg leading-tight">{agent.name}</h3>
            <Badge variant={agent.isActive ? 'success' : 'muted'} className="text-xs">
              {agent.isActive ? 'Ativo' : 'Pausado'}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            {agent.whatsappConnected ? (
              <Smartphone className="h-5 w-5 text-success" />
            ) : (
              <SmartphoneNfc className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MessageSquare className="h-4 w-4" />
          <span>Conversas hoje: <span className="font-medium text-foreground">{agent.conversationsToday}</span></span>
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-2">
            <Switch
              checked={agent.isActive}
              onCheckedChange={(checked) => onToggle(agent.id, checked)}
              className="data-[state=checked]:bg-success"
            />
            <span className="text-xs text-muted-foreground">
              {agent.isActive ? 'On' : 'Off'}
            </span>
          </div>
          
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(agent.id)}
              className="text-muted-foreground hover:text-foreground"
            >
              <Settings className="h-4 w-4 mr-1" />
              Editar
            </Button>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="animate-scale-in">
                <AlertDialogHeader>
                  <AlertDialogTitle>Excluir Agente</AlertDialogTitle>
                  <AlertDialogDescription>
                    Tem certeza que deseja excluir o agente "{agent.name}"? Esta ação não pode ser desfeita.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Excluir
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
