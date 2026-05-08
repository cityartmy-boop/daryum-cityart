import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: User;
        Insert: Omit<User, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<User, 'id'>>;
      };
      properties: {
        Row: Property;
        Insert: Omit<Property, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Property, 'id'>>;
      };
      units: {
        Row: Unit;
        Insert: Omit<Unit, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Unit, 'id'>>;
      };
      reservations: {
        Row: Reservation;
        Insert: Omit<Reservation, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Reservation, 'id'>>;
      };
      owners: {
        Row: Owner;
        Insert: Omit<Owner, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Owner, 'id'>>;
      };
      transactions: {
        Row: Transaction;
        Insert: Omit<Transaction, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Transaction, 'id'>>;
      };
    };
  };
}

// Type Definitions
export type UserRole = 'admin' | 'property_manager' | 'owner' | 'accountant' | 'housekeeping_supervisor' | 'cleaner' | 'maintenance';
export type UserStatus = 'active' | 'inactive' | 'suspended';
export type PropertyType = 'tower' | 'building' | 'suite' | 'apartment' | 'villa' | 'compound';
export type PropertyStatus = 'active' | 'inactive' | 'maintenance';
export type UnitType = 'studio' | 'one_bedroom' | 'two_bedroom' | 'three_bedroom' | 'penthouse' | 'villa';
export type UnitStatus = 'available' | 'occupied' | 'cleaning' | 'maintenance' | 'blocked';
export type ReservationStatus = 'pending' | 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled';
export type ChannelType = 'airbnb' | 'booking_com' | 'agoda' | 'vrbo' | 'expedia' | 'direct';
export type TransactionType = 'revenue' | 'commission' | 'payout' | 'expense' | 'refund';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: UserRole;
  status: UserStatus;
  avatar_url?: string;
  language?: string;
  timezone?: string;
  created_at: string;
  updated_at: string;
  last_login?: string;
  metadata?: Record<string, any>;
}

export interface Property {
  id: string;
  name: string;
  name_ar?: string;
  type: PropertyType;
  status: PropertyStatus;
  address: string;
  city: string;
  country: string;
  postal_code?: string;
  latitude?: number;
  longitude?: number;
  description?: string;
  description_ar?: string;
  cover_image?: string;
  images?: string[];
  owner_id?: string;
  manager_id?: string;
  unit_count: number;
  created_by?: string;
  created_at: string;
  updated_at: string;
  metadata?: Record<string, any>;
}

export interface Unit {
  id: string;
  property_id: string;
  name: string;
  unit_number: string;
  type: UnitType;
  status: UnitStatus;
  floor?: number;
  size_sqm?: number;
  bedrooms?: number;
  bathrooms?: number;
  max_guests?: number;
  base_price: number;
  currency: string;
  description?: string;
  description_ar?: string;
  amenities?: string[];
  images?: string[];
  owner_id?: string;
  created_at: string;
  updated_at: string;
  metadata?: Record<string, any>;
}

export interface Reservation {
  id: string;
  unit_id: string;
  property_id: string;
  guest_name: string;
  guest_email?: string;
  guest_phone?: string;
  guest_country?: string;
  check_in: string;
  check_out: string;
  nights: number;
  adults: number;
  children: number;
  status: ReservationStatus;
  channel: ChannelType;
  channel_booking_id?: string;
  total_amount: number;
  currency: string;
  commission?: number;
  net_amount?: number;
  notes?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
  metadata?: Record<string, any>;
}

export interface Owner {
  id: string;
  user_id?: string;
  name: string;
  email: string;
  phone?: string;
  company_name?: string;
  tax_id?: string;
  bank_name?: string;
  bank_account?: string;
  iban?: string;
  commission_rate: number;
  payment_frequency: number;
  notes?: string;
  created_at: string;
  updated_at: string;
  metadata?: Record<string, any>;
}

export interface Transaction {
  id: string;
  transaction_number: string;
  type: TransactionType;
  amount: number;
  currency: string;
  vat_amount: number;
  description: string;
  property_id?: string;
  unit_id?: string;
  reservation_id?: string;
  owner_id?: string;
  payment_method?: string;
  payment_status: PaymentStatus;
  payment_date?: string;
  channel?: ChannelType;
  reference_number?: string;
  notes?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
  metadata?: Record<string, any>;
}

// Helper function to handle Supabase errors
export const handleSupabaseError = (error: any) => {
  console.error('Supabase error:', error);
  return {
    error: error.message || 'An unexpected error occurred',
    details: error.details || null,
  };
};