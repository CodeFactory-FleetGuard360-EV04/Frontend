import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { Map, Bell, BookOpen, User, Search, RefreshCw, Bus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Alert {
  id: string;
  tipo: string;
  responsable: string;
  prioridad: "Alta" | "Media" | "Baja";
  unidad: string;
  conductor: string;
  generado: string;
  estado: "En espera" | "En proceso" | "Resuelto";
}

const PanelDeAlertas = () => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      tipo: "Exceso de velocidad",
      responsable: "Área de monitoreo",
      prioridad: "Alta",
      unidad: "Camión-123",
      conductor: "Ana Gómez",
      generado: "2024-05-23 10:00",
      estado: "En espera"
    },
    {
      id: "2",
      tipo: "Frenado brusco",
      responsable: "Mantenimiento",
      prioridad: "Media",
      unidad: "Furgoneta-456",
      conductor: "Carlos Sanchez",
      generado: "2024-05-23 09:45",
      estado: "En proceso"
    },
    {
      id: "3",
      tipo: "Entrada a geocerca",
      responsable: "Logística",
      prioridad: "Baja",
      unidad: "Coche-789",
      conductor: "Laura Fernandez",
      generado: "2024-05-23 09:30",
      estado: "Resuelto"
    },
    {
      id: "4",
      tipo: "Motor apagado",
      responsable: "Taller mecánico",
      prioridad: "Media",
      unidad: "Autobús-101",
      conductor: "David Lopez",
      generado: "2024-05-23 09:15",
      estado: "En espera"
    },
    {
      id: "5",
      tipo: "Batería baja",
      responsable: "Mantenimiento",
      prioridad: "Alta",
      unidad: "Camión-234",
      conductor: "Sara Moreno",
      generado: "2024-05-23 09:00",
      estado: "En proceso"
    }
  ]);

  const [newAlert, setNewAlert] = useState({
    tipo: "",
    responsable: "",
    prioridad: "",
    unidad: "",
    conductor: "",
    estado: ""
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleAddAlert = () => {
    if (!newAlert.tipo || !newAlert.responsable || !newAlert.prioridad || !newAlert.unidad || !newAlert.conductor || !newAlert.estado) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive"
      });
      return;
    }

    const alert: Alert = {
      id: Date.now().toString(),
      tipo: newAlert.tipo,
      responsable: newAlert.responsable,
      prioridad: newAlert.prioridad as "Alta" | "Media" | "Baja",
      unidad: newAlert.unidad,
      conductor: newAlert.conductor,
      generado: new Date().toLocaleString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
      estado: newAlert.estado as "En espera" | "En proceso" | "Resuelto"
    };

    setAlerts([...alerts, alert]);
    setNewAlert({ tipo: "", responsable: "", prioridad: "", unidad: "", conductor: "", estado: "" });
    setIsDialogOpen(false);
    
    toast({
      title: "Alerta agregada",
      description: "La nueva alerta ha sido creada exitosamente"
    });
  };

  const getPriorityColor = (prioridad: string) => {
    switch (prioridad) {
      case "Alta": return "bg-[#FF6B6B] text-white";
      case "Media": return "bg-[#FFD93D] text-black";
      case "Baja": return "bg-[#00D084] text-white";
      default: return "bg-muted";
    }
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "En espera": return "bg-[#FFD93D] text-black";
      case "En proceso": return "bg-[#2B6CB0] text-white";
      case "Resuelto": return "bg-[#00D084] text-white";
      default: return "bg-muted";
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-[#0E1525]">
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
        {/* Encabezado */}
        <div className="bg-[#0A2846] rounded-lg px-6 py-4 mb-6 flex items-center gap-3">
          <Bus className="h-8 w-8 text-[#3B82F6]" />
          <h1 className="text-2xl font-semibold text-white tracking-wide uppercase">
            PANEL DE ALERTAS
          </h1>
        </div>

        {/* Barra de filtros */}
        <Card className="bg-[#141C2F] border-none mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-3">
              {/* Filtros */}
              <Select>
                <SelectTrigger className="w-[140px] bg-[#0E1525] border-gray-700 text-[#E5E7EB]">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent className="bg-[#141C2F] border-gray-700">
                  <SelectItem value="velocidad">Exceso de velocidad</SelectItem>
                  <SelectItem value="frenado">Frenado brusco</SelectItem>
                  <SelectItem value="geocerca">Entrada a geocerca</SelectItem>
                  <SelectItem value="motor">Motor apagado</SelectItem>
                  <SelectItem value="bateria">Batería baja</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-[160px] bg-[#0E1525] border-gray-700 text-[#E5E7EB]">
                  <SelectValue placeholder="Responsable" />
                </SelectTrigger>
                <SelectContent className="bg-[#141C2F] border-gray-700">
                  <SelectItem value="monitoreo">Área de monitoreo</SelectItem>
                  <SelectItem value="mantenimiento">Mantenimiento</SelectItem>
                  <SelectItem value="logistica">Logística</SelectItem>
                  <SelectItem value="taller">Taller mecánico</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-[140px] bg-[#0E1525] border-gray-700 text-[#E5E7EB]">
                  <SelectValue placeholder="Prioridad" />
                </SelectTrigger>
                <SelectContent className="bg-[#141C2F] border-gray-700">
                  <SelectItem value="alta">Alta</SelectItem>
                  <SelectItem value="media">Media</SelectItem>
                  <SelectItem value="baja">Baja</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-[140px] bg-[#0E1525] border-gray-700 text-[#E5E7EB]">
                  <SelectValue placeholder="Unidad" />
                </SelectTrigger>
                <SelectContent className="bg-[#141C2F] border-gray-700">
                  <SelectItem value="camion-123">Camión-123</SelectItem>
                  <SelectItem value="furgoneta-456">Furgoneta-456</SelectItem>
                  <SelectItem value="coche-789">Coche-789</SelectItem>
                  <SelectItem value="autobus-101">Autobús-101</SelectItem>
                  <SelectItem value="camion-234">Camión-234</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-[160px] bg-[#0E1525] border-gray-700 text-[#E5E7EB]">
                  <SelectValue placeholder="Conductor" />
                </SelectTrigger>
                <SelectContent className="bg-[#141C2F] border-gray-700">
                  <SelectItem value="ana">Ana Gómez</SelectItem>
                  <SelectItem value="carlos">Carlos Sanchez</SelectItem>
                  <SelectItem value="laura">Laura Fernandez</SelectItem>
                  <SelectItem value="david">David Lopez</SelectItem>
                  <SelectItem value="sara">Sara Moreno</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-[140px] bg-[#0E1525] border-gray-700 text-[#E5E7EB]">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent className="bg-[#141C2F] border-gray-700">
                  <SelectItem value="espera">En espera</SelectItem>
                  <SelectItem value="proceso">En proceso</SelectItem>
                  <SelectItem value="resuelto">Resuelto</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex-1" />

              {/* Botón Crear Alerta */}
              <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogTrigger asChild>
                  <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white font-medium px-6">
                    Crear Alerta
                  </Button>
                </AlertDialogTrigger>
                
                <AlertDialogContent className="max-w-md bg-[#141C2F] border-gray-700 text-[#E5E7EB]">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-white">Agregar Nueva Alerta</AlertDialogTitle>
                  </AlertDialogHeader>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="alert-tipo" className="text-[#E5E7EB]">Tipo de Alerta</Label>
                      <Input
                        id="alert-tipo"
                        placeholder="Ej: Exceso de velocidad"
                        value={newAlert.tipo}
                        onChange={(e) => setNewAlert({ ...newAlert, tipo: e.target.value })}
                        className="mt-2 bg-[#0E1525] border-gray-700 text-[#E5E7EB]"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-[#E5E7EB]">Responsable</Label>
                      <Select 
                        value={newAlert.responsable} 
                        onValueChange={(value) => setNewAlert({ ...newAlert, responsable: value })}
                      >
                        <SelectTrigger className="mt-2 bg-[#0E1525] border-gray-700 text-[#E5E7EB]">
                          <SelectValue placeholder="Selecciona responsable" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#141C2F] border-gray-700">
                          <SelectItem value="Área de monitoreo">Área de monitoreo</SelectItem>
                          <SelectItem value="Mantenimiento">Mantenimiento</SelectItem>
                          <SelectItem value="Logística">Logística</SelectItem>
                          <SelectItem value="Taller mecánico">Taller mecánico</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label className="text-[#E5E7EB]">Prioridad</Label>
                      <Select 
                        value={newAlert.prioridad} 
                        onValueChange={(value) => setNewAlert({ ...newAlert, prioridad: value })}
                      >
                        <SelectTrigger className="mt-2 bg-[#0E1525] border-gray-700 text-[#E5E7EB]">
                          <SelectValue placeholder="Selecciona prioridad" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#141C2F] border-gray-700">
                          <SelectItem value="Alta">Alta</SelectItem>
                          <SelectItem value="Media">Media</SelectItem>
                          <SelectItem value="Baja">Baja</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="alert-unidad" className="text-[#E5E7EB]">Unidad</Label>
                      <Input
                        id="alert-unidad"
                        placeholder="Ej: Camión-123"
                        value={newAlert.unidad}
                        onChange={(e) => setNewAlert({ ...newAlert, unidad: e.target.value })}
                        className="mt-2 bg-[#0E1525] border-gray-700 text-[#E5E7EB]"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="alert-conductor" className="text-[#E5E7EB]">Conductor</Label>
                      <Input
                        id="alert-conductor"
                        placeholder="Ej: Juan Pérez"
                        value={newAlert.conductor}
                        onChange={(e) => setNewAlert({ ...newAlert, conductor: e.target.value })}
                        className="mt-2 bg-[#0E1525] border-gray-700 text-[#E5E7EB]"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-[#E5E7EB]">Estado</Label>
                      <Select 
                        value={newAlert.estado} 
                        onValueChange={(value) => setNewAlert({ ...newAlert, estado: value })}
                      >
                        <SelectTrigger className="mt-2 bg-[#0E1525] border-gray-700 text-[#E5E7EB]">
                          <SelectValue placeholder="Selecciona estado" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#141C2F] border-gray-700">
                          <SelectItem value="En espera">En espera</SelectItem>
                          <SelectItem value="En proceso">En proceso</SelectItem>
                          <SelectItem value="Resuelto">Resuelto</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex space-x-2 pt-4">
                      <Button onClick={handleAddAlert} className="flex-1 bg-[#3B82F6] hover:bg-[#2563EB]">
                        Agregar Alerta
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setIsDialogOpen(false)}
                        className="flex-1 border-gray-700 text-[#E5E7EB] hover:bg-[#0E1525]"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                </AlertDialogContent>
              </AlertDialog>

              {/* Búsqueda y Recarga */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar"
                    className="pl-10 w-[200px] bg-[#0E1525] border-gray-700 text-[#E5E7EB]"
                  />
                </div>
                <Button variant="ghost" size="icon" className="text-[#E5E7EB] hover:bg-[#0E1525]">
                  <RefreshCw className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabla de Alertas */}
        <Card className="bg-[#141C2F] border-none">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700 hover:bg-transparent">
                  <TableHead className="font-semibold text-[#E5E7EB] h-12">Tipo</TableHead>
                  <TableHead className="font-semibold text-[#E5E7EB]">Responsable</TableHead>
                  <TableHead className="font-semibold text-[#E5E7EB]">Prioridad</TableHead>
                  <TableHead className="font-semibold text-[#E5E7EB]">Unidad</TableHead>
                  <TableHead className="font-semibold text-[#E5E7EB]">Conductor</TableHead>
                  <TableHead className="font-semibold text-[#E5E7EB]">Generado</TableHead>
                  <TableHead className="font-semibold text-[#E5E7EB]">Estado</TableHead>
                  <TableHead className="font-semibold text-[#E5E7EB]">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alerts.map((alert, index) => (
                  <TableRow 
                    key={alert.id} 
                    className={`border-gray-700 ${
                      index % 2 === 0 ? "bg-[#131A2C]" : "bg-[#101725]"
                    }`}
                  >
                    <TableCell className="text-[#E5E7EB]">{alert.tipo}</TableCell>
                    <TableCell className="text-[#E5E7EB]">{alert.responsable}</TableCell>
                    <TableCell>
                      <Badge className={`${getPriorityColor(alert.prioridad)} rounded-full px-3 py-1 text-xs font-medium`}>
                        {alert.prioridad}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-[#E5E7EB]">{alert.unidad}</TableCell>
                    <TableCell className="text-[#E5E7EB]">{alert.conductor}</TableCell>
                    <TableCell className="text-[#E5E7EB] text-sm">{alert.generado}</TableCell>
                    <TableCell>
                      <Badge className={`${getEstadoColor(alert.estado)} rounded-full px-3 py-1 text-xs font-medium`}>
                        {alert.estado}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button 
                        size="sm" 
                        className="bg-transparent text-[#2B2BD9] hover:bg-[#2B2BD9]/10 font-medium px-4"
                      >
                        Editar
                      </Button>
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

export default PanelDeAlertas;
