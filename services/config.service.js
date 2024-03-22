const base = 'https://api.themoviedb.org/3';
export const ConfigService = {
  themoviedb: {
    urls: {
      discoverMovies: `${base}/discover/movie`,
      movie: (id) => `${base}/movie/${id}`,
      movieVideos: (id) => `${base}/movie/${id}/videos`,
      moviesTopRated: `${base}/movie/top_rated`,
    },
    keys: {
      API_TOKEN: process.env.TMDB_API_TOKEN,
      API_KEY: process.env.TMDB_API_KEY,
      API_AUTH: "Bearer " + process.env.TMDB_API_TOKEN,
    }
  }
}