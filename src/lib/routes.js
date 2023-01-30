import { SplashScreen } from "../pages/SplashScreen";
import { MovieCatalogue } from "../pages/MovieCatalogue";
import { MovieDetail } from "../pages/MovieDetail";
import { getMovieDetail, getUpcomingMovies } from "./tmdbapi/tmdb-api";

export default {
  root: "$",
  routes: [
    {
      path: "$",
      component: SplashScreen,
    },
    {
      path: "catalogue",
      component: MovieCatalogue,
      before: async (page) => {
        page.movies = await getUpcomingMovies();
      },
    },
    {
      path: "details/:movieId",
      component: MovieDetail,
      before: async (page, { movieId }) => {
        page.movieDetail = await getMovieDetail(movieId);
      },
    },
  ],
};
