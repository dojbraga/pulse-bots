import { Agent, BusinessHours } from '@/types/agent';

export const defaultBusinessHours: BusinessHours = {
  enabled: false,
  timezone: 'America/Sao_Paulo',
  schedule: {
    monday: { start: '09:00', end: '18:00', active: true },
    tuesday: { start: '09:00', end: '18:00', active: true },
    wednesday: { start: '09:00', end: '18:00', active: true },
    thursday: { start: '09:00', end: '18:00', active: true },
    friday: { start: '09:00', end: '18:00', active: true },
    saturday: { start: '09:00', end: '13:00', active: false },
    sunday: { start: '09:00', end: '13:00', active: false },
  },
};

export const createDefaultAgent = (id: string): Agent => ({
  id,
  name: 'Novo Agente',
  isActive: false,
  
  // Identity
  persona: 'consultor',
  voiceTone: 'profissional',
  avatar: '',
  
  // Company Context
  companyName: '',
  industry: '',
  companyDescription: '',
  targetAudience: '',
  
  // Communication Style
  responseLength: 'equilibrado',
  formalityLevel: 'neutro',
  useEmojis: true,
  language: 'pt-BR',
  
  // Messages
  greetingMessage: 'Olá! 👋 Como posso ajudar você hoje?',
  farewellMessage: 'Obrigado pelo contato! Estou à disposição.',
  awayMessage: 'Estamos fora do horário de atendimento. Retornaremos em breve!',
  
  // Behavior
  proactivityLevel: 'medio',
  followUpDelay: 30,
  maxFollowUps: 3,
  typingSimulation: true,
  
  // Availability
  businessHours: defaultBusinessHours,
  
  // Advanced
  systemPrompt: '',
  
  // Stats & Connections
  conversationsToday: 0,
  whatsappConnected: false,
  
  // Features
  products: [],
  objectionRules: [],
  forbiddenWords: [],
  discountLimit: 10,
  handoffContact: '',
  webhookUrl: '',
  integrationTriggers: [],
});
