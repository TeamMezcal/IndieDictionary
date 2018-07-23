const express = require ('express') //
// We create our own server named app
// Express server handling requests and responses
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

require('./configs/db.config');


app.use(express.static(path.join(__dirname, 'public')));



