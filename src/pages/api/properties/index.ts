import type { NextApiRequest, NextApiResponse } from 'next';
import { PropertiesService } from '@/services/properties.service';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case 'GET':
        const properties = await PropertiesService.getAll();
        return res.status(200).json(properties);

      case 'POST':
        const newProperty = await PropertiesService.create(req.body);
        return res.status(201).json(newProperty);

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error: any) {
    console.error('API Error:', error);
    return res.status(500).json({ error: error.message });
  }
}