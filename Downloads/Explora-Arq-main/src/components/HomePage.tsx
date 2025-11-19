import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Database, MessageCircle, User, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Camera className="h-8 w-8" />,
      title: "Escâner de Artefatos",
      description: "Fotografe e identifique artefatos com IA avançada",
      action: () => navigate("/scanner"),
      variant: "artifact" as const,
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Depósito de Pesquisa",
      description: "Explore artigos, teses e relatórios arqueológicos",
      action: () => navigate("/research"),
      variant: "excavation" as const,
    },
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: "Dúvidas & Feedbacks",
      description: "Conecte-se com a comunidade arqueológica",
      action: () => navigate("/community"),
      variant: "default" as const,
    },
    {
      icon: <User className="h-8 w-8" />,
      title: "Perfil Profissional",
      description: "Gerencie seu perfil e publicações",
      action: () => navigate("/profile"),
      variant: "secondary" as const,
    },
    {
      icon: <Search className="h-8 w-8" />,
      title: "Busca Inteligente",
      description: "Encontre conteúdo com sugestões de IA",
      action: () => navigate("/search"),
      variant: "ghost" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-sediment">
      {/* Header */}
      <header className="bg-card/50 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center space-x-4">
            <img src={logo} alt="ExploraArq" className="h-12 w-12" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">ExploraArq</h1>
              <p className="text-muted-foreground">Arqueologia Digital Inteligente</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Descubra o Passado com
            <span className="bg-gradient-artifact bg-clip-text text-transparent"> IA Avançada</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Identifique artefatos, sincronize descobertas similares e conecte-se com a comunidade arqueológica global
          </p>
          <Button 
            size="lg" 
            variant="excavation"
            onClick={() => navigate("/scanner")}
            className="text-lg px-8 py-4"
          >
            <Camera className="mr-2 h-5 w-5" />
            Começar Escaneamento
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-artifact transition-all duration-300 border-border/50 bg-card/80 backdrop-blur-sm"
              >
                <CardHeader className="text-center">
                  <div className="mx-auto p-4 rounded-lg bg-gradient-artifact w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant={feature.variant}
                    onClick={feature.action}
                    className="w-full"
                  >
                    Explorar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card/50 backdrop-blur-sm border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2024 ExploraArq - Conectando o passado com o futuro através da tecnologia
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;