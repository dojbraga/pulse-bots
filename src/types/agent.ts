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
}

export type TabType = 'identity' | 'catalog' | 'objections' | 'guardrails' | 'connections';
