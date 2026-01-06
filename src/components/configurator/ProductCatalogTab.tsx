import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Agent, Product } from '@/types/agent';

interface ProductCatalogTabProps {
  agent: Agent;
  onUpdate: (updates: Partial<Agent>) => void;
}

export function ProductCatalogTab({ agent, onUpdate }: ProductCatalogTabProps) {
  const [editingProduct, setEditingProduct] = useState<string | null>(null);

  const addProduct = () => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name: '',
      price: 0,
      description: '',
      checkoutLink: '',
    };
    onUpdate({ products: [...agent.products, newProduct] });
    setEditingProduct(newProduct.id);
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

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-1">Catálogo de Produtos</h3>
          <p className="text-sm text-muted-foreground">Gerencie os produtos que seu agente pode oferecer.</p>
        </div>
        <Button onClick={addProduct} className="gap-2">
          <Plus className="h-4 w-4" />
          Adicionar Produto
        </Button>
      </div>

      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">Nome do Produto</TableHead>
              <TableHead className="font-semibold">Preço (R$)</TableHead>
              <TableHead className="font-semibold">Descrição/USP</TableHead>
              <TableHead className="font-semibold">Link do Checkout</TableHead>
              <TableHead className="w-[60px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agent.products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  Nenhum produto cadastrado. Clique em "Adicionar Produto" para começar.
                </TableCell>
              </TableRow>
            ) : (
              agent.products.map((product) => (
                <TableRow key={product.id} className="group">
                  <TableCell>
                    <Input
                      value={product.name}
                      onChange={(e) => updateProduct(product.id, { name: e.target.value })}
                      placeholder="Nome do produto"
                      className="border-transparent bg-transparent focus:bg-background focus:border-input"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={product.price || ''}
                      onChange={(e) => updateProduct(product.id, { price: Number(e.target.value) })}
                      placeholder="0,00"
                      className="border-transparent bg-transparent focus:bg-background focus:border-input w-24"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={product.description}
                      onChange={(e) => updateProduct(product.id, { description: e.target.value })}
                      placeholder="Descrição breve"
                      className="border-transparent bg-transparent focus:bg-background focus:border-input"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={product.checkoutLink}
                      onChange={(e) => updateProduct(product.id, { checkoutLink: e.target.value })}
                      placeholder="https://..."
                      className="border-transparent bg-transparent focus:bg-background focus:border-input"
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteProduct(product.id)}
                      className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
