
import { query } from '../db/connectPostgres.js';

const myFilmTable = 'films_lih226'
const myReviewTable = 'reviews_lih226'

const filmRoutes = (app) => {

//Accept JSON of title and body. Generate unique id and the current date & time on the server side. Missing field results in 404 error
app.post('/films', async (req, res, next) => {
  try {
    let title = req.body.title;
    let body = req.body.body;
 
    if(!title && !body){
      res.status(400).send("Missing title and body");
    }
    else if(!title){
      res.status(400).send("Missing title");
    }
    else if(!body){
      res.status(400).send("Missing body");
    }
    else{
      //Create unique id number by getting the max id value, and adding it by 1 to create an unique id
      //Reasoning is that when id are deleted, it can be in between other id values so counting the number of ids wouldn't be good for unique id
      //Using a counter resets after refreshes / using a new device.
      //Unless I store the counter in the database (which I can't since it's a pre-build database), this is the best option I can think of
      let maxIDQuery = `SELECT MAX(film_id) FROM ${myFilmTable}`;
      //Get the max value from the first (and only) row of the max query
      let numFilm = await query(maxIDQuery).then(data => {return data.rows[0].max}) + 1
      
      let qs = `INSERT INTO ${myFilmTable} (film_id, title, body, date) VALUES('${numFilm}', '${title}', '${body}', CURRENT_TIMESTAMP)`;
      query(qs).then(result => res.status(201).send('Success'))
    }
  } catch (err) {
    next(err);
  }
});

//Return JSON of all films
app.get('/films', async(req, res, next) => {
  const search_Query = req.query.search
  try {
    if(search_Query){
      let qs = `SELECT * FROM ${myFilmTable} WHERE (title LIKE '%${search_Query}%' OR body LIKE '%${search_Query}%')`
      query(qs).then(data => res.json(data.rows))
    }
    else{
      let qs = `SELECT * FROM ${myFilmTable}`
      query(qs).then(data => res.json(data.rows))
    }
  } catch (err) {
    next(err);
  }
});

//Return JSON of film with film_id
app.get('/films/:film_id', async(req, res, next) => {
  try {
    let jsonList = {}
    let film_id = parseInt(req.params.film_id)
    let qs = `SELECT * FROM ${myFilmTable} WHERE film_id = '${film_id}'`
    query(qs).then(data => {
      if(data.rowCount == 1){
        jsonList.film = data.rows
        let qs2 = `SELECT * FROM ${myReviewTable} WHERE film_id = '${film_id}'`
        query(qs2).then(data2 => {
          jsonList.reviews = data2.rows
          res.json(jsonList)
        })
      }
      else{
        res.status(404).send(`Film ${film_id} not found`)
      }
    })
  } catch (err) {
    next(err);
  }
});

//Accept JSON of title and/or body to update
app.put('/films/:film_id', async (req, res, next) => {
  try {
    let film_id = parseInt(req.params.film_id)
    let title = req.body.title;
    let body = req.body.body;
    let qs = `UPDATE ${myFilmTable} SET `
    
    if(!title && !body){
      res.status(400).send("Missing title and body")
    }
    else{
      if(title){
        qs += `title = '${title}',`
      }
      if(body){
        qs += `body = '${body}',`
      }
      //If there's any title, body updates, qs will have a comma as its last char so perform the update
      if(qs.charAt(qs.length - 1) == ','){
        qs = qs.slice(0, -1)
        qs += `WHERE film_id = '${film_id}'`
        query(qs).then(data => {
          if(data.rowCount == 1){
            query(qs).then(res.status(201).send('Success'))
          }
          //If film_id not found, create the new film with the title and body
          else if(!title){
            res.status(400).send("Missing title");
          }
          else if(!body){
            res.status(400).send("Missing body");
          }
          else{
            let qs = `INSERT INTO ${myFilmTable} (film_id, title, body, date) VALUES('${film_id}', '${title}', '${body}', CURRENT_TIMESTAMP)`;
            query(qs).then(res.status(201).send('Success'))
          }
        })
      }
    }
  } catch (err) {
    next(err);
  }
});

//Delete film with film_id
app.delete('/films/:film_id', async(req, res, next) => {
  try {
    let film_id = parseInt(req.params.film_id)
    let qs = `DELETE FROM ${myFilmTable} WHERE film_id = '${film_id}'`
    query(qs).then(data => {
      if(data.rowCount == 1){
        query(qs).then(() => {
          qs = `DELETE FROM ${myReviewTable} WHERE film_id = '${film_id}'`
          query(qs).then(res.status(201).send('Success'))
        })
      }
      else{
        res.status(404).send(`Film ${film_id} not found`)
      }
    })
  } catch (err) {
    next(err);
  }
});








//Accept JSON of title and body and param of film_id. Generate unique review id and the current date & time on the server side. Missing field results in 404 error
app.post('/films/:film_id/reviews', async (req, res, next) => {
  try {
    let film_id = parseInt(req.params.film_id)
    let title = req.body.title;
    let body = req.body.body;

    let qs = `SELECT * FROM ${myFilmTable} WHERE film_id = '${film_id}'`
    query(qs).then(async data => {
      //Check if there exists film_id
      if(data.rowCount == 1){
        if(!title && !body){
          res.status(400).send("Missing title and body");
        }
        else if(!title){
          res.status(400).send("Missing title");
        }
        else if(!body){
          res.status(400).send("Missing body");
        }
        else{
          //Create unique id number by getting the max id value, and adding it by 1 to create an unique id
          //Reasoning is that when id are deleted, it can be in between other id values so counting the number of ids wouldn't be good for unique id
          //Using a counter resets after refreshes / using a new device.
          //Unless I store the counter in the database (which I can't since it's a pre-build database), this is the best option I can think of
          let maxIDQuery = `SELECT MAX(review_id) FROM ${myReviewTable}`;
          //Get the max value from the first (and only) row of the max query
          let numReview = await query(maxIDQuery).then(data => {return data.rows[0].max}) + 1
          
          let qs = `INSERT INTO ${myReviewTable} (review_id, film_id, title, body, date) VALUES('${numReview}', '${film_id}', '${title}', '${body}', CURRENT_TIMESTAMP)`;
          query(qs).then(result => res.status(201).send('Success'))
        }
      }
      else{
        res.status(404).send(`Film ${film_id} not found`)
      }
    })
 
  } catch (err) {
    next(err);
  }
});

//Return JSON of all reviews for film_id
app.get('/films/:film_id/reviews', async(req, res, next) => {
  const search_Query = req.query.search
  try {
    let film_id = parseInt(req.params.film_id)
    if(search_Query){
      let qs = `SELECT * FROM ${myReviewTable} WHERE film_id = '${film_id}' AND (title LIKE '%${search_Query}%' OR body LIKE '%${search_Query}%')`
      query(qs).then(data => res.json(data.rows))
    }
    else{
      let film_id = parseInt(req.params.film_id)
      let qs = `SELECT * FROM ${myReviewTable} WHERE film_id = '${film_id}'`
      query(qs).then(data => res.json(data.rows))
    }
  } catch (err) {
    next(err);
  }
});

//Return JSON of review with review_id on the film with film_id
app.get('/films/:film_id/reviews/:review_id', async(req, res, next) => {
  try {
    let film_id = parseInt(req.params.film_id)
    let review_id = parseInt(req.params.review_id)
    let qs = `SELECT * FROM ${myReviewTable} WHERE film_id = '${film_id}' AND review_id = '${review_id}'`
    query(qs).then(data => {
      if(data.rowCount == 1){
        res.json(data.rows)
      }
      else{
        res.status(404).send(`Review ${review_id} on the film ${film_id} not found`)
      }
    })
  } catch (err) {
    next(err);
  }
});

//Accept JSON of title and/or body to update
app.put('/films/:film_id/reviews/:review_id', async (req, res, next) => {
  try {
    let film_id = parseInt(req.params.film_id)
    let review_id = parseInt(req.params.review_id)
    let title = req.body.title;
    let body = req.body.body;
    let qs = `UPDATE ${myReviewTable} SET `
    
    if(!title && !body){
      res.status(400).send("Missing title and body ")
    }
    else{
      if(title){
        qs += `title = '${title}',`
      }
      if(body){
        qs += `body = '${body}',`
      }
      //If there's any title, body, or date updates, qs will have a comma as its last char so perform the update
      if(qs.charAt(qs.length - 1) == ','){
        qs = qs.slice(0, -1)
        qs += `WHERE film_id = '${film_id}' AND review_id = '${review_id}'`
        query(qs).then(data => {
          if(data.rowCount == 1){
            query(qs).then(res.status(201).send('Success'))
          }
          //If review at film not found, check if there's an existing review_id. If not, create the new review of the film with the title and body
          else{
            let qs2 = `SELECT * from ${myReviewTable} WHERE review_id = '${review_id}'`
            query(qs2).then(data => {
              //If the review_id isn't already used for a different film
              if(data.rowCount == 0){
                if(!title){
                  res.status(400).send("Missing title");
                }
                else if(!body){
                  res.status(400).send("Missing body");
                }
                else{
                  let qs = `INSERT INTO ${myReviewTable} (review_id, film_id, title, body, date) VALUES('${review_id}', '${film_id}', '${title}', '${body}', CURRENT_TIMESTAMP)`;
                  query(qs).then(res.status(201).send('Success'))
                }
              }
              //If the review_id is already used for a different film
              else{
                res.status(400).send(`Review ${review_id} already used for a different film`)
              }
            })
          }
        })
      }
    }
  } catch (err) {
    next(err);
  }
});

//Delete film with film_id
app.delete('/films/:film_id/reviews/:review_id', async(req, res, next) => {
  try {
    let film_id = parseInt(req.params.film_id)
    let review_id = parseInt(req.params.review_id)
    let qs = `DELETE FROM ${myReviewTable} WHERE film_id = '${film_id}' AND review_id = '${review_id}'`
    query(qs).then(data => {
      if(data.rowCount == 1){
        query(qs).then(result => res.send('Success'))
      }
      else{
        res.status(404).send(`Review ${review_id} on the film ${film_id} not found`)
      }
    })
  } catch (err) {
    next(err);
  }
});

}

export default filmRoutes