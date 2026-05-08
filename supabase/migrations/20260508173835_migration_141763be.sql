-- ============================================================================
-- DARYUM PROPTECH PLATFORM - COMPLETE DATABASE SCHEMA
-- Saudi Property Management System
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 1. USERS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'property_manager',
  status TEXT NOT NULL DEFAULT 'active',
  company TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ,
  CONSTRAINT users_role_check CHECK (role IN (
    'admin', 
    'property_manager', 
    'owner', 
    'accountant', 
    'housekeeping_supervisor', 
    'cleaner', 
    'maintenance'
  )),
  CONSTRAINT users_status_check CHECK (status IN ('active', 'inactive', 'suspended'))
);

-- ============================================================================
-- 2. ROLES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  name_ar TEXT NOT NULL,
  description TEXT,
  permissions JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 3. PROPERTIES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  country TEXT DEFAULT 'Saudi Arabia',
  owner_id UUID REFERENCES users(id) ON DELETE SET NULL,
  manager_id UUID REFERENCES users(id) ON DELETE SET NULL,
  total_units INTEGER DEFAULT 0,
  cover_image TEXT,
  description TEXT,
  amenities JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT properties_type_check CHECK (type IN (
    'apartment', 
    'villa', 
    'hotel', 
    'resort', 
    'serviced_apartment'
  )),
  CONSTRAINT properties_status_check CHECK (status IN ('active', 'inactive', 'maintenance'))
);

-- ============================================================================
-- 4. UNITS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS units (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  unit_number TEXT NOT NULL,
  type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'available',
  floor INTEGER,
  bedrooms INTEGER NOT NULL,
  bathrooms INTEGER NOT NULL,
  size_sqm DECIMAL(10,2),
  price_per_night DECIMAL(10,2) NOT NULL,
  cleaning_fee DECIMAL(10,2) DEFAULT 0,
  max_guests INTEGER NOT NULL,
  amenities JSONB DEFAULT '[]',
  images JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT units_type_check CHECK (type IN (
    'studio', 
    '1br', 
    '2br', 
    '3br', 
    '4br', 
    'penthouse'
  )),
  CONSTRAINT units_status_check CHECK (status IN (
    'available', 
    'occupied', 
    'cleaning', 
    'maintenance', 
    'blocked'
  ))
);

-- ============================================================================
-- 5. RESERVATIONS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS reservations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reservation_code TEXT UNIQUE NOT NULL,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE NOT NULL,
  unit_id UUID REFERENCES units(id) ON DELETE CASCADE NOT NULL,
  guest_name TEXT NOT NULL,
  guest_email TEXT NOT NULL,
  guest_phone TEXT,
  guest_count INTEGER NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  nights INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'confirmed',
  channel TEXT NOT NULL DEFAULT 'direct',
  total_amount DECIMAL(10,2) NOT NULL,
  paid_amount DECIMAL(10,2) DEFAULT 0,
  commission_amount DECIMAL(10,2) DEFAULT 0,
  special_requests TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT reservations_status_check CHECK (status IN (
    'pending', 
    'confirmed', 
    'checked_in', 
    'checked_out', 
    'cancelled'
  )),
  CONSTRAINT reservations_channel_check CHECK (channel IN (
    'direct', 
    'airbnb', 
    'booking_com', 
    'agoda', 
    'vrbo', 
    'expedia'
  ))
);

-- ============================================================================
-- 6. CHANNELS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS channels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  api_key TEXT,
  api_secret TEXT,
  sync_enabled BOOLEAN DEFAULT true,
  last_sync TIMESTAMPTZ,
  properties_count INTEGER DEFAULT 0,
  commission_rate DECIMAL(5,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT channels_type_check CHECK (type IN (
    'ota', 
    'direct', 
    'marketplace'
  )),
  CONSTRAINT channels_status_check CHECK (status IN ('active', 'inactive', 'error'))
);

-- ============================================================================
-- 7. OWNERS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS owners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  bank_name TEXT,
  bank_account TEXT,
  iban TEXT,
  tax_id TEXT,
  properties_count INTEGER DEFAULT 0,
  total_revenue DECIMAL(12,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 8. TRANSACTIONS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  transaction_code TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL,
  reservation_id UUID REFERENCES reservations(id) ON DELETE SET NULL,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  owner_id UUID REFERENCES owners(id) ON DELETE SET NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'SAR',
  payment_method TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  description TEXT,
  processed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT transactions_type_check CHECK (type IN (
    'booking_payment', 
    'owner_payout', 
    'commission', 
    'refund', 
    'expense'
  )),
  CONSTRAINT transactions_status_check CHECK (status IN (
    'pending', 
    'processing', 
    'completed', 
    'failed', 
    'refunded'
  )),
  CONSTRAINT transactions_payment_method_check CHECK (payment_method IN (
    'credit_card', 
    'debit_card', 
    'bank_transfer', 
    'cash', 
    'mada', 
    'apple_pay', 
    'stc_pay'
  ))
);

-- ============================================================================
-- 9. HOUSEKEEPING TASKS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS housekeeping_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE NOT NULL,
  unit_id UUID REFERENCES units(id) ON DELETE CASCADE NOT NULL,
  assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
  task_type TEXT NOT NULL DEFAULT 'cleaning',
  status TEXT NOT NULL DEFAULT 'pending',
  priority TEXT NOT NULL DEFAULT 'medium',
  scheduled_date DATE NOT NULL,
  scheduled_time TIME,
  completed_at TIMESTAMPTZ,
  estimated_duration INTEGER,
  notes TEXT,
  checklist JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT housekeeping_tasks_type_check CHECK (task_type IN (
    'cleaning', 
    'deep_cleaning', 
    'inspection', 
    'turnover'
  )),
  CONSTRAINT housekeeping_tasks_status_check CHECK (status IN (
    'pending', 
    'in_progress', 
    'completed', 
    'skipped'
  )),
  CONSTRAINT housekeeping_tasks_priority_check CHECK (priority IN ('low', 'medium', 'high', 'urgent'))
);

-- ============================================================================
-- 10. MAINTENANCE TICKETS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS maintenance_tickets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_number TEXT UNIQUE NOT NULL,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE NOT NULL,
  unit_id UUID REFERENCES units(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  priority TEXT NOT NULL DEFAULT 'medium',
  status TEXT NOT NULL DEFAULT 'open',
  assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
  reported_by UUID REFERENCES users(id) ON DELETE SET NULL,
  estimated_cost DECIMAL(10,2),
  actual_cost DECIMAL(10,2),
  scheduled_date DATE,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT maintenance_tickets_category_check CHECK (category IN (
    'plumbing', 
    'electrical', 
    'hvac', 
    'appliance', 
    'structural', 
    'other'
  )),
  CONSTRAINT maintenance_tickets_priority_check CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  CONSTRAINT maintenance_tickets_status_check CHECK (status IN (
    'open', 
    'in_progress', 
    'on_hold', 
    'completed', 
    'cancelled'
  ))
);

-- ============================================================================
-- 11. MESSAGES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reservation_id UUID REFERENCES reservations(id) ON DELETE CASCADE,
  sender_type TEXT NOT NULL,
  sender_name TEXT NOT NULL,
  sender_email TEXT,
  recipient_type TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  channel TEXT NOT NULL DEFAULT 'internal',
  status TEXT NOT NULL DEFAULT 'unread',
  replied_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT messages_sender_type_check CHECK (sender_type IN ('guest', 'staff', 'system')),
  CONSTRAINT messages_recipient_type_check CHECK (recipient_type IN ('guest', 'staff', 'system')),
  CONSTRAINT messages_channel_check CHECK (channel IN (
    'internal', 
    'email', 
    'sms', 
    'whatsapp', 
    'airbnb', 
    'booking_com'
  )),
  CONSTRAINT messages_status_check CHECK (status IN ('unread', 'read', 'replied', 'archived'))
);

-- ============================================================================
-- 12. SUBSCRIPTIONS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  plan_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  price_monthly DECIMAL(10,2) NOT NULL,
  billing_cycle TEXT NOT NULL DEFAULT 'monthly',
  properties_limit INTEGER,
  units_limit INTEGER,
  start_date DATE NOT NULL,
  end_date DATE,
  auto_renew BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT subscriptions_status_check CHECK (status IN ('active', 'cancelled', 'expired', 'suspended')),
  CONSTRAINT subscriptions_billing_cycle_check CHECK (billing_cycle IN ('monthly', 'quarterly', 'yearly'))
);

-- ============================================================================
-- 13. LOGS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  details JSONB DEFAULT '{}',
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_properties_owner ON properties(owner_id);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_units_property ON units(property_id);
CREATE INDEX IF NOT EXISTS idx_units_status ON units(status);
CREATE INDEX IF NOT EXISTS idx_reservations_property ON reservations(property_id);
CREATE INDEX IF NOT EXISTS idx_reservations_unit ON reservations(unit_id);
CREATE INDEX IF NOT EXISTS idx_reservations_dates ON reservations(check_in, check_out);
CREATE INDEX IF NOT EXISTS idx_reservations_status ON reservations(status);
CREATE INDEX IF NOT EXISTS idx_transactions_reservation ON transactions(reservation_id);
CREATE INDEX IF NOT EXISTS idx_housekeeping_unit ON housekeeping_tasks(unit_id);
CREATE INDEX IF NOT EXISTS idx_housekeeping_status ON housekeeping_tasks(status);
CREATE INDEX IF NOT EXISTS idx_maintenance_unit ON maintenance_tickets(unit_id);
CREATE INDEX IF NOT EXISTS idx_maintenance_status ON maintenance_tickets(status);
CREATE INDEX IF NOT EXISTS idx_logs_user ON logs(user_id);
CREATE INDEX IF NOT EXISTS idx_logs_created ON logs(created_at);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE units ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE owners ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE housekeeping_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE maintenance_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE logs ENABLE ROW LEVEL SECURITY;

-- Public read policies for basic tables
CREATE POLICY "public_read_users" ON users FOR SELECT USING (true);
CREATE POLICY "public_read_roles" ON roles FOR SELECT USING (true);
CREATE POLICY "public_read_properties" ON properties FOR SELECT USING (true);
CREATE POLICY "public_read_units" ON units FOR SELECT USING (true);
CREATE POLICY "public_read_reservations" ON reservations FOR SELECT USING (true);
CREATE POLICY "public_read_channels" ON channels FOR SELECT USING (true);
CREATE POLICY "public_read_owners" ON owners FOR SELECT USING (true);
CREATE POLICY "public_read_transactions" ON transactions FOR SELECT USING (true);
CREATE POLICY "public_read_housekeeping" ON housekeeping_tasks FOR SELECT USING (true);
CREATE POLICY "public_read_maintenance" ON maintenance_tickets FOR SELECT USING (true);
CREATE POLICY "public_read_messages" ON messages FOR SELECT USING (true);
CREATE POLICY "public_read_subscriptions" ON subscriptions FOR SELECT USING (true);
CREATE POLICY "public_read_logs" ON logs FOR SELECT USING (true);

-- Public insert policies
CREATE POLICY "public_insert_users" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "public_insert_properties" ON properties FOR INSERT WITH CHECK (true);
CREATE POLICY "public_insert_units" ON units FOR INSERT WITH CHECK (true);
CREATE POLICY "public_insert_reservations" ON reservations FOR INSERT WITH CHECK (true);
CREATE POLICY "public_insert_owners" ON owners FOR INSERT WITH CHECK (true);
CREATE POLICY "public_insert_transactions" ON transactions FOR INSERT WITH CHECK (true);
CREATE POLICY "public_insert_housekeeping" ON housekeeping_tasks FOR INSERT WITH CHECK (true);
CREATE POLICY "public_insert_maintenance" ON maintenance_tickets FOR INSERT WITH CHECK (true);
CREATE POLICY "public_insert_messages" ON messages FOR INSERT WITH CHECK (true);
CREATE POLICY "public_insert_logs" ON logs FOR INSERT WITH CHECK (true);

-- Public update policies
CREATE POLICY "public_update_users" ON users FOR UPDATE USING (true);
CREATE POLICY "public_update_properties" ON properties FOR UPDATE USING (true);
CREATE POLICY "public_update_units" ON units FOR UPDATE USING (true);
CREATE POLICY "public_update_reservations" ON reservations FOR UPDATE USING (true);
CREATE POLICY "public_update_housekeeping" ON housekeeping_tasks FOR UPDATE USING (true);
CREATE POLICY "public_update_maintenance" ON maintenance_tickets FOR UPDATE USING (true);
CREATE POLICY "public_update_messages" ON messages FOR UPDATE USING (true);

-- Public delete policies
CREATE POLICY "public_delete_users" ON users FOR DELETE USING (true);
CREATE POLICY "public_delete_properties" ON properties FOR DELETE USING (true);
CREATE POLICY "public_delete_units" ON units FOR DELETE USING (true);
CREATE POLICY "public_delete_reservations" ON reservations FOR DELETE USING (true);
CREATE POLICY "public_delete_housekeeping" ON housekeeping_tasks FOR DELETE USING (true);
CREATE POLICY "public_delete_maintenance" ON maintenance_tickets FOR DELETE USING (true);

-- ============================================================================
-- END OF SCHEMA
-- ============================================================================