"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

const BRL = (n: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n);

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isFav = isInWishlist(product.id);

  const [frontLoaded, setFrontLoaded] = useState(false);
  const [backLoaded, setBackLoaded] = useState(false);

  const frontSrc = product.imageFront || product.image;
  const backSrc = product.imageBack || product.image;

  return (
    <motion.div whileHover={{ scale: 1.02 }} className="group overflow-hidden border hover:shadow-lg transition will-change-transform">
      <Card className="overflow-hidden">
        <div className="relative aspect-square overflow-hidden bg-secondary/40">
          {!frontLoaded && (
            <div className="absolute inset-0 animate-pulse bg-gradient-to-b from-neutral-800/30 to-neutral-700/30" aria-hidden="true" />
          )}
          <img
            src={frontSrc}
            alt={`Frente - ${product.name}`}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            width={400}
            height={400}
            onLoad={() => setFrontLoaded(true)}
            onError={() => setFrontLoaded(true)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ease-in-out ${frontLoaded ? "opacity-100" : "opacity-0"} group-hover:opacity-0`}
          />
          {backSrc && (
            <img
              src={backSrc}
              alt={`Costas - ${product.name}`}
              loading="lazy"
              decoding="async"
              width={400}
              height={400}
              onLoad={() => setBackLoaded(true)}
              onError={() => setBackLoaded(true)}
              className={`absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 ${backLoaded ? "" : "will-change-opacity"}`}
            />
          )}
          <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
            {product.isSale && (
              <Badge variant="destructive" className="bg-red-600 text-white font-bold rounded-full px-3 py-1 text-xs">
                PROMOÇÃO
              </Badge>
            )}
            {product.isNew && (
              <Badge className="bg-indigo-500 text-white font-bold rounded-full px-3 py-1 text-xs">
                NOVO
              </Badge>
            )}
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
            aria-pressed={isFav}
            aria-label={isFav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
            className="absolute right-2 top-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/40 backdrop-blur text-white transition hover:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <Heart className={`h-5 w-5 ${isFav ? "fill-current text-red-500" : ""}`} />
            <span className="sr-only">Favorito</span>
          </button>
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 opacity-0 bg-gradient-to-t from-black/70 to-transparent p-2 text-center text-white transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
            aria-hidden="true"
          >
            <span className="text-xs sm:text-sm">Passe o mouse para ver o verso</span>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="text-base font-semibold leading-tight line-clamp-1">{product.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {product.category} • Tam: {product.size}
          </p>
          <div className="mt-3 flex items-center justify-between">
            <div className={`text-lg font-bold ${product.isSale ? "text-green-500" : ""}`}>{BRL(product.price)}</div>
            <span className="text-xs text-muted-foreground">À vista</span>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                addItem(product, product.size.split(",")[0].trim());
              }}
              className="w-full bg-foreground hover:bg-foreground/90 text-background font-bold"
            >
              Adicionar ao Carrinho
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}