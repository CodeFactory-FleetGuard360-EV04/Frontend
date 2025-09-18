import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Bus, Shield } from "lucide-react";

type LoginResponse = {
    token?: string;
    user?: { name?: string; [k: string]: unknown } | null;
    message?: string;
    error?: string;
    [k: string]: unknown;
};

const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        remember: false,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const base = (import.meta as any).env?.VITE_API_URL ?? "";
            const url = `${base?.toString().replace(/\/$/, "")}/api/login`;

            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                // Descomenta si el backend usa cookies/sesiones:
                // credentials: "include",
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password,
                }),
            });

            if (!res.ok) {
                let msg: string | undefined;
                try {
                    const data = (await res.json()) as LoginResponse;
                    msg = data.message || data.error;
                } catch {
                    // sin cuerpo JSON
                }
                setError(msg || "Credenciales inválidas.");
                return;
            }

            const data = (await res.json().catch(() => ({}))) as LoginResponse;
            const payload = {
                token: data.token ?? "",
                user: data.user?.name ?? formData.username,
                ts: Date.now(),
            };

            if (formData.remember) {
                localStorage.setItem("auth", JSON.stringify(payload));
            } else {
                sessionStorage.setItem("auth", JSON.stringify(payload));
            }

            navigate("/alertas", { replace: true });
        } catch (err) {
            setError("No se pudo conectar con el servidor.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <div className="min-h-screen flex">
            {/* Panel izquierdo - Bienvenida */}
            <div className="hidden lg:flex lg:w-1/2 bg-login-bg relative overflow-hidden">
                <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-center">
                    <div className="mb-16">
                        <h1 className="text-6xl xl:text-7xl font-black tracking-tight bg-gradient-to-br from-login-gradientFrom to-login-gradientTo bg-clip-text text-transparent leading-tight">
                            BIENVENIDO
                            <br />
                            DE NUEVO
                        </h1>
                    </div>

                    <div className="mt-auto">
                        <div className="flex items-center justify-center mb-6">
                            <div className="bg-login-shield rounded-2xl p-6 flex items-center justify-center shadow-2xl">
                                <div className="relative">
                                    <Shield size={64} className="text-white" />
                                    <Bus size={32} className="text-white absolute inset-0 m-auto" />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 text-center">
                            <h2 className="text-4xl font-extrabold text-white">Sistema Inteligente</h2>
                            <p className="text-2xl text-white/90 leading-relaxed">
                                de Monitoreo Satelital
                                <br />
                                para Transporte de
                                <br />
                                Pasajeros
                            </p>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1200 300" className="w-full h-auto text-login-wave" preserveAspectRatio="none">
                        <path d="M0,100 C300,200 600,0 900,100 C1050,150 1150,50 1200,100 L1200,300 L0,300 Z" fill="currentColor" opacity="0.8" />
                        <path d="M0,150 C300,250 600,50 900,150 C1050,200 1150,100 1200,150 L1200,300 L0,300 Z" fill="currentColor" opacity="0.6" />
                        <path d="M0,200 C300,300 600,100 900,200 C1050,250 1150,150 1200,200 L1200,300 L0,300 Z" fill="currentColor" opacity="0.4" />
                    </svg>
                </div>
            </div>

            {/* Panel derecho - Formulario */}
            <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white lg:w-1/2">
                <div className="lg:hidden w-full mb-8 text-center">
                    <h1 className="text-4xl font-black bg-gradient-to-br from-login-gradientFrom to-login-gradientTo bg-clip-text text-transparent mb-4">
                        BIENVENIDO DE NUEVO
                    </h1>
                    <div className="flex items-center justify-center mb-4">
                        <div className="bg-login-shield rounded-xl p-4 flex items-center justify-center">
                            <div className="relative">
                                <Shield size={32} className="text-white" />
                                <Bus size={16} className="text-white absolute inset-0 m-auto" />
                            </div>
                        </div>
                    </div>
                    <p className="text-sm text-gray-600">Sistema de Monitoreo Satelital</p>
                </div>

                <Card className="w-full max-w-md border-0 shadow-none">
                    <CardHeader className="space-y-4 pb-8">
                        <div className="text-center lg:text-left">
                            <CardTitle className="text-3xl font-bold text-gray-900 mb-2">Inicio de Sesión Operadores</CardTitle>
                            <p className="text-gray-600">Bienvenido, por favor ingresa tus credenciales de operador</p>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                                    Usuario o Correo
                                </Label>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="Ingresa tu usuario"
                                    value={formData.username}
                                    onChange={(e) => handleInputChange("username", e.target.value)}
                                    className="h-12 px-4 text-base rounded-lg border-gray-200 focus:border-login-button focus:ring-login-button"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                                    Contraseña
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Ingresa tu contraseña"
                                    value={formData.password}
                                    onChange={(e) => handleInputChange("password", e.target.value)}
                                    className="h-12 px-4 text-base rounded-lg border-gray-200 focus:border-login-button focus:ring-login-button"
                                    required
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="remember"
                                        checked={formData.remember}
                                        onCheckedChange={(checked) => handleInputChange("remember", checked as boolean)}
                                        className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                                    />
                                    <Label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer">
                                        Recordarme
                                    </Label>
                                </div>

                                <button
                                    type="button"
                                    className="text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors"
                                >
                                    ¿Olvidaste tu contraseña?
                                </button>
                            </div>

                            {error && <p className="text-sm text-red-600">{error}</p>}

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full h-12 text-base font-semibold bg-login-button hover:bg-login-button/90 text-white border-0 rounded-lg transition-all duration-200 hover:shadow-lg disabled:opacity-70"
                            >
                                {loading ? "Ingresando..." : "Ingresar"}
                            </Button>
                        </form>

                        <div className="mt-8">
                            <p className="text-xs text-gray-500 text-center italic">
                                "El acceso de operadores será registrado en el log de auditoría."
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default LoginPage;
