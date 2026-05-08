import { supabase, User, UserRole, UserStatus } from '@/lib/supabase';

export class UsersService {
  // Get all users
  static async getAll() {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  // Get user by ID
  static async getById(id: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }

  // Get user by email
  static async getByEmail(email: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    
    if (error) throw error;
    return data;
  }

  // Get users by role
  static async getByRole(role: UserRole) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('role', role)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  // Create user
  static async create(user: Omit<User, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('users')
      .insert(user)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  // Update user
  static async update(id: string, updates: Partial<User>) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  // Delete user
  static async delete(id: string) {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  // Update user status
  static async updateStatus(id: string, status: UserStatus) {
    return this.update(id, { status });
  }

  // Update last login
  static async updateLastLogin(id: string) {
    return this.update(id, { last_login: new Date().toISOString() });
  }

  // Get active users count
  static async getActiveCount() {
    const { count, error } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active');
    
    if (error) throw error;
    return count;
  }
}