import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Catalog from '@/components/Catalog';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import { products, Product } from '@/data/products';

const Index = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      const product = products.find(p => p.id === Number(id));
      if (product) {
        setSelectedProduct(product);
        setIsModalOpen(true);
      } else {
        navigate('/', { replace: true });
      }
    } else {
      setIsModalOpen(false);
    }
  }, [id, navigate]);

  const featuredProducts = products.filter(p => p.isNew || p.isSale).slice(0, 4);

  const handleProductClick = (product: Product) => {
    navigate(`/product/${product.id}`);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Distrito ZLG - Moda Streetwear Premium</title>
        <meta name="description" content="Descubra o melhor da moda streetwear na Distrito ZLG. Roupas exclusivas, oversized, dryfit e muito mais." />
        <meta property="og:title" content="Distrito ZLG - Moda Streetwear Premium" />
        <meta property="og:description" content="Descubra o melhor da moda streetwear na Distrito ZLG. Roupas exclusivas, oversized, dryfit e muito mais." />
        <meta property="og:type" content="website" />
      </Helmet>
      <Navigation />
      <Hero />

      {/* Featured Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="font-heading font-bold text-3xl mb-2">Destaques da Semana</h2>
              <p className="text-muted-foreground">As peças mais cobiçadas do momento.</p>
            </div>
            <a href="#catalog" className="text-sm font-medium hover:text-accent transition-colors">
              Ver tudo &rarr;
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <div
                key={product.id}
                className="transform transition-transform hover:scale-105 cursor-pointer"
                onClick={() => handleProductClick(product)}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Catalog />
      <About />
      <Contact />
      <Footer />

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Index;
