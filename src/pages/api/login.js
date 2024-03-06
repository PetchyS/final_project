// pages/api/login.js
import { query } from '../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // ดึงข้อมูลจาก req.body
  const { Email, Password } = req.body;

  try {
    // ทำการ query เพื่อตรวจสอบข้อมูลการล็อกอิน
    const results = await query(
      'SELECT * FROM members WHERE Email = ? AND Password = ?',
      [Email, Password]
    );

    if (results.length > 0) {
        const user = results[0];

      // ถ้าพบข้อมูลผู้ใช้ในฐานข้อมูล
      res.setHeader('Location', '/test2')
      res.status(200).json({ message: 'Login successful', user: { User_id: user.User_id, Role: user.Role }  });
    } else {
      // ถ้าไม่พบข้อมูลผู้ใช้ในฐานข้อมูล
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error querying database:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
