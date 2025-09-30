import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Play, Heart, Share2, Star, Info } from 'lucide-react';

const ContentCard = ({ content, onWatch, isFavorite, onFavorite, onShowDetails }) => {
  const handleWatch = () => {
    onWatch(content);
  };

  const handleFavorite = () => {
    onFavorite(content.id);
  };

  const handleShowDetails = () => {
    if (onShowDetails) {
      onShowDetails(content);
    }
  };

  return (
    <Card className="bg-gray-900 border-gray-800 overflow-hidden group hover:border-green-500/50 transition-all duration-300 hover:scale-105">
      <div className="relative">
        <img
          src={content.image}
          alt={content.title}
          className="w-full h-48 object-cover"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button
            onClick={handleWatch}
            size="sm"
            className="bg-green-500 hover:bg-green-600"
          >
            <Play className="w-4 h-4 mr-1" />
            Assistir
          </Button>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-2 left-2">
          <Badge className="bg-black/70 text-white border-none">
            <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
            {content.rating}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4 space-y-2">
        <h3 className="font-semibold text-white text-sm line-clamp-1">
          {content.title}
        </h3>
        
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>{content.year} • {content.type}</span>
          <Badge variant="outline" className="border-gray-700 text-gray-300 text-xs">
            {content.genre}
          </Badge>
        </div>

        {/* Show additional info if available from original data */}
        {content.originalData?.details && (
          <div className="text-xs text-gray-500">
            {content.originalData.details.quality && (
              <span className="mr-2">{content.originalData.details.quality}</span>
            )}
            {content.originalData.details.views && (
              <span>{content.originalData.details.views} views</span>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2">
          <Button
            onClick={handleWatch}
            size="sm"
            className="flex-1 mr-2 bg-green-500 hover:bg-green-600 text-xs"
          >
            <Play className="w-3 h-3 mr-1" />
            Assistir
          </Button>
          
          <div className="flex space-x-1">
            <Button
              onClick={handleFavorite}
              size="sm"
              variant="ghost"
              className={`p-1 h-8 w-8 ${
                isFavorite 
                  ? 'text-red-500 hover:text-red-400' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </Button>
            
            <Button
              size="sm"
              variant="ghost"
              className="p-1 h-8 w-8 text-gray-400 hover:text-white"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentCard;