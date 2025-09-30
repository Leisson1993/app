import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navigation from './Navigation';
import ContentCard from './ContentCard';
import FeaturedContent from './FeaturedContent';
import VideoPlayer from './VideoPlayer';
import UploadModal from './UploadModal';
import ContentDetails from './ContentDetails';
import { mockContent, getUserFavorites } from '../data/mockData';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

const Dashboard = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('inicio');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showPlayer, setShowPlayer] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [uploadedContent, setUploadedContent] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  
  const itemsPerPage = 8;

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
    } else if (user) {
      const userFavorites = getUserFavorites(user.id);
      setFavorites(userFavorites);
    }
  }, [user, isLoading, navigate]);

  const filteredContent = () => {
    // Combine mock content with uploaded content
    let content = [...mockContent, ...uploadedContent];
    
    if (activeCategory === 'filmes') {
      content = content.filter(item => item.type === 'Filme');
    } else if (activeCategory === 'series') {
      content = content.filter(item => item.type === 'Série');
    } else if (activeCategory === 'animes') {
      content = content.filter(item => item.type === 'Anime');
    } else if (activeCategory === 'lancamentos') {
      content = content.filter(item => item.year >= 2024);
    }

    if (searchQuery) {
      content = content.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.genre.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return content;
  };

  const getFavoriteContent = () => {
    const allContent = [...mockContent, ...uploadedContent];
    return allContent.filter(item => favorites.includes(item.id));
  };

  const getFeaturedContent = () => {
    const allContent = [...mockContent, ...uploadedContent];
    return allContent.find(item => item.featured) || allContent[0];
  };

  const paginatedContent = () => {
    const content = filteredContent();
    const startIndex = (currentPage - 1) * itemsPerPage;
    return content.slice(startIndex, startIndex + itemsPerPage);
  };

  const totalPages = Math.ceil(filteredContent().length / itemsPerPage);

  const handleWatch = (content) => {
    setCurrentVideo(content);
    setShowPlayer(true);
  };

  const handleFavorite = (contentId) => {
    setFavorites(prev => 
      prev.includes(contentId) 
        ? prev.filter(id => id !== contentId)
        : [...prev, contentId]
    );
  };

  const handleShowDetails = (content) => {
    setSelectedContent(content);
    setShowDetails(true);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
    if (category === 'upload') {
      setShowUpload(true);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white">Carregando...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleUploadSuccess = (newContent) => {
    // Process new format content
    const processedContent = newContent.map((item) => {
      // Determine type from genre or details
      let type = 'Filme';
      if (item.details?.seasons_count && item.details.seasons_count !== '1') {
        type = 'Série';
      } else if (item.seasons && item.seasons.length > 0) {
        type = 'Série';
      } else if (item.genres?.some(g => g.toLowerCase().includes('anime'))) {
        type = 'Anime';
      }

      return {
        id: item.id,
        title: item.title,
        year: item.release || item.details?.year || new Date().getFullYear(),
        type: type,
        genre: item.genres ? item.genres[0] : (item.genre || 'Drama'),
        rating: parseFloat(item.imdb_rating || item.details?.imdb || (Math.random() * 4 + 6).toFixed(1)),
        image: item.image || item.cover_url || `https://images.unsplash.com/photo-${1500000000000 + Math.random() * 100000000}?w=300&h=450&fit=crop`,
        synopsis: item.synopsis || `Assista ${item.title} (${item.year}) online.`,
        featured: false,
        // Keep original data for detailed view
        originalData: item
      };
    });
    
    setUploadedContent(prev => [...prev, ...processedContent]);
  };

  const featuredContent = getFeaturedContent();
  const favoriteContent = getFavoriteContent();

  return (
    <div className="min-h-screen bg-gray-950">
      <Navigation 
        user={user}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />
      
      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Pesquisar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
          />
        </div>

        {/* Featured Content */}
        {activeCategory === 'inicio' && featuredContent && (
          <FeaturedContent 
            content={featuredContent}
            onWatch={handleWatch}
            isFavorite={favorites.includes(featuredContent.id)}
            onFavorite={handleFavorite}
          />
        )}

        {/* User Favorites */}
        {activeCategory === 'inicio' && favoriteContent.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Meus Favoritos</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {favoriteContent.slice(0, 6).map(content => (
                <ContentCard
                  key={content.id}
                  content={content}
                  onWatch={handleWatch}
                  isFavorite={true}
                  onFavorite={handleFavorite}
                />
              ))}
            </div>
          </section>
        )}

        {/* Content Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">
              {activeCategory === 'inicio' ? 'Conteúdo Recomendado' : 
               activeCategory === 'filmes' ? 'Filmes' :
               activeCategory === 'series' ? 'Séries' :
               activeCategory === 'animes' ? 'Animes' :
               activeCategory === 'lancamentos' ? 'Lançamentos' : 'Conteúdo'}
            </h2>
            <span className="text-gray-400 text-sm">
              ({filteredContent().length} encontrados)
            </span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 mb-6">
            {paginatedContent().map(content => (
              <ContentCard
                key={content.id}
                content={content}
                onWatch={handleWatch}
                isFavorite={favorites.includes(content.id)}
                onFavorite={handleFavorite}
                onShowDetails={handleShowDetails}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              
              {[...Array(Math.min(totalPages, 5))].map((_, index) => {
                const pageNum = currentPage <= 3 ? index + 1 : 
                               currentPage >= totalPages - 2 ? totalPages - 4 + index :
                               currentPage - 2 + index;
                
                if (pageNum > 0 && pageNum <= totalPages) {
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                      className={currentPage === pageNum ? 
                        "bg-green-500 hover:bg-green-600" : 
                        "border-gray-700 text-gray-300 hover:bg-gray-800"
                      }
                    >
                      {pageNum}
                    </Button>
                  );
                }
                return null;
              })}
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </section>
      </div>

      {/* Video Player Modal */}
      {showPlayer && currentVideo && (
        <VideoPlayer
          content={currentVideo}
          onClose={() => {
            setShowPlayer(false);
            setCurrentVideo(null);
          }}
        />
      )}

      {/* Upload Modal */}
      {showUpload && (
        <UploadModal
          onClose={() => {
            setShowUpload(false);
            setActiveCategory('inicio');
          }}
          onUploadSuccess={handleUploadSuccess}
        />
      )}
    </div>
  );
};

export default Dashboard;