import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import heroImage from '@/assets/hero-streetwear.jpg';

const testimonials = [
  {
    name: "Lucas Gabriel",
    handle: "@e_lucasss",
    initials: "LG",
    text: "A melhor loja de streetwear que já comprei. Qualidade absurda!"
  },
  {
    name: "Bruno Antonio",
    handle: "@bruno.antonio_silva",
    initials: "BA",
    text: "As peças chegaram super rápido e o atendimento foi excelente. Recomendo demais!"
  },
  {
    name: "Alyson Camargo",
    handle: "@Alyshow",
    initials: "AC",
    text: "Estilo único! Todo mundo pergunta onde comprei. Virei cliente fiel."
  }
];

const Hero = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section id="home" className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden pt-20 pb-10">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="inline-block px-3 py-1 mb-4 border border-accent/30 rounded-full bg-accent/10 backdrop-blur-sm animate-fadeIn">
              <span className="text-accent font-bold text-xs tracking-widest uppercase">Nova Coleção 2025</span>
            </div>

            <h1 className="font-heading font-black text-5xl md:text-7xl lg:text-8xl mb-6 leading-tight animate-slideUp">
              DISTRITO <br />
              <span className="bg-gradient-urban bg-clip-text text-transparent">ZLG</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-lg leading-relaxed animate-slideUp delay-100 font-light">
              Streetwear autêntico para quem não segue tendências, <span className="text-foreground font-medium">cria</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-slideUp delay-200">
              <a href="#catalog">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-foreground text-background font-bold px-8 py-6 text-lg hover:bg-foreground/90 transition-all duration-300 gap-2 shadow-neon hover:shadow-neon-hover"
                >
                  <ShoppingBag className="w-5 h-5" />
                  VER COLEÇÃO
                </Button>
              </a>
              <a href="#about">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-2 font-bold px-8 py-6 text-lg transition-all duration-300 gap-2 hover:bg-secondary"
                >
                  SAIBA MAIS
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-12 sm:mt-16 pt-8 border-t border-border/50 animate-fadeIn delay-300">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1">100+</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">Modelos Exclusivos</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1">200+</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">Clientes Satisfeitos</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1">5 ★</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">Avaliação Clientes</div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials - Mobile (Inline) & Desktop (Floating) */}
        <div className="relative z-10 container mx-auto px-4 mt-12 lg:hidden">
          <div className="bg-secondary/80 backdrop-blur-md p-4 rounded-xl border border-border shadow-xl">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-full bg-gradient-urban flex items-center justify-center text-background font-bold text-xl shrink-0">
                {testimonials[currentTestimonial].initials}
              </div>
              <div>
                <p className="font-bold text-foreground">{testimonials[currentTestimonial].name}</p>
                <p className="text-xs text-muted-foreground">{testimonials[currentTestimonial].handle}</p>
              </div>
            </div>
            <p className="text-sm text-foreground/80 italic">
              "{testimonials[currentTestimonial].text}"
            </p>
          </div>
        </div>

        <div className="absolute bottom-10 right-10 hidden lg:block animate-float w-80 z-20">
          <div className="bg-secondary/80 backdrop-blur-md p-4 rounded-xl border border-border shadow-2xl transition-all duration-500">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-full bg-gradient-urban flex items-center justify-center text-background font-bold text-xl">
                {testimonials[currentTestimonial].initials}
              </div>
              <div>
                <p className="font-bold text-foreground">{testimonials[currentTestimonial].name}</p>
                <p className="text-xs text-muted-foreground">{testimonials[currentTestimonial].handle}</p>
              </div>
            </div>
            <p className="text-sm text-foreground/80 italic min-h-[3rem]">
              "{testimonials[currentTestimonial].text}"
            </p>

            {/* Indicators */}
            <div className="flex justify-center gap-1 mt-3">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-colors ${idx === currentTestimonial ? 'bg-accent' : 'bg-muted-foreground/30'}`}
                  onClick={() => setCurrentTestimonial(idx)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Brand Values Section */}
      <section className="py-12 bg-secondary/20 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-background/50 border border-border/50 hover:border-accent/50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              </div>
              <div>
                <h3 className="font-bold text-lg">Qualidade Premium</h3>
                <p className="text-sm text-muted-foreground">Tecidos selecionados e acabamento de alta costura.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-background/50 border border-border/50 hover:border-accent/50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              </div>
              <div>
                <h3 className="font-bold text-lg">Envio Rápido</h3>
                <p className="text-sm text-muted-foreground">Postagem em até 24h para todo o Brasil.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-background/50 border border-border/50 hover:border-accent/50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" /></svg>
              </div>
              <div>
                <h3 className="font-bold text-lg">Compra Segura</h3>
                <p className="text-sm text-muted-foreground">Pagamento via PIX ou Cartão com segurança total.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;