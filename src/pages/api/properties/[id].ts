import type { NextApiRequest, NextApiResponse } from 'next';
import { PropertiesService } from '@/services/properties.service';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid property ID' });
  }

  try {
    switch (req.method) {
      case 'GET':
        const property = await PropertiesService.getById(id);
        return res.status(200).json(property);

      case 'PUT':
      case 'PATCH':
        const updated = await PropertiesService.update(id, req.body);
        return res.status(200).json(updated);

      case 'DELETE':
        await PropertiesService.delete(id);
        return res.status(204).end();

      default:
        res.setHeader('Allow', ['GET', 'PUT', 'PATCH', 'DELETE']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error: any) {
    console.error('API Error:', error);
    return res.status(500).json({ error: error.message });
  }
}