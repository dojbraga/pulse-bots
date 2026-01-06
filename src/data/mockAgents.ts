import { Agent } from '@/types/agent';
import { defaultBusinessHours, defaultPersonalityTraits, defaultFollowUpStrategy, defaultFollowUpTemplates } from './defaultAgent';

export const mockAgents: Agent[] = [
  {
    id: '1',
    name: 'Vendedor Hunter',
    isActive: true,
    persona: 'agressivo',
    voiceTone: 'direto',
    avatar: '',
    personalityTraits: { empathy: 40, assertiveness: 85, patience: 30, enthusiasm: 90, urgency: 80 },
    
    // Company Context
    companyName: 'Escola de Vendas Premium',
    industry: 'Educação',
    companyDescription: 'Somos uma escola especializada em formar os melhores vendedores do mercado.',
    targetAudience: 'Profissionais de vendas, empreendedores e gestores comerciais',
    
    // Communication Style
    responseLength: 'conciso',
    formalityLevel: 'informal',
    useEmojis: true,
    language: 'pt-BR',
    
    // Messages
    greetingMessage: 'Fala! 🔥 Vi que você tem interesse em turbinar suas vendas. Posso te ajudar?',
    farewellMessage: 'Valeu demais! Qualquer dúvida, só chamar. Bora vender! 💪',
    awayMessage: 'Estou fora agora, mas deixa sua mensagem que respondo assim que voltar!',
    
    // Behavior
    proactivityLevel: 'alto',
    followUpDelay: 15,
    maxFollowUps: 5,
    typingSimulation: true,
    followUpStrategy: {
      ...defaultFollowUpStrategy,
      maxDailyMessages: 5,
      templates: defaultFollowUpTemplates.map(t => ({
        ...t,
        delayMinutes: Math.round(t.delayMinutes * 0.7), // 30% mais rápido
      })),
    },
    
    // Availability
    businessHours: {
      ...defaultBusinessHours,
      enabled: true,
    },
    
    systemPrompt: 'Você é um vendedor focado em conversão...',
    conversationsToday: 24,
    whatsappConnected: true,
    products: [
      { 
        id: '1', 
        name: 'Curso de Vendas', 
        price: 997, 
        description: 'Aprenda a vender mais', 
        checkoutLink: 'https://checkout.com/curso-vendas',
        faq: [
          { id: '1', question: 'Quanto tempo tenho acesso?', answer: 'Acesso vitalício ao curso completo.' },
          { id: '2', question: 'Tem garantia?', answer: 'Sim, 7 dias de garantia incondicional.' },
        ],
        knowledgeBase: [
          { id: '1', name: 'Manual do Curso', type: 'pdf', url: 'https://exemplo.com/manual.pdf', description: 'Documentação técnica para o agente consultar' },
        ],
        leadMaterials: [
          { id: '1', name: 'Ementa do Curso', type: 'pdf', url: 'https://exemplo.com/ementa.pdf', description: 'Grade curricular completa' },
          { id: '2', name: 'Vídeo do Coordenador', type: 'video', url: 'https://youtube.com/watch?v=xxx', description: 'Apresentação do coordenador do curso' },
        ],
      },
      { 
        id: '2', 
        name: 'Mentoria Premium', 
        price: 2497, 
        description: 'Acompanhamento individual', 
        checkoutLink: 'https://checkout.com/mentoria',
        faq: [],
        knowledgeBase: [],
        leadMaterials: [],
      },
    ],
    objectionRules: [
      { id: '1', trigger: 'O cliente disse que está caro', action: 'Oferecer desconto de 5% e destacar o valor' },
      { id: '2', trigger: 'O cliente quer pensar', action: 'Criar urgência com bônus por tempo limitado' },
    ],
    forbiddenWords: ['concorrente', 'barato', 'grátis'],
    discountLimit: 15,
    handoffContact: 'vendas@empresa.com',
    webhookUrl: 'https://n8n.empresa.com/webhook/agent-1',
    integrationTriggers: [
      {
        id: '1',
        name: 'Enviar Curso de Interesse para CRM',
        event: 'interest_identified',
        dataFields: ['nome', 'email', 'telefone', 'curso_interesse'],
        webhookUrl: 'https://hooks.zapier.com/exemplo/curso-interesse',
        isActive: true,
      },
      {
        id: '2',
        name: 'Lead Qualificado',
        event: 'lead_captured',
        dataFields: ['nome', 'email', 'telefone', 'origem_lead'],
        webhookUrl: 'https://n8n.empresa.com/webhook/lead-qualificado',
        isActive: false,
      },
    ],
  },
  {
    id: '2',
    name: 'Suporte Clara',
    isActive: true,
    persona: 'suporte',
    voiceTone: 'empatico',
    avatar: '',
    personalityTraits: { empathy: 90, assertiveness: 25, patience: 85, enthusiasm: 40, urgency: 15 },
    
    companyName: 'TechSoft Solutions',
    industry: 'Tecnologia',
    companyDescription: 'Empresa de software focada em soluções para PMEs.',
    targetAudience: 'Pequenas e médias empresas',
    
    responseLength: 'detalhado',
    formalityLevel: 'neutro',
    useEmojis: false,
    language: 'pt-BR',
    
    greetingMessage: 'Olá! Sou a Clara, sua assistente de suporte. Como posso ajudar?',
    farewellMessage: 'Fico feliz em ter ajudado! Qualquer dúvida, estarei aqui.',
    awayMessage: 'Nosso horário de atendimento é das 9h às 18h. Deixe sua mensagem!',
    
    proactivityLevel: 'baixo',
    followUpDelay: 60,
    maxFollowUps: 2,
    typingSimulation: true,
    followUpStrategy: {
      ...defaultFollowUpStrategy,
      maxDailyMessages: 2,
      templates: defaultFollowUpTemplates.map(t => ({
        ...t,
        delayMinutes: Math.round(t.delayMinutes * 1.5), // 50% mais lento
      })),
    },
    
    businessHours: defaultBusinessHours,
    
    systemPrompt: 'Você é uma assistente de suporte...',
    conversationsToday: 42,
    whatsappConnected: true,
    products: [] as Agent['products'],
    objectionRules: [
      { id: '1', trigger: 'Cliente frustrado', action: 'Pedir desculpas e oferecer solução imediata' },
    ],
    forbiddenWords: ['problema seu', 'não sei'],
    discountLimit: 0,
    handoffContact: 'suporte@empresa.com',
    webhookUrl: 'https://n8n.empresa.com/webhook/agent-2',
    integrationTriggers: [],
  },
  {
    id: '3',
    name: 'Consultor Expert',
    isActive: false,
    persona: 'consultor',
    voiceTone: 'profissional',
    avatar: '',
    personalityTraits: { empathy: 60, assertiveness: 55, patience: 70, enthusiasm: 50, urgency: 35 },
    
    companyName: 'Consultoria Estratégica BR',
    industry: 'Consultoria',
    companyDescription: 'Consultoria especializada em transformação digital e estratégia de negócios.',
    targetAudience: 'Executivos e C-Level de grandes empresas',
    
    responseLength: 'equilibrado',
    formalityLevel: 'formal',
    useEmojis: false,
    language: 'pt-BR',
    
    greetingMessage: 'Bom dia! Sou o consultor responsável pelo seu atendimento. Em que posso ser útil?',
    farewellMessage: 'Agradeço pelo seu tempo. Fico à disposição para futuras consultas.',
    awayMessage: 'No momento estou em atendimento. Entrarei em contato assim que possível.',
    
    proactivityLevel: 'medio',
    followUpDelay: 120,
    maxFollowUps: 2,
    typingSimulation: false,
    followUpStrategy: defaultFollowUpStrategy,
    
    businessHours: {
      ...defaultBusinessHours,
      enabled: true,
    },
    
    systemPrompt: 'Você é um consultor especializado...',
    conversationsToday: 0,
    whatsappConnected: false,
    products: [
      { 
        id: '1', 
        name: 'Consultoria Estratégica', 
        price: 5000, 
        description: 'Análise completa do negócio', 
        checkoutLink: 'https://checkout.com/consultoria',
        faq: [],
        knowledgeBase: [],
        leadMaterials: [],
      },
    ],
    objectionRules: [],
    forbiddenWords: [],
    discountLimit: 10,
    handoffContact: 'consultoria@empresa.com',
    webhookUrl: 'https://n8n.empresa.com/webhook/agent-3',
    integrationTriggers: [],
  },
];
