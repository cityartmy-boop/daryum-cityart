import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

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
      // Sign up
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name,
          },
        },
      });

      if (signUpError) throw signUpError;

      console.log("✅ Account created!", signUpData);

      // Check if auto-confirmed
      if (signUpData.user && signUpData.session) {
        console.log("✅ User auto-confirmed and logged in!");
        setSuccess(true);
        
        // Redirect with page reload to ensure session is picked up
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1500);
      } else {
        console.log("⚠️ Account created but session not active - trying manual login");
        
        // Try to sign in immediately
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (signInError) {
          console.error("❌ Auto-login failed:", signInError);
          setError("تم إنشاء الحساب بنجاح! الآن سجّل دخولك من صفحة تسجيل الدخول");
          setTimeout(() => router.push("/login"), 2000);
        } else if (signInData.session) {
          console.log("✅ Manual login successful!");
          setSuccess(true);
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 1500);
        }
      }

    } catch (err: any) {
      console.error("❌ Registration error:", err);
      
      let errorMessage = "حدث خطأ أثناء إنشاء الحساب";
      
      if (err.message?.includes("fetch")) {
        errorMessage = "⚠️ لا يمكن الاتصال بالخادم. يرجى المحاولة مرة أخرى.";
      } else if (err.message?.includes("already registered") || err.message?.includes("User already registered")) {
        errorMessage = "هذا البريد مسجل مسبقاً - جرب تسجيل الدخول";
        setTimeout(() => router.push("/login"), 2000);
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
            <h1 className="text-3xl font-bold mb-4">🎉 مرحباً بك في داريوم!</h1>
            <p className="text-muted-foreground mb-2">
              تم إنشاء حسابك وتسجيل دخولك بنجاح
            </p>
            <p className="text-sm text-muted-foreground mb-8">
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
                disabled={isLoading}
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

          {/* Success Info */}
          <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-xl text-sm">
            <p className="font-semibold mb-2 text-primary">✨ ما بعد التسجيل</p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              بعد إنشاء الحساب، سيتم تسجيل دخولك تلقائياً وتحويلك إلى لوحة التحكم
            </p>
          </div>
        </div>
      </div>
    </>
  );
}