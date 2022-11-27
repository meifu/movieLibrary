import { BSONType } from "mongodb";

export interface MovieType {
  _id: BSONType
  film: string
  genre: string
  leadStudio: string
  audienceScore: string
  profitability: string
  rottenTomatoes: string
  worldwideGross: string
  year: string
}

export interface CommentType {
  movieId: string
  userName: string
  comment: string
}
