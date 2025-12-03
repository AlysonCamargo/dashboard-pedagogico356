import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { categories } from "@/data/products";

interface CatalogFiltersProps {
    selectedCategory: string;
    setSelectedCategory: (id: string) => void;
    showOnlySale: boolean;
    setShowOnlySale: (show: boolean) => void;
    selectedSizes: string[];
    toggleSize: (size: string) => void;
    categoryCounts: Record<string, number>;
    className?: string;
}

export default function CatalogFilters({
    selectedCategory,
    setSelectedCategory,
    showOnlySale,
    setShowOnlySale,
    selectedSizes,
    toggleSize,
    categoryCounts,
    className = "",
}: CatalogFiltersProps) {
    return (
        <div className={className}>
            <div className="sticky top-24 space-y-8">
                {/* Categorias */}
                <div>
                    <h3 className="font-bold text-lg mb-4">Categorias</h3>
                    <div className="space-y-1">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`w-full px-3 py-2 rounded-lg text-left transition-all flex items-center justify-between text-sm ${selectedCategory === category.id
                                        ? "bg-foreground text-background font-medium"
                                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                                    }`}
                            >
                                <span>{category.name}</span>
                                <span
                                    className={`text-xs px-2 py-0.5 rounded-full ${selectedCategory === category.id ? "bg-background/20" : "bg-secondary"
                                        }`}
                                >
                                    {categoryCounts[category.id] || 0}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Filtros */}
                <div>
                    <h3 className="font-bold text-lg mb-4">Filtros</h3>

                    {/* Promoções */}
                    <div className="mb-6">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <div
                                className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${showOnlySale
                                        ? "bg-accent border-accent"
                                        : "border-muted-foreground group-hover:border-accent"
                                    }`}
                                onClick={() => setShowOnlySale(!showOnlySale)}
                            >
                                {showOnlySale && <X className="w-3 h-3 text-accent-foreground" />}
                            </div>
                            <span className="text-sm font-medium">Apenas Promoções</span>
                        </label>
                    </div>

                    {/* Tamanhos */}
                    <div>
                        <h4 className="font-medium text-sm mb-3 text-muted-foreground">Tamanhos</h4>
                        <div className="grid grid-cols-4 gap-2">
                            {["P", "M", "G", "GG"].map((s) => (
                                <button
                                    key={s}
                                    onClick={() => toggleSize(s)}
                                    className={`aspect-square rounded-md border text-sm font-medium transition-all ${selectedSizes.includes(s)
                                            ? "bg-foreground text-background border-foreground"
                                            : "bg-background border-border hover:border-foreground"
                                        }`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
