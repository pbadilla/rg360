import { Document } from 'mongoose';

export default interface IFilm extends Document {
    title: string;
    year: number;
}