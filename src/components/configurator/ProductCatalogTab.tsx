import { useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronRight, FileText, Link, HelpCircle, Brain, Send, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Agent, Product, FAQItem, KnowledgeBase, LeadMaterial } from '@/types/agent';
import { Badge } from '@/components/ui/badge';

interface ProductCatalogTabProps {
  agent: Agent;
  onUpdate: (updates: Partial<Agent>) => void;
}

export function ProductCatalogTab({ agent, onUpdate }: ProductCatalogTabProps) {
  const [expandedProducts, setExpandedProducts] = useState<Set<string>>(new Set());

  const toggleExpanded = (productId: string) => {
    const newExpanded = new Set(expandedProducts);
    if (newExpanded.has(productId)) {
      newExpanded.delete(productId);
    } else {
      newExpanded.add(productId);
    }
    setExpandedProducts(newExpanded);
  };

  const addProduct = () => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name: '',
      price: 0,
      description: '',
      checkoutLink: '',
      faq: [],
      knowledgeBase: [],
      leadMaterials: [],
    };
    onUpdate({ products: [...agent.products, newProduct] });
    setExpandedProducts(new Set([...expandedProducts, newProduct.id]));
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    const updatedProducts = agent.products.map((p) =>
      p.id === id ? { ...p, ...updates } : p
    );
    onUpdate({ products: updatedProducts });
  };

  const deleteProduct = (id: string) => {
    onUpdate({ products: agent.products.filter((p) => p.id !== id) });
  };

  // FAQ handlers
  const addFAQ = (productId: string) => {
    const product = agent.products.find((p) => p.id === productId);
    if (!product) return;

    const newFAQ: FAQItem = {
      id: Date.now().toString(),
      question: '',
      answer: '',
    };
    updateProduct(productId, { faq: [...product.faq, newFAQ] });
  };

  const updateFAQ = (productId: string, faqId: string, updates: Partial<FAQItem>) => {
    const product = agent.products.find((p) => p.id === productId);
    if (!product) return;

    const updatedFAQ = product.faq.map((f) =>
      f.id === faqId ? { ...f, ...updates } : f
    );
    updateProduct(productId, { faq: updatedFAQ });
  };

  const deleteFAQ = (productId: string, faqId: string) => {
    const product = agent.products.find((p) => p.id === productId);
    if (!product) return;

    updateProduct(productId, { faq: product.faq.filter((f) => f.id !== faqId) });
  };

  // Knowledge Base handlers
  const addKnowledge = (productId: string) => {
    const product = agent.products.find((p) => p.id === productId);
    if (!product) return;

    const newKnowledge: KnowledgeBase = {
      id: Date.now().toString(),
      name: '',
      type: 'pdf',
      url: '',
      description: '',
    };
    updateProduct(productId, { knowledgeBase: [...product.knowledgeBase, newKnowledge] });
  };

  const updateKnowledge = (productId: string, knowledgeId: string, updates: Partial<KnowledgeBase>) => {
    const product = agent.products.find((p) => p.id === productId);
    if (!product) return;

    const updatedKnowledge = product.knowledgeBase.map((k) =>
      k.id === knowledgeId ? { ...k, ...updates } : k
    );
    updateProduct(productId, { knowledgeBase: updatedKnowledge });
  };

  const deleteKnowledge = (productId: string, knowledgeId: string) => {
    const product = agent.products.find((p) => p.id === productId);
    if (!product) return;

    updateProduct(productId, { knowledgeBase: product.knowledgeBase.filter((k) => k.id !== knowledgeId) });
  };

  // Lead Materials handlers
  const addLeadMaterial = (productId: string) => {
    const product = agent.products.find((p) => p.id === productId);
    if (!product) return;

    const newMaterial: LeadMaterial = {
      id: Date.now().toString(),
      name: '',
      type: 'pdf',
      url: '',
      description: '',
    };
    updateProduct(productId, { leadMaterials: [...product.leadMaterials, newMaterial] });
  };

  const updateLeadMaterial = (productId: string, materialId: string, updates: Partial<LeadMaterial>) => {
    const product = agent.products.find((p) => p.id === productId);
    if (!product) return;

    const updatedMaterials = product.leadMaterials.map((m) =>
      m.id === materialId ? { ...m, ...updates } : m
    );
    updateProduct(productId, { leadMaterials: updatedMaterials });
  };

  const deleteLeadMaterial = (productId: string, materialId: string) => {
    const product = agent.products.find((p) => p.id === productId);
    if (!product) return;

    updateProduct(productId, { leadMaterials: product.leadMaterials.filter((m) => m.id !== materialId) });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-1">Catálogo de Produtos</h3>
          <p className="text-sm text-muted-foreground">Gerencie os produtos, FAQs, base de conhecimento e materiais para leads.</p>
        </div>
        <Button onClick={addProduct} className="gap-2">
          <Plus className="h-4 w-4" />
          Adicionar Produto
        </Button>
      </div>

      {agent.products.length === 0 ? (
        <div className="rounded-lg border border-border p-8 text-center text-muted-foreground">
          Nenhum produto cadastrado. Clique em "Adicionar Produto" para começar.
        </div>
      ) : (
        <div className="space-y-4">
          {agent.products.map((product) => (
            <Collapsible
              key={product.id}
              open={expandedProducts.has(product.id)}
              onOpenChange={() => toggleExpanded(product.id)}
            >
              <div className="rounded-lg border border-border overflow-hidden">
                <CollapsibleTrigger asChild>
                  <div className="flex items-center justify-between p-4 bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      {expandedProducts.has(product.id) ? (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      )}
                      <div>
                        <span className="font-medium text-foreground">
                          {product.name || 'Produto sem nome'}
                        </span>
                        <span className="ml-3 text-sm text-muted-foreground">
                          R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div className="flex gap-2 ml-4">
                        {product.faq.length > 0 && (
                          <Badge variant="secondary" className="gap-1">
                            <HelpCircle className="h-3 w-3" />
                            {product.faq.length} FAQ
                          </Badge>
                        )}
                        {product.knowledgeBase.length > 0 && (
                          <Badge variant="outline" className="gap-1 border-blue-500/50 text-blue-600">
                            <Brain className="h-3 w-3" />
                            {product.knowledgeBase.length} RAG
                          </Badge>
                        )}
                        {product.leadMaterials.length > 0 && (
                          <Badge variant="outline" className="gap-1 border-green-500/50 text-green-600">
                            <Send className="h-3 w-3" />
                            {product.leadMaterials.length} materiais
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteProduct(product.id);
                      }}
                      className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div className="p-4 space-y-6 border-t border-border">
                    {/* Basic Info */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Nome do Produto</label>
                        <Input
                          value={product.name}
                          onChange={(e) => updateProduct(product.id, { name: e.target.value })}
                          placeholder="Ex: Curso de Vendas"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Preço (R$)</label>
                        <Input
                          type="number"
                          value={product.price || ''}
                          onChange={(e) => updateProduct(product.id, { price: Number(e.target.value) })}
                          placeholder="997,00"
                        />
                      </div>
                      <div className="space-y-2 col-span-2">
                        <label className="text-sm font-medium text-foreground">Descrição / USP</label>
                        <Textarea
                          value={product.description}
                          onChange={(e) => updateProduct(product.id, { description: e.target.value })}
                          placeholder="Descreva os benefícios e diferenciais do produto..."
                          rows={2}
                        />
                      </div>
                      <div className="space-y-2 col-span-2">
                        <label className="text-sm font-medium text-foreground">Link do Checkout</label>
                        <Input
                          value={product.checkoutLink}
                          onChange={(e) => updateProduct(product.id, { checkoutLink: e.target.value })}
                          placeholder="https://checkout.com/seu-produto"
                        />
                      </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <HelpCircle className="h-4 w-4 text-primary" />
                          <h4 className="font-medium text-foreground">FAQ do Produto</h4>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => addFAQ(product.id)} className="gap-1">
                          <Plus className="h-3 w-3" />
                          Adicionar Pergunta
                        </Button>
                      </div>
                      
                      {product.faq.length === 0 ? (
                        <p className="text-sm text-muted-foreground italic">
                          Nenhuma FAQ cadastrada. Adicione perguntas frequentes para o agente responder.
                        </p>
                      ) : (
                        <div className="space-y-3">
                          {product.faq.map((faq, index) => (
                            <div key={faq.id} className="p-3 rounded-lg bg-muted/30 space-y-2 group">
                              <div className="flex items-start gap-2">
                                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">
                                  P{index + 1}
                                </span>
                                <Input
                                  value={faq.question}
                                  onChange={(e) => updateFAQ(product.id, faq.id, { question: e.target.value })}
                                  placeholder="Pergunta frequente..."
                                  className="flex-1"
                                />
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => deleteFAQ(product.id, faq.id)}
                                  className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-8 w-8"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                              <Textarea
                                value={faq.answer}
                                onChange={(e) => updateFAQ(product.id, faq.id, { answer: e.target.value })}
                                placeholder="Resposta do agente..."
                                rows={2}
                                className="ml-8"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Knowledge Base Section (RAG) */}
                    <div className="space-y-3 p-4 rounded-lg border border-blue-500/20 bg-blue-500/5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Brain className="h-4 w-4 text-blue-600" />
                          <h4 className="font-medium text-foreground">Base de Conhecimento (RAG)</h4>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => addKnowledge(product.id)} className="gap-1">
                          <Plus className="h-3 w-3" />
                          Adicionar Documento
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Documentos que o agente consulta internamente para responder perguntas. <strong>Não são enviados ao lead.</strong>
                      </p>
                      
                      {product.knowledgeBase.length === 0 ? (
                        <p className="text-sm text-muted-foreground italic">
                          Nenhum documento na base de conhecimento. Adicione PDFs, links ou textos para o agente consultar.
                        </p>
                      ) : (
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-blue-500/10">
                              <TableHead className="font-medium">Nome</TableHead>
                              <TableHead className="font-medium w-[100px]">Tipo</TableHead>
                              <TableHead className="font-medium">URL / Conteúdo</TableHead>
                              <TableHead className="font-medium">Descrição</TableHead>
                              <TableHead className="w-[50px]"></TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {product.knowledgeBase.map((item) => (
                              <TableRow key={item.id} className="group">
                                <TableCell>
                                  <Input
                                    value={item.name}
                                    onChange={(e) => updateKnowledge(product.id, item.id, { name: e.target.value })}
                                    placeholder="Nome do documento"
                                    className="border-transparent bg-transparent focus:bg-background focus:border-input"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Select
                                    value={item.type}
                                    onValueChange={(value: KnowledgeBase['type']) => 
                                      updateKnowledge(product.id, item.id, { type: value })
                                    }
                                  >
                                    <SelectTrigger className="border-transparent bg-transparent focus:bg-background">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="pdf">
                                        <div className="flex items-center gap-2">
                                          <FileText className="h-3 w-3" />
                                          PDF
                                        </div>
                                      </SelectItem>
                                      <SelectItem value="doc">
                                        <div className="flex items-center gap-2">
                                          <FileText className="h-3 w-3" />
                                          DOC
                                        </div>
                                      </SelectItem>
                                      <SelectItem value="link">
                                        <div className="flex items-center gap-2">
                                          <Link className="h-3 w-3" />
                                          Link
                                        </div>
                                      </SelectItem>
                                      <SelectItem value="text">
                                        <div className="flex items-center gap-2">
                                          <FileText className="h-3 w-3" />
                                          Texto
                                        </div>
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </TableCell>
                                <TableCell>
                                  <Input
                                    value={item.url}
                                    onChange={(e) => updateKnowledge(product.id, item.id, { url: e.target.value })}
                                    placeholder="https://... ou texto direto"
                                    className="border-transparent bg-transparent focus:bg-background focus:border-input"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    value={item.description || ''}
                                    onChange={(e) => updateKnowledge(product.id, item.id, { description: e.target.value })}
                                    placeholder="Descrição do conteúdo"
                                    className="border-transparent bg-transparent focus:bg-background focus:border-input"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => deleteKnowledge(product.id, item.id)}
                                    className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-8 w-8"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      )}
                    </div>

                    {/* Lead Materials Section */}
                    <div className="space-y-3 p-4 rounded-lg border border-green-500/20 bg-green-500/5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Send className="h-4 w-4 text-green-600" />
                          <h4 className="font-medium text-foreground">Materiais para Envio ao Lead</h4>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => addLeadMaterial(product.id)} className="gap-1">
                          <Plus className="h-3 w-3" />
                          Adicionar Material
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Materiais que o agente pode <strong>enviar diretamente ao lead</strong> quando solicitar mais detalhes (ex: ementa, vídeo do coordenador).
                      </p>
                      
                      {product.leadMaterials.length === 0 ? (
                        <p className="text-sm text-muted-foreground italic">
                          Nenhum material para envio. Adicione PDFs, vídeos ou links para compartilhar com leads interessados.
                        </p>
                      ) : (
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-green-500/10">
                              <TableHead className="font-medium">Nome</TableHead>
                              <TableHead className="font-medium w-[100px]">Tipo</TableHead>
                              <TableHead className="font-medium">URL</TableHead>
                              <TableHead className="font-medium">Descrição</TableHead>
                              <TableHead className="w-[50px]"></TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {product.leadMaterials.map((item) => (
                              <TableRow key={item.id} className="group">
                                <TableCell>
                                  <Input
                                    value={item.name}
                                    onChange={(e) => updateLeadMaterial(product.id, item.id, { name: e.target.value })}
                                    placeholder="Nome do material"
                                    className="border-transparent bg-transparent focus:bg-background focus:border-input"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Select
                                    value={item.type}
                                    onValueChange={(value: LeadMaterial['type']) => 
                                      updateLeadMaterial(product.id, item.id, { type: value })
                                    }
                                  >
                                    <SelectTrigger className="border-transparent bg-transparent focus:bg-background">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="pdf">
                                        <div className="flex items-center gap-2">
                                          <FileText className="h-3 w-3" />
                                          PDF
                                        </div>
                                      </SelectItem>
                                      <SelectItem value="video">
                                        <div className="flex items-center gap-2">
                                          <Video className="h-3 w-3" />
                                          Vídeo
                                        </div>
                                      </SelectItem>
                                      <SelectItem value="doc">
                                        <div className="flex items-center gap-2">
                                          <FileText className="h-3 w-3" />
                                          Documento
                                        </div>
                                      </SelectItem>
                                      <SelectItem value="link">
                                        <div className="flex items-center gap-2">
                                          <Link className="h-3 w-3" />
                                          Link
                                        </div>
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </TableCell>
                                <TableCell>
                                  <Input
                                    value={item.url}
                                    onChange={(e) => updateLeadMaterial(product.id, item.id, { url: e.target.value })}
                                    placeholder="https://..."
                                    className="border-transparent bg-transparent focus:bg-background focus:border-input"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    value={item.description || ''}
                                    onChange={(e) => updateLeadMaterial(product.id, item.id, { description: e.target.value })}
                                    placeholder="Ex: Ementa completa do curso"
                                    className="border-transparent bg-transparent focus:bg-background focus:border-input"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => deleteLeadMaterial(product.id, item.id)}
                                    className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-8 w-8"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      )}
                    </div>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          ))}
        </div>
      )}
    </div>
  );
}
