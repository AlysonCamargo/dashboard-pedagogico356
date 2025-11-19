import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Camera, MapPin, Upload, Search, ArrowLeft, Sparkles, Clock, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const ArtifactScanner = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [formData, setFormData] = useState({
    location: "",
    material: "",
    size: "",
    color: "",
    context: "",
    comments: "",
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) {
      toast.error("Por favor, selecione uma imagem primeiro");
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // Chamar edge function de análise real
      const { data, error } = await supabase.functions.invoke('analyze-artifact', {
        body: {
          imageBase64: selectedImage,
          formData: formData
        }
      });

      if (error) {
        console.error('Erro na análise:', error);
        toast.error("Erro ao analisar o artefato");
        return;
      }

      setAnalysisResult(data);
      toast.success("Análise concluída! Artefato identificado.");
    } catch (error) {
      console.error('Erro:', error);
      toast.error("Falha na análise do artefato");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getLocationAutomatically = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData(prev => ({
            ...prev,
            location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
          }));
          toast.success("Localização obtida automaticamente");
        },
        () => {
          toast.error("Não foi possível obter a localização");
        }
      );
    }
  };

  const openCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: "environment",
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        } 
      });
      setStream(mediaStream);
      setIsCameraOpen(true);
      
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      }, 100);
    } catch (error) {
      console.error("Erro ao acessar câmera:", error);
      toast.error("Não foi possível acessar a câmera");
    }
  };

  const closeCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCameraOpen(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg');
        setSelectedImage(imageData);
        closeCamera();
        toast.success("Foto capturada!");
      }
    }
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
              <h1 className="text-2xl font-bold text-foreground">Escâner de Artefatos</h1>
              <p className="text-muted-foreground">Identifique e sincronize artefatos com IA</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Camera className="h-5 w-5" />
                <span>Capturar Artefato</span>
              </CardTitle>
              <CardDescription>
                Fotografe ou faça upload da imagem do artefato encontrado
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Button 
                  onClick={() => fileInputRef.current?.click()}
                  variant="artifact"
                  className="flex-1"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Imagem
                </Button>
                <Button 
                  onClick={openCamera}
                  variant="excavation"
                  className="flex-1"
                >
                  <Camera className="mr-2 h-4 w-4" />
                  Tirar Foto
                </Button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

              {selectedImage && (
                <div className="rounded-lg overflow-hidden border border-border">
                  <img 
                    src={selectedImage} 
                    alt="Artefato selecionado" 
                    className="w-full h-64 object-cover"
                  />
                </div>
              )}

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="location">Localização</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Coordenadas ou descrição do local"
                      className="flex-1"
                    />
                    <Button 
                      onClick={getLocationAutomatically}
                      variant="outline"
                      size="icon"
                    >
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="material">Material</Label>
                    <Input
                      id="material"
                      value={formData.material}
                      onChange={(e) => setFormData(prev => ({ ...prev, material: e.target.value }))}
                      placeholder="Ex: Quartzo, Cerâmica..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="size">Tamanho (cm)</Label>
                    <Input
                      id="size"
                      value={formData.size}
                      onChange={(e) => setFormData(prev => ({ ...prev, size: e.target.value }))}
                      placeholder="Ex: 3.5 x 2.1 x 0.8"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="color">Cor</Label>
                    <Input
                      id="color"
                      value={formData.color}
                      onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                      placeholder="Ex: Cinza escuro"
                    />
                  </div>
                  <div>
                    <Label htmlFor="context">Contexto</Label>
                    <Input
                      id="context"
                      value={formData.context}
                      onChange={(e) => setFormData(prev => ({ ...prev, context: e.target.value }))}
                      placeholder="Ex: Superficial, Camada 2..."
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="comments">Comentários Iniciais</Label>
                  <Textarea
                    id="comments"
                    value={formData.comments}
                    onChange={(e) => setFormData(prev => ({ ...prev, comments: e.target.value }))}
                    placeholder="Observações sobre o achado, condições de descoberta..."
                    rows={3}
                  />
                </div>
              </div>

              <Button 
                onClick={handleAnalyze}
                disabled={!selectedImage || isAnalyzing}
                variant="excavation"
                className="w-full"
              >
                {isAnalyzing ? (
                  <>
                    <Clock className="mr-2 h-4 w-4 animate-spin" />
                    Analisando com IA...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Analisar Artefato
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Search className="h-5 w-5" />
                <span>Resultados da Análise</span>
              </CardTitle>
              <CardDescription>
                Identificação e artefatos similares encontrados
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!analysisResult && !isAnalyzing && (
                <div className="text-center py-8 text-muted-foreground">
                  <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Faça upload de uma imagem e clique em "Analisar" para ver os resultados</p>
                </div>
              )}

              {isAnalyzing && (
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 mx-auto mb-4 animate-spin text-primary" />
                  <p className="text-muted-foreground">Analisando artefato e buscando similares...</p>
                  <div className="mt-4">
                    <div className="bg-muted rounded-full h-2">
                      <div className="bg-gradient-excavation h-2 rounded-full animate-pulse" style={{ width: "60%" }}></div>
                    </div>
                  </div>
                </div>
              )}

              {analysisResult && (
                <div className="space-y-6">
                  {/* Identificação Principal */}
                  <div className="p-4 bg-gradient-artifact rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">{analysisResult.identification}</h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="secondary">{analysisResult.period}</Badge>
                      <Badge variant="outline">{analysisResult.material}</Badge>
                      <Badge variant="default">
                        {Math.round(analysisResult.confidence * 100)}% confiança
                      </Badge>
                    </div>
                    <div className="text-sm space-y-1">
                      <p><strong>Forma:</strong> {analysisResult.technicalAnalysis.shape}</p>
                      <p><strong>Técnica:</strong> {analysisResult.technicalAnalysis.workmanship}</p>
                      <p><strong>Dimensões:</strong> {analysisResult.technicalAnalysis.dimensions}</p>
                    </div>
                  </div>

                  {/* Artefatos Similares */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Artefatos Similares Encontrados</h3>
                    <div className="space-y-3">
                      {analysisResult.similarArtifacts.map((artifact: any) => (
                        <div key={artifact.id} className="p-3 border border-border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium">{artifact.name}</h4>
                            <Badge variant="secondary">
                              {Math.round(artifact.similarity * 100)}% similar
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <p><strong>Local:</strong> {artifact.location}</p>
                            <p><strong>Período:</strong> {artifact.period}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button variant="excavation" className="w-full">
                    Compartilhar com a Comunidade
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Camera Dialog */}
      <Dialog open={isCameraOpen} onOpenChange={closeCamera}>
        <DialogContent className="max-w-7xl w-[95vw] h-[90vh] p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl">Capturar Foto do Artefato</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col h-full gap-4">
            <div className="relative bg-black rounded-lg overflow-hidden flex-1 flex items-center justify-center">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex gap-3 justify-center pb-2">
              <Button 
                onClick={capturePhoto} 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-lg px-8 py-6"
              >
                <Camera className="mr-2 h-6 w-6" />
                Capturar Foto
              </Button>
              <Button 
                onClick={closeCamera} 
                variant="outline" 
                size="lg"
                className="text-lg px-8 py-6"
              >
                <X className="mr-2 h-6 w-6" />
                Cancelar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Hidden canvas for photo capture */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default ArtifactScanner;