import { useState } from "react";
import { ArrowLeft, User, MapPin, Calendar, BookOpen, Award, Settings, Camera, Edit3, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const [profileData, setProfileData] = useState({
    name: "Dr. Maria Silva",
    title: "Arqueóloga Sênior",
    email: "maria.silva@ufmg.br",
    userType: "archaeologist",
    institution: "Universidade Federal de Minas Gerais",
    location: "Belo Horizonte, MG",
    joinDate: "Janeiro 2020",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
    bio: "Especialista em arqueologia pré-colombiana com foco em culturas indígenas do Brasil Central. 15 anos de experiência em escavações e análise de artefatos cerâmicos.",
    specialties: ["Cerâmica Pré-Colombiana", "Arqueologia Brasileira", "Análise de Material Lítico"],
    achievements: [
      { title: "Descobridor Expert", count: 25, description: "25 artefatos identificados" },
      { title: "Mentor da Comunidade", count: 50, description: "50 dúvidas respondidas" },
      { title: "Pesquisador Ativo", count: 10, description: "10 publicações compartilhadas" }
    ],
    recentActivity: [
      { type: "discovery", title: "Identificou cerâmica Tupi-Guarani", time: "2 horas atrás" },
      { type: "answer", title: "Respondeu sobre datação radiocarbônica", time: "1 dia atrás" },
      { type: "publication", title: "Compartilhou artigo sobre sítios arqueológicos", time: "3 dias atrás" }
    ]
  });

  const [formData, setFormData] = useState(profileData);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setProfileData(formData);
    setIsEditing(false);
    toast({
      title: "Perfil atualizado",
      description: "Suas alterações foram salvas com sucesso!",
    });
  };

  const handleCancel = () => {
    setFormData(profileData);
    setIsEditing(false);
  };

  const getUserTypeLabel = (type: string) => {
    const types: { [key: string]: string } = {
      archaeologist: "Arqueólogo(a)",
      student: "Estudante",
      team: "Equipe de Pesquisa"
    };
    return types[type] || type;
  };

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Header */}
          <div className="lg:col-span-3">
            <Card className="bg-gradient-to-r from-primary/10 to-accent/10">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <div className="relative">
                    <Avatar className="h-32 w-32">
                      <AvatarImage src={profileData.avatar} />
                      <AvatarFallback className="text-2xl">
                        <User className="h-16 w-16" />
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? <Edit3 className="h-4 w-4" /> : <Camera className="h-4 w-4" />}
                    </Button>
                  </div>
                  
                   <div className="flex-1 text-center md:text-left">
                    <h1 className="text-3xl font-bold mb-2">{profileData.name}</h1>
                    <p className="text-xl text-muted-foreground mb-2">{profileData.title}</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {getUserTypeLabel(profileData.userType)}
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        {profileData.institution}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {profileData.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Membro desde {profileData.joinDate}
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                      {profileData.specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {isEditing ? (
                      <>
                        <Button onClick={handleSave}>
                          Salvar Perfil
                        </Button>
                        <Button variant="outline" onClick={handleCancel}>
                          Cancelar
                        </Button>
                      </>
                    ) : (
                      <Button variant="outline" onClick={() => setIsEditing(true)}>
                        <Edit3 className="h-4 w-4 mr-2" />
                        Editar Perfil
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="about" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="about">Sobre</TabsTrigger>
                <TabsTrigger value="settings">Configurações</TabsTrigger>
                <TabsTrigger value="activity">Atividade</TabsTrigger>
                <TabsTrigger value="achievements">Conquistas</TabsTrigger>
              </TabsList>

              <TabsContent value="about">
                <Card>
                  <CardHeader>
                    <CardTitle>Biografia</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name">Nome</Label>
                          <Input 
                            id="name" 
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="title">Título</Label>
                          <Input 
                            id="title" 
                            value={formData.title}
                            onChange={(e) => handleInputChange("title", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="institution">Instituição</Label>
                          <Input 
                            id="institution" 
                            value={formData.institution}
                            onChange={(e) => handleInputChange("institution", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="location">Localização</Label>
                          <Input 
                            id="location" 
                            value={formData.location}
                            onChange={(e) => handleInputChange("location", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="bio">Biografia</Label>
                          <Textarea 
                            id="bio" 
                            value={formData.bio}
                            onChange={(e) => handleInputChange("bio", e.target.value)}
                            rows={4}
                          />
                        </div>
                      </div>
                    ) : (
                      <p className="text-muted-foreground">{profileData.bio}</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Configurações da Conta</CardTitle>
                    <CardDescription>
                      Gerencie suas informações de contato e tipo de perfil
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="email">E-mail</Label>
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <Input 
                              id="email" 
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleInputChange("email", e.target.value)}
                              placeholder="seu.email@exemplo.com"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="userType">Tipo de Usuário</Label>
                          <Select 
                            value={formData.userType}
                            onValueChange={(value) => handleInputChange("userType", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o tipo de usuário" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="archaeologist">Arqueólogo(a)</SelectItem>
                              <SelectItem value="student">Estudante</SelectItem>
                              <SelectItem value="team">Equipe de Pesquisa</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">E-mail</p>
                              <p className="text-sm text-muted-foreground">{profileData.email}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <User className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">Tipo de Usuário</p>
                              <p className="text-sm text-muted-foreground">{getUserTypeLabel(profileData.userType)}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity">
                <Card>
                  <CardHeader>
                    <CardTitle>Atividade Recente</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {profileData.recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 rounded-lg border">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            {activity.type === 'discovery' && <Award className="h-4 w-4 text-primary" />}
                            {activity.type === 'answer' && <User className="h-4 w-4 text-accent" />}
                            {activity.type === 'publication' && <BookOpen className="h-4 w-4 text-secondary" />}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{activity.title}</p>
                            <p className="text-sm text-muted-foreground">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="achievements">
                <div className="grid gap-4">
                  {profileData.achievements.map((achievement) => (
                    <Card key={achievement.title}>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="h-16 w-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                            <Award className="h-8 w-8 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{achievement.title}</h3>
                            <p className="text-muted-foreground">{achievement.description}</p>
                            <Badge variant="outline" className="mt-2">
                              {achievement.count}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Estatísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Artefatos Escaneados</span>
                  <Badge>127</Badge>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span>Dúvidas Respondidas</span>
                  <Badge>53</Badge>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span>Pontuação Total</span>
                  <Badge variant="secondary">2,450</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Recent Discoveries */}
            <Card>
              <CardHeader>
                <CardTitle>Últimas Descobertas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 bg-muted rounded-lg"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Cerâmica Marajoara</p>
                      <p className="text-xs text-muted-foreground">Há 2 dias</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 bg-muted rounded-lg"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Ponta de Lança</p>
                      <p className="text-xs text-muted-foreground">Há 1 semana</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;