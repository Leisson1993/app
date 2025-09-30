import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { X, Play, Heart, Share2, Star, Calendar, Clock, Eye, Award } from 'lucide-react';

const ContentDetails = ({ content, onClose, onWatch, onFavorite, isFavorite }) => {
  const [selectedSeason, setSelectedSeason] = useState(0);
  const originalData = content.originalData;

  const handleEpisodeWatch = (episode) => {
    // Create episode object for video player
    const episodeContent = {
      ...content,
      title: `${content.title} - ${episode.title}`,
      episodeData: episode
    };
    onWatch(episodeContent);
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-4xl max-h-screen overflow-y-auto">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white text-2xl">{content.title}</CardTitle>
              <Button
                onClick={onClose}
                size="sm"
                variant="ghost"
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Main Content Info */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Poster */}
              <div className="md:col-span-1">
                <img
                  src={originalData?.cover_url || content.image}
                  alt={content.title}
                  className="w-full rounded-lg"
                />
              </div>

              {/* Details */}
              <div className="md:col-span-2 space-y-4">
                {/* Rating and Basic Info */}
                <div className="flex items-center space-x-4">
                  <Badge className="bg-green-500 text-white">
                    <Star className="w-4 h-4 mr-1 fill-current" />
                    {content.rating}
                  </Badge>
                  
                  {originalData?.details?.classification && (
                    <Badge variant="outline" className="border-red-500 text-red-500">
                      {originalData.details.classification}+
                    </Badge>
                  )}
                  
                  {originalData?.details?.quality && (
                    <Badge variant="outline" className="border-blue-500 text-blue-500">
                      {originalData.details.quality}
                    </Badge>
                  )}
                </div>

                {/* Metadata */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center text-gray-300">
                    <Calendar className="w-4 h-4 mr-2" />
                    {content.year}
                  </div>
                  
                  {originalData?.time && (
                    <div className="flex items-center text-gray-300">
                      <Clock className="w-4 h-4 mr-2" />
                      {originalData.time}
                    </div>
                  )}
                  
                  {originalData?.details?.views && (
                    <div className="flex items-center text-gray-300">
                      <Eye className="w-4 h-4 mr-2" />
                      {originalData.details.views} views
                    </div>
                  )}
                  
                  {originalData?.details?.imdb && (
                    <div className="flex items-center text-gray-300">
                      <Award className="w-4 h-4 mr-2" />
                      IMDb {originalData.details.imdb}
                    </div>
                  )}
                </div>

                {/* Genres */}
                {originalData?.genres && (
                  <div className="flex flex-wrap gap-2">
                    {originalData.genres.map((genre, index) => (
                      <Badge key={index} variant="outline" className="border-gray-700 text-gray-300">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Synopsis */}
                <p className="text-gray-300 leading-relaxed">
                  {content.synopsis}
                </p>

                {/* Action Buttons */}
                <div className="flex items-center space-x-4">
                  <Button
                    onClick={() => onWatch(content)}
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Assistir Agora
                  </Button>

                  <Button
                    onClick={() => onFavorite(content.id)}
                    variant="outline"
                    className={`border-gray-600 ${
                      isFavorite 
                        ? 'text-red-500 border-red-500 hover:bg-red-500/10' 
                        : 'text-white hover:bg-gray-800'
                    }`}
                  >
                    <Heart className={`w-4 h-4 mr-2 ${isFavorite ? 'fill-current' : ''}`} />
                    {isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
                  </Button>

                  <Button
                    variant="outline"
                    className="border-gray-600 text-white hover:bg-gray-800"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Compartilhar
                  </Button>
                </div>
              </div>
            </div>

            {/* Episodes Section for Series */}
            {originalData?.seasons && originalData.seasons.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Episódios</h3>
                
                {/* Season Selector */}
                {originalData.seasons.length > 1 && (
                  <div className="flex space-x-2">
                    {originalData.seasons.map((season, index) => (
                      <Button
                        key={index}
                        onClick={() => setSelectedSeason(index)}
                        variant={selectedSeason === index ? "default" : "outline"}
                        size="sm"
                        className={selectedSeason === index ? 
                          "bg-green-500 hover:bg-green-600" : 
                          "border-gray-700 text-gray-300 hover:bg-gray-800"
                        }
                      >
                        {season.season_name || `Temporada ${index + 1}`}
                      </Button>
                    ))}
                  </div>
                )}

                {/* Episodes List */}
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {originalData.seasons[selectedSeason]?.episodes?.map((episode, index) => (
                    <Card key={index} className="bg-gray-800 border-gray-700 hover:border-green-500/50 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-white font-medium">
                              Episódio {episode.episode_number}: {episode.title}
                            </h4>
                            <p className="text-gray-400 text-sm">
                              {episode.player_urls?.length || 0} fonte(s) disponível(eis)
                            </p>
                          </div>
                          <Button
                            onClick={() => handleEpisodeWatch(episode)}
                            size="sm"
                            className="bg-green-500 hover:bg-green-600"
                          >
                            <Play className="w-4 h-4 mr-1" />
                            Assistir
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContentDetails;