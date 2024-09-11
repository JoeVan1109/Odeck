

const database = require('../database');

const dataMapper = {
  async getAllCards() {
    const query = "SELECT * FROM card";
    const result = await database.query(query);
    return result.rows;
  },

  async getCard(cardId) {
    const sql = `SELECT * FROM card WHERE id = ${cardId}`;
    const result = await database.query(sql);
    return result.rows[0];
  },

  async getSearchForm() {
    const query = "SELECT DISTINCT element FROM card";
    const result = await database.query(query);
    return result.rows;
  },

  async searchCardByElement(element) {
    const sql = {
      text: `SELECT * FROM card WHERE element = $1;`,
      values: [element],
    };
  
    const result = await database.query(sql);
    return result.rows;
  },

  async addCard(cardId) {
    const sql = `SELECT * FROM card WHERE id = ${cardId}`;

    const result = await database.query(sql);

    return result.rows[0];
  }
};


module.exports = dataMapper;
