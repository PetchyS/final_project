import { query } from "../lib/db";

export default async (req, res) => {
  try {
    const resultsPets = await query('SELECT * FROM pets');
    const resultsPetHealth = await query('SELECT * FROM pet_health');
    const resultsMember = await query('SELECT * FROM members');

    const combinedResults = {
      pets: resultsPets,
      pet_health: resultsPetHealth,
      members: resultsMember
    };

    res.json(combinedResults);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Error fetching data from the database' });
  }
};
