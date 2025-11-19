import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Search, Sparkles, TrendingUp, Clock, BookOpen, MapPin, User, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const IntelligentSearch = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const trendingTopics = [
    "Arte Rupestre Brasileira",
    "Cerâmica Pré-Colombiana",
    "Sítios Arqueológicos Maias",
    "Lítico do Paleolítico",
    "Cultura Tupi-Guarani",
    "Arqueologia Urbana",
  ];

  const recentSearches = [
    "Sambaquis litorâneos",
    "Pinturas rupestres Nordeste",
    "Cerâmica Marajoara",
  ];

  const aiSuggestions = [
    {
      query: "Arte rupestre no Brasil",
      reason: "Baseado em suas buscas anteriores sobre pinturas e gravuras",
      category: "Pesquisa",
    },
    {
      query: "Tecnologia lítica na Amazônia",
      reason: "Tema relacionado aos seus interesses em pré-história",
      category: "Artigo",
    },
    {
      query: "Métodos de datação radiocarbônica",
      reason: "Complementa seus estudos sobre metodologias arqueológicas",
      category: "Metodologia",
    },
  ];

  const handleSearch = () => {
    // Simulação de resultados de busca
    const mockResults = [
      {
        id: 1,
        title: "Arte Rupestre no Parque Nacional da Serra da Capivara",
        type: "Artigo",
        author: "Dra. Niède Guidon",
        year: 2023,
        relevance: 98,
        preview: "Análise detalhada das pinturas rupestres encontradas em mais de 800 sítios arqueológicos no Piauí...",
      },
      {
        id: 2,
        title: "Datação de Pinturas Pré-Históricas no Nordeste Brasileiro",
        type: "Tese",
        author: "Dr. Marcos Silva",
        year: 2022,
        relevance: 95,
        preview: "Metodologias avançadas de datação aplicadas às manifestações artísticas rupestres...",
      },
    ];
    setSearchResults(mockResults);
  };

  return (
    <div className="min-h-screen bg-gradient-sediment">
      {/* Header */}
      <header className="bg-card/50 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/")}
              className="p-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-primary" />
                Busca Inteligente
              </h1>
              <p className="text-muted-foreground">Encontre conteúdo com sugestões personalizadas de IA</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <Card className="mb-8 bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-sm border-primary/20">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Digite sua busca... Ex: 'arte rupestre no Brasil'"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-10 h-12 text-lg"
                />
              </div>
              <Button 
                size="lg" 
                onClick={handleSearch}
                className="px-8"
              >
                <Search className="mr-2 h-5 w-5" />
                Buscar
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="suggestions" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="suggestions">
              <Sparkles className="mr-2 h-4 w-4" />
              Sugestões IA
            </TabsTrigger>
            <TabsTrigger value="trending">
              <TrendingUp className="mr-2 h-4 w-4" />
              Em Alta
            </TabsTrigger>
            <TabsTrigger value="recent">
              <Clock className="mr-2 h-4 w-4" />
              Recentes
            </TabsTrigger>
          </TabsList>

          {/* AI Suggestions */}
          <TabsContent value="suggestions" className="space-y-4 mt-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Sugestões Personalizadas</h2>
              <p className="text-muted-foreground">
                Baseado no seu histórico e interesses acadêmicos
              </p>
            </div>
            {aiSuggestions.map((suggestion, index) => (
              <Card 
                key={index}
                className="bg-card/80 backdrop-blur-sm border-border/50 hover:shadow-artifact transition-all duration-300 cursor-pointer"
                onClick={() => {
                  setSearchQuery(suggestion.query);
                  handleSearch();
                }}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-primary" />
                        {suggestion.query}
                      </CardTitle>
                      <CardDescription className="mt-2 flex items-center gap-2">
                        <Badge variant="outline">{suggestion.category}</Badge>
                        {suggestion.reason}
                      </CardDescription>
                    </div>
                    <Button variant="ghost" size="sm">
                      Buscar
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </TabsContent>

          {/* Trending Topics */}
          <TabsContent value="trending" className="space-y-4 mt-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Tópicos em Alta</h2>
              <p className="text-muted-foreground">
                Mais buscados pela comunidade arqueológica
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {trendingTopics.map((topic, index) => (
                <Card 
                  key={index}
                  className="bg-card/80 backdrop-blur-sm border-border/50 hover:shadow-artifact transition-all duration-300 cursor-pointer"
                  onClick={() => {
                    setSearchQuery(topic);
                    handleSearch();
                  }}
                >
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/20 p-2 rounded-lg">
                          <TrendingUp className="h-5 w-5 text-primary" />
                        </div>
                        <span className="font-medium">{topic}</span>
                      </div>
                      <Badge variant="secondary">#{index + 1}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Recent Searches */}
          <TabsContent value="recent" className="space-y-4 mt-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Buscas Recentes</h2>
              <p className="text-muted-foreground">
                Suas últimas pesquisas realizadas
              </p>
            </div>
            {recentSearches.map((search, index) => (
              <Card 
                key={index}
                className="bg-card/80 backdrop-blur-sm border-border/50 hover:shadow-artifact transition-all duration-300 cursor-pointer"
                onClick={() => {
                  setSearchQuery(search);
                  handleSearch();
                }}
              >
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">{search}</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      Buscar novamente
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="mt-8">
            <Card className="mb-6 bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span className="font-semibold">{searchResults.length} resultados encontrados</span>
                  <span className="text-muted-foreground">para "{searchQuery}"</span>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              {searchResults.map((result) => (
                <Card key={result.id} className="bg-card/80 backdrop-blur-sm border-border/50 hover:shadow-artifact transition-all duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{result.type}</Badge>
                          <Badge variant="secondary" className="bg-primary/20 text-primary">
                            {result.relevance}% relevante
                          </Badge>
                        </div>
                        <CardTitle className="text-lg mb-2 hover:text-primary cursor-pointer">
                          {result.title}
                        </CardTitle>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center space-x-1">
                            <User className="h-4 w-4" />
                            <span>{result.author}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{result.year}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      {result.preview}
                    </p>
                    <div className="flex space-x-2">
                      <Button variant="default">
                        Ver detalhes
                      </Button>
                      <Button variant="outline">
                        Adicionar aos favoritos
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IntelligentSearch;
