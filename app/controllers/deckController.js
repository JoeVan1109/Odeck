const dataMapper = require('../dataMapper.js');

const deckController = {

    deckCardPage: async (req, res) => {

        try {

            const card = req.session.card || [];
            res.status(200).render("deck", { card });

        } catch (error) {
            res.status(500).send(`Erreur côté serveur: ${error}`);
        }
    },

    addCard: async (req, res) => {
        const targetId = Number(req.params.id);

        if (!req.session.card) {
            req.session.card = [];
        }

        const checkCard = req.session.card.find((card) => card.id === targetId);

        if (req.session.card.length >= 5) {
            return res.status(400).render ("deck", { card: req.session.card });
        }


        if (!checkCard) {
            try {
                const newCard = await dataMapper.addCard(targetId);
                req.session.card.push(newCard);
            } catch (error) {
                res.status(500).send(`Erreur côté serveur: ${error}`);
            }
        }

        res.status(200).render("deck", { card: req.session.card });
    },

    deleteCard: async (req, res) => {
        const targetId = Number(req.params.id);

        if (req.session.card) {

            // filter garde toutes les cards qui ne correspondent pas à targetId
            //(targetId c'est la card cliquée pour être supprimée)
            req.session.card = req.session.card.filter(card => Number(card.id) !== targetId);
        }

        res.redirect(`/deck`);
    }
};

module.exports = deckController;