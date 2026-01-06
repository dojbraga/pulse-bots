export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  checkoutLink: string;
}

export interface ObjectionRule {
  id: string;
  trigger: string;
  action: string;
}

export interface IntegrationTrigger {
  id: string;
  name: string;
  event: 'lead_captured' | 'interest_identified' | 'objection_handled' | 'sale_completed' | 'handoff_requested' | 'custom';
  customEvent?: string;
  dataFields: string[];
  webhookUrl: string;
  isActive: boolean;
}

export interface Agent {
  id: string;
  name: string;
  isActive: boolean;
  persona: 'consultor' | 'agressivo' | 'suporte';
  voiceTone: 'empatico' | 'direto' | 'amigavel' | 'profissional';
  systemPrompt: string;
  conversationsToday: number;
  whatsappConnected: boolean;
  products: Product[];
  objectionRules: ObjectionRule[];
  forbiddenWords: string[];
  discountLimit: number;
  handoffContact: string;
  webhookUrl: string;
  integrationTriggers: IntegrationTrigger[];
}

export type TabType = 'identity' | 'catalog' | 'objections' | 'guardrails' | 'triggers' | 'connections';
