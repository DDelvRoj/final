import {useEffect, useState} from 'react';
import movieDB from '../api/movieDB';
import {Movie, MovieDBResponse} from '../interfaces/movieInterface';


interface MoviesStates {
  nowPlaying: Movie[];
  popular: Movie[];
  topRated: Movie[];
  upcoming: Movie[];
}


export const useMovies = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [moviesStates, setMoviesStates] = useState<MoviesStates>({
    nowPlaying: [],
    popular: [],
    topRated: [],
    upcoming: [],

  });

  const getMovies = async () => {

    const nowPlayingPromise = movieDB.get<MovieDBResponse>('/now_playing');
    const popularPromise = movieDB.get<MovieDBResponse>('/popular');

    const topRatedPromise = movieDB.get<MovieDBResponse>('/top_rated');
    const upcomingPromise = movieDB.get<MovieDBResponse>('/upcoming');

    const resp = await Promise.all([ 
      nowPlayingPromise,
      popularPromise,
      topRatedPromise,
      upcomingPromise
    ]);

    setMoviesStates({
      nowPlaying: resp[0].data.results,
      popular: resp[1].data.results,
      topRated: resp[2].data.results,
      upcoming: resp[3].data.results
    })
    setIsLoading(false);
  };
  useEffect(() => {
    // now playing
    getMovies();
  }, []);

  return {
    isLoading,
    ...moviesStates
  };
};
