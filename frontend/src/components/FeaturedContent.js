import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Play, Info, Heart, Share2, Star } from 'lucide-react';

const FeaturedContent = ({ content, onWatch, isFavorite, onFavorite }) => {
  const handleWatch = () => {
    onWatch(content);
  };

  const handleFavorite = () => {
    onFavorite(content.id);
  };

  return (
    <section className="relative rounded-lg overflow-hidden mb-8">
      {/* Background Image */}
      <div 
        className="h-80 bg-cover bg-center relative"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.4)), url(${content.image})`
        }}
      >
        {/* Content */}
        <div className="absolute inset-0 flex items-end">
          <div className="p-8 space-y-4">
            {/* Rating */}
            <div className="flex items-center space-x-2">
              <Badge className="bg-black/70 text-white border-none">
                <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                {content.rating}
              </Badge>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-white">
              {content.title}
            </h1>

            {/* Metadata */}
            <div className="flex items-center space-x-4 text-gray-300">
              <span>{content.year} • {content.type}</span>
              <Badge variant="outline" className="border-green-500 text-green-500">
                {content.genre}
              </Badge>
            </div>

            {/* Synopsis */}
            <p className="text-gray-300 max-w-2xl leading-relaxed">
              {content.synopsis}
            </p>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4 pt-4">
              <Button
                onClick={handleWatch}
                size="lg"
                className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8"
              >
                <Play className="w-5 h-5 mr-2" />
                Assistir Agora
              </Button>

              <Button
                onClick={handleFavorite}
                size="lg"
                variant="outline"
                className={`border-gray-600 px-6 ${
                  isFavorite 
                    ? 'text-red-500 border-red-500 hover:bg-red-500/10' 
                    : 'text-white hover:bg-gray-800'
                }`}
              >
                <Heart className={`w-5 h-5 mr-2 ${isFavorite ? 'fill-current' : ''}`} />
                Favoritar
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-gray-600 text-white hover:bg-gray-800 px-6"
              >
                <Share2 className="w-5 h-5 mr-2" />
                Compartilhar
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-gray-600 text-white hover:bg-gray-800 px-6"
              >
                <Info className="w-5 h-5 mr-2" />
                Mais Info
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedContent;