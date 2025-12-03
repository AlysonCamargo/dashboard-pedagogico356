import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Product } from "@/data/products";

interface CatalogGridProps {
    products: Product[];
    viewMode: "grid" | "list";
    onProductClick: (product: Product) => void;
    hasMoreItems: boolean;
    loadMore: () => void;
    clearFilters: () => void;
}

export default function CatalogGrid({
    products,
    viewMode,
    onProductClick,
    hasMoreItems,
    loadMore,
    clearFilters,
}: CatalogGridProps) {
    if (products.length === 0) {
        return (
            <div className="text-center py-20 bg-secondary/20 rounded-xl border border-dashed border-border">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-4">
                    <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">Nenhum produto encontrado</h3>
                <p className="text-muted-foreground mb-6">
                    Tente ajustar seus filtros ou buscar por outro termo.
                </p>
                <Button onClick={clearFilters}>Limpar Filtros</Button>
            </div>
        );
    }

    return (
        <>
            <div
                className={`grid gap-6 mb-12 ${viewMode === "grid"
                        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                        : "grid-cols-1"
                    }`}
            >
                {products.map((product) => (
                    <div
                        key={product.id}
                        onClick={() => onProductClick(product)}
                        className="cursor-pointer"
                    >
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>

            {hasMoreItems && (
                <div className="text-center">
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={loadMore}
                        className="min-w-[200px]"
                    >
                        Carregar Mais
                    </Button>
                </div>
            )}
        </>
    );
}
