import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Film from '../models/film';

const addFilm = (req: Request, res: Response, _next: NextFunction) => {

    if (!req.body.title || !req.body.year) {
        return res.status(400).json({
            message: "Both 'title' and 'year' are required fields."
        });
    }

    const { title, year } = req.body;

    const film = new Film({
        _id: new mongoose.Types.ObjectId(),
        title,
        year
    });

    return film
        .save()
        .then((result) => {
            return res.status(201).json({
                film: result
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const getAllFilms = (_req: Request, res: Response, _next: NextFunction) => {
    Film.find()
        .exec()
        .then((films) => {
            return res.status(200).json({
                films: films,
                count: films.length
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

export default { addFilm, getAllFilms };