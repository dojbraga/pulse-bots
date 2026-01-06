import { Agent, BusinessHours, PersonalityTraits, FollowUpStrategy, FollowUpTemplate } from '@/types/agent';

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

export const defaultPersonalityTraits: PersonalityTraits = {
  empathy: 50,
  assertiveness: 50,
  patience: 50,
  enthusiasm: 50,
  urgency: 50,
};

export const defaultFollowUpTemplates: FollowUpTemplate[] = [
  // Initial Contact - Lead started but didn't engage
  {
    id: 'fup_initial_1',
    stage: 'initial_contact',
    attempt: 1,
    delayMinutes: 15,
    message: 'Oi! Vi que você começou a falar comigo. Posso te ajudar com algo? 😊',
    isActive: true,
  },
  {
    id: 'fup_initial_2',
    stage: 'initial_contact',
    attempt: 2,
    delayMinutes: 60,
    message: 'Ei, ainda estou por aqui se precisar de alguma informação. Sem compromisso! 👋',
    isActive: true,
  },
  
  // Product Aware - Knows product but didn't see price
  {
    id: 'fup_product_1',
    stage: 'product_aware',
    attempt: 1,
    delayMinutes: 20,
    message: 'E aí, o que achou do {produto}? Quer que eu te explique mais sobre como funciona?',
    isActive: true,
  },
  {
    id: 'fup_product_2',
    stage: 'product_aware',
    attempt: 2,
    delayMinutes: 1440, // 24h
    message: 'Oi! Passando para ver se ficou alguma dúvida sobre o {produto}. Posso te ajudar?',
    isActive: true,
  },
  
  // Price Aware - Saw price but didn't buy
  {
    id: 'fup_price_1',
    stage: 'price_aware',
    attempt: 1,
    delayMinutes: 30,
    message: 'Entendo que investimento é uma decisão importante! Posso esclarecer algo sobre o valor ou formas de pagamento?',
    isActive: true,
  },
  {
    id: 'fup_price_2',
    stage: 'price_aware',
    attempt: 2,
    delayMinutes: 1440,
    message: 'Oi! Lembrei de você 😊 Ainda está considerando o {produto}? Tenho uma condição especial que pode te interessar...',
    isActive: true,
  },
  {
    id: 'fup_price_3',
    stage: 'price_aware',
    attempt: 3,
    delayMinutes: 4320, // 3 dias
    message: 'Última chance! A condição especial que mencionei está acabando. Posso reservar para você?',
    isActive: true,
  },
  
  // Objection Raised - Had objection and left
  {
    id: 'fup_objection_1',
    stage: 'objection_raised',
    attempt: 1,
    delayMinutes: 60,
    message: 'Oi! Refleti sobre o que você disse e queria compartilhar algo que pode mudar sua perspectiva...',
    isActive: true,
  },
  {
    id: 'fup_objection_2',
    stage: 'objection_raised',
    attempt: 2,
    delayMinutes: 2880, // 48h
    message: 'Ei! Consegui uma informação que responde direitinho aquela sua preocupação. Posso compartilhar?',
    isActive: true,
  },
  
  // Cart Abandoned - Started checkout but didn't complete
  {
    id: 'fup_cart_1',
    stage: 'cart_abandoned',
    attempt: 1,
    delayMinutes: 10,
    message: 'Vi que você estava quase finalizando! Aconteceu algum problema no checkout? Posso ajudar! 🛒',
    isActive: true,
  },
  {
    id: 'fup_cart_2',
    stage: 'cart_abandoned',
    attempt: 2,
    delayMinutes: 60,
    message: 'Seu carrinho ainda está salvo! Se tiver alguma dúvida ou dificuldade técnica, me avisa.',
    isActive: true,
  },
  {
    id: 'fup_cart_3',
    stage: 'cart_abandoned',
    attempt: 3,
    delayMinutes: 1440,
    message: 'Oi! Guardei uma surpresa para você finalizar sua compra. Quer saber? 🎁',
    isActive: true,
  },
  
  // Negotiation - Asking for discount
  {
    id: 'fup_negotiation_1',
    stage: 'negotiation',
    attempt: 1,
    delayMinutes: 30,
    message: 'Estou verificando internamente o que consigo fazer para você. Me dá só mais um tempinho? 🤝',
    isActive: true,
  },
  {
    id: 'fup_negotiation_2',
    stage: 'negotiation',
    attempt: 2,
    delayMinutes: 120,
    message: 'Consegui! Tenho uma proposta especial para você. Podemos conversar?',
    isActive: true,
  },
  
  // Waiting Decision - Said they'll think about it
  {
    id: 'fup_decision_1',
    stage: 'waiting_decision',
    attempt: 1,
    delayMinutes: 1440, // 24h
    message: 'Oi! Tudo bem? Passou pelo menos um dia desde nossa conversa. Chegou a pensar sobre o {produto}?',
    isActive: true,
  },
  {
    id: 'fup_decision_2',
    stage: 'waiting_decision',
    attempt: 2,
    delayMinutes: 4320, // 3 dias
    message: 'Ei! Só passando para lembrar que estou à disposição. Surgiu alguma dúvida nova?',
    isActive: true,
  },
  {
    id: 'fup_decision_3',
    stage: 'waiting_decision',
    attempt: 3,
    delayMinutes: 10080, // 7 dias
    message: 'Oi! Faz uma semana que conversamos. Ainda posso ajudar com algo sobre o {produto}? Se não for mais do seu interesse, tudo bem também! 😊',
    isActive: true,
  },
];

export const defaultFollowUpStrategy: FollowUpStrategy = {
  enabled: true,
  useSmartTiming: true,
  respectQuietHours: true,
  quietHoursStart: '22:00',
  quietHoursEnd: '08:00',
  maxDailyMessages: 3,
  stopOnNegativeResponse: true,
  templates: defaultFollowUpTemplates,
};

export const createDefaultAgent = (id: string): Agent => ({
  id,
  name: 'Novo Agente',
  isActive: false,
  
  // Identity
  persona: 'consultor',
  voiceTone: 'profissional',
  avatar: '',
  personalityTraits: defaultPersonalityTraits,
  
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
  
  // Goals
  primaryGoal: 'conversion',
  secondaryGoal: 'build_relationship',
  successMetric: '',
  uniqueSellingPoints: '',
  
  // Behavior
  proactivityLevel: 'medio',
  followUpDelay: 30,
  maxFollowUps: 3,
  typingSimulation: true,
  followUpStrategy: defaultFollowUpStrategy,
  
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
