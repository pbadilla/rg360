import express from 'express';
import controller from '../controllers/films';

const router = express.Router();


router.post('/add', controller.addFilm);
router.get('/getAll', controller.getAllFilms);

export = router;
