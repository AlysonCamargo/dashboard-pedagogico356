import { useState } from 'react';
import { Menu, X, Search, ShoppingBag, Heart } from 'lucide-react';
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Input } from '@/components/ui/input';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();
  const { items: wishlistItems } = useWishlist();

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Catálogo', href: '#catalog' },
    { name: 'Sobre Nós', href: '#about' },
    { name: 'Contato', href: '#contact' },
  ];

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const term = (e.target as HTMLInputElement).value;
      window.location.href = `/?q=${encodeURIComponent(term)}#catalog`;
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-urban rounded-lg flex items-center justify-center">
              <span className="text-lg font-bold text-background">Z</span>
            </div>
            <span className="font-heading font-bold text-2xl text-foreground hidden sm:block">
              Distrito ZLG
            </span>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-md mx-4 relative">
            <Input
              type="text"
              placeholder="O que você procura hoje?"
              className="w-full bg-secondary border-border focus:border-accent pl-10 rounded-full"
              onKeyDown={handleSearch}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-accent transition-colors duration-200 font-medium text-sm"
                >
                  {item.name}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4 border-l border-border pl-6">
              <button className="relative group" onClick={() => { }}>
                <Heart className="w-5 h-5 text-foreground group-hover:text-accent transition-colors" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </button>
              <button className="relative group" onClick={() => setIsCartOpen(true)}>
                <ShoppingBag className="w-5 h-5 text-foreground group-hover:text-accent transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <button className="relative" onClick={() => setIsCartOpen(true)}>
              <ShoppingBag className="w-6 h-6 text-foreground" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              className="text-foreground"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fadeIn">
            <div className="mb-4 relative">
              <Input
                type="text"
                placeholder="Buscar produtos..."
                className="w-full bg-secondary border-border focus:border-accent pl-10 rounded-full"
                onKeyDown={handleSearch}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-accent transition-colors duration-200 font-medium text-lg"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;