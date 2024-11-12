import {useEffect, useState} from 'react';
import movieDB from '../api/movieDB';
import {Cast, CreditResponse} from '../interfaces/creditsInterfaces';
import {MovieFull} from '../interfaces/movieInterface';

interface MovieDetails {
  isLoading: boolean;
  movieFull?: MovieFull;
  cast: Cast[];
}

export const useMovieDetails = (movieId: number) => {
  const [state, setState] = useState<MovieDetails>({
    isLoading: true,
    movieFull: undefined,
    cast: [],
  });

  const getMovieDetails = async () => {
    const movieDetailsPromise = await movieDB.get<MovieFull>(`/${movieId}`);
    const movieCreditPromise = await movieDB.get<CreditResponse>(
      `/${movieId}/credits`,
    );
    const [movieDetailsResp, castPromiseResp] = await Promise.all([
      movieDetailsPromise,
      movieCreditPromise,
    ]);
    setState({
      isLoading: false,
      movieFull: movieDetailsResp.data,
      cast: castPromiseResp.data.cast,
    });
  };
  useEffect(() => {
    getMovieDetails();
  }, []);

  return {
    ...state,
  };
};
