"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const film_1 = __importDefault(require("../models/film"));
const addFilm = (req, res, _next) => {
    let { author, year } = req.body;
    const film = new film_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        author,
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
const getAllFilms = (_req, res, _next) => {
    film_1.default.find()
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
exports.default = { addFilm, getAllFilms };
//# sourceMappingURL=films.js.map