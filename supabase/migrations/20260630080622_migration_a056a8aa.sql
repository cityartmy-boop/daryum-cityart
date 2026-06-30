-- إنشاء جدول أنواع المصروفات (expense_categories)
CREATE TABLE expense_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  color TEXT DEFAULT '#64748b',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT expense_categories_name_key UNIQUE (name)
);

-- إنشاء جدول المصروفات (expenses)
CREATE TABLE expenses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  expense_number TEXT NOT NULL UNIQUE,
  category_id UUID NOT NULL REFERENCES expense_categories(id) ON DELETE RESTRICT,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  unit_id UUID REFERENCES units(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  amount NUMERIC(10,2) NOT NULL,
  currency TEXT DEFAULT 'SAR',
  payment_method TEXT CHECK (payment_method IN ('cash', 'bank_transfer', 'credit_card', 'debit_card', 'mada')),
  paid_to TEXT,
  receipt_url TEXT,
  expense_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'paid', 'rejected')),
  approved_by UUID REFERENCES users(id) ON DELETE SET NULL,
  approved_at TIMESTAMPTZ,
  notes TEXT,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- إنشاء الفهارس
CREATE INDEX idx_expenses_category ON expenses(category_id);
CREATE INDEX idx_expenses_property ON expenses(property_id);
CREATE INDEX idx_expenses_unit ON expenses(unit_id);
CREATE INDEX idx_expenses_date ON expenses(expense_date);
CREATE INDEX idx_expenses_status ON expenses(status);
CREATE INDEX idx_expense_categories_active ON expense_categories(is_active);

-- تفعيل RLS
ALTER TABLE expense_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

-- سياسات RLS لأنواع المصروفات
CREATE POLICY "public_read_expense_categories" ON expense_categories
  FOR SELECT USING (true);

CREATE POLICY "public_insert_expense_categories" ON expense_categories
  FOR INSERT WITH CHECK (true);

CREATE POLICY "public_update_expense_categories" ON expense_categories
  FOR UPDATE USING (true);

CREATE POLICY "public_delete_expense_categories" ON expense_categories
  FOR DELETE USING (true);

-- سياسات RLS للمصروفات
CREATE POLICY "public_read_expenses" ON expenses
  FOR SELECT USING (true);

CREATE POLICY "public_insert_expenses" ON expenses
  FOR INSERT WITH CHECK (true);

CREATE POLICY "public_update_expenses" ON expenses
  FOR UPDATE USING (true);

CREATE POLICY "public_delete_expenses" ON expenses
  FOR DELETE USING (true);

-- إدراج أنواع مصروفات افتراضية
INSERT INTO expense_categories (name, name_ar, description, icon, color) VALUES
  ('utilities', 'المرافق', 'فواتير الكهرباء والماء والغاز', 'Zap', '#f59e0b'),
  ('maintenance', 'الصيانة', 'تكاليف الصيانة والإصلاحات', 'Wrench', '#ef4444'),
  ('cleaning', 'التنظيف', 'مواد ومستلزمات التنظيف', 'Sparkles', '#06b6d4'),
  ('salaries', 'الرواتب', 'رواتب الموظفين والعمالة', 'Users', '#8b5cf6'),
  ('insurance', 'التأمين', 'تأمين العقار والمحتويات', 'Shield', '#10b981'),
  ('taxes', 'الضرائب', 'الضرائب والرسوم الحكومية', 'FileText', '#f43f5e'),
  ('marketing', 'التسويق', 'تكاليف التسويق والإعلان', 'TrendingUp', '#ec4899'),
  ('commission', 'العمولات', 'عمولات المنصات والوسطاء', 'Percent', '#6366f1'),
  ('other', 'أخرى', 'مصروفات أخرى متنوعة', 'MoreHorizontal', '#64748b');