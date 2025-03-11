"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const films_1 = __importDefault(require("../controllers/films"));
const router = express_1.default.Router();
router.get('/add', films_1.default.addFilm);
router.get('/getAll', films_1.default.getAllFilms);
module.exports = router;
//# sourceMappingURL=films.js.map