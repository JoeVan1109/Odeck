const dataMapper = require('../dataMapper.js');

const mainController = {
  homePage: async (req, res) => {
    try {
      const cards = await dataMapper.getAllCards();
      res.render('cardList', {
        cards,
        title: 'Liste des cartes'
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database :\n${error.message}`);
    }
  },

  cardPage: async (req, res) => {
    const targetID = Number(req.params.id);

    try {
      const card = await dataMapper.getCard(targetID);
      if (!card) {
        return res.status(404).send('La carte n\'existe pas');
      }

      res.status(200).render("detailCard", { card });
      
    } catch (error) {
      res.status(500).send(`Erreur côté serveur: ${error}`);
    }
  },

  

};

module.exports = mainController;
