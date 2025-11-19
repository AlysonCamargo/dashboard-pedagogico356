import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Search, Download, Heart, User, Calendar, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const ResearchRepository = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterRegion, setFilterRegion] = useState("all");

  const handleDownload = (research: any) => {
    // Simula o download do PDF
    toast({
      title: "Download iniciado",
      description: `Baixando: ${research.title}.pdf`,
    });
    
    // Em produção, isso faria o download real do arquivo
    console.log(`Downloading research paper: ${research.title}`);
  };

  const mockResearch = [
    {
      id: 1,
      title: "Pinturas Rupestres da Serra da Capivara: 50 Anos de Descobertas",
      author: "Dra. Niède Guidon",
      type: "Artigo",
      year: 2023,
      region: "Piauí",
      institution: "FUMDHAM",
      downloads: 1847,
      favorites: 234,
      abstract: "Documentação completa das pinturas rupestres em mais de 800 sítios arqueológicos no Parque Nacional Serra da Capivara, revelando evidências de ocupação humana há mais de 50.000 anos. Análise estilística e cronológica das manifestações artísticas pré-históricas.",
      tags: ["Arte Rupestre", "Pré-História", "Serra da Capivara", "Piauí"],
    },
    {
      id: 2,
      title: "Sambaquis do Litoral Brasileiro: Arquitetura Funerária e Organização Social",
      author: "Prof. Paulo DeBlasis",
      type: "Tese",
      year: 2022,
      region: "Santa Catarina",
      institution: "MAE-USP",
      downloads: 1312,
      favorites: 187,
      abstract: "Estudo sistemático dos sambaquis litorâneos revelando complexas estruturas funerárias e organização social das populações pré-coloniais. Análise de práticas mortuárias, padrões de assentamento e economia pesqueira entre 6000-1000 anos AP.",
      tags: ["Sambaquis", "Arqueologia Litorânea", "Pré-Colonial", "Práticas Funerárias"],
    },
    {
      id: 3,
      title: "Cerâmica Marajoara: Arte e Simbolismo na Foz do Amazonas",
      author: "Dra. Denise Schaan",
      type: "Artigo",
      year: 2023,
      region: "Pará",
      institution: "UFPA",
      downloads: 2156,
      favorites: 312,
      abstract: "Análise iconográfica e tecnológica da cerâmica Marajoara (400-1400 d.C.), revelando sofisticada organização social e cosmologia. Estudo das urnas funerárias, tangas e estatuetas com padrões geométricos e zoomorfos únicos na Amazônia pré-colonial.",
      tags: ["Cerâmica Marajoara", "Amazônia", "Iconografia", "Arte Pré-Colonial"],
    },
    {
      id: 4,
      title: "Geoglifos do Acre: Engenharia de Terra Pré-Colombiana",
      author: "Dr. Alceu Ranzi",
      type: "Relatório",
      year: 2024,
      region: "Acre",
      institution: "UFAC",
      downloads: 989,
      favorites: 145,
      abstract: "Documentação de mais de 450 estruturas geométricas de terra (geoglifos) na Amazônia Ocidental, construídas entre 1000-1500 d.C. Análise de técnicas de movimentação de terra e possível função cerimonial dessas monumentais obras de engenharia.",
      tags: ["Geoglifos", "Acre", "Amazônia", "Engenharia Pré-Colombiana"],
    },
    {
      id: 5,
      title: "Povoamento das Américas: Novos Dados de Lagoa Santa",
      author: "Dr. Walter Neves",
      type: "Artigo",
      year: 2023,
      region: "Minas Gerais",
      institution: "IB-USP",
      downloads: 2734,
      favorites: 421,
      abstract: "Análise bioarqueológica de remanescentes humanos de Lagoa Santa revelando morfologia craniana distinta e contribuindo para o debate sobre o povoamento das Américas. Luzia e outros esqueletos datados entre 11.000-8.000 anos AP fornecem evidências de migrações pleistocênicas.",
      tags: ["Bioarqueologia", "Povoamento", "Lagoa Santa", "Paleoíndio"],
    },
    {
      id: 6,
      title: "Arquitetura Inca no Sul do Peru: Cusco e o Vale Sagrado",
      author: "Dra. Ruth Shady Solís",
      type: "Tese",
      year: 2022,
      region: "Peru",
      institution: "Universidad Nacional Mayor de San Marcos",
      downloads: 1678,
      favorites: 278,
      abstract: "Estudo arquitetônico dos principais sítios incas em Cusco e arredores, incluindo Machu Picchu, Ollantaytambo e Sacsayhuamán. Análise de técnicas de construção com pedras poligonais, sistemas hidráulicos e planejamento urbano imperial (1400-1532 d.C.).",
      tags: ["Inca", "Arquitetura", "Peru", "Machu Picchu", "Cusco"],
    },
    {
      id: 7,
      title: "Linhas de Nazca: Interpretações Arqueológicas e Astronômicas",
      author: "Dr. Markus Reindel",
      type: "Artigo",
      year: 2023,
      region: "Nazca, Peru",
      institution: "Instituto Arqueológico Alemão",
      downloads: 1945,
      favorites: 289,
      abstract: "Investigação multidisciplinar dos geoglifos de Nazca (200 a.C. - 600 d.C.) combinando arqueologia, astronomia e análise geoespacial. Novas interpretações sobre função ritual e possíveis correlações com recursos hídricos e calendários agrícolas.",
      tags: ["Nazca", "Geoglifos", "Peru", "Astronomia", "Ritual"],
    },
    {
      id: 8,
      title: "Teotihuacan: Urbanismo e Cosmologia Mesoamericana",
      author: "Dra. Linda Manzanilla",
      type: "Artigo",
      year: 2024,
      region: "México",
      institution: "UNAM",
      downloads: 2312,
      favorites: 367,
      abstract: "Análise do planejamento urbano de Teotihuacan (100-650 d.C.), revelando sofisticada integração entre arquitetura monumental, astronomia e cosmologia. Estudo das Pirâmides do Sol e da Lua, Avenida dos Mortos e complexos residenciais multiétnicos.",
      tags: ["Teotihuacan", "México", "Mesoamérica", "Urbanismo", "Pirâmides"],
    },
    {
      id: 9,
      title: "Escrita Maia: Decifração e Novos Insights Históricos",
      author: "Dr. Simon Martin",
      type: "Artigo",
      year: 2023,
      region: "Guatemala",
      institution: "University of Pennsylvania Museum",
      downloads: 1567,
      favorites: 234,
      abstract: "Avanços na decifração da escrita hieroglífica maia revelando detalhes sobre dinastias, guerras e rituais do período Clássico (250-900 d.C.). Análise epigráfica de monumentos em Tikal, Copán, Palenque e Calakmul.",
      tags: ["Maia", "Epígrafia", "Guatemala", "Escrita", "Clássico"],
    },
    {
      id: 10,
      title: "Monte Albán: Centro Político Zapoteca e Astronomia",
      author: "Dr. Marcus Winter",
      type: "Relatório",
      year: 2022,
      region: "Oaxaca, México",
      institution: "INAH",
      downloads: 1123,
      favorites: 178,
      abstract: "Estudo do sítio arqueológico zapoteca de Monte Albán (500 a.C. - 850 d.C.), com foco em seu observatório astronômico e sistema de escrita. Análise das estelas com glifos, estruturas cerimoniais e evidências de conquistas militares.",
      tags: ["Zapoteca", "Monte Albán", "México", "Astronomia", "Oaxaca"],
    },
    {
      id: 11,
      title: "Paracas e Nazca: Têxteis e Práticas Funerárias no Peru",
      author: "Dra. Ann Peters",
      type: "Tese",
      year: 2023,
      region: "Ica, Peru",
      institution: "Cornell University",
      downloads: 1434,
      favorites: 212,
      abstract: "Análise dos extraordinários têxteis das culturas Paracas (800-100 a.C.) e Nazca, revelando complexos simbolismos e técnicas de manufatura. Estudo de fardos funerários e práticas de mumificação no deserto peruano.",
      tags: ["Paracas", "Nazca", "Têxteis", "Peru", "Funerário"],
    },
    {
      id: 12,
      title: "Chavín de Huántar: Templo e Iconografia Andina",
      author: "Dr. John Rick",
      type: "Artigo",
      year: 2024,
      region: "Ancash, Peru",
      institution: "Stanford University",
      downloads: 1678,
      favorites: 245,
      abstract: "Investigação do centro cerimonial de Chavín de Huántar (1200-400 a.C.), incluindo o Templo Novo, galerias subterrâneas e o Lanzón monolítico. Análise da iconografia felina e serpentina que influenciou toda a região andina.",
      tags: ["Chavín", "Peru", "Andes", "Templo", "Iconografia"],
    },
  ];

  const filteredResearch = mockResearch.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = filterType === "all" || item.type.toLowerCase() === filterType;
    const matchesRegion = filterRegion === "all" || item.region.toLowerCase() === filterRegion;
    
    return matchesSearch && matchesType && matchesRegion;
  });

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
              <h1 className="text-2xl font-bold text-foreground">Depósito de Pesquisa</h1>
              <p className="text-muted-foreground">Explore artigos, teses e relatórios arqueológicos</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <Card className="mb-8 bg-card/80 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>Buscar Pesquisas</CardTitle>
            <CardDescription>
              Use filtros para encontrar o conteúdo mais relevante
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Buscar por título, autor ou tags..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os tipos</SelectItem>
                  <SelectItem value="artigo">Artigo</SelectItem>
                  <SelectItem value="tese">Tese</SelectItem>
                  <SelectItem value="relatório">Relatório</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterRegion} onValueChange={setFilterRegion}>
                <SelectTrigger>
                  <SelectValue placeholder="Região" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as regiões</SelectItem>
                  <SelectItem value="brasil">Brasil</SelectItem>
                  <SelectItem value="argentina">Argentina</SelectItem>
                  <SelectItem value="chile">Chile</SelectItem>
                  <SelectItem value="peru">Peru</SelectItem>
                  <SelectItem value="bolivia">Bolívia</SelectItem>
                  <SelectItem value="colombia">Colômbia</SelectItem>
                  <SelectItem value="venezuela">Venezuela</SelectItem>
                  <SelectItem value="equador">Equador</SelectItem>
                  <SelectItem value="uruguai">Uruguai</SelectItem>
                  <SelectItem value="paraguai">Paraguai</SelectItem>
                  <SelectItem value="guiana">Guiana</SelectItem>
                  <SelectItem value="suriname">Suriname</SelectItem>
                  <SelectItem value="mexico">México</SelectItem>
                  <SelectItem value="guatemala">Guatemala</SelectItem>
                  <SelectItem value="belize">Belize</SelectItem>
                  <SelectItem value="honduras">Honduras</SelectItem>
                  <SelectItem value="el salvador">El Salvador</SelectItem>
                  <SelectItem value="nicaragua">Nicarágua</SelectItem>
                  <SelectItem value="costa rica">Costa Rica</SelectItem>
                  <SelectItem value="panama">Panamá</SelectItem>
                  <SelectItem value="estados unidos">Estados Unidos</SelectItem>
                  <SelectItem value="canada">Canadá</SelectItem>
                  <SelectItem value="espanha">Espanha</SelectItem>
                  <SelectItem value="portugal">Portugal</SelectItem>
                  <SelectItem value="franca">França</SelectItem>
                  <SelectItem value="italia">Itália</SelectItem>
                  <SelectItem value="grecia">Grécia</SelectItem>
                  <SelectItem value="egito">Egito</SelectItem>
                  <SelectItem value="jordania">Jordânia</SelectItem>
                  <SelectItem value="israel">Israel</SelectItem>
                  <SelectItem value="turquia">Turquia</SelectItem>
                  <SelectItem value="iraque">Iraque</SelectItem>
                  <SelectItem value="ira">Irã</SelectItem>
                  <SelectItem value="siria">Síria</SelectItem>
                  <SelectItem value="libano">Líbano</SelectItem>
                  <SelectItem value="china">China</SelectItem>
                  <SelectItem value="japao">Japão</SelectItem>
                  <SelectItem value="coreia do sul">Coreia do Sul</SelectItem>
                  <SelectItem value="india">Índia</SelectItem>
                  <SelectItem value="tailandia">Tailândia</SelectItem>
                  <SelectItem value="camboja">Camboja</SelectItem>
                  <SelectItem value="vietnam">Vietnã</SelectItem>
                  <SelectItem value="indonesia">Indonésia</SelectItem>
                  <SelectItem value="malasia">Malásia</SelectItem>
                  <SelectItem value="filipinas">Filipinas</SelectItem>
                  <SelectItem value="australia">Austrália</SelectItem>
                  <SelectItem value="nova zelandia">Nova Zelândia</SelectItem>
                  <SelectItem value="africa do sul">África do Sul</SelectItem>
                  <SelectItem value="nigeria">Nigéria</SelectItem>
                  <SelectItem value="quenia">Quênia</SelectItem>
                  <SelectItem value="etiopia">Etiópia</SelectItem>
                  <SelectItem value="marrocos">Marrocos</SelectItem>
                  <SelectItem value="tunisia">Tunísia</SelectItem>
                  <SelectItem value="argelia">Argélia</SelectItem>
                  <SelectItem value="libia">Líbia</SelectItem>
                  <SelectItem value="sudao">Sudão</SelectItem>
                  <SelectItem value="reino unido">Reino Unido</SelectItem>
                  <SelectItem value="alemanha">Alemanha</SelectItem>
                  <SelectItem value="austria">Áustria</SelectItem>
                  <SelectItem value="suica">Suíça</SelectItem>
                  <SelectItem value="holanda">Holanda</SelectItem>
                  <SelectItem value="belgica">Bélgica</SelectItem>
                  <SelectItem value="dinamarca">Dinamarca</SelectItem>
                  <SelectItem value="suecia">Suécia</SelectItem>
                  <SelectItem value="noruega">Noruega</SelectItem>
                  <SelectItem value="finlandia">Finlândia</SelectItem>
                  <SelectItem value="russia">Rússia</SelectItem>
                  <SelectItem value="ucrania">Ucrânia</SelectItem>
                  <SelectItem value="polonia">Polônia</SelectItem>
                  <SelectItem value="republica tcheca">República Tcheca</SelectItem>
                  <SelectItem value="hungria">Hungria</SelectItem>
                  <SelectItem value="romenia">Romênia</SelectItem>
                  <SelectItem value="bulgaria">Bulgária</SelectItem>
                  <SelectItem value="croacia">Croácia</SelectItem>
                  <SelectItem value="servia">Sérvia</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              {filteredResearch.length} pesquisas encontradas
            </h2>
            <Select defaultValue="relevance">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevância</SelectItem>
                <SelectItem value="recent">Mais recentes</SelectItem>
                <SelectItem value="downloads">Mais baixados</SelectItem>
                <SelectItem value="favorites">Mais favoritados</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredResearch.map((research) => (
            <Card key={research.id} className="bg-card/80 backdrop-blur-sm border-border/50 hover:shadow-artifact transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2 hover:text-primary cursor-pointer">
                      {research.title}
                    </CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{research.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{research.year}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{research.region}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="outline">{research.type}</Badge>
                      <Badge variant="secondary">{research.institution}</Badge>
                      {research.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {research.abstract}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>{research.downloads} downloads</span>
                    <span>{research.favorites} favoritos</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Heart className="h-4 w-4 mr-1" />
                      Favoritar
                    </Button>
                    <Button 
                      variant="artifact" 
                      size="sm"
                      onClick={() => handleDownload(research)}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Baixar PDF
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredResearch.length === 0 && (
          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardContent className="text-center py-12">
              <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold mb-2">Nenhuma pesquisa encontrada</h3>
              <p className="text-muted-foreground">
                Tente ajustar os filtros ou usar termos de busca diferentes
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ResearchRepository;