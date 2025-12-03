import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, Users, Palette, Target } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Zap,
      title: 'Autenticidade',
      description: 'Cada design nasce da rua, para a rua. Sem frescura, só atitude.',
    },
    {
      icon: Palette,
      title: 'Criatividade',
      description: 'Arte urbana que veste. Cada estampa conta uma história única.',
    },
    {
      icon: Users,
      title: 'Comunidade',
      description: 'Mais que clientes, somos uma crew. Unidos pela paixão urbana.',
    },
    {
      icon: Target,
      title: 'Qualidade',
      description: 'Tecidos premium, impressão duradoura. Feito para resistir às ruas.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading font-black text-4xl md:text-6xl mb-6">
            <span className="text-foreground">NOSSA</span>
            <br />
            <span className="bg-gradient-urban bg-clip-text text-transparent">HISTÓRIA</span>
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Nascemos nas ruas, crescemos com a cultura. A <strong className="text-accent">Distrito ZLG</strong> é mais 
              que uma marca - somos um movimento que veste a autenticidade da juventude urbana.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Desde 2025, criamos camisetas que falam a linguagem da rua. Cada peça é pensada para quem 
              não tem medo de se expressar, para quem vive intensamente e quer que sua roupa reflita essa energia.
            </p>
          </div>
        </div>

        {/* Story Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-gradient-card border-border hover:border-accent/50 transition-all duration-300">
            <CardContent className="p-8">
              <h3 className="font-heading font-bold text-2xl text-accent mb-4">
                De Onde Viemos
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Tudo começou quando dois amigos se juntaram no começo de 2025 com uma ideia simples: 
                criar roupas que representassem nossa vibe, nossa cultura, nosso jeito de ver o mundo.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Das conversas no ponto de ônibus nasceu a Distrito ZLG. O "ZLG" são as iniciais dos fundadores que ousaram sonhar grande.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border hover:border-accent/50 transition-all duration-300">
            <CardContent className="p-8">
              <h3 className="font-heading font-bold text-2xl text-neon-pink mb-4">
                Para Onde Vamos
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Nosso objetivo é simples: ser a marca que representa a juventude urbana brasileira. 
                Queremos estar em cada quebrada, em cada rolê, em cada momento importante.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Estamos expandindo, mas sem perder a essência. Cada nova cidade, cada novo cliente, 
                faz parte da nossa família urbana que só cresce.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {values.map((value, index) => (
            <Card key={index} className="bg-gradient-card border-border hover:border-accent/50 transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-urban rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-glow transition-all duration-300">
                  <value.icon className="w-8 h-8 text-background" />
                </div>
                <h4 className="font-heading font-bold text-lg text-foreground mb-3">
                  {value.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a href="#contact">
            <Button 
              size="lg" 
              className="bg-gradient-urban text-background font-bold px-8 py-6 text-lg hover:shadow-glow transition-all duration-300"
            >
              Faça Parte da Crew
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;