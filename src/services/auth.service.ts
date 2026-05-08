import { supabase } from '@/lib/supabase';

export class AuthService {
  // Sign up
  static async signUp(email: string, password: string, userData: any) {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;

    // Create user record
    const { data: user, error: userError } = await supabase
      .from('users')
      .insert({
        id: authData.user?.id,
        email,
        ...userData,
      })
      .select()
      .single();

    if (userError) throw userError;

    return { user, auth: authData };
  }

  // Sign in
  static async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // Update last login
    await supabase
      .from('users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', data.user?.id);

    return data;
  }

  // Sign out
  static async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  // Get current user
  static async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) throw error;
    if (!user) return null;

    // Get full user data
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (userError) throw userError;
    return userData;
  }

  // Reset password
  static async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    
    if (error) throw error;
  }

  // Update password
  static async updatePassword(newPassword: string) {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    
    if (error) throw error;
  }

  // Check if user is authenticated
  static async isAuthenticated() {
    const { data: { session } } = await supabase.auth.getSession();
    return !!session;
  }

  // Get session
  static async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  }
}