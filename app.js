const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

// app.get('/beers', (req, res) => {
//   res.render('check-beers');
// });


app.all("/beers", async (req, res) => {
  try {
    const beers = await punkAPI.getBeers()
    res.render("beers", {beers})
  }
  catch (err) {
    res.send(err)
  }
})

app.all("/random-beer", async (req, res) => {
  try {
    const randomBeer = await punkAPI.getRandom()
    console.log (randomBeer)
    res.render("random-beer", randomBeer[0])
  }
  catch (err) {
    res.send(err)
  }
})


app.listen(4000, () => console.log('🏃‍ on port 4000'));
