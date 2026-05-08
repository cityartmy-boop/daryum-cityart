-- ============================================================================
-- DARYUM PROPTECH PLATFORM - COMPLETE DATABASE SCHEMA
-- Saudi PropTech SaaS for Property Management
-- Version: 1.0.0
-- ============================================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- ENUMS
-- ============================================================================

-- User Roles
CREATE TYPE user_role AS ENUM (
  'admin',
  'property_manager',
  'owner',
  'accountant',
  'housekeeping_supervisor',
  'cleaner',
  'maintenance'
);

-- User Status
CREATE TYPE user_status AS ENUM ('active', 'inactive', 'suspended');

-- Property Types
CREATE TYPE property_type AS ENUM (
  'tower',
  'building',
  'suite',
  'apartment',
  'villa',
  'compound'
);

-- Property Status
CREATE TYPE property_status AS ENUM ('active', 'inactive', 'maintenance');

-- Unit Types
CREATE TYPE unit_type AS ENUM (
  'studio',
  'one_bedroom',
  'two_bedroom',
  'three_bedroom',
  'penthouse',
  'villa'
);

-- Unit Status
CREATE TYPE unit_status AS ENUM (
  'available',
  'occupied',
  'cleaning',
  'maintenance',
  'blocked'
);

-- Reservation Status
CREATE TYPE reservation_status AS ENUM (
  'pending',
  'confirmed',
  'checked_in',
  'checked_out',
  'cancelled'
);

-- Channel Types
CREATE TYPE channel_type AS ENUM (
  'airbnb',
  'booking_com',
  'agoda',
  'vrbo',
  'expedia',
  'direct'
);

-- Channel Status
CREATE TYPE channel_status AS ENUM ('connected', 'error', 'disconnected');

-- Payment Status
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');

-- Payment Method
CREATE TYPE payment_method AS ENUM (
  'credit_card',
  'bank_transfer',
  'cash',
  'mada',
  'apple_pay',
  'stc_pay'
);

-- Transaction Type
CREATE TYPE transaction_type AS ENUM (
  'revenue',
  'commission',
  'payout',
  'expense',
  'refund'
);

-- Housekeeping Task Status
CREATE TYPE task_status AS ENUM ('pending', 'in_progress', 'completed', 'cancelled');

-- Maintenance Priority
CREATE TYPE maintenance_priority AS ENUM ('low', 'medium', 'high', 'urgent');

-- Maintenance Status
CREATE TYPE maintenance_status AS ENUM ('open', 'in_progress', 'completed', 'cancelled');

-- Message Status
CREATE TYPE message_status AS ENUM ('unread', 'read', 'replied', 'archived');

-- Subscription Plan
CREATE TYPE subscription_plan AS ENUM ('starter', 'professional', 'enterprise');

-- Subscription Status
CREATE TYPE subscription_status AS ENUM ('active', 'expired', 'cancelled', 'trial');

-- ============================================================================
-- CORE TABLES
-- ============================================================================

-- Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  role user_role NOT NULL DEFAULT 'property_manager',
  status user_status NOT NULL DEFAULT 'active',
  avatar_url TEXT,
  language VARCHAR(10) DEFAULT 'ar',
  timezone VARCHAR(50) DEFAULT 'Asia/Riyadh',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Properties Table
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  name_ar VARCHAR(255),
  type property_type NOT NULL,
  status property_status NOT NULL DEFAULT 'active',
  address TEXT NOT NULL,
  city VARCHAR(100) NOT NULL,
  country VARCHAR(100) DEFAULT 'Saudi Arabia',
  postal_code VARCHAR(20),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  description TEXT,
  description_ar TEXT,
  cover_image TEXT,
  images TEXT[],
  owner_id UUID REFERENCES users(id) ON DELETE SET NULL,
  manager_id UUID REFERENCES users(id) ON DELETE SET NULL,
  unit_count INTEGER DEFAULT 0,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Units Table
CREATE TABLE units (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE NOT NULL,
  name VARCHAR(255) NOT NULL,
  unit_number VARCHAR(50) NOT NULL,
  type unit_type NOT NULL,
  status unit_status NOT NULL DEFAULT 'available',
  floor INTEGER,
  size_sqm DECIMAL(10, 2),
  bedrooms INTEGER,
  bathrooms INTEGER,
  max_guests INTEGER,
  base_price DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'SAR',
  description TEXT,
  description_ar TEXT,
  amenities TEXT[],
  images TEXT[],
  owner_id UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb,
  UNIQUE(property_id, unit_number)
);

-- Reservations Table
CREATE TABLE reservations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  unit_id UUID REFERENCES units(id) ON DELETE CASCADE NOT NULL,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE NOT NULL,
  guest_name VARCHAR(255) NOT NULL,
  guest_email VARCHAR(255),
  guest_phone VARCHAR(50),
  guest_country VARCHAR(100),
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  nights INTEGER NOT NULL,
  adults INTEGER DEFAULT 1,
  children INTEGER DEFAULT 0,
  status reservation_status NOT NULL DEFAULT 'pending',
  channel channel_type NOT NULL,
  channel_booking_id VARCHAR(255),
  total_amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'SAR',
  commission DECIMAL(10, 2),
  net_amount DECIMAL(10, 2),
  notes TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Channels Table
CREATE TABLE channels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE NOT NULL,
  type channel_type NOT NULL,
  status channel_status NOT NULL DEFAULT 'disconnected',
  api_key TEXT,
  api_secret TEXT,
  listing_id VARCHAR(255),
  last_sync TIMESTAMP WITH TIME ZONE,
  sync_frequency INTEGER DEFAULT 30, -- minutes
  commission_rate DECIMAL(5, 2),
  settings JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(property_id, type)
);

-- Owners Table
CREATE TABLE owners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company_name VARCHAR(255),
  tax_id VARCHAR(100),
  bank_name VARCHAR(255),
  bank_account VARCHAR(255),
  iban VARCHAR(100),
  commission_rate DECIMAL(5, 2) DEFAULT 15.00,
  payment_frequency INTEGER DEFAULT 30, -- days
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Transactions Table
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  transaction_number VARCHAR(50) UNIQUE NOT NULL,
  type transaction_type NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'SAR',
  vat_amount DECIMAL(10, 2) DEFAULT 0,
  description TEXT NOT NULL,
  property_id UUID REFERENCES properties(id),
  unit_id UUID REFERENCES units(id),
  reservation_id UUID REFERENCES reservations(id),
  owner_id UUID REFERENCES owners(id),
  payment_method payment_method,
  payment_status payment_status NOT NULL DEFAULT 'pending',
  payment_date DATE,
  channel channel_type,
  reference_number VARCHAR(255),
  notes TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Housekeeping Tasks Table
CREATE TABLE housekeeping_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  unit_id UUID REFERENCES units(id) ON DELETE CASCADE NOT NULL,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status task_status NOT NULL DEFAULT 'pending',
  priority maintenance_priority DEFAULT 'medium',
  assigned_to UUID REFERENCES users(id),
  scheduled_date DATE NOT NULL,
  scheduled_time TIME,
  estimated_duration INTEGER, -- minutes
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  checklist JSONB DEFAULT '[]'::jsonb,
  before_photos TEXT[],
  after_photos TEXT[],
  notes TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Maintenance Tickets Table
CREATE TABLE maintenance_tickets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_number VARCHAR(50) UNIQUE NOT NULL,
  unit_id UUID REFERENCES units(id) ON DELETE CASCADE NOT NULL,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  priority maintenance_priority NOT NULL DEFAULT 'medium',
  status maintenance_status NOT NULL DEFAULT 'open',
  assigned_to UUID REFERENCES users(id),
  estimated_cost DECIMAL(10, 2),
  actual_cost DECIMAL(10, 2),
  sla_hours INTEGER DEFAULT 24,
  due_date TIMESTAMP WITH TIME ZONE,
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  photos TEXT[],
  notes TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messages Table
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reservation_id UUID REFERENCES reservations(id) ON DELETE CASCADE,
  guest_name VARCHAR(255) NOT NULL,
  guest_email VARCHAR(255),
  guest_phone VARCHAR(50),
  subject VARCHAR(500),
  message TEXT NOT NULL,
  reply TEXT,
  status message_status NOT NULL DEFAULT 'unread',
  channel channel_type,
  is_ai_suggested BOOLEAN DEFAULT FALSE,
  ai_suggestion TEXT,
  replied_by UUID REFERENCES users(id),
  replied_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subscriptions Table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  plan subscription_plan NOT NULL,
  status subscription_status NOT NULL DEFAULT 'trial',
  price DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'SAR',
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  trial_end_date DATE,
  auto_renew BOOLEAN DEFAULT TRUE,
  properties_limit INTEGER DEFAULT 5,
  units_limit INTEGER DEFAULT 50,
  users_limit INTEGER DEFAULT 10,
  features JSONB DEFAULT '{}'::jsonb,
  payment_method payment_method,
  last_payment_date DATE,
  next_payment_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activity Logs Table
CREATE TABLE activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  action VARCHAR(255) NOT NULL,
  entity_type VARCHAR(100) NOT NULL,
  entity_id UUID,
  ip_address INET,
  user_agent TEXT,
  changes JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

-- Users
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_status ON users(status);

-- Properties
CREATE INDEX idx_properties_owner ON properties(owner_id);
CREATE INDEX idx_properties_manager ON properties(manager_id);
CREATE INDEX idx_properties_status ON properties(status);
CREATE INDEX idx_properties_city ON properties(city);

-- Units
CREATE INDEX idx_units_property ON units(property_id);
CREATE INDEX idx_units_status ON units(status);
CREATE INDEX idx_units_owner ON units(owner_id);

-- Reservations
CREATE INDEX idx_reservations_unit ON reservations(unit_id);
CREATE INDEX idx_reservations_property ON reservations(property_id);
CREATE INDEX idx_reservations_status ON reservations(status);
CREATE INDEX idx_reservations_dates ON reservations(check_in, check_out);
CREATE INDEX idx_reservations_channel ON reservations(channel);

-- Transactions
CREATE INDEX idx_transactions_property ON transactions(property_id);
CREATE INDEX idx_transactions_owner ON transactions(owner_id);
CREATE INDEX idx_transactions_type ON transactions(type);
CREATE INDEX idx_transactions_status ON transactions(payment_status);
CREATE INDEX idx_transactions_date ON transactions(payment_date);

-- Housekeeping
CREATE INDEX idx_housekeeping_unit ON housekeeping_tasks(unit_id);
CREATE INDEX idx_housekeeping_assigned ON housekeeping_tasks(assigned_to);
CREATE INDEX idx_housekeeping_status ON housekeeping_tasks(status);
CREATE INDEX idx_housekeeping_date ON housekeeping_tasks(scheduled_date);

-- Maintenance
CREATE INDEX idx_maintenance_unit ON maintenance_tickets(unit_id);
CREATE INDEX idx_maintenance_assigned ON maintenance_tickets(assigned_to);
CREATE INDEX idx_maintenance_status ON maintenance_tickets(status);
CREATE INDEX idx_maintenance_priority ON maintenance_tickets(priority);

-- Messages
CREATE INDEX idx_messages_reservation ON messages(reservation_id);
CREATE INDEX idx_messages_status ON messages(status);

-- Activity Logs
CREATE INDEX idx_logs_user ON activity_logs(user_id);
CREATE INDEX idx_logs_entity ON activity_logs(entity_type, entity_id);
CREATE INDEX idx_logs_created ON activity_logs(created_at DESC);

-- ============================================================================
-- TRIGGERS & FUNCTIONS
-- ============================================================================

-- Updated At Trigger Function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at trigger to all relevant tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON properties
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_units_updated_at BEFORE UPDATE ON units
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reservations_updated_at BEFORE UPDATE ON reservations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_transactions_updated_at BEFORE UPDATE ON transactions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_housekeeping_updated_at BEFORE UPDATE ON housekeeping_tasks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_maintenance_updated_at BEFORE UPDATE ON maintenance_tickets
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Auto-generate transaction numbers
CREATE OR REPLACE FUNCTION generate_transaction_number()
RETURNS TRIGGER AS $$
BEGIN
    NEW.transaction_number = 'TXN-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(nextval('transaction_seq')::TEXT, 6, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE SEQUENCE transaction_seq;

CREATE TRIGGER set_transaction_number BEFORE INSERT ON transactions
    FOR EACH ROW WHEN (NEW.transaction_number IS NULL)
    EXECUTE FUNCTION generate_transaction_number();

-- Auto-generate maintenance ticket numbers
CREATE OR REPLACE FUNCTION generate_ticket_number()
RETURNS TRIGGER AS $$
BEGIN
    NEW.ticket_number = 'MNT-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(nextval('ticket_seq')::TEXT, 6, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE SEQUENCE ticket_seq;

CREATE TRIGGER set_ticket_number BEFORE INSERT ON maintenance_tickets
    FOR EACH ROW WHEN (NEW.ticket_number IS NULL)
    EXECUTE FUNCTION generate_ticket_number();

-- Update property unit count
CREATE OR REPLACE FUNCTION update_property_unit_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE properties SET unit_count = unit_count + 1 WHERE id = NEW.property_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE properties SET unit_count = unit_count - 1 WHERE id = OLD.property_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_property_unit_count_trigger
    AFTER INSERT OR DELETE ON units
    FOR EACH ROW EXECUTE FUNCTION update_property_unit_count();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
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
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- Admin has full access
CREATE POLICY admin_all_access ON users FOR ALL TO authenticated
    USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));

-- Property managers can see their properties
CREATE POLICY property_manager_access ON properties FOR ALL TO authenticated
    USING (manager_id = auth.uid() OR EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));

-- Owners can see their properties
CREATE POLICY owner_access ON properties FOR SELECT TO authenticated
    USING (owner_id = auth.uid() OR EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));

-- ============================================================================
-- SAMPLE DATA (Optional - for development/testing)
-- ============================================================================

-- Insert sample admin user
INSERT INTO users (email, name, role, status) VALUES
('admin@daryum.com', 'مدير النظام', 'admin', 'active');

-- ============================================================================
-- VIEWS FOR ANALYTICS
-- ============================================================================

-- Revenue Summary View
CREATE OR REPLACE VIEW revenue_summary AS
SELECT 
    DATE_TRUNC('month', payment_date) as month,
    SUM(amount) as total_revenue,
    SUM(vat_amount) as total_vat,
    SUM(amount - vat_amount) as net_revenue,
    COUNT(*) as transaction_count
FROM transactions
WHERE type = 'revenue' AND payment_status = 'completed'
GROUP BY DATE_TRUNC('month', payment_date)
ORDER BY month DESC;

-- Occupancy Rate View
CREATE OR REPLACE VIEW occupancy_summary AS
SELECT 
    p.id as property_id,
    p.name as property_name,
    COUNT(DISTINCT u.id) as total_units,
    COUNT(DISTINCT CASE WHEN u.status = 'occupied' THEN u.id END) as occupied_units,
    ROUND(COUNT(DISTINCT CASE WHEN u.status = 'occupied' THEN u.id END)::NUMERIC / NULLIF(COUNT(DISTINCT u.id), 0) * 100, 2) as occupancy_rate
FROM properties p
LEFT JOIN units u ON p.id = u.property_id
WHERE p.status = 'active'
GROUP BY p.id, p.name;

-- ============================================================================
-- GRANTS (Adjust based on your Supabase setup)
-- ============================================================================

-- Grant necessary permissions to authenticated users
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- ============================================================================
-- END OF SCHEMA
-- ============================================================================