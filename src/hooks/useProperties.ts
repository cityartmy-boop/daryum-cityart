import { useState, useEffect } from 'react';
import { PropertiesService } from '@/services/properties.service';
import { Property } from '@/lib/supabase';

export function useProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const data = await PropertiesService.getAll();
      setProperties(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createProperty = async (property: Omit<Property, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const newProperty = await PropertiesService.create(property);
      setProperties([newProperty, ...properties]);
      return newProperty;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const updateProperty = async (id: string, updates: Partial<Property>) => {
    try {
      const updated = await PropertiesService.update(id, updates);
      setProperties(properties.map(p => p.id === id ? updated : p));
      return updated;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const deleteProperty = async (id: string) => {
    try {
      await PropertiesService.delete(id);
      setProperties(properties.filter(p => p.id !== id));
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  return {
    properties,
    loading,
    error,
    refresh: fetchProperties,
    create: createProperty,
    update: updateProperty,
    delete: deleteProperty,
  };
}

export function useProperty(id: string) {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchProperty();
    }
  }, [id]);

  const fetchProperty = async () => {
    try {
      setLoading(true);
      const data = await PropertiesService.getById(id);
      setProperty(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { property, loading, error, refresh: fetchProperty };
}