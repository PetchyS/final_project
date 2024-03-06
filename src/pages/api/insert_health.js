// pages/api/insert.js

import { query } from "../lib/db";

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { Pet_id, Question_1, Question_2, Question_3, Question_4, Result_score } = req.body;

  if (!Pet_id || !Question_1 || !Question_2 || !Question_3 || !Question_4 || !Result_score) {
    return res.status(400).json({ message: 'All data are required' });
  }
  try {
    const results = await query('INSERT INTO pet_health (Pet_id, Question_1, Question_2, Question_3, Question_4, Result_score) VALUES (?, ?, ?, ?, ?, ?)', [ Pet_id, Question_1, Question_2, Question_3, Question_4, Result_score ]);
    res.status(201).json({ message: 'Data inserted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error inserting data into the database' });
  }
};
