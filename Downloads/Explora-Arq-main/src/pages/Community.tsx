import { useState } from "react";
import { ArrowLeft, MessageCircle, ThumbsUp, Send, Star, HelpCircle, Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const Community = () => {
  const navigate = useNavigate();
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  const questions = [
    {
      id: 1,
      user: "Dr. Maria Silva",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      question: "Como identificar cerâmica pré-colombiana?",
      description: "Encontrei fragmentos com padrões geométricos e gostaria de saber técnicas de identificação.",
      answers: 3,
      likes: 12,
      category: "Identificação",
      time: "2 horas atrás"
    },
    {
      id: 2,
      user: "Prof. João Santos",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      question: "Datação por carbono 14 - limitações?",
      description: "Quais são as principais limitações da datação radiocarbônica em sítios brasileiros?",
      answers: 5,
      likes: 8,
      category: "Metodologia",
      time: "1 dia atrás"
    },
    {
      id: 3,
      user: "Ana Rodrigues",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      question: "Software para análise de artefatos",
      description: "Alguém conhece um bom software livre para catalogação e análise de material lítico?",
      answers: 7,
      likes: 15,
      category: "Tecnologia",
      time: "3 dias atrás"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-primary/5 to-accent/10">
      <div className="container mx-auto p-6">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/")}
            className="hover:bg-primary/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar ao Início
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Dúvidas & Feedbacks
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Conecte-se com a comunidade arqueológica mundial para compartilhar conhecimento
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Nova Pergunta */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  Fazer Nova Pergunta
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input 
                  placeholder="Título da sua pergunta..."
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                />
                <Textarea 
                  placeholder="Descreva sua dúvida detalhadamente..."
                  rows={4}
                />
                <Button className="w-full">
                  <Send className="mr-2 h-4 w-4" />
                  Publicar Pergunta
                </Button>
              </CardContent>
            </Card>

            {/* Lista de Perguntas */}
            <div className="space-y-4">
              {questions.map((q) => (
                <Card key={q.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={q.avatar} />
                          <AvatarFallback>{q.user[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{q.user}</p>
                          <p className="text-sm text-muted-foreground">{q.time}</p>
                        </div>
                      </div>
                      <Badge variant="outline">{q.category}</Badge>
                    </div>
                    <CardTitle className="text-lg">{q.question}</CardTitle>
                    <CardDescription>{q.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm">
                          <ThumbsUp className="mr-2 h-4 w-4" />
                          {q.likes}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageCircle className="mr-2 h-4 w-4" />
                          {q.answers} respostas
                        </Button>
                      </div>
                      <Button variant="outline" size="sm">
                        Responder
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Estatísticas da Comunidade */}
            <Card>
              <CardHeader>
                <CardTitle>Comunidade Ativa</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Perguntas Hoje</span>
                  <Badge>12</Badge>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span>Respostas</span>
                  <Badge>34</Badge>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span>Especialistas Online</span>
                  <Badge variant="secondary">8</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Feedback do App */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Feedback do App
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea 
                  placeholder="Sugestões de melhoria para o ExploraArq..."
                  rows={3}
                />
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Bug Report
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Sugestão
                  </Button>
                </div>
                <Button className="w-full">
                  Enviar Feedback
                </Button>
              </CardContent>
            </Card>

            {/* Top Contributors */}
            <Card>
              <CardHeader>
                <CardTitle>Top Contributors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {["Dr. Carlos Lima", "Prof. Ana Costa", "Dr. Pedro Oliveira"].map((name, index) => (
                  <div key={name} className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{name}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{15 - index * 2}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;