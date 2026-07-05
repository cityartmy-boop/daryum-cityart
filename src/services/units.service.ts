import { supabase, Unit, UnitType, UnitStatus } from '@/lib/supabase';

// Export Unit type for external use
export type { Unit, UnitType, UnitStatus };

// Convenience function for getting units with optional filters
export async function getUnits(filters?: { property_id?: string }): Promise<Unit[]> {
  if (filters?.property_id) {
    return UnitsService.getByProperty(filters.property_id);
  }
  return UnitsService.getAll();
}

export class UnitsService {
  // Get all units
  static async getAll() {
    const { data, error } = await supabase
      .from('units')
      .select('*, properties(name)')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  // Get unit by ID
  static async getById(id: string) {
    const { data, error } = await supabase
      .from('units')
      .select('*, properties(name, address)')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }

  // Get units by property
  static async getByProperty(propertyId: string) {
    const { data, error } = await supabase
      .from('units')
      .select('*')
      .eq('property_id', propertyId)
      .order('unit_number', { ascending: true });
    
    if (error) throw error;
    return data;
  }

  // Get units by owner
  static async getByOwner(ownerId: string) {
    const { data, error } = await supabase
      .from('units')
      .select('*, properties(name)')
      .eq('owner_id', ownerId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  // Create unit
  static async create(unit: Omit<Unit, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('units')
      .insert(unit)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  // Update unit
  static async update(id: string, updates: Partial<Unit>) {
    const { data, error } = await supabase
      .from('units')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  // Delete unit
  static async delete(id: string) {
    const { error } = await supabase
      .from('units')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  // Update unit status
  static async updateStatus(id: string, status: UnitStatus) {
    return this.update(id, { status });
  }

  // Get available units
  static async getAvailable(propertyId?: string) {
    let query = supabase
      .from('units')
      .select('*, properties(name)')
      .eq('status', 'available');
    
    if (propertyId) {
      query = query.eq('property_id', propertyId);
    }
    
    const { data, error } = await query;
    if (error) throw error;
    return data;
  }
}