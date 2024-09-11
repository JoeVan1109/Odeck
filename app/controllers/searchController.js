const dataMapper = require('../dataMapper.js');


const searchController = {
  searchPage: async (req, res) => {

    try {
      console.log(dataMapper);
      const searchForm = await dataMapper.getSearchForm();

      res.status(200).render("search", { searchForm });

    } catch (error) {
      res.status(500).send(`Erreur côté serveur: ${error}`);
    }
    
  },

  searchCard: async (req, res) => {
    
    try {
      
      const searchElement = req.query.element;
      
      if (!searchElement) {
        return res.status(400).send('Veuillez sélectionner l\'élément de la carte recherchée');
      }
      const card = await dataMapper.searchCardByElement(searchElement);

      res.status(200).render("searchCard", { card });
      
    } catch (error) {
      res.status(500).send(`Erreur côté serveur: ${error}`);
    }
  },
};

module.exports = searchController;