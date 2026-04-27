import db from '../models/querrys.js';

export const getAll = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT p.*, g.nome AS genero
      FROM plantas p
      LEFT JOIN genero g ON p.id_genero = g.id
    `);

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};