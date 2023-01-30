const apiKey = "YOUR_API_KEY_HERE";
const tmdbBaseUrl = "https://api.themoviedb.org/3";
const tmdbApiKeyQueryParam = `api_key=${apiKey}`;

export const getUpcomingMovies = async () => {
  const url = `${tmdbBaseUrl}/movie/upcoming?${tmdbApiKeyQueryParam}`;
  const data = await fetch(url);
  return data.json();
};

export const getMovieDetail = async (movieId) => {
  const url = `${tmdbBaseUrl}/movie/${movieId}?${tmdbApiKeyQueryParam}&append_to_response=similar,images`;
  const data = await fetch(url);
  return data.json();
};
