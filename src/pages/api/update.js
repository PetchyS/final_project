// pages/api/update.js

import { query } from '../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // 405 Method Not Allowed
  }

  const { Pet_id, Name_pet, Size, Types, Breeds, Gender, Hair, Vaccine, Vaccine_date, Disease } = req.body;

  if (!Pet_id) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  try {
    // ทำส่วนการอัปเดตข้อมูลในฐานข้อมูล (query จะต้องถูกปรับให้ตรงกับโครงสร้างของฐานข้อมูลของคุณ)
    const updateResult = await query(`
      UPDATE Pets
      SET 
        Name_pet = ?,
        Size = ?,
        Types = ?,
        Breeds = ?,
        Gender = ?,
        Hair = ?,
        Vaccine = ?,
        Vaccine_date = ?,
        Disease = ?
      WHERE Pet_id = ?
    `, [Name_pet, Size, Types, Breeds, Gender, Hair, Vaccine, Vaccine_date, Disease, Pet_id]);

    console.log('Data updated successfully');
    return res.status(200).json({ message: 'Data updated successfully' });
  } catch (error) {
    console.error('Error updating data:', error);
    return res.status(500).json({ error: 'Unable to update data' });
  }
}
