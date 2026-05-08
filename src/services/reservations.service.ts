import { supabase, Reservation, ReservationStatus, ChannelType } from '@/lib/supabase';

export class ReservationsService {
  // Get all reservations
  static async getAll() {
    const { data, error } = await supabase
      .from('reservations')
      .select(`
        *,
        units(name, unit_number),
        properties(name)
      `)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  // Get reservation by ID
  static async getById(id: string) {
    const { data, error } = await supabase
      .from('reservations')
      .select(`
        *,
        units(name, unit_number, base_price),
        properties(name, address)
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }

  // Get reservations by property
  static async getByProperty(propertyId: string) {
    const { data, error } = await supabase
      .from('reservations')
      .select(`
        *,
        units(name, unit_number)
      `)
      .eq('property_id', propertyId)
      .order('check_in', { ascending: true });
    
    if (error) throw error;
    return data;
  }

  // Get reservations by unit
  static async getByUnit(unitId: string) {
    const { data, error } = await supabase
      .from('reservations')
      .select('*')
      .eq('unit_id', unitId)
      .order('check_in', { ascending: true });
    
    if (error) throw error;
    return data;
  }

  // Get upcoming reservations
  static async getUpcoming() {
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase
      .from('reservations')
      .select(`
        *,
        units(name, unit_number),
        properties(name)
      `)
      .gte('check_in', today)
      .order('check_in', { ascending: true });
    
    if (error) throw error;
    return data;
  }

  // Get reservations by date range
  static async getByDateRange(startDate: string, endDate: string) {
    const { data, error } = await supabase
      .from('reservations')
      .select(`
        *,
        units(name, unit_number),
        properties(name)
      `)
      .gte('check_in', startDate)
      .lte('check_out', endDate)
      .order('check_in', { ascending: true });
    
    if (error) throw error;
    return data;
  }

  // Create reservation
  static async create(reservation: Omit<Reservation, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('reservations')
      .insert(reservation)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  // Update reservation
  static async update(id: string, updates: Partial<Reservation>) {
    const { data, error } = await supabase
      .from('reservations')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  // Delete reservation
  static async delete(id: string) {
    const { error } = await supabase
      .from('reservations')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  // Update reservation status
  static async updateStatus(id: string, status: ReservationStatus) {
    return this.update(id, { status });
  }

  // Get check-ins for today
  static async getTodayCheckIns() {
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase
      .from('reservations')
      .select(`
        *,
        units(name, unit_number),
        properties(name)
      `)
      .eq('check_in', today)
      .order('check_in', { ascending: true });
    
    if (error) throw error;
    return data;
  }

  // Get check-outs for today
  static async getTodayCheckOuts() {
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase
      .from('reservations')
      .select(`
        *,
        units(name, unit_number),
        properties(name)
      `)
      .eq('check_out', today)
      .order('check_out', { ascending: true });
    
    if (error) throw error;
    return data;
  }
}