const dotenv = require('dotenv');
const express = require('express');
const cookieParser = require("cookie-parser");
const session = require("express-session");
dotenv.config();

const router = require('./app/router');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'app/views');

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(
  session({
    secret: "keyboard cat", // On va entrer une string sur laquelle notre token va se créer
    resave: true, // Ajout d'une sauvegarde automatique à chaque requête réussie
    saveUninitialized: true, // Création d'une session sans information au préalable
    cookie: {
      secure: false, // Si notre site n'utilise pas HTTPS, on peut utiliser le système de cookie
      maxAge: 1000 * 60 * 60, // On définit le temps d'une session (en millisecondes)
    },
  })
);

app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
