import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { Map, Bell, BookOpen, User, Edit, Trash2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Alert {
  id: string;
  name: string;
  description: string;
  priority: "critical" | "high" | "medium";
  area: string;
  conductor: string;
}

const Dashboard = () => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      name: "Alerta Velocidad",
      description: "Exceso de velocidad en ruta principal",
      priority: "critical",
      area: "Zona Norte",
      conductor: "Juan Pérez"
    },
    {
      id: "2",
      name: "Mantenimiento",
      description: "Revisión programada de unidad",
      priority: "medium",
      area: "Taller Central",
      conductor: "María González"
    },
    {
      id: "3",
      name: "Ruta Desviada",
      description: "Desviación no autorizada de ruta",
      priority: "high",
      area: "Zona Sur",
      conductor: "Carlos Rodríguez"
    }
  ]);

  const [newAlert, setNewAlert] = useState({
    name: "",
    description: "",
    priority: "",
    area: "",
    conductor: ""
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleAddAlert = () => {
    if (!newAlert.name || !newAlert.description || !newAlert.priority || !newAlert.area || !newAlert.conductor) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive"
      });
      return;
    }

    const alert: Alert = {
      id: Date.now().toString(),
      name: newAlert.name,
      description: newAlert.description,
      priority: newAlert.priority as "critical" | "high" | "medium",
      area: newAlert.area,
      conductor: newAlert.conductor
    };

    setAlerts([...alerts, alert]);
    setNewAlert({ name: "", description: "", priority: "", area: "", conductor: "" });
    setIsDialogOpen(false);
    
    toast({
      title: "Alerta agregada",
      description: "La nueva alerta ha sido creada exitosamente"
    });
  };

  const handleDeleteAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
    toast({
      title: "Alerta eliminada",
      description: "La alerta ha sido eliminada del sistema"
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-priority-critical text-white";
      case "high": return "bg-priority-high text-white";
      case "medium": return "bg-priority-medium text-white";
      default: return "bg-muted";
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "critical": return "Crítica";
      case "high": return "Alta";
      case "medium": return "Media";
      default: return priority;
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-background">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-screen w-[92px] bg-[#0A2846] flex flex-col items-center pt-5 z-10">
        <div className="flex flex-col space-y-[15px] items-center">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10 w-[28px] h-[28px] p-0"
          >
            <Map className="h-[28px] w-[28px]" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10 w-[28px] h-[28px] p-0"
            asChild
          >
            <Link to="/dashboard">
              <Bell className="h-[28px] w-[28px]" />
            </Link>
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10 w-[28px] h-[28px] p-0"
            asChild
          >
            <Link to="/panel-de-alertas">
              <BookOpen className="h-[28px] w-[28px]" />
            </Link>
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10 w-[28px] h-[28px] p-0"
          >
            <User className="h-[28px] w-[28px]" />
          </Button>
        </div>
      </div>

      {/* Contenido Principal */}
      <main className="ml-[92px] flex-1 p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-bold text-foreground">Alertas Activas</h1>
            </div>
            
            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className="border-2 border-muted text-muted-foreground hover:bg-muted/10"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  ADD ITEM
                </Button>
              </AlertDialogTrigger>
              
              <AlertDialogContent className="max-w-md">
                <AlertDialogHeader>
                  <AlertDialogTitle>Agregar Nueva Alerta</AlertDialogTitle>
                </AlertDialogHeader>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="alert-name">Nombre de la Alerta</Label>
                    <Textarea
                      id="alert-name"
                      placeholder="Ingresa el nombre de la alerta"
                      value={newAlert.name}
                      onChange={(e) => setNewAlert({ ...newAlert, name: e.target.value })}
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="alert-description">Descripción Corta</Label>
                    <Textarea
                      id="alert-description"
                      placeholder="Describe la alerta brevemente"
                      value={newAlert.description}
                      onChange={(e) => setNewAlert({ ...newAlert, description: e.target.value })}
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label>Seleccionar Área Encargada</Label>
                    <Select 
                      value={newAlert.area} 
                      onValueChange={(value) => setNewAlert({ ...newAlert, area: value })}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Selecciona un área" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="zona-norte">Zona Norte</SelectItem>
                        <SelectItem value="zona-sur">Zona Sur</SelectItem>
                        <SelectItem value="zona-centro">Zona Centro</SelectItem>
                        <SelectItem value="taller-central">Taller Central</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Seleccionar Conductor</Label>
                    <Select 
                      value={newAlert.conductor} 
                      onValueChange={(value) => setNewAlert({ ...newAlert, conductor: value })}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Selecciona un conductor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="juan-perez">Juan Pérez</SelectItem>
                        <SelectItem value="maria-gonzalez">María González</SelectItem>
                        <SelectItem value="carlos-rodriguez">Carlos Rodríguez</SelectItem>
                        <SelectItem value="ana-martinez">Ana Martínez</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Seleccionar Prioridad</Label>
                    <Select 
                      value={newAlert.priority} 
                      onValueChange={(value) => setNewAlert({ ...newAlert, priority: value })}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Selecciona una prioridad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="critical">Crítica</SelectItem>
                        <SelectItem value="high">Alta</SelectItem>
                        <SelectItem value="medium">Media</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex space-x-2 pt-4">
                    <Button onClick={handleAddAlert} className="flex-1">
                      Agregar Alerta
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsDialogOpen(false)}
                      className="flex-1"
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          {/* Tabla de Alertas */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-bold text-foreground">Nombre</TableHead>
                    <TableHead className="font-bold text-foreground">Descripción</TableHead>
                    <TableHead className="font-bold text-foreground">Prioridad</TableHead>
                    <TableHead className="font-bold text-foreground">Área Encargada</TableHead>
                    <TableHead className="font-bold text-foreground">Conductor</TableHead>
                    <TableHead className="font-bold text-foreground">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {alerts.map((alert, index) => (
                    <TableRow 
                      key={alert.id} 
                      className={index % 2 === 1 ? "bg-light-aqua" : "bg-white"}
                    >
                      <TableCell className="font-medium">{alert.name}</TableCell>
                      <TableCell>{alert.description}</TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(alert.priority)}>
                          {getPriorityText(alert.priority)}
                        </Badge>
                      </TableCell>
                      <TableCell>{alert.area}</TableCell>
                      <TableCell>{alert.conductor}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="ghost" className="text-primary hover:bg-primary/10">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="text-destructive hover:bg-destructive/10"
                            onClick={() => handleDeleteAlert(alert.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
  );
};

export default Dashboard;
