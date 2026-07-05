-- =============================================
-- نظام إدارة المصروفات الكامل
-- Expense Management System
-- =============================================

-- جدول فئات المصروفات
CREATE TABLE IF NOT EXISTS public.expense_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_ar TEXT NOT NULL,
    name_en TEXT NOT NULL,
    icon TEXT,
    color TEXT,
    is_system BOOLEAN DEFAULT FALSE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- جدول المصروفات
CREATE TABLE IF NOT EXISTS public.expenses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    expense_number TEXT UNIQUE,
    category_id UUID REFERENCES public.expense_categories(id) ON DELETE RESTRICT NOT NULL,
    property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
    unit_id UUID REFERENCES public.units(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL CHECK (amount >= 0),
    description TEXT NOT NULL,
    expense_date DATE NOT NULL,
    vendor TEXT,
    payment_method TEXT,
    notes TEXT,
    attachment_url TEXT,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes للأداء
CREATE INDEX idx_expenses_user ON public.expenses(user_id);
CREATE INDEX idx_expenses_category ON public.expenses(category_id);
CREATE INDEX idx_expenses_property ON public.expenses(property_id);
CREATE INDEX idx_expenses_date ON public.expenses(expense_date DESC);
CREATE INDEX idx_expense_categories_user ON public.expense_categories(user_id);

-- RLS Policies
ALTER TABLE public.expense_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;

-- فئات المصروفات: المستخدم يرى الفئات النظامية + فئاته الخاصة
CREATE POLICY "select_expense_categories" ON public.expense_categories
    FOR SELECT USING (is_system = TRUE OR user_id = auth.uid());

CREATE POLICY "insert_expense_categories" ON public.expense_categories
    FOR INSERT WITH CHECK (user_id = auth.uid() AND is_system = FALSE);

CREATE POLICY "update_expense_categories" ON public.expense_categories
    FOR UPDATE USING (user_id = auth.uid() AND is_system = FALSE);

CREATE POLICY "delete_expense_categories" ON public.expense_categories
    FOR DELETE USING (user_id = auth.uid() AND is_system = FALSE);

-- المصروفات: المستخدم يدير مصروفاته فقط
CREATE POLICY "select_expenses" ON public.expenses
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "insert_expenses" ON public.expenses
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "update_expenses" ON public.expenses
    FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "delete_expenses" ON public.expenses
    FOR DELETE USING (user_id = auth.uid());

-- إدراج الفئات الافتراضية (نظامية)
INSERT INTO public.expense_categories (name_ar, name_en, icon, color, is_system) VALUES
    ('المرتبات', 'Salaries', 'Users', 'blue', TRUE),
    ('الصيانة', 'Maintenance', 'Wrench', 'orange', TRUE),
    ('النظافة', 'Cleaning', 'Sparkles', 'green', TRUE),
    ('الإيجار', 'Rent', 'Home', 'purple', TRUE),
    ('رسوم', 'Fees', 'Receipt', 'red', TRUE),
    ('المرافق', 'Utilities', 'Zap', 'yellow', TRUE),
    ('التأمين', 'Insurance', 'Shield', 'indigo', TRUE),
    ('التسويق', 'Marketing', 'TrendingUp', 'pink', TRUE),
    ('القانونية', 'Legal', 'Scale', 'gray', TRUE),
    ('أخرى', 'Other', 'MoreHorizontal', 'slate', TRUE);

-- =============================================
-- بيانات نموذجية للمصروفات (Sample Data)
-- =============================================
-- ملاحظة: هذه البيانات النموذجية تحتاج إلى user_id و property_id صحيح
-- يمكنك تشغيل هذه الأوامر بعد إنشاء المستخدم والعقارات
-- استبدل 'YOUR_USER_ID' و 'YOUR_PROPERTY_ID' بالقيم الفعلية

-- للحصول على user_id الخاص بك:
-- SELECT id FROM auth.users WHERE email = 'your-email@example.com';

-- للحصول على property_id:
-- SELECT id FROM public.properties WHERE user_id = 'YOUR_USER_ID' LIMIT 1;

-- مثال 1: مصروف مرتبات
-- INSERT INTO public.expenses (
--     category_id,
--     property_id,
--     amount,
--     description,
--     expense_date,
--     vendor,
--     payment_method,
--     notes,
--     user_id
-- ) VALUES (
--     (SELECT id FROM public.expense_categories WHERE name_ar = 'المرتبات' AND is_system = TRUE LIMIT 1),
--     'YOUR_PROPERTY_ID',
--     15000.00,
--     'راتب شهر يناير 2026 - فريق الصيانة والنظافة',
--     '2026-01-31',
--     'فريق العمل',
--     'bank_transfer',
--     'تم الدفع في نهاية الشهر عبر التحويل البنكي',
--     'YOUR_USER_ID'
-- );

-- مثال 2: مصروف صيانة
-- INSERT INTO public.expenses (
--     category_id,
--     property_id,
--     amount,
--     description,
--     expense_date,
--     vendor,
--     payment_method,
--     notes,
--     user_id
-- ) VALUES (
--     (SELECT id FROM public.expense_categories WHERE name_ar = 'الصيانة' AND is_system = TRUE LIMIT 1),
--     'YOUR_PROPERTY_ID',
--     3500.00,
--     'إصلاح نظام التكييف - وحدة A3',
--     '2026-02-05',
--     'شركة التبريد المتقدمة',
--     'cash',
--     'صيانة طارئة - تم إصلاح ضاغط التكييف',
--     'YOUR_USER_ID'
-- );

-- مثال 3: مصروف مرافق
-- INSERT INTO public.expenses (
--     category_id,
--     property_id,
--     amount,
--     description,
--     expense_date,
--     vendor,
--     payment_method,
--     notes,
--     user_id
-- ) VALUES (
--     (SELECT id FROM public.expense_categories WHERE name_ar = 'المرافق' AND is_system = TRUE LIMIT 1),
--     'YOUR_PROPERTY_ID',
--     4200.00,
--     'فاتورة الكهرباء والماء - شهر فبراير 2026',
--     '2026-02-28',
--     'الشركة السعودية للكهرباء',
--     'online',
--     'دفع إلكتروني - فاتورة رقم EC-2026-0234',
--     'YOUR_USER_ID'
-- );

-- =============================================
-- Function لإدراج بيانات نموذجية للمستخدم الحالي
-- =============================================
CREATE OR REPLACE FUNCTION insert_sample_expenses(p_property_id UUID DEFAULT NULL)
RETURNS TEXT AS $$
DECLARE
    v_user_id UUID;
    v_property_id UUID;
    v_count INTEGER;
BEGIN
    -- الحصول على user_id الحالي
    v_user_id := auth.uid();
    
    IF v_user_id IS NULL THEN
        RETURN 'خطأ: يجب تسجيل الدخول أولاً';
    END IF;
    
    -- الحصول على property_id
    IF p_property_id IS NOT NULL THEN
        v_property_id := p_property_id;
    ELSE
        -- استخدام أول عقار للمستخدم
        SELECT id INTO v_property_id
        FROM public.properties
        WHERE user_id = v_user_id
        LIMIT 1;
        
        IF v_property_id IS NULL THEN
            RETURN 'خطأ: لا توجد عقارات مسجلة. قم بإضافة عقار أولاً';
        END IF;
    END IF;
    
    -- إدراج المصروفات النموذجية
    INSERT INTO public.expenses (
        category_id,
        property_id,
        amount,
        description,
        expense_date,
        vendor,
        payment_method,
        notes,
        user_id
    ) VALUES 
    (
        (SELECT id FROM public.expense_categories WHERE name_ar = 'المرتبات' AND is_system = TRUE LIMIT 1),
        v_property_id,
        15000.00,
        'راتب شهر يناير 2026 - فريق الصيانة والنظافة',
        CURRENT_DATE - INTERVAL '30 days',
        'فريق العمل',
        'bank_transfer',
        'تم الدفع في نهاية الشهر عبر التحويل البنكي',
        v_user_id
    ),
    (
        (SELECT id FROM public.expense_categories WHERE name_ar = 'الصيانة' AND is_system = TRUE LIMIT 1),
        v_property_id,
        3500.00,
        'إصلاح نظام التكييف - وحدة A3',
        CURRENT_DATE - INTERVAL '15 days',
        'شركة التبريد المتقدمة',
        'cash',
        'صيانة طارئة - تم إصلاح ضاغط التكييف',
        v_user_id
    ),
    (
        (SELECT id FROM public.expense_categories WHERE name_ar = 'المرافق' AND is_system = TRUE LIMIT 1),
        v_property_id,
        4200.00,
        'فاتورة الكهرباء والماء - شهر فبراير 2026',
        CURRENT_DATE - INTERVAL '5 days',
        'الشركة السعودية للكهرباء',
        'online',
        'دفع إلكتروني - فاتورة رقم EC-2026-0234',
        v_user_id
    );
    
    GET DIAGNOSTICS v_count = ROW_COUNT;
    
    RETURN 'تم إدراج ' || v_count || ' مصروفات نموذجية بنجاح';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- تعليمات الاستخدام:
-- 1. بعد تسجيل الدخول وإنشاء عقار، شغّل:
--    SELECT insert_sample_expenses();
--
-- 2. أو حدد عقار معين:
--    SELECT insert_sample_expenses('property-id-here');

-- Function لتوليد رقم المصروف التلقائي
CREATE OR REPLACE FUNCTION generate_expense_number()
RETURNS TEXT AS $$
DECLARE
    next_number INTEGER;
    expense_number TEXT;
BEGIN
    -- الحصول على آخر رقم
    SELECT COALESCE(MAX(CAST(SUBSTRING(expense_number FROM 5) AS INTEGER)), 0) + 1
    INTO next_number
    FROM public.expenses
    WHERE expense_number LIKE 'EXP-%';
    
    -- تنسيق الرقم
    expense_number := 'EXP-' || LPAD(next_number::TEXT, 6, '0');
    
    RETURN expense_number;
END;
$$ LANGUAGE plpgsql;

-- Trigger لتوليد رقم المصروف تلقائياً
CREATE OR REPLACE FUNCTION set_expense_number()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.expense_number IS NULL THEN
        NEW.expense_number := generate_expense_number();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_expense_insert
BEFORE INSERT ON public.expenses
FOR EACH ROW
EXECUTE FUNCTION set_expense_number();

-- Trigger لتحديث updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_expenses_updated_at
BEFORE UPDATE ON public.expenses
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_expense_categories_updated_at
BEFORE UPDATE ON public.expense_categories
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

COMMENT ON TABLE public.expense_categories IS 'فئات المصروفات';
COMMENT ON TABLE public.expenses IS 'المصروفات';