import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Play, User, Mail, Lock, Phone } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Login = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    whatsapp: '',
    confirmPassword: ''
  });
  const { login, register, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isLoginMode) {
      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Erro",
          description: "As senhas não coincidem",
          variant: "destructive"
        });
        return;
      }
      
      if (!formData.fullName || !formData.email || !formData.password || !formData.whatsapp) {
        toast({
          title: "Erro", 
          description: "Preencha todos os campos",
          variant: "destructive"
        });
        return;
      }
    } else {
      if (!formData.email || !formData.password) {
        toast({
          title: "Erro",
          description: "Preencha todos os campos", 
          variant: "destructive"
        });
        return;
      }
    }

    const userData = {
      id: Date.now(),
      name: formData.fullName || 'Leisson',
      email: formData.email,
      whatsapp: formData.whatsapp || ''
    };

    if (isLoginMode) {
      login(userData);
      toast({
        title: "Sucesso",
        description: "Login realizado com sucesso!"
      });
    } else {
      register(userData);
      toast({
        title: "Sucesso", 
        description: "Conta criada com sucesso!"
      });
    }
    
    navigate('/');
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <Play className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">MAXPLUS</h1>
          </div>
          <p className="text-gray-400">Acesse sua conta para assistir</p>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <Button 
            variant={isLoginMode ? "default" : "outline"} 
            className={`flex-1 ${isLoginMode ? 'bg-green-500 hover:bg-green-600' : 'border-green-500 text-green-500'}`}
            onClick={() => setIsLoginMode(true)}
          >
            Entrar
          </Button>
          <Button 
            variant={!isLoginMode ? "default" : "outline"}
            className={`flex-1 ${!isLoginMode ? 'bg-green-500 hover:bg-green-600' : 'border-green-500 text-green-500'}`}
            onClick={() => setIsLoginMode(false)}
          >
            + Cadastrar
          </Button>
        </div>

        {/* Form */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white text-center">
              {isLoginMode ? 'Fazer Login' : 'Criar Conta'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLoginMode && (
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    name="fullName"
                    placeholder="Nome Completo"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                  />
                </div>
              )}
              
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                />
              </div>

              {!isLoginMode && (
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input
                    type="tel"
                    name="whatsapp"
                    placeholder="WhatsApp"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                  />
                </div>
              )}

              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  type="password"
                  name="password"
                  placeholder="Senha"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                />
              </div>

              {!isLoginMode && (
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirmar Senha"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                  />
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full bg-green-500 hover:bg-green-600 text-white"
              >
                {isLoginMode ? 'Entrar' : 'Criar Conta'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Access Required Card */}
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <h3 className="text-green-500 font-semibold mb-2">Acesso Necessário</h3>
            <p className="text-gray-400 text-sm">
              Você precisa ter uma conta para assistir aos conteúdos
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;