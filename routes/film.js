
import { query } from '../db/connectPostgres.js';

const myFilmTable = 'films_mao523'
const myReviewTable = 'reviews_mao523'

const filmRoutes = (app) => {

  /* GET URL Path /film/. */
app.get('/films', async(req, res, next) => {
  try {
    let qs = `SELECT * FROM ${myFilmTable}`
    query(qs).then(data => res.json(data.rows))
  } catch (err) {
    next(err);
  }
});

app.post('/films', async (req, res, next) => {
  try {
    res.send('Working on it')
  } catch (err) {
    next(err);
  }
});

}



export default filmRoutes