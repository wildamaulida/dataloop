import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import db from '../db'; // Assuming there's a db connection file

const router = Router();

// Utility for email validation
const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// POST /register API
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // 1. Validate Input
    if (!name || name.trim() === '') {
      res.status(400).json({ error: 'Name is required' });
      return;
    }
    if (!email || !isValidEmail(email)) {
      res.status(400).json({ error: 'A valid email is required' });
      return;
    }
    if (!password || password.length < 6) {
      res.status(400).json({ error: 'Password must be at least 6 characters long' });
      return;
    }

    // 2. Hash Password (Bcrypt)
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 3. Save User to Database (MySQL)
    const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
    
    // Using callback/promise style query (assuming mysql2/promise)
    // We try to insert and catch duplicate email (MySQL Error 1062)
    const [result] = await db.execute(query, [name.trim(), email.trim(), hashedPassword]);

    // 4. Return Success Message
    res.status(201).json({
      message: 'User registered successfully',
      userId: (result as any).insertId
    });
  } catch (error: any) {
    console.error('Registration Error:', error);
    
    // Handle duplicate email error
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(409).json({ error: 'Email is already registered' });
      return;
    }

    // Handle Server Error
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
