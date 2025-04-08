import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Film from '../models/film';

// Define the expected shape of the request body using an interface
interface FilmRequestBody {
  title: string;
  year: number;
}

const addFilm = async (req: Request<{}, {}, FilmRequestBody>, res: Response, _next: NextFunction): Promise<Response> => {
  // Validate required fields
  const { title, year } = req.body;
  if (!title || !year) {
    return res.status(400).json({
      message: "Both 'title' and 'year' are required fields."
    });
  }

  // Create a new film instance
  const film = new Film({
    _id: new mongoose.Types.ObjectId(),
    title,
    year
  });

  try {
    const result = await film.save();
    return res.status(201).json({
      film: result
    });
  } catch (error) {
    return res.status(500).json({
      message: (error as Error).message,
      error
    });
  }
};

const getAllFilms = async (_req: Request, res: Response, _next: NextFunction): Promise<Response> => {
  try {
    const films = await Film.find().exec();
    return res.status(200).json({
      films,
      count: films.length
    });
  } catch (error) {
    return res.status(500).json({
      message: (error as Error).message,
      error
    });
  }
};

export default { addFilm, getAllFilms };
