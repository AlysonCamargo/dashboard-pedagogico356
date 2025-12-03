import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useState } from "react";
import OrderForm from "./OrderForm";

const BRL = (n: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n);

export default function CartDrawer() {
    const { isCartOpen, setIsCartOpen, items, updateQuantity, removeItem, cartTotal } = useCart();
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    const handleClose = () => {
        setIsCartOpen(false);
        setIsCheckingOut(false);
    };

    return (
        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetContent className="w-full sm:max-w-md flex flex-col h-full">
                <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5" />
                        Seu Carrinho
                    </SheetTitle>
                    <SheetDescription>
                        {items.length === 0 ? "Seu carrinho está vazio." : `${items.length} itens no carrinho.`}
                    </SheetDescription>
                </SheetHeader>

                {items.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground gap-4">
                        <ShoppingBag className="w-16 h-16 opacity-20" />
                        <p>Adicione produtos para começar.</p>
                        <Button variant="outline" onClick={handleClose}>
                            Continuar Comprando
                        </Button>
                    </div>
                ) : (
                    <>
                        {!isCheckingOut ? (
                            <>
                                <ScrollArea className="flex-1 -mx-6 px-6 my-4">
                                    <div className="space-y-4">
                                        {items.map((item) => (
                                            <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 py-4 border-b border-border/50">
                                                <div className="w-20 h-20 bg-secondary rounded-md overflow-hidden shrink-0">
                                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex-1 flex flex-col justify-between">
                                                    <div>
                                                        <h4 className="font-medium line-clamp-1">{item.name}</h4>
                                                        <p className="text-sm text-muted-foreground">Tamanho: {item.selectedSize}</p>
                                                    </div>
                                                    <div className="flex items-center justify-between mt-2">
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                                                                className="w-6 h-6 rounded-full border border-border flex items-center justify-center hover:bg-secondary"
                                                            >
                                                                <Minus className="w-3 h-3" />
                                                            </button>
                                                            <span className="text-sm w-4 text-center">{item.quantity}</span>
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                                                                className="w-6 h-6 rounded-full border border-border flex items-center justify-center hover:bg-secondary"
                                                            >
                                                                <Plus className="w-3 h-3" />
                                                            </button>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <span className="font-medium">{BRL(item.price * item.quantity)}</span>
                                                            <button
                                                                onClick={() => removeItem(item.id, item.selectedSize)}
                                                                className="text-muted-foreground hover:text-destructive transition-colors"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>

                                <div className="pt-4 border-t border-border space-y-4">
                                    <div className="flex justify-between items-center text-lg font-bold">
                                        <span>Total</span>
                                        <span>{BRL(cartTotal)}</span>
                                    </div>
                                    <Button className="w-full h-12 text-lg font-bold" onClick={() => setIsCheckingOut(true)}>
                                        Finalizar Compra
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <OrderForm onBack={() => setIsCheckingOut(false)} />
                        )}
                    </>
                )}
            </SheetContent>
        </Sheet>
    );
}
