// pages/api/insert.js

import { query } from "../lib/db";

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { Pet_id, Question_first, Question_second, Question_third, Question_fourth, Result } = req.body;

  if (!Pet_id || !Question_first || !Question_second || !Question_third || !Question_fourth || !Result ) {
    return res.status(400).json({ message: 'Name, phoneNumber, address, age, and height are required' });
  }

  try {
    const results = await query('INSERT INTO test (Pet_id, Question_first, Question_second, Question_third, Question_fourth, Result) VALUES (?, ?, ?, ?, ?, ?)', [Pet_id, Question_first, Question_second, Question_third, Question_fourth, Result]);
    res.status(201).json({ message: 'Data inserted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error inserting data into the database' });
  }
};
