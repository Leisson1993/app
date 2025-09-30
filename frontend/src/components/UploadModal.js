import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { X, Upload, FileJson } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const UploadModal = ({ onClose, onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === 'application/json') {
        setSelectedFile(file);
      } else {
        toast({
          title: "Erro",
          description: "Por favor, selecione um arquivo JSON válido.",
          variant: "destructive"
        });
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "Erro",
        description: "Por favor, selecione um arquivo para fazer upload.",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);

    try {
      // Read and parse JSON file
      const fileContent = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsText(selectedFile);
      });

      const newContent = JSON.parse(fileContent);
      
      // Validate JSON structure
      if (!Array.isArray(newContent)) {
        throw new Error("JSON deve ser um array de conteúdos");
      }

      // Validate required fields for new format
      for (const item of newContent) {
        if (!item.title || !item.id) {
          throw new Error("Campos obrigatórios faltando: title, id");
        }
      }

      // Mock upload process delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Call success callback with new content
      if (onUploadSuccess) {
        onUploadSuccess(newContent);
      }
      
      toast({
        title: "Sucesso",
        description: `${newContent.length} itens importados com sucesso!`,
      });
      
      onClose();
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Erro",
        description: error.message || "Falha ao carregar o arquivo. Verifique o formato JSON.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <span>Upload de Arquivo JSON de Conteúdo</span>
            <Button
              onClick={onClose}
              size="sm"
              variant="ghost"
              className="text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </Button>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* File Selection */}
          <div className="space-y-2">
            <Label htmlFor="jsonFile" className="text-gray-300">
              Selecione o arquivo JSON:
            </Label>
            
            <div className="relative">
              <Input
                id="jsonFile"
                type="file"
                accept=".json,application/json"
                onChange={handleFileSelect}
                className="hidden"
              />
              
              <Button
                onClick={() => document.getElementById('jsonFile').click()}
                variant="outline"
                className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 justify-start"
              >
                <FileJson className="w-4 h-4 mr-2" />
                Escolher arquivo
              </Button>
            </div>
            
            <p className="text-sm text-gray-500">
              {selectedFile ? selectedFile.name : 'Nenhum arquivo escolhido'}
            </p>
          </div>

          {/* Upload Instructions */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <h4 className="text-green-500 font-medium mb-2">Instruções:</h4>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• O arquivo deve estar no formato JSON válido</li>
              <li>• Deve conter informações sobre filmes, séries ou animes</li>
              <li>• Campos obrigatórios: título, ano, tipo, gênero</li>
              <li>• Tamanho máximo: 10MB</li>
            </ul>
          </div>

          {/* Upload Button */}
          <Button
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
            className="w-full bg-green-500 hover:bg-green-600 disabled:opacity-50"
          >
            <Upload className="w-4 h-4 mr-2" />
            {isUploading ? 'Fazendo Upload...' : 'Fazer Upload'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadModal;