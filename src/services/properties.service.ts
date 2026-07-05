import { supabase, Property, PropertyType, PropertyStatus } from '@/lib/supabase';

// Export Property type for external use
export type { Property, PropertyType, PropertyStatus };

// Convenience function for getting properties
export async function getProperties(): Promise<Property[]> {
  return PropertiesService.getAll();
}

export class PropertiesService {
  // Get all properties
  static async getAll() {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  // Get property by ID
  static async getById(id: string) {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }

  // Get properties by owner
  static async getByOwner(ownerId: string) {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('owner_id', ownerId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  // Get properties by manager
  static async getByManager(managerId: string) {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('manager_id', managerId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  // Create property
  static async create(property: Omit<Property, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('properties')
      .insert(property)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  // Update property
  static async update(id: string, updates: Partial<Property>) {
    const { data, error } = await supabase
      .from('properties')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  // Delete property
  static async delete(id: string) {
    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  // Get properties with unit counts
  static async getWithStats() {
    const { data, error } = await supabase
      .from('properties')
      .select(`
        *,
        units(count)
      `);
    
    if (error) throw error;
    return data;
  }
}