import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from "lucide-react";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<"testing" | "connected" | "failed">("testing");

  // Test connection on mount
  useState(() => {
    const testConnection = async () => {
      try {
        const { error } = await supabase.auth.getSession();
        setConnectionStatus(error ? "failed" : "connected");
      } catch {
        setConnectionStatus("failed");
      }
    };
    testConnection();
  });

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
    console.log("📝 Starting registration...");
    console.log("Email:", formData.email);

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name,
          },
        },
      });

      if (signUpError) throw signUpError;

      console.log("✅ Account created!", data);
      setSuccess(true);
      
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);

    } catch (err: any) {
      console.error("❌ Error:", err);
      
      let errorMessage = "حدث خطأ أثناء إنشاء الحساب";
      
      if (err.message?.includes("fetch")) {
        errorMessage = "⚠️ لا يمكن الاتصال بالخادم\n\nالحل:\n1. تحقق من اتصال الإنترنت\n2. تأكد أن Supabase Project نشط\n3. جرب إعادة تحميل الصفحة";
      } else if (err.message?.includes("already registered")) {
        errorMessage = "هذا البريد مسجل مسبقاً - جرب تسجيل الدخول";
      } else if (err.message) {
        errorMessage = err.message;
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
        <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="w-full max-w-md text-center">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-4">🎉 تم إنشاء حسابك بنجاح!</h1>
            <p className="text-muted-foreground mb-8">
              سيتم تحويلك إلى لوحة التحكم...
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
      
      <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-background to-muted/30">
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

          <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
            <h1 className="text-3xl font-bold mb-2">إنشاء حساب جديد</h1>
            <p className="text-muted-foreground mb-6">انضم لآلاف مدراء العقارات</p>

            {/* Connection Status */}
            {connectionStatus === "failed" && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 mb-6 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-destructive mb-1">⚠️ مشكلة في الاتصال</p>
                  <p className="text-destructive/80">
                    لا يمكن الاتصال بـ Supabase. تحقق من اتصال الإنترنت أو أعد تحميل الصفحة.
                  </p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-xl p-4 mb-6 text-sm whitespace-pre-line">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">الاسم الكامل</Label>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="أحمد محمد"
                    value={formData.name}
                    onChange={handleChange}
                    className="pr-11"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <div className="relative">
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="pr-11"
                    required
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">كلمة المرور</Label>
                <div className="relative">
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="pr-11 pl-11"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">6 أحرف على الأقل</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
                <div className="relative">
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="pr-11"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 h-12 text-lg mt-6"
                disabled={isLoading || connectionStatus === "failed"}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    جارٍ إنشاء الحساب...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    إنشاء حساب
                    <ArrowRight className="w-5 h-5" />
                  </span>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">لديك حساب؟ </span>
              <Link href="/login" className="text-primary font-semibold hover:underline">
                تسجيل الدخول
              </Link>
            </div>
          </div>

          {/* Help Box */}
          <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-xl text-sm">
            <p className="font-semibold mb-2 text-primary">💡 هل تواجه مشكلة؟</p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              افتح Console (F12) → ابحث عن رسائل الأخطاء → شارك الرسالة للمساعدة
            </p>
          </div>
        </div>
      </div>
    </>
  );
}