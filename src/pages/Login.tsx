import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import logoShield from "@/assets/logo-shield.png";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    remember: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulación de login
    setTimeout(() => {
      if (credentials.username && credentials.password) {
        toast({
          title: "Login exitoso",
          description: "Bienvenido al sistema de monitoreo satelital",
        });
        navigate("/dashboard");
      } else {
        toast({
          title: "Error de autenticación",
          description: "Por favor verifica tus credenciales",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex">
      {/* Columna Izquierda */}
      <div className="w-2/5 bg-gradient-to-br from-dark-blue via-dark-blue to-aqua-green relative overflow-hidden">
        {/* Patrón de ondas */}
        <div className="absolute inset-0 opacity-20">
          <svg
            viewBox="0 0 400 400"
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,200 Q100,150 200,200 T400,200 L400,400 L0,400 Z"
              fill="rgba(90,183,163,0.3)"
            />
            <path
              d="M0,250 Q150,200 300,250 T600,250 L600,400 L0,400 Z"
              fill="rgba(90,183,163,0.2)"
            />
          </svg>
        </div>
        
        <div className="relative z-10 flex flex-col justify-center items-center h-full p-8 text-center">
          <div className="mb-8">
            <img 
              src={logoShield} 
              alt="Logo Sistema de Monitoreo" 
              className="w-24 h-24 mx-auto mb-6"
            />
          </div>
          
          <h1 className="text-6xl font-black text-purple-brand mb-6 leading-tight">
            BIENVENIDO<br />DE NUEVO
          </h1>
          
          <p className="text-xl text-black font-medium max-w-md leading-relaxed">
            Sistema Inteligente de Monitoreo Satelital para Transporte de Pasajeros
          </p>
        </div>
      </div>

      {/* Columna Derecha */}
      <div className="w-3/5 bg-gray-light flex items-center justify-center p-8">
        <Card className="w-full max-w-md bg-white shadow-xl border-0">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-2xl font-bold text-foreground mb-2">
              Inicio de Sesión Operadores
            </CardTitle>
            <p className="text-muted-foreground">
              Bienvenido, por favor ingresa tus credenciales de operador
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="username" className="font-medium">
                  Usuario o Correo
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={credentials.username}
                  onChange={(e) =>
                    setCredentials({ ...credentials, username: e.target.value })
                  }
                  className="mt-2 h-12"
                  placeholder="Ingresa tu usuario o correo"
                />
              </div>
              
              <div>
                <Label htmlFor="password" className="font-medium">
                  Contraseña
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                  className="mt-2 h-12"
                  placeholder="Ingresa tu contraseña"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={credentials.remember}
                    onCheckedChange={(checked) =>
                      setCredentials({ ...credentials, remember: !!checked })
                    }
                  />
                  <Label htmlFor="remember" className="text-sm">
                    Recordarme
                  </Label>
                </div>
                
                <a
                  href="#"
                  className="text-sm text-primary hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              
              <Button
                type="submit"
                className="w-full h-12 text-lg font-medium"
                disabled={isLoading}
              >
                {isLoading ? "Ingresando..." : "Ingresar"}
              </Button>
            </form>
            
            <p className="text-xs text-muted-foreground text-center mt-6">
              El acceso de operadores será registrado en el log de auditoría.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;