import { useRef, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { X, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductCarousel from "./ProductCarousel";
import { Product } from "@/data/products";

interface ProductModalProps {
    product: Product;
    isOpen: boolean;
    onClose: () => void;
}

const BRL = (n: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n);

const parseSizes = (s: string): string[] =>
    s
        .split(/[,\s]+/g)
        .map((x) => x.replace(/[^A-Za-z]/g, "").toUpperCase())
        .filter(Boolean);

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
    const dialogRef = useRef<HTMLDivElement>(null);
    const { addItem } = useCart();
    const [selectedSize, setSelectedSize] = useState<string>("");

    const sizes = parseSizes(product?.size || "");

    useEffect(() => {
        if (isOpen && sizes.length > 0) {
            setSelectedSize(sizes[0]);
        }
    }, [isOpen, product]);

    useEffect(() => {
        if (!isOpen) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "Tab" && dialogRef.current) {
                const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
                    'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
                );
                const first = focusables[0];
                const last = focusables[focusables.length - 1];
                if (!first || !last) return;
                if (e.shiftKey && document.activeElement === first) {
                    last.focus();
                    e.preventDefault();
                } else if (!e.shiftKey && document.activeElement === last) {
                    first.focus();
                    e.preventDefault();
                }
            }
        };

        document.addEventListener("keydown", onKeyDown);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        // focus on title
        dialogRef.current?.querySelector<HTMLElement>("#product-title")?.focus();

        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = prevOverflow || "unset";
        };
    }, [isOpen, onClose]);

    if (!isOpen || !product) return null;

    return (
        <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
            onClick={onClose}
        >
            <Helmet>
                <title>{product.name} | Distrito ZLG</title>
                <meta name="description" content={`Compre ${product.name} - ${product.category}. ${BRL(product.price)}.`} />
                <meta property="og:title" content={`${product.name} | Distrito ZLG`} />
                <meta property="og:description" content={`Compre ${product.name} - ${product.category}. ${BRL(product.price)}.`} />
                <meta property="og:image" content={product.image} />
            </Helmet>
            <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="product-title"
                className="bg-background rounded-2xl shadow-2xl border border-border max-w-4xl w-full max-h-[90vh] overflow-y-auto relative animate-scaleIn flex flex-col md:flex-row overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-foreground/50 hover:text-foreground z-10 w-8 h-8 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-colors"
                    aria-label="Fechar"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Left: Image Carousel */}
                <div className="w-full md:w-1/2 bg-secondary/30 p-6 flex items-center justify-center">
                    <ProductCarousel product={product} />
                </div>

                {/* Right: Info */}
                <div className="w-full md:w-1/2 p-8 flex flex-col">
                    <div className="mb-auto">
                        <div className="flex items-center gap-2 mb-4">
                            <Badge variant="outline" className="uppercase tracking-wider text-[10px]">
                                {product.category}
                            </Badge>
                            {product.isNew && <Badge className="bg-blue-500 hover:bg-blue-600">Novo</Badge>}
                            {product.isSale && <Badge variant="destructive">Promoção</Badge>}
                        </div>

                        <h3 id="product-title" className="text-3xl font-black font-heading mb-2 leading-tight">
                            {product.name}
                        </h3>

                        <div className="flex items-baseline gap-2 mb-6">
                            <span className="text-2xl font-bold text-foreground">{BRL(product.price)}</span>
                            <span className="text-sm text-muted-foreground">à vista</span>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <span className="text-sm font-medium text-muted-foreground block mb-2">Tamanhos Disponíveis</span>
                                <div className="flex flex-wrap gap-2">
                                    {sizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`w-10 h-10 rounded border flex items-center justify-center font-medium text-sm transition-all
                                                ${selectedSize === size
                                                    ? "bg-foreground text-background border-foreground"
                                                    : "border-border hover:border-foreground"}`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="p-4 bg-secondary/30 rounded-lg text-sm text-muted-foreground">
                                <p>🚚 Frete grátis para compras acima de R$ 299</p>
                                <p className="mt-2">🔄 Troca grátis em até 7 dias</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-border">
                        <Button
                            size="lg"
                            onClick={() => {
                                addItem(product, selectedSize);
                                onClose();
                            }}
                            className="w-full bg-foreground hover:bg-foreground/90 text-background font-bold text-lg h-14 gap-2"
                        >
                            <ShoppingBag className="w-5 h-5" />
                            ADICIONAR AO CARRINHO
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
