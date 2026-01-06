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

export interface BusinessHours {
  enabled: boolean;
  timezone: string;
  schedule: {
    [key: string]: { start: string; end: string; active: boolean };
  };
}

export type FollowUpStage = 
  | 'initial_contact'      // Lead iniciou conversa mas não engajou
  | 'product_aware'        // Conheceu o produto mas não viu preço
  | 'price_aware'          // Viu preço mas não comprou
  | 'objection_raised'     // Levantou objeção e parou
  | 'cart_abandoned'       // Iniciou checkout mas não finalizou
  | 'negotiation'          // Em negociação/pedindo desconto
  | 'waiting_decision';    // Disse que vai pensar

export interface FollowUpTemplate {
  id: string;
  stage: FollowUpStage;
  attempt: number;  // 1, 2, 3...
  delayMinutes: number;
  message: string;
  isActive: boolean;
}

export interface FollowUpStrategy {
  enabled: boolean;
  useSmartTiming: boolean;  // Ajusta horário baseado em quando lead estava mais ativo
  respectQuietHours: boolean;
  quietHoursStart: string;  // Ex: "22:00"
  quietHoursEnd: string;    // Ex: "08:00"
  maxDailyMessages: number;
  stopOnNegativeResponse: boolean;
  templates: FollowUpTemplate[];
}

export interface PersonalityTraits {
  empathy: number;
  assertiveness: number;
  patience: number;
  enthusiasm: number;
  urgency: number;
}

export interface Agent {
  id: string;
  name: string;
  isActive: boolean;
  
  // Identity
  persona: 'consultor' | 'agressivo' | 'suporte' | 'closer' | 'qualificador';
  voiceTone: 'empatico' | 'direto' | 'amigavel' | 'profissional' | 'entusiasmado';
  avatar?: string;
  personalityTraits?: PersonalityTraits;
  
  // Company Context
  companyName: string;
  industry: string;
  companyDescription: string;
  targetAudience: string;
  
  // Communication Style
  responseLength: 'conciso' | 'equilibrado' | 'detalhado';
  formalityLevel: 'informal' | 'neutro' | 'formal';
  useEmojis: boolean;
  language: string;
  
  // Messages
  greetingMessage: string;
  farewellMessage: string;
  awayMessage: string;
  
  // Goals
  primaryGoal?: string;
  secondaryGoal?: string;
  successMetric?: string;
  uniqueSellingPoints?: string;
  
  // Behavior
  proactivityLevel: 'baixo' | 'medio' | 'alto';
  followUpDelay: number; // minutes (legacy, kept for compatibility)
  maxFollowUps: number; // legacy, kept for compatibility
  typingSimulation: boolean;
  followUpStrategy: FollowUpStrategy;
  
  // Availability
  businessHours: BusinessHours;
  
  // Advanced
  systemPrompt: string;
  
  // Stats & Connections
  conversationsToday: number;
  whatsappConnected: boolean;
  
  // Features
  products: Product[];
  objectionRules: ObjectionRule[];
  forbiddenWords: string[];
  discountLimit: number;
  handoffContact: string;
  webhookUrl: string;
  integrationTriggers: IntegrationTrigger[];
}

export type TabType = 'identity' | 'catalog' | 'objections' | 'guardrails' | 'triggers' | 'connections';
