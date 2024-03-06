
import { query } from "../lib/db";

export default async (req, res) => {
  try {
    const results = await query('SELECT * FROM pet_health'); // เปลี่ยน users เป็นชื่อตารางของคุณ
    // console.log('Results from query:', results); // เพิ่มบรรทัดนี้
    res.json(results);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Error fetching data from the database' });
  }
};
