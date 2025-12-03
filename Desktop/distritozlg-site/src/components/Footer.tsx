import { Instagram, Mail, MapPin, Heart } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://instagram.com/distritozlg',
      icon: Instagram,
      color: 'text-neon-pink hover:text-neon-pink/80'
    },
    {
      name: 'Email',
      href: 'mailto:contato@distritozlg.com.br',
      icon: Mail,
      color: 'text-neon-cyan hover:text-neon-cyan/80'
    },
    {
      name: 'Localização',
      href: 'https://maps.app.goo.gl/87cntHo8MpEvmwTZ6',
      icon: MapPin,
      color: 'text-neon-purple hover:text-neon-purple/80'
    }
  ];

  const quickLinks = [
    { name: 'Catálogo', href: '#catalog' },
    { name: 'Sobre Nós', href: '#about' },
    { name: 'Contato', href: '#contact' },
    { name: 'Política de Privacidade', href: '#' },
    { name: 'Termos de Uso', href: '#' },
  ];

  return (
    <footer className="bg-gradient-hero border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-urban rounded-lg flex items-center justify-center">
                <span className="text-lg font-bold text-background">Z</span>
              </div>
            <span className="font-heading font-bold text-2xl text-foreground">
              Distrito ZLG
            </span>
            </div>
            
            <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
              Streetwear autêntico para quem vive a cultura urbana. 
              Cada peça é uma declaração, cada estilo conta uma história.
            </p>

            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 bg-secondary rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${social.color}`}
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-lg text-foreground mb-4">
              Links Rápidos
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-accent transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-bold text-lg text-foreground mb-4">
              Contato
            </h4>
            <div className="space-y-3 text-sm">
              <p className="text-muted-foreground">
                <strong className="text-foreground">WhatsApp:</strong><br />
                (11) 97298-8072
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Email:</strong><br />
                contato@distritozlg.com.br
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Localização:</strong><br />
                Bragança Paulista - SP<br />
                Interior
              </p>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="text-center mb-8">
            <h4 className="font-heading font-bold text-xl text-foreground mb-2">
              Fique por Dentro dos Lançamentos
            </h4>
            <p className="text-muted-foreground mb-4">
              Seja o primeiro a saber dos drops exclusivos e promoções especiais
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Seu email aqui"
                className="flex-1 px-4 py-2 bg-secondary border border-border rounded-lg focus:border-accent focus:outline-none text-foreground"
              />
              <button className="px-6 py-2 bg-gradient-urban text-background font-medium rounded-lg hover:shadow-glow transition-all duration-300">
                Inscrever
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <div className="flex items-center space-x-1 mb-4 md:mb-0">
            <span>© 2025 Distrito ZLG. Feito com</span>
            <Heart className="w-4 h-4 text-neon-pink fill-current" />
            <span>na quebrada.</span>
          </div>
          
          <div className="flex space-x-6">
            <span>Todos os direitos reservados</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;