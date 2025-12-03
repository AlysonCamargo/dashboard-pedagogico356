"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CatalogFilters from "./CatalogFilters";
import CatalogGrid from "./CatalogGrid";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Filter, X, Grid, List, Search, SlidersHorizontal } from "lucide-react";
import { products, categories, Product } from "@/data/products";

// ===== Utilitários =====
const strip = (s: string) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

const parseSizes = (s: string): string[] =>
  s
    .split(/[,\s]+/g)
    .map((x) => x.replace(/[^A-Za-z]/g, "").toUpperCase())
    .filter(Boolean);

type SortKey = "relevance" | "price-asc" | "price-desc" | "name-asc" | "newest";

const ITEMS_PER_PAGE = 12;

export default function Catalog() {
  // Estado
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sort, setSort] = useState<SortKey>("relevance");
  const [showOnlySale, setShowOnlySale] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filtersRef = useRef<HTMLDivElement>(null);

  // Check for URL search param
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");
    if (q) {
      setSearchTerm(q);
    }
  }, []);

  // Fechar filtros ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filtersRef.current && !filtersRef.current.contains(event.target as Node)) {
        setShowFilters(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ===== Contagem por categoria (considera busca + tamanhos) =====
  const categoryCounts = useMemo(() => {
    const q = strip(searchTerm);
    const bySearch = (p: Product) => strip(p.name).includes(q);
    const bySizes = (p: Product) =>
      selectedSizes.length === 0 ||
      selectedSizes.some((s) => parseSizes(p.size || "").includes(s.toUpperCase()));
    const bySale = (p: Product) => !showOnlySale || p.isSale;

    const base = products.filter((p) => bySearch(p) && bySizes(p) && bySale(p));
    const counts: Record<string, number> = { todos: base.length };

    categories.forEach((c) => {
      if (c.id !== "todos") {
        if (c.id === "promocoes") {
          counts[c.id] = base.filter((p) => p.isSale).length;
        } else {
          counts[c.id] = base.filter((p) => strip(p.category) === strip(c.id)).length;
        }
      }
    });

    return counts;
  }, [searchTerm, selectedSizes, showOnlySale]);

  // ===== Filtro + ordenação =====
  const filteredProducts = useMemo(() => {
    const q = strip(searchTerm);

    const matchesCategory = (p: Product) => {
      if (selectedCategory === "todos") return true;
      if (selectedCategory === "promocoes") return p.isSale;
      return strip(p.category) === strip(selectedCategory);
    };

    const matchesSearch = (p: Product) => strip(p.name).includes(q);

    const matchesSizes = (p: Product) =>
      selectedSizes.length === 0 ||
      selectedSizes.some((s) => parseSizes(p.size || "").includes(s.toUpperCase()));

    const matchesSale = (p: Product) => !showOnlySale || p.isSale;

    let result = products.filter((p) =>
      matchesCategory(p) &&
      matchesSearch(p) &&
      matchesSizes(p) &&
      matchesSale(p)
    );

    const sortRelevance = (a: Product, b: Product) => {
      const isASale = a.isSale ? 1 : 0;
      const isBSale = b.isSale ? 1 : 0;

      if (isASale !== isBSale) {
        return isBSale - isASale; // Promos first
      }

      const isANew = a.isNew ? 1 : 0;
      const isBNew = b.isNew ? 1 : 0;

      if (isANew !== isBNew) {
        return isBNew - isANew; // New items next
      }

      return 0; // Maintain original order for others
    };

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "relevance":
      default:
        result.sort(sortRelevance);
        break;
    }

    return result;
  }, [selectedCategory, searchTerm, selectedSizes, sort, showOnlySale]);

  // Paginação incremental
  const productsToShow = useMemo(() => filteredProducts.slice(0, visibleItems), [filteredProducts, visibleItems]);
  const hasMoreItems = visibleItems < filteredProducts.length;

  // Handlers
  const handleProductClick = useCallback((product: Product) => {
    navigate(`/product/${product.id}`);
  }, [navigate]);

  const loadMore = () => setVisibleItems((prev) => prev + ITEMS_PER_PAGE);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setVisibleItems(ITEMS_PER_PAGE);
    setShowFilters(false);
  };

  const toggleSize = (size: string) =>
    setSelectedSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]));

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedSizes([]);
    setSelectedCategory("todos");
    setSort("relevance");
    setShowOnlySale(false);
    setVisibleItems(ITEMS_PER_PAGE);
  };

  // ===== Render =====
  return (
    <section id="catalog" className="py-12 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <h2 className="font-heading font-black text-3xl md:text-5xl mb-2">
              <span className="text-foreground">NOSSO</span> <span className="text-transparent bg-clip-text bg-gradient-urban">CATÁLOGO</span>
            </h2>
            <p className="text-muted-foreground">
              Encontre seu estilo entre nossas {products.length} peças exclusivas.
            </p>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            {/* Busca principal */}
            <div className="relative w-full md:w-64">
              <Input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-secondary border-border focus:border-accent pl-10 rounded-full"
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground"
              />
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden shrink-0"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Layout principal */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filtros laterais (desktop) */}
          <CatalogFilters
            selectedCategory={selectedCategory}
            setSelectedCategory={handleCategoryChange}
            showOnlySale={showOnlySale}
            setShowOnlySale={setShowOnlySale}
            selectedSizes={selectedSizes}
            toggleSize={toggleSize}
            categoryCounts={categoryCounts}
            className="hidden md:block w-64 flex-shrink-0"
          />

          {/* Conteúdo principal */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex justify-between items-center mb-6 bg-secondary/30 p-3 rounded-xl">
              <div className="flex items-center gap-4">
                <p className="text-sm text-muted-foreground font-medium">
                  {filteredProducts.length} resultados
                </p>

                {/* Active Filters Pills */}
                {(selectedSizes.length > 0 || showOnlySale) && (
                  <div className="hidden lg:flex items-center gap-2">
                    <div className="h-4 w-px bg-border mx-2" />
                    {showOnlySale && (
                      <Badge variant="secondary" className="gap-1 cursor-pointer" onClick={() => setShowOnlySale(false)}>
                        Promoções <X className="w-3 h-3" />
                      </Badge>
                    )}
                    {selectedSizes.map(s => (
                      <Badge key={s} variant="secondary" className="gap-1 cursor-pointer" onClick={() => toggleSize(s)}>
                        {s} <X className="w-3 h-3" />
                      </Badge>
                    ))}
                    <button onClick={clearFilters} className="text-xs text-muted-foreground hover:text-foreground underline ml-2">
                      Limpar tudo
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="bg-transparent text-sm font-medium border-none focus:ring-0 cursor-pointer text-right"
                >
                  <option value="relevance">Relevância</option>
                  <option value="newest">Mais Recentes</option>
                  <option value="price-asc">Menor Preço</option>
                  <option value="price-desc">Maior Preço</option>
                  <option value="name-asc">Nome (A-Z)</option>
                </select>

                <div className="flex bg-background rounded-lg border border-border p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded ${viewMode === "grid" ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 rounded ${viewMode === "list" ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Filters Drawer */}
            {showFilters && (
              <div className="md:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" onClick={() => setShowFilters(false)}>
                <div
                  className="absolute right-0 top-0 bottom-0 w-[300px] bg-background border-l border-border p-6 overflow-y-auto animate-slideLeft"
                  onClick={e => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-xl">Filtros</h3>
                    <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
                      <X className="w-5 h-5" />
                    </Button>
                  </div>

                  <div className="space-y-6">
                    <CatalogFilters
                      selectedCategory={selectedCategory}
                      setSelectedCategory={handleCategoryChange}
                      showOnlySale={showOnlySale}
                      setShowOnlySale={setShowOnlySale}
                      selectedSizes={selectedSizes}
                      toggleSize={toggleSize}
                      categoryCounts={categoryCounts}
                    />

                    <Button className="w-full mt-4" onClick={() => setShowFilters(false)}>
                      Ver {filteredProducts.length} resultados
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Grid de produtos */}
            <CatalogGrid
              products={productsToShow}
              viewMode={viewMode}
              onProductClick={handleProductClick}
              hasMoreItems={hasMoreItems}
              loadMore={loadMore}
              clearFilters={clearFilters}
            />
          </div>
        </div>
      </div>

    </section>
  );
}