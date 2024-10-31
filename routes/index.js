
const indexRoutes = (app) => {
/* GET home page. */
app.get('/', (req, res, next) => {
  res.render('index', { title: 'Front Page' });
});
}

export default indexRoutes