export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface KnowledgeBase {
  id: string;
  name: string;
  type: 'pdf' | 'doc' | 'link' | 'text';
  url: string;
  description?: string;
}

export interface LeadMaterial {
  id: string;
  name: string;
  type: 'pdf' | 'doc' | 'link' | 'video';
  url: string;
  description?: string;
}

// Keep Attachment for backwards compatibility
export interface Attachment {
  id: string;
  name: string;
  type: 'pdf' | 'doc' | 'link' | 'text' | 'video';
  url: string;
  description?: string;
  sendToLead?: boolean;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  checkoutLink: string;
  faq: FAQItem[];
  knowledgeBase: KnowledgeBase[];
  leadMaterials: LeadMaterial[];
  attachments?: Attachment[]; // deprecated, kept for backwards compatibility
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
