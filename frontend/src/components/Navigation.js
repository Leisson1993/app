import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Play, User, LogOut } from 'lucide-react';
import { categories } from '../data/mockData';

const Navigation = ({ user, activeCategory, onCategoryChange }) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        {/* Top Header */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <Play className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">MAXPLUS v3</h1>
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-white">
              <User className="w-5 h-5" />
              <span>Olá, {user?.name || 'Usuário'}</span>
            </div>
            <Button
              onClick={handleLogout}
              size="sm"
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="pb-4">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "ghost"}
                onClick={() => onCategoryChange(category.id)}
                className={`text-sm transition-all duration-200 ${
                  activeCategory === category.id
                    ? 'bg-green-500 hover:bg-green-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;