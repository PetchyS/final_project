// pages/api/db.js
import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  port:'8080',
  database: 'serve_animals'
};

export const query = async (sql, values) => {
  const connection = await mysql.createConnection(dbConfig);

  try {
    const [results] = await connection.execute(sql, values);
    return results;
  } catch (error) {
    console.error('Error executing SQL query:', error.message);
    throw new Error('Failed to execute SQL query');
  } finally {
    await connection.end();
  }
};
