import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { User, Mail, Lock, Phone, Building2, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("كلمات المرور غير متطابقة");
      return;
    }

    if (formData.password.length < 6) {
      setError("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
      return;
    }

    setIsLoading(true);
    console.log("📝 Starting registration process...");
    console.log("Email:", formData.email);
    console.log("Name:", formData.name);

    try {
      // Test Supabase connection first
      console.log("🔍 Testing Supabase connection...");
      const { data: testData, error: testError } = await supabase.auth.getSession();
      
      if (testError) {
        console.error("❌ Supabase connection test failed:", testError);
        throw new Error("فشل الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت.");
      }
      
      console.log("✅ Supabase connection successful");

      // Now try to sign up
      console.log("📝 Attempting to create account...");
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name,
            phone: formData.phone,
            company: formData.company,
          },
        },
      });

      if (signUpError) {
        console.error("❌ Signup error:", signUpError);
        throw signUpError;
      }

      console.log("✅ Account created successfully!", data);
      setSuccess(true);
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);

    } catch (err: any) {
      console.error("❌ Registration error:", err);
      console.error("Error details:", {
        message: err.message,
        status: err.status,
        code: err.code,
      });
      
      // Better error messages in Arabic
      let errorMessage = "حدث خطأ أثناء إنشاء الحساب";
      
      if (err.message?.includes("Failed to fetch") || err.message?.includes("fetch")) {
        errorMessage = "❌ فشل الاتصال بالخادم. يرجى التحقق من:\n• اتصال الإنترنت\n• إعدادات Supabase\n• جدار الحماية";
      } else if (err.message?.includes("already registered")) {
        errorMessage = "هذا البريد الإلكتروني مسجل مسبقاً";
      } else if (err.message?.includes("Password should be at least")) {
        errorMessage = "كلمة المرور ضعيفة جداً";
      } else if (err.message?.includes("invalid email")) {
        errorMessage = "البريد الإلكتروني غير صحيح";
      } else if (err.message) {
        errorMessage = `${err.message}\n\nإذا استمرت المشكلة، تحقق من Console (F12)`;
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <>
        <SEO title="تم إنشاء الحساب - داريوم" />
        <div className="min-h-screen flex items-center justify-center p-8">
          <div className="w-full max-w-md text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-4">🎉 تم إنشاء حسابك بنجاح!</h1>
            <p className="text-muted-foreground mb-8">
              سيتم تحويلك إلى لوحة التحكم خلال ثوانٍ...
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              جارٍ التحويل...
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO title="إنشاء حساب - داريوم" />
      
      <div className="min-h-screen flex">
        {/* Left Side - Registration Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <Link href="/" className="inline-block mb-8">
              <Image 
                src="/داريوم.png" 
                alt="داريوم" 
                width={160}
                height={50}
                className="h-12 w-auto"
              />
            </Link>
            <h1 className="text-3xl font-bold mb-2">إنشاء حساب جديد</h1>
            <p className="text-muted-foreground mb-6">انضم لآلاف مدراء العقارات</p>

            {/* Error Message */}
            {error && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-xl p-4 mb-6 text-sm whitespace-pre-line">
                {error}
              </div>
            )}

            {/* Register Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-right block">الاسم الكامل</Label>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="أحمد محمد"
                    value={formData.name}
                    onChange={handleChange}
                    className="pr-11 text-right"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-right block">البريد الإلكتروني</Label>
                <div className="relative">
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="pr-11 text-right"
                    required
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-right block">كلمة المرور</Label>
                <div className="relative">
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="pr-11 pl-11 text-right"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground text-right">6 أحرف على الأقل</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-right block">تأكيد كلمة المرور</Label>
                <div className="relative">
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="pr-11 text-right"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white text-lg h-12 mt-6"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2 justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    جارٍ إنشاء الحساب...
                  </span>
                ) : (
                  <span className="flex items-center gap-2 justify-center">
                    إنشاء حساب
                    <ArrowRight className="w-5 h-5" />
                  </span>
                )}
              </Button>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">لديك حساب بالفعل؟ </span>
              <Link href="/login" className="text-primary font-semibold hover:underline">
                تسجيل الدخول
              </Link>
            </div>

            {/* Debug Info */}
            <div className="mt-6 p-4 bg-muted/50 rounded-xl text-xs space-y-2">
              <p className="font-semibold">🔍 معلومات التشخيص:</p>
              <p className="font-mono text-muted-foreground">
                • افتح Console (اضغط F12)<br/>
                • ابحث عن رسائل "📝" و "✅" و "❌"<br/>
                • شارك الأخطاء إذا ظهرت
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}