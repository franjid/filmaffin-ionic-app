import { FilmFrame } from "./film-frame";

export interface Film {
  idFilm: number,
  title: string,
  originalTitle: string,
  rating: null | number,
  numRatings: null | number,
  year: number,
  duration: null | number,
  country: null | string,
  posterImages: {
    small: string,
    medium: string,
    large: string,
  },
  synopsis: string,
  directors: string[],
  actors: string[],
  topics: string[],
  genres: string[],
  screenplayers: string[],
  musicians: string[],
  cinematographers: string[],
  proReviews: [],
  userReviews: [],
  numFrames: number,
  frames: FilmFrame[]
}
