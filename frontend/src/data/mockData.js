export const mockContent = [
  {
    id: 1,
    title: "Breaking Bad",
    year: 2008,
    type: "Série",
    genre: "Crime",
    rating: 9.5,
    image: "https://images.unsplash.com/photo-1489599735046-050143d5d636?w=300&h=450&fit=crop",
    featured: false,
    synopsis: "Um professor de química do ensino médio se torna um fabricante de drogas."
  },
  {
    id: 2,
    title: "Attack on Titan",
    year: 2013,
    type: "Anime",
    genre: "Animação",
    rating: 9.0,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=450&fit=crop",
    featured: false,
    synopsis: "Humanos lutam pela sobrevivência contra titãs gigantes."
  },
  {
    id: 3,
    title: "M3GAN 2.0",
    year: 2025,
    type: "Filme",
    genre: "Terror",
    rating: 7.0,
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop",
    featured: false,
    synopsis: "A boneca robótica M3GAN retorna mais perigosa que nunca."
  },
  {
    id: 4,
    title: "Thunderbolts*",
    year: 2025,
    type: "Filme", 
    genre: "Ação",
    rating: 8.7,
    image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=300&h=450&fit=crop",
    featured: true,
    synopsis: "Assista Thunderbolts* (2025) online. Um grupo de anti-heróis se une para uma missão perigosa."
  },
  {
    id: 5,
    title: "American Dad! S13E10",
    year: 2025,
    type: "Série",
    genre: "Comédia",
    rating: 7.5,
    image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=300&h=450&fit=crop",
    featured: false,
    synopsis: "Roger e Stan em mais uma aventura hilária."
  },
  {
    id: 6,
    title: "Meu Ano em Oxford",
    year: 2024,
    type: "Filme",
    genre: "Drama",
    rating: 8.2,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=450&fit=crop",
    featured: false,
    synopsis: "A história de um estudante brasileiro em Oxford."
  },
  {
    id: 7,
    title: "A Última Missão",
    year: 2024,
    type: "Filme",
    genre: "Ação",
    rating: 7.8,
    image: "https://images.unsplash.com/photo-1478720568477-b2709d01a50b?w=300&h=450&fit=crop",
    featured: false,
    synopsis: "Um soldado veterano em sua missão final."
  },
  {
    id: 8,
    title: "Um Verão Infernal",
    year: 2024,
    type: "Filme", 
    genre: "Thriller",
    rating: 6.5,
    image: "https://images.unsplash.com/photo-1574391884720-bbc0ca4bea1c?w=300&h=450&fit=crop",
    featured: false,
    synopsis: "Mistérios sombrios em uma pequena cidade durante o verão."
  },
  {
    id: 9,
    title: "Evie",
    year: 2024,
    type: "Filme",
    genre: "Drama",
    rating: 7.2,
    image: "https://images.unsplash.com/photo-1594736797933-d0601ba2fe65?w=300&h=450&fit=crop",
    featured: false,
    synopsis: "A jornada emocional de uma jovem mulher."
  },
  {
    id: 10,
    title: "ER: Plantão Médico S01E05",
    year: 1994,
    type: "Série",
    genre: "Drama",
    rating: 8.9,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=300&h=450&fit=crop",
    featured: false,
    synopsis: "Episódio clássico da aclamada série médica."
  }
];

export const categories = [
  { id: 'inicio', name: 'INÍCIO', path: '/' },
  { id: 'lancamentos', name: 'LANÇAMENTOS', path: '/new-releases' },
  { id: 'filmes', name: 'FILMES', path: '/movies' },
  { id: 'series', name: 'SÉRIES', path: '/series' },
  { id: 'animes', name: 'ANIMES', path: '/anime' },
  { id: 'upload', name: 'UPLOAD JSON', path: '/upload' }
];

export const getUserFavorites = (userId) => {
  // Mock user favorites - in real app this would come from backend
  return [1, 4, 6, 10]; // IDs of favorite content
};