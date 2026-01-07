import { Agent, BusinessHours, PersonalityTraits, FollowUpStrategy, FollowUpTemplate, ConversationStage } from '@/types/agent';

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

export const defaultConversationStages: ConversationStage[] = [
  {
    id: 'stage_welcome',
    name: 'Boas-vindas',
    description: 'Estágio inicial para recepcionar o lead e entender seu interesse',
    icon: 'wave',
    color: '#4CAF50',
    isDefault: true,
    order: 1,
    instructions: `Você está no estágio de boas-vindas. Seu objetivo é:
- Cumprimentar o lead de forma amigável
- Identificar rapidamente o que ele procura
- Coletar nome e contexto inicial
- Direcionar para o produto/serviço mais adequado`,
    entryConditions: [],
    conditionLogic: 'and',
    transitions: [
      {
        id: 'trans_welcome_to_discovery',
        targetStageId: 'stage_discovery',
        conditions: [
          { id: 'cond_1', type: 'variable_set', operator: 'equals', value: 'nome' }
        ],
        conditionLogic: 'and',
        priority: 1
      }
    ],
    entryActions: [],
    settings: {
      allowHumanHandoff: false,
      maxMessagesInStage: 5,
      timeoutMinutes: 10,
      timeoutAction: 'stay'
    },
    isActive: true
  },
  {
    id: 'stage_discovery',
    name: 'Descoberta',
    description: 'Entender as necessidades, dores e objetivos do lead',
    icon: 'search',
    color: '#2196F3',
    isDefault: false,
    order: 2,
    instructions: `Você está no estágio de descoberta. Seu objetivo é:
- Fazer perguntas abertas para entender o contexto
- Identificar dores e necessidades específicas
- Descobrir orçamento e urgência
- Qualificar o lead (BANT: Budget, Authority, Need, Timeline)`,
    entryConditions: [
      { id: 'cond_discovery', type: 'variable_set', operator: 'equals', value: 'nome' }
    ],
    conditionLogic: 'and',
    transitions: [
      {
        id: 'trans_discovery_to_presentation',
        targetStageId: 'stage_presentation',
        conditions: [
          { id: 'cond_2', type: 'keyword', operator: 'contains', value: 'interessado|quero saber mais|como funciona' }
        ],
        conditionLogic: 'or',
        priority: 1
      }
    ],
    entryActions: [
      { id: 'action_1', type: 'tag_lead', config: { tag: 'em_descoberta' } }
    ],
    settings: {
      allowHumanHandoff: false,
      maxMessagesInStage: 10,
      timeoutMinutes: 30,
      timeoutAction: 'transition',
      timeoutTargetStageId: 'stage_followup'
    },
    isActive: true
  },
  {
    id: 'stage_presentation',
    name: 'Apresentação',
    description: 'Apresentar produto/serviço e seus benefícios',
    icon: 'presentation',
    color: '#9C27B0',
    isDefault: false,
    order: 3,
    instructions: `Você está no estágio de apresentação. Seu objetivo é:
- Apresentar o produto/serviço mais adequado às necessidades
- Destacar benefícios e diferenciais
- Usar provas sociais e cases de sucesso
- Enviar materiais de apoio quando relevante`,
    entryConditions: [
      { id: 'cond_presentation', type: 'intent', operator: 'equals', value: 'interest' }
    ],
    conditionLogic: 'and',
    transitions: [
      {
        id: 'trans_presentation_to_negotiation',
        targetStageId: 'stage_negotiation',
        conditions: [
          { id: 'cond_3', type: 'keyword', operator: 'contains', value: 'preço|valor|quanto custa|investimento' }
        ],
        conditionLogic: 'or',
        priority: 1
      }
    ],
    entryActions: [
      { id: 'action_2', type: 'send_file', config: { file: 'catalogo_produtos' } }
    ],
    settings: {
      allowHumanHandoff: false,
      maxMessagesInStage: 15,
      timeoutMinutes: 60,
      timeoutAction: 'transition',
      timeoutTargetStageId: 'stage_followup'
    },
    isActive: true
  },
  {
    id: 'stage_negotiation',
    name: 'Negociação',
    description: 'Apresentar preços, lidar com objeções e negociar',
    icon: 'handshake',
    color: '#FF9800',
    isDefault: false,
    order: 4,
    instructions: `Você está no estágio de negociação. Seu objetivo é:
- Apresentar preços e formas de pagamento
- Lidar com objeções usando a matriz de objeções
- Aplicar gatilhos de urgência e escassez quando apropriado
- Oferecer descontos dentro do limite permitido
- Direcionar para o checkout`,
    entryConditions: [
      { id: 'cond_negotiation', type: 'keyword', operator: 'contains', value: 'preço|valor' }
    ],
    conditionLogic: 'or',
    transitions: [
      {
        id: 'trans_negotiation_to_closing',
        targetStageId: 'stage_closing',
        conditions: [
          { id: 'cond_4', type: 'keyword', operator: 'contains', value: 'quero comprar|vou fechar|me manda o link' }
        ],
        conditionLogic: 'or',
        priority: 1
      },
      {
        id: 'trans_negotiation_to_objection',
        targetStageId: 'stage_objection',
        conditions: [
          { id: 'cond_5', type: 'sentiment', operator: 'equals', value: 'negative' }
        ],
        conditionLogic: 'and',
        priority: 2
      }
    ],
    entryActions: [
      { id: 'action_3', type: 'trigger_webhook', config: { event: 'price_presented' } }
    ],
    settings: {
      allowHumanHandoff: true,
      maxMessagesInStage: 20,
      timeoutMinutes: 120,
      timeoutAction: 'transition',
      timeoutTargetStageId: 'stage_followup'
    },
    isActive: true
  },
  {
    id: 'stage_objection',
    name: 'Tratamento de Objeções',
    description: 'Lidar com objeções específicas do lead',
    icon: 'shield',
    color: '#F44336',
    isDefault: false,
    order: 5,
    instructions: `Você está no estágio de tratamento de objeções. Seu objetivo é:
- Identificar a objeção real (preço, timing, autoridade, etc.)
- Usar técnicas de contorno de objeção
- Reforçar valor e benefícios
- Se necessário, passar para atendimento humano`,
    entryConditions: [
      { id: 'cond_objection', type: 'sentiment', operator: 'equals', value: 'negative' }
    ],
    conditionLogic: 'and',
    transitions: [
      {
        id: 'trans_objection_to_negotiation',
        targetStageId: 'stage_negotiation',
        conditions: [
          { id: 'cond_6', type: 'sentiment', operator: 'equals', value: 'positive' }
        ],
        conditionLogic: 'and',
        priority: 1
      },
      {
        id: 'trans_objection_to_handoff',
        targetStageId: 'stage_handoff',
        conditions: [
          { id: 'cond_7', type: 'message_count', operator: 'greater_than', value: '5' }
        ],
        conditionLogic: 'and',
        priority: 2
      }
    ],
    entryActions: [
      { id: 'action_4', type: 'tag_lead', config: { tag: 'objecao_levantada' } }
    ],
    settings: {
      allowHumanHandoff: true,
      maxMessagesInStage: 10,
      timeoutMinutes: 60,
      timeoutAction: 'handoff'
    },
    isActive: true
  },
  {
    id: 'stage_closing',
    name: 'Fechamento',
    description: 'Finalizar a venda e direcionar para checkout',
    icon: 'check-circle',
    color: '#4CAF50',
    isDefault: false,
    order: 6,
    instructions: `Você está no estágio de fechamento. Seu objetivo é:
- Confirmar a decisão de compra
- Enviar link de checkout
- Esclarecer últimas dúvidas sobre pagamento
- Garantir uma experiência de compra fluida`,
    entryConditions: [
      { id: 'cond_closing', type: 'intent', operator: 'equals', value: 'purchase' }
    ],
    conditionLogic: 'and',
    transitions: [
      {
        id: 'trans_closing_to_success',
        targetStageId: 'stage_success',
        conditions: [
          { id: 'cond_8', type: 'custom', operator: 'equals', value: 'payment_confirmed' }
        ],
        conditionLogic: 'and',
        priority: 1
      }
    ],
    entryActions: [
      { id: 'action_5', type: 'send_link', config: { link_type: 'checkout' } },
      { id: 'action_6', type: 'trigger_webhook', config: { event: 'checkout_initiated' } }
    ],
    settings: {
      allowHumanHandoff: true,
      maxMessagesInStage: 10,
      timeoutMinutes: 30,
      timeoutAction: 'transition',
      timeoutTargetStageId: 'stage_followup'
    },
    isActive: true
  },
  {
    id: 'stage_success',
    name: 'Sucesso',
    description: 'Venda concluída - agradecer e orientar próximos passos',
    icon: 'trophy',
    color: '#FFD700',
    isDefault: false,
    order: 7,
    instructions: `Você está no estágio de sucesso. Seu objetivo é:
- Parabenizar pela compra
- Explicar próximos passos (acesso, entrega, etc.)
- Oferecer suporte se necessário
- Solicitar feedback ou indicações`,
    entryConditions: [
      { id: 'cond_success', type: 'custom', operator: 'equals', value: 'payment_confirmed' }
    ],
    conditionLogic: 'and',
    transitions: [],
    entryActions: [
      { id: 'action_7', type: 'trigger_webhook', config: { event: 'sale_completed' } },
      { id: 'action_8', type: 'tag_lead', config: { tag: 'cliente' } }
    ],
    settings: {
      allowHumanHandoff: false,
      maxMessagesInStage: 5,
      timeoutMinutes: 1440,
      timeoutAction: 'stay'
    },
    isActive: true
  },
  {
    id: 'stage_followup',
    name: 'Follow-up',
    description: 'Retomar contato com leads que esfriaram',
    icon: 'clock',
    color: '#607D8B',
    isDefault: false,
    order: 8,
    instructions: `Você está no estágio de follow-up. Seu objetivo é:
- Retomar a conversa de forma natural
- Relembrar o interesse anterior
- Oferecer algo novo (desconto, bônus, novidade)
- Requalificar o lead`,
    entryConditions: [
      { id: 'cond_followup', type: 'time_elapsed', operator: 'greater_than', value: '1440' }
    ],
    conditionLogic: 'and',
    transitions: [
      {
        id: 'trans_followup_to_discovery',
        targetStageId: 'stage_discovery',
        conditions: [
          { id: 'cond_9', type: 'sentiment', operator: 'equals', value: 'positive' }
        ],
        conditionLogic: 'and',
        priority: 1
      }
    ],
    entryActions: [
      { id: 'action_9', type: 'schedule_followup', config: { delay_hours: '24' } }
    ],
    settings: {
      allowHumanHandoff: false,
      maxMessagesInStage: 5,
      timeoutMinutes: 4320,
      timeoutAction: 'stay'
    },
    isActive: true
  },
  {
    id: 'stage_handoff',
    name: 'Passagem para Humano',
    description: 'Transferir atendimento para um humano',
    icon: 'user',
    color: '#795548',
    isDefault: false,
    order: 9,
    instructions: `Você está no estágio de handoff. Seu objetivo é:
- Informar que um especialista assumirá o atendimento
- Coletar informações pendentes
- Resumir o contexto da conversa
- Manter o lead engajado enquanto aguarda`,
    entryConditions: [
      { id: 'cond_handoff', type: 'keyword', operator: 'contains', value: 'falar com humano|atendente|pessoa real' }
    ],
    conditionLogic: 'or',
    transitions: [],
    entryActions: [
      { id: 'action_10', type: 'handoff', config: { notify: 'true' } },
      { id: 'action_11', type: 'trigger_webhook', config: { event: 'handoff_requested' } }
    ],
    settings: {
      allowHumanHandoff: true,
      maxMessagesInStage: 3,
      timeoutMinutes: 15,
      timeoutAction: 'stay'
    },
    isActive: true
  }
];

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
  conversationStages: defaultConversationStages,
});
