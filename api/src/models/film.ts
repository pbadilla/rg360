import mongoose, { Schema } from 'mongoose';
import logging from '../config/logging';
import IFilm from '../interfaces/film';

const FilmSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        year: { type: Number, required: true }
    },
    {
        timestamps: true
    }
);

FilmSchema.post<IFilm>('save', function () {
    logging.info('Mongo', 'Checkout the book we just saved: ');
});

export default mongoose.model<IFilm>('Film', FilmSchema);