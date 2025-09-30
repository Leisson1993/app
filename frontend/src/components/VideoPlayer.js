import React, { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { X, Play, Pause, Volume2, Maximize, MoreVertical } from 'lucide-react';

const VideoPlayer = ({ content, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef(null);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // In a real app, this would control actual video playback
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Video Player */}
        <div className="relative bg-black rounded-lg overflow-hidden mb-4">
          {/* Mock Video Area */}
          <div 
            className="w-full h-96 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center cursor-pointer"
            onClick={togglePlay}
            onMouseEnter={() => setShowControls(true)}
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                {isPlaying ? (
                  <Pause className="w-10 h-10 text-green-500" />
                ) : (
                  <Play className="w-10 h-10 text-green-500" />
                )}
              </div>
              <h3 className="text-white text-xl font-semibold">{content.title}</h3>
              <p className="text-gray-400">Reproduzindo conteúdo...</p>
            </div>
          </div>

          {/* Video Controls */}
          {showControls && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center justify-between">
                {/* Left Controls */}
                <div className="flex items-center space-x-4">
                  <Button
                    onClick={togglePlay}
                    size="sm"
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5" />
                    )}
                  </Button>

                  <span className="text-white text-sm">
                    {formatTime(currentTime)}
                  </span>

                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                  >
                    <Volume2 className="w-5 h-5" />
                  </Button>
                </div>

                {/* Right Controls */}
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </Button>

                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                  >
                    <Maximize className="w-5 h-5" />
                  </Button>

                  <Button
                    onClick={onClose}
                    size="sm"
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Video Info */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <span>{content.title} ({content.year})</span>
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
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span>{content.type}</span>
                <span>•</span>
                <span>{content.genre}</span>
                <span>•</span>
                <span>⭐ {content.rating}</span>
              </div>
              <p className="text-gray-300">{content.synopsis}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VideoPlayer;