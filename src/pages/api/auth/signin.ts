import type { NextApiRequest, NextApiResponse } from 'next';
import { AuthService } from '@/services/auth.service';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const data = await AuthService.signIn(email, password);
    return res.status(200).json(data);
  } catch (error: any) {
    console.error('Sign in error:', error);
    return res.status(401).json({ error: error.message });
  }
}