 
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      channels: {
        Row: {
          api_key: string | null
          api_secret: string | null
          commission_rate: number | null
          created_at: string | null
          id: string
          last_sync: string | null
          name: string
          properties_count: number | null
          status: string
          sync_enabled: boolean | null
          type: string
          updated_at: string | null
        }
        Insert: {
          api_key?: string | null
          api_secret?: string | null
          commission_rate?: number | null
          created_at?: string | null
          id?: string
          last_sync?: string | null
          name: string
          properties_count?: number | null
          status?: string
          sync_enabled?: boolean | null
          type: string
          updated_at?: string | null
        }
        Update: {
          api_key?: string | null
          api_secret?: string | null
          commission_rate?: number | null
          created_at?: string | null
          id?: string
          last_sync?: string | null
          name?: string
          properties_count?: number | null
          status?: string
          sync_enabled?: boolean | null
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      housekeeping_tasks: {
        Row: {
          assigned_to: string | null
          checklist: Json | null
          completed_at: string | null
          created_at: string | null
          estimated_duration: number | null
          id: string
          notes: string | null
          priority: string
          property_id: string
          scheduled_date: string
          scheduled_time: string | null
          status: string
          task_type: string
          unit_id: string
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          checklist?: Json | null
          completed_at?: string | null
          created_at?: string | null
          estimated_duration?: number | null
          id?: string
          notes?: string | null
          priority?: string
          property_id: string
          scheduled_date: string
          scheduled_time?: string | null
          status?: string
          task_type?: string
          unit_id: string
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          checklist?: Json | null
          completed_at?: string | null
          created_at?: string | null
          estimated_duration?: number | null
          id?: string
          notes?: string | null
          priority?: string
          property_id?: string
          scheduled_date?: string
          scheduled_time?: string | null
          status?: string
          task_type?: string
          unit_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "housekeeping_tasks_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "housekeeping_tasks_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "housekeeping_tasks_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
        ]
      }
      logs: {
        Row: {
          action: string
          created_at: string | null
          details: Json | null
          entity_id: string | null
          entity_type: string
          id: string
          ip_address: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          details?: Json | null
          entity_id?: string | null
          entity_type: string
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          details?: Json | null
          entity_id?: string | null
          entity_type?: string
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      maintenance_tickets: {
        Row: {
          actual_cost: number | null
          assigned_to: string | null
          category: string
          completed_at: string | null
          created_at: string | null
          description: string
          estimated_cost: number | null
          id: string
          priority: string
          property_id: string
          reported_by: string | null
          scheduled_date: string | null
          status: string
          ticket_number: string
          title: string
          unit_id: string | null
          updated_at: string | null
        }
        Insert: {
          actual_cost?: number | null
          assigned_to?: string | null
          category: string
          completed_at?: string | null
          created_at?: string | null
          description: string
          estimated_cost?: number | null
          id?: string
          priority?: string
          property_id: string
          reported_by?: string | null
          scheduled_date?: string | null
          status?: string
          ticket_number: string
          title: string
          unit_id?: string | null
          updated_at?: string | null
        }
        Update: {
          actual_cost?: number | null
          assigned_to?: string | null
          category?: string
          completed_at?: string | null
          created_at?: string | null
          description?: string
          estimated_cost?: number | null
          id?: string
          priority?: string
          property_id?: string
          reported_by?: string | null
          scheduled_date?: string | null
          status?: string
          ticket_number?: string
          title?: string
          unit_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "maintenance_tickets_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maintenance_tickets_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maintenance_tickets_reported_by_fkey"
            columns: ["reported_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maintenance_tickets_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          channel: string
          created_at: string | null
          id: string
          message: string
          recipient_type: string
          replied_at: string | null
          reservation_id: string | null
          sender_email: string | null
          sender_name: string
          sender_type: string
          status: string
          subject: string | null
        }
        Insert: {
          channel?: string
          created_at?: string | null
          id?: string
          message: string
          recipient_type: string
          replied_at?: string | null
          reservation_id?: string | null
          sender_email?: string | null
          sender_name: string
          sender_type: string
          status?: string
          subject?: string | null
        }
        Update: {
          channel?: string
          created_at?: string | null
          id?: string
          message?: string
          recipient_type?: string
          replied_at?: string | null
          reservation_id?: string | null
          sender_email?: string | null
          sender_name?: string
          sender_type?: string
          status?: string
          subject?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_reservation_id_fkey"
            columns: ["reservation_id"]
            isOneToOne: false
            referencedRelation: "reservations"
            referencedColumns: ["id"]
          },
        ]
      }
      owners: {
        Row: {
          bank_account: string | null
          bank_name: string | null
          created_at: string | null
          email: string
          full_name: string
          iban: string | null
          id: string
          phone: string | null
          properties_count: number | null
          tax_id: string | null
          total_revenue: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          bank_account?: string | null
          bank_name?: string | null
          created_at?: string | null
          email: string
          full_name: string
          iban?: string | null
          id?: string
          phone?: string | null
          properties_count?: number | null
          tax_id?: string | null
          total_revenue?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          bank_account?: string | null
          bank_name?: string | null
          created_at?: string | null
          email?: string
          full_name?: string
          iban?: string | null
          id?: string
          phone?: string | null
          properties_count?: number | null
          tax_id?: string | null
          total_revenue?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "owners_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      properties: {
        Row: {
          address: string
          amenities: Json | null
          city: string
          country: string | null
          cover_image: string | null
          created_at: string | null
          description: string | null
          id: string
          manager_id: string | null
          name: string
          name_ar: string
          owner_id: string | null
          status: string
          total_units: number | null
          type: string
          updated_at: string | null
        }
        Insert: {
          address: string
          amenities?: Json | null
          city: string
          country?: string | null
          cover_image?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          manager_id?: string | null
          name: string
          name_ar: string
          owner_id?: string | null
          status?: string
          total_units?: number | null
          type: string
          updated_at?: string | null
        }
        Update: {
          address?: string
          amenities?: Json | null
          city?: string
          country?: string | null
          cover_image?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          manager_id?: string | null
          name?: string
          name_ar?: string
          owner_id?: string | null
          status?: string
          total_units?: number | null
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "properties_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "properties_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      reservations: {
        Row: {
          channel: string
          check_in: string
          check_out: string
          commission_amount: number | null
          created_at: string | null
          guest_count: number
          guest_email: string
          guest_name: string
          guest_phone: string | null
          id: string
          nights: number
          notes: string | null
          paid_amount: number | null
          property_id: string
          reservation_code: string
          special_requests: string | null
          status: string
          total_amount: number
          unit_id: string
          updated_at: string | null
        }
        Insert: {
          channel?: string
          check_in: string
          check_out: string
          commission_amount?: number | null
          created_at?: string | null
          guest_count: number
          guest_email: string
          guest_name: string
          guest_phone?: string | null
          id?: string
          nights: number
          notes?: string | null
          paid_amount?: number | null
          property_id: string
          reservation_code: string
          special_requests?: string | null
          status?: string
          total_amount: number
          unit_id: string
          updated_at?: string | null
        }
        Update: {
          channel?: string
          check_in?: string
          check_out?: string
          commission_amount?: number | null
          created_at?: string | null
          guest_count?: number
          guest_email?: string
          guest_name?: string
          guest_phone?: string | null
          id?: string
          nights?: number
          notes?: string | null
          paid_amount?: number | null
          property_id?: string
          reservation_code?: string
          special_requests?: string | null
          status?: string
          total_amount?: number
          unit_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reservations_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reservations_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          name_ar: string
          permissions: Json
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          name_ar: string
          permissions?: Json
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          name_ar?: string
          permissions?: Json
          updated_at?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          auto_renew: boolean | null
          billing_cycle: string
          created_at: string | null
          end_date: string | null
          id: string
          plan_name: string
          price_monthly: number
          properties_limit: number | null
          start_date: string
          status: string
          units_limit: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          auto_renew?: boolean | null
          billing_cycle?: string
          created_at?: string | null
          end_date?: string | null
          id?: string
          plan_name: string
          price_monthly: number
          properties_limit?: number | null
          start_date: string
          status?: string
          units_limit?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          auto_renew?: boolean | null
          billing_cycle?: string
          created_at?: string | null
          end_date?: string | null
          id?: string
          plan_name?: string
          price_monthly?: number
          properties_limit?: number | null
          start_date?: string
          status?: string
          units_limit?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          amount: number
          created_at: string | null
          currency: string | null
          description: string | null
          id: string
          owner_id: string | null
          payment_method: string | null
          processed_at: string | null
          property_id: string | null
          reservation_id: string | null
          status: string
          transaction_code: string
          type: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          currency?: string | null
          description?: string | null
          id?: string
          owner_id?: string | null
          payment_method?: string | null
          processed_at?: string | null
          property_id?: string | null
          reservation_id?: string | null
          status?: string
          transaction_code: string
          type: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          currency?: string | null
          description?: string | null
          id?: string
          owner_id?: string | null
          payment_method?: string | null
          processed_at?: string | null
          property_id?: string | null
          reservation_id?: string | null
          status?: string
          transaction_code?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "owners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_reservation_id_fkey"
            columns: ["reservation_id"]
            isOneToOne: false
            referencedRelation: "reservations"
            referencedColumns: ["id"]
          },
        ]
      }
      units: {
        Row: {
          amenities: Json | null
          bathrooms: number
          bedrooms: number
          cleaning_fee: number | null
          created_at: string | null
          floor: number | null
          id: string
          images: Json | null
          max_guests: number
          name: string
          price_per_night: number
          property_id: string
          size_sqm: number | null
          status: string
          type: string
          unit_number: string
          updated_at: string | null
        }
        Insert: {
          amenities?: Json | null
          bathrooms: number
          bedrooms: number
          cleaning_fee?: number | null
          created_at?: string | null
          floor?: number | null
          id?: string
          images?: Json | null
          max_guests: number
          name: string
          price_per_night: number
          property_id: string
          size_sqm?: number | null
          status?: string
          type: string
          unit_number: string
          updated_at?: string | null
        }
        Update: {
          amenities?: Json | null
          bathrooms?: number
          bedrooms?: number
          cleaning_fee?: number | null
          created_at?: string | null
          floor?: number | null
          id?: string
          images?: Json | null
          max_guests?: number
          name?: string
          price_per_night?: number
          property_id?: string
          size_sqm?: number | null
          status?: string
          type?: string
          unit_number?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "units_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          company: string | null
          created_at: string | null
          email: string
          full_name: string
          id: string
          last_login: string | null
          phone: string | null
          role: string
          status: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          company?: string | null
          created_at?: string | null
          email: string
          full_name: string
          id?: string
          last_login?: string | null
          phone?: string | null
          role?: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          company?: string | null
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          last_login?: string | null
          phone?: string | null
          role?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
